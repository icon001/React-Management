import React from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { withStyles } from '@mui/styles';

const style = theme =>({
    hidden:{
        display:'none'
    }
});

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file:null,
            userName:'',
            birthDate:'',
            gender:'',
            job:'',
            fileName:'',
            open:false
        }
    }

    handleClickOpen =()=>{
        this.setState({
            open:true
        });
    }
    handleClose =()=>{
        this.setState({
            file:null,
            userName:'',
            birthDate:'',
            gender:'',
            job:'',
            fileName:'',
            open:false
        });
    }

    addCustomer = () =>{
        const url = '/api/customers'; ///api/customers Url에 폼데이터를 생성하여 전송한다. 
        const formData = new FormData();
        formData.append('image',this.state.file); //file의 내용을 image 태그에 추가하고
        formData.append('name',this.state.userName);      
        formData.append('birthDate',this.state.birthDate); 
        formData.append('gender',this.state.gender); 
        formData.append('job',this.state.job); 
        /* 파일 전송시에는 표준에 맞는 헤더를 포함해야 한다.  */
        const config = {
            headers:{
                'content-type':'multipart/form-data'
            }
        }
        return axios.post(url,formData,config);
    }

    handleFormSubmit=(event)=>{
        event.preventDefault() //폼 제출시 기본동작(페이지 세로고침)을 막는다.
        this.addCustomer()
            .then((response) => {
                //응답이 온 경우 console에 출력한다.
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            file:null,
            userName : '',
            birthDate : '',
            job : '',
            fileName: '', //전송 후 state를 초기화 한다.
            open:false
        })
        
    }
    handleFileChange=(event)=>{
        this.setState({
            file:event.target.files[0],
            fileName:event.target.value
        })
    }

    handleValueChange=(event)=>{
        let nextState={};
        nextState[event.target.name]=event.target.value;
        this.setState(nextState);
    }

    render(){
        const {classes} = this.props;
        return(
            <div>
                <Button variant='contained' color='primary' onClick={this.handleClickOpen}>
                    고객추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객추가</DialogTitle>
                    <DialogContent>
                        <input className = {classes.hidden} accept='image/*' id="rasied-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor='rasied-button-file'>
                            <Button variant='contained' color = "primary" component="span" name = "file">
                                {this.state.fileName==="" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label><br/>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label="생년월일" type="text" name="birthDate" value={this.state.birthDate} onChange={this.handleValueChange}/><br/>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color = 'primary' onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant='outlined' color = 'primary' onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>

        )
    }
}

export default withStyles(style)(CustomerAdd);
