const express = require('express');
const bodyParser = require('body-parser'); //요청 본문을 파싱하는 모듈
const app = express();
const port = process.env.PORT || 5000; //환경설정의 포트가 설정되었다면 포트 사용,아니라면 5000 포트를 사용

app.use(bodyParser.json()); //json 요청 본문을 파싱
app.use(bodyParser.urlencoded({extended:true})); //URL-encoded 형식의 본문을 파싱
app.get('/api/hello',(req,res)=>{
    res.send({message:"Hello Express!"});
}); ///api/hello 의 get 요청을 처리하는 라우트
app.get('/api/customers',(req,res)=>{
    res.send([
        {
            'id' : 1,
            'image' : 'https://picsum.photos/id/1/64/64',
            'name' : "홍길동",
            'birthDate' : "12년 12월 12일",
            'gender' : "남자",
            'job':"중학생"
          },
          {
            'id' : 2,
            'image' : 'https://picsum.photos/id/2/64/64',
            'name' : "강감찬",
            'birthDate' : "12년 12월 12일",
            'gender' : "남자",
            'job':"중학생"
          },
          {
            'id' : 3,
            'image' : 'https://picsum.photos/id/3/64/64',
            'name' : "이순신",
            'birthDate' : "12년 12월 12일",
            'gender' : "남자",
            'job':"중학생"
          }
    ]);
}); ///api/customers 의 get 요청을 처리하는 라우트

app.listen(port,()=>console.log(`Listening on port ${port}`)); //app를 구동시키고 consol 에 출력
