import React, { Component } from "react";
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import {server} from '../../config';

class MySettings extends Component{

    state = {
        name : '', 
        email : '',
        password: '',
        confirmPassword : '',
        validation : '',
        modal: false 
    }

    updateSuccessful = true;
    modalMessageSuccess = 'Your settings have been updated!';
    modalHeaderSuccess = 'Success';
    modalMessageSuccess = 'Your settings have been updated!';
    modalHeaderFailure = 'Sorry!';
    modalMessageFailure = 'Something went wrong :(. Contact our customer support if you have a problem logging in.';

    getModalMessage = () => {
        if(this.updateSuccessful){
            return this.modalMessageSuccess;
        }
        return this.modalMessageFailure;
    }
    getModalHeader = () => {
        if(this.updateSuccessful){
            return this.modalHeaderSuccess;
        }
        return this.modalHeaderFailure;
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }

    componentDidMount(){
        let headers = {
            'Content-Type': 'application/json',
            'x-access-token': this.props.token
        }
        axios
        .get(`${server}/${this.props.route}/${this.props.userId}`, {headers})
        .then(data => {
          this.setState({
            name : data.data.name,
            email : data.data.email
          });
        })
        .catch(error => {
          console.log(`Could not retrieve User ${error}`);
        });
    }

    save = () => {
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

        let headers = {
            'Content-Type': 'application/json',
            'x-access-token': this.props.token
        }
        
        axios.put(`${server}/${this.props.route}/${this.props.userId}`, {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }, {headers})
        .then((response) => {
          if(response.status === 200){
              this.updateSuccessful = true;
              this.toggle();
          }
        })
        .catch((error) => {
            this.updateSuccessful = false;
            this.toggle();
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
            <div>
                <p className='lead'>My Settings</p>                
            <form>
            <input onChange={this.updateName} value={this.state.name} type="input" id="inputName" className="form-control mt-4" placeholder="Name" required autoFocus/>            
            <input onChange={this.updateEmail} value={this.state.email} type="email" id="inputEmail" className="form-control mt-2" placeholder="Email address" required />
            <input onChange={this.updatePassword} value={this.state.password} type="password" id="inputPassword" className="form-control mt-2" placeholder="Password" required/>
            <input onChange={this.updateConfirmPassword} value={this.state.confirmPassword} type="password" id="inputPasswordConfirm" className="form-control mt-2" placeholder="Confirm Password" required/>
            <div className="text-danger" role="alert">{this.state.validation}</div>
            <button className="btn btn-primary mt-2 btn-lg mt-3" onClick={this.save}>
              Submit
            </button>
          </form>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.getModalHeader()}</ModalHeader>
          <ModalBody>{this.getModalMessage()}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>OK</Button>{' '}
          </ModalFooter>
        </Modal>
          </div>      
          );
    }

}

export default MySettings;
 