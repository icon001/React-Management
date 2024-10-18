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

app.use(bodyParser.json()); //json 요청 본문을 파싱
app.use(bodyParser.urlencoded({extended:true})); //URL-encoded 형식의 본문을 파싱
app.get('/api/hello',(req,res)=>{
    res.send({message:"Hello Express!"});
}); ///api/hello 의 get 요청을 처리하는 라우트
app.get('/api/customers',(req,res)=>{
    connection.query(
      "select * from customer",
      (err,rows,fields)=>{
        res.send(rows);  
      }
    )
}); ///api/customers 의 get 요청을 처리하는 라우트

app.listen(port,()=>console.log(`Listening on port ${port}`)); //app를 구동시키고 consol 에 출력
