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


class App extends Component {
  state = { //state는 변경 될 수 있는 데이터를 명시
    customers : ""
  }
  //실제로 API 서버에 접근해서 데이터를 가져 온다.
  componentDidMount(){
    //모든 컴포넌트가 완료 되었을 때 구동되는 생명 주기
    this.callApi()
      .then(res=> this.setState({customers:res})) //받아온 res 데이터를 customers에 셋팅  
      .catch(err=>console.log(err)); //에러가 발생하는 경우 console에 출력

  }
  callApi = async() =>{
    //비동기로 처리 하기 위해서 async로 처리
    const response = await fetch('/api/customers');
    const body = await response.json(); //데이터를 json 형태로 가져와서 body 에 저장
    return body;
  }
  render() {
    const { classes } = this.props; //props는 변경 될 수 없는 데이터를 명시
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
              {this.state.customers ? this.state.customers.map(c => (
                <Customer
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthDate={c.birthDate}
                  gender={c.gender}
                  job={c.job}
                />
              )):""}
            </TableBody>
          </Table>
        </Paper>
      
    );
  }
}

export default withStyles(styles)(App);
//export default App;
