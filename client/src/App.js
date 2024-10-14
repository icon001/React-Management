import './App.css';
import { Component } from 'react';
import Customer from './components/Customer'
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { withStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';

const styles =({
  root:{
    width:'100%',
    marginTop: '24px',
    overflowX:"auto",
  },
  table:{
    minWidth:1080,
  },
})


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
  render() {
    const { classes } = this.props;
    return (
      
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
            </TableHead>
            <TableBody>
              {customers.map(c => (
                <Customer
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthDate={c.birthDate}
                  gender={c.gender}
                  job={c.job}
                />
              ))}
            </TableBody>
          </Table>
        </Paper>
      
    );
  }
}

export default withStyles(styles)(App);
//export default App;
