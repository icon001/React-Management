import React from "react";

class Customer extends React.Component{
    render(){
        
        return (
            <div>
                <CustomerProfile
                    id = {this.props.id}
                    image={this.props.image}
                    name={this.props.name}
                />
                <CustomerInfo
                    birthDate = {this.props.birthDate}
                    gender={this.props.gender}
                    job={this.props.job}
                />
            </div>
        );
    }
}

class CustomerProfile  extends React.Component{
    render(){
        return (
            <div>
                <img src={this.props.image} alt="profile"/>
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        );
    }
}

class CustomerInfo  extends React.Component{
    render(){
        const { birthDate, gender, job } = this.props;
        return (
            <div>
                <p>{birthDate}</p>
                <p>{gender}</p>
                <p>{job}</p>
            </div>
        );
    }
}


export default Customer;
