import React, {Component} from 'react';
import axios from 'axios';

import {server} from '../../config';

class Login extends Component{

    state = {
        email : '',
        password: '',
        loginFailed : false,
        newPasswordSent : false
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

    login = () => {
        if(this.state.email.trim().length == 0) {
            return;
        }
        if(this.state.password.trim().length == 0) {
            return;
        }        
        axios.post(`${server}/login`, {
          email: this.state.email,
          password: this.state.password
        })
        .then((response) => {
          if(response.status === 200){
              this.props.displayApp(response.data.userId, response.data.token);
          }
        })
        .catch((error) => {
            if(!error.response.data.auth){
                this.setState({
                    loginFailed : true
                })
            }
          console.log(error);
        });
        
    }

    resetLoginFailed = () => {
        this.setState({
            loginFailed: false
        })
    }
    resetNewPasswordSent = () => {
        this.setState({
            newPasswordSent: false
        })
    }

    sendNewPassword = () => {
        this.resetLoginFailed(); 
        axios.post(`${server}/login/newPassword`, {
            email: this.state.email
          })
          .then((response) => {
            if(response.status === 200){
                this.setState({
                    newPasswordSent : true
                })
            }
          })
          .catch((error) => {
              if(!error.response.data.auth){
                  console.log('Could not find email');
              }
            console.log(error);
          });       
    }

    loginFailedMessageMarkup = () => {
        return (
            <div className="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.resetLoginFailed}>
                <span aria-hidden="true">×</span>
                </button>                
                <h4 className="alert-heading">Sorry! Your Login Failed.</h4>

                <a href="#!" className="alert-link" onClick={this.sendNewPassword}><u>We can send you a fresh password at the above email.</u></a>
            </div>               
        )
    }
    newPasswordSentMarkup = () => {
        return (
            <div className="alert alert-secondary alert-dismissible fade show mt-2" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.resetNewPasswordSent}>
                <span aria-hidden="true">×</span>
                </button>                
                <h4 className="alert-heading">New Password Sent!</h4>
                <p>
                    Remember to change it on your next login!
                </p>
            </div>               
        )
    }    

    render(){
        let loginStatusMarkup = '';
        if(this.state.loginFailed){
            loginStatusMarkup = this.loginFailedMessageMarkup();
        } else if(this.state.newPasswordSent){
            loginStatusMarkup = this.newPasswordSentMarkup();
        }
        return(
            <main role="main" className="inner  mt-3">
            <h1 className=" text-white">WELCOME</h1>
            {/* <p className="lead mt-3 text-white">Bid for drinks at the coolest Bars.</p> */}
            {/* <p className="lead mt-3 text-white"></p> */}
            <div className="lead">
            <form className="form-signin mt-3">
              <input onChange={this.updateEmail} value={this.state.email} type="email" id="inputEmail" className="form-control mt-2" placeholder="Email address" required autoFocus/>
              <input onChange={this.updatePassword} value={this.state.password} type="password" id="inputPassword" className="form-control mt-3" placeholder="Password" required/>
              <button type="button" className="btn btn-primary mt-3 btn-lg " onClick={this.login}>
                Login
              </button>
              {loginStatusMarkup}
              <p className="mt-1"><a href="#" className="text-primary" onClick={this.props.displayRegistration}>Sign Up</a></p>
            </form>
            </div>
          </main>
        );
    }
}

export default Login;