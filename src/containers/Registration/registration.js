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
            <div className="container pt-5 pb-3">
            <h2>Sign up</h2>
            <form>
            <div className="form-group mt-4">
            <label htmlFor="inputEmail">Email address</label>
            <input onChange={this.updateEmail} value={this.state.email} type="email" id="inputEmail" className="form-control" placeholder="Email address" required />
            </div>

            <div className="form-group">
            <label htmlFor="inputName">Name</label>
            <input onChange={this.updateName} value={this.state.name} type="input" id="inputName" className="form-control" placeholder="Name" required autoFocus/>            
            </div>
            
            <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input onChange={this.updatePassword} value={this.state.password} type="password" id="inputPassword" className="form-control" placeholder="Password" required/>            
            </div>
            
            <div className="form-group">
            <label htmlFor="inputPasswordConfirm">Confirm Password</label>
            <input onChange={this.updateConfirmPassword} value={this.state.confirmPassword} type="password" id="inputPasswordConfirm" className="form-control" placeholder="Confirm Password" required/>
            </div>
            
            <div className="text-danger" role="alert">{this.state.validation}</div>
            <button className="btn btn-primary btn-lg" onClick={this.register}>
              Submit
            </button>
          </form>    
          </div>  
          );
    }

}

export default Registration;
 