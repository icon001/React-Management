import React from 'react';
import axios from 'axios';

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file:null,
            userName:'',
            birthDate:'',
            gender:'',
            job:'',
            fileName:''
        }
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
            fileName: '' //전송 후 state를 초기화 한다.
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
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객추가</h1>
                {/*input 태그를 이용하여 파일을 입력 받는다.  
                   <file은 file 내용(binary) value는 파일명, 변경시 handleFileChange 가 실행된다.  
                */}
                프로필이미지:<input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                {/* 내용이 변경되면 handleValueChange가 실행된다. */}
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일: <input type="text" name="birthDate" value={this.state.birthDate} onChange={this.handleValueChange}/><br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                {/* 추가하기 버튼 클릭시 handleFormSubmit 이 실행된다.*/}
                <button type = "submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;
