import React, { Component } from "react";
import axios from 'axios';

import {server} from '../../config';

class Registration extends Component{

    state = {
        name : '', 
        email : '',
        password: '',
        confirmPassword : '',
        validation : ''
    }

    register = () => {
        if(this.state.password !== this.state.confirmPassword){
            this.setState({
                validation : 'Passwords dont match!'
            });
            return;
        } else {
            this.setState({
                validation : ''
            });  
        }
        
        axios.post(`${server}/register`, {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
        .then((response) => {
          if(response.status === 200){
              this.props.displayHome();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    updateName = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    updateEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    updatePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    } 

    updateConfirmPassword = (event) => {
        this.setState({
            confirmPassword: event.target.value
        })
    }
    

    render(){
        return (
            <form className="form-signin">
            <h1 className="text-white">REGISTRATION</h1>
            <input onChange={this.updateName} value={this.state.name} type="input" id="inputName" className="form-control mt-4" placeholder="Name" required autoFocus/>            
            <input onChange={this.updateEmail} value={this.state.email} type="email" id="inputEmail" className="form-control mt-2" placeholder="Email address" required />
            <input onChange={this.updatePassword} value={this.state.password} type="password" id="inputPassword" className="form-control mt-2" placeholder="Password" required/>
            <input onChange={this.updateConfirmPassword} value={this.state.confirmPassword} type="password" id="inputPasswordConfirm" className="form-control mt-2" placeholder="Confirm Password" required/>
            <div className="text-danger" role="alert">{this.state.validation}</div>
            <button className="btn btn-primary mt-2 btn-lg mt-3" onClick={this.register}>
              Submit
            </button>
          </form>      
          );
    }

}

export default Registration;
 