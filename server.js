const express = require('express');
const bodyParser = require('body-parser'); //요청 본문을 파싱하는 모듈
const app = express();
const port = process.env.PORT || 5000; //환경설정의 포트가 설정되었다면 포트 사용,아니라면 5000 포트를 사용

const fs = require('fs');
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host:conf.host,
  user:conf.user,
  password:conf.password,
  port:conf.port,
  database:conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest:'./upload'}); //서버의 기본 폴더 아래 upload 폴더에 파일 저장


app.use(bodyParser.json()); //json 요청 본문을 파싱
app.use(bodyParser.urlencoded({extended:true})); //URL-encoded 형식의 본문을 파싱
app.get('/api/hello',(req,res)=>{
    res.send({message:"Hello Express!"});
}); ///api/hello 의 get 요청을 처리하는 라우트
app.get('/api/customers',(req,res)=>{
    connection.query(
      "select * from customer where isDeleted = 0",
      (err,rows,fields)=>{
        res.send(rows);  
      }
    )
}); ///api/customers 의 get 요청을 처리하는 라우트

app.use('/image',express.static('./upload')); ///image 폴더 접근시 업로드 폴더를 사용할 수 있도록 설정
// 라우트 핸들러 정의
app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO customer(image,NAME,birthDate,gender,job,createDate,isDeleted) VALUES(?,?,?,?,?,now(),0)';
  let image = '/image/' + req.file.filename; //multer 라이브러리가 겹치지 않는 이름으로 자동 할당된다.
  let name = req.body.name;
  let birthDate = req.body.birthDate;
  let gender = req.body.gender;
  let job = req.body.job;
  let params=[image,name,birthDate,gender,job];
  console.log(params);
  connection.query(sql,params,
    (err,rows,fields)=>{
      if (err) {
        console.log(err);
        res.status(500).send(err); // 오류 처리
      } else {
        res.send(rows); // 성공하면 클라이언트에 성공 메시지 전송
      }
    }
  )
}); //post로 api/customers 접근시 upload  할 수 있도록 처리

app.delete('/api/customers/:id',(req,res)=>{
  let sql = 'UPDATE CUSTOMER set isDeleted = 1 where id = ?';
  let params = [req.params.id];
  connection.query(sql,params,
    (err,rows,fields)=>{
      res.send(rows);
    }
  )
})

app.listen(port,()=>console.log(`Listening on port ${port}`)); //app를 구동시키고 consol 에 출력
