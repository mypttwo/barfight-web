import React, {Component} from 'react';
import axios from 'axios';

import {server} from '../../config';

class NewBar extends Component{

    state = {
        name : '', 
        email : '',
        password: '',
        phone : '',
        bar : '', 
        validation : ''
    }

    save = () => {
        axios.post(`${server}/registerBarAdmin`, {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            bar: this.state.bar,
          })
          .then((response) => {
            if(response.status === 200){
                this.props.displayAllBarAdmins();
            }
          })
          .catch((error) => {
            console.log(error);
          });                
    }

    updateName = (event) => {
        this.setState({
            name : event.target.value
        })
    }

    updatePhone = (event) => {
        this.setState({
            phone : event.target.value
        })
    }
    
    updatePassword = (event) => {
        this.setState({
            password : event.target.value
        })
    }

    updateEmail = (event) => {
        this.setState({
            email : event.target.value
        })
    }

    updateBar = (event) => {
        this.setState({
            bar : event.target.value
        })
    }


    render(){
        return (
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputName">Name</label>
                  <input onChange={this.updateName} value={this.state.name} type="text" className="form-control" id="inputName" placeholder="Name"/>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPhone">Phone</label>
                  <input onChange={this.updatePhone} value={this.state.phone} type="text" className="form-control" id="inputPhone" placeholder="Phone"/>
                </div>
              </div>                
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail">Email</label>
                  <input onChange={this.updateEmail} value={this.state.email}  type="email" className="form-control" id="inputEmail" placeholder="Email"/>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword">Password</label>
                  <input onChange={this.updatePassword} value={this.state.password} type="text" className="form-control" id="inputPassword" placeholder="Password"/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputBarName">Bar</label>
                <input onChange={this.updateBar} value={this.state.bar} type="text" className="form-control" id="inputBarName" placeholder="Bar Name, Locality"/>
              </div>
              <button type="button" className="btn btn-primary" onClick={this.save}>Save</button>
            </form>
          );
    }
}

export default NewBar;