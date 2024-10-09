import './App.css';
import { Component } from 'react';
import Customer from './components/Customer'

const customers =[{
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
}]

class App extends Component {
  render(){
    return (
      <div>
        {
          customers.map(c =>{
            return (
              <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name = {c.name}
                birthDate = {c.birthDate}
                gender={c.gender}
                job ={c.job}

              />
            )
          })
        }
      </div>
      
    );
  }
}

export default App;
