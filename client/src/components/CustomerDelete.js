import React from 'react'

class CustomerDelete extends React.Component{

    deleteCustomer(id){
        /* id가 들어 오면 삭제를 진행하는 함수 */
        const url = '/api/customers/'+id;
        fetch(url,{
            method:'DELETE'
        }); //DELETE 메서드로 해당 id 호출
        this.props.stateRefresh(); //화면 갱신
    }
    render(){
        return(
            <button onClick={(e)=>{this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }
}

export default CustomerDelete;