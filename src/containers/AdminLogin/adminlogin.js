import React, {Component} from 'react';
import axios from 'axios';

import {server} from '../../config';

class AdminLogin extends Component{

    state = {
        email : '',
        password: '',
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
        console.log(`${server}/adminlogin`);
        
        axios.post(`${server}/adminlogin`, {
          email: this.state.email,
          password: this.state.password
        })
        .then((response) => {
            console.log(response);
          if(response.status === 200){
              this.props.displayAdminZone();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    render(){
        return(
            <main role="main" className="inner  mt-3">
            <h1 className="text-white">ADMIN</h1>
            <div className="lead">
            <form className="form-signin">
              <input onChange={this.updateEmail} value={this.state.email} type="email" id="inputEmail" className="form-control mt-2" placeholder="Email address" required autoFocus/>
              <input onChange={this.updatePassword} value={this.state.password} type="password" id="inputPassword" className="form-control mt-2" placeholder="Password" required/>
              <button type="button" className="btn btn-primary mt-3 btn-lg " onClick={this.login}>
                Login
              </button>
            </form>
            </div>
          </main>
        );
    }
}

export default AdminLogin;