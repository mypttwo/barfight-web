import React, {Component} from 'react';
import axios from 'axios';
import Datetime from 'react-datetime';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


import {server} from '../../config';

class UpdateAuction extends Component{

    state = {
        name : this.props.auction.name, 
        startBid : this.props.auction.startBid,
        bidStep: this.props.auction.bidStep,
        prize : this.props.auction.prize,
        bar : this.props.auction.bar, 
        start : moment(this.props.auction.start),
        end : moment(this.props.auction.end),         
        saveStatus : 200,
        modal : false,
        validation : ''
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }

    getModalMessage = () => {
        switch (this.state.saveStatus) {
          case 200:
            return 'The Auction has been updated.';
          case 420:
            return 'Looks like someone has bid higher in the meanwhile. Please refresh and try again.'
          case 421:
            return 'Sorry, your bid failed. It looks like the auction has ended!'    
          default:
          return 'Sorry. Something went wrong :( . Please try again'
        }
      }
      getModalHeader = () => {
        switch (this.state.saveStatus) {
          case 200:
            return 'Success';
          case 420:
            return 'Uh oh :('
          case 421:
            return 'Uh oh :('    
          default:
          return 'Uh oh :('
        }
      }

    save = () => {
        let headers = {
            'Content-Type': 'application/json',
            'x-access-token': this.props.token
        }
        let params = {
            id : this.props.barAdminId
        };
        let config = {headers,params};  
        axios.put(`${server}/auctions/${this.props.auction._id}`, {
            barAdminId:this.props.barAdminId,
            name: this.state.name,
            startBid: this.state.startBid,
            bidStep: this.state.bidStep,
            prize: this.state.prize,
            bar: this.state.bar,
            start: moment(this.state.start),
            end: this.state.end            
          }, config)
          .then((response) => {
            if(response.status === 200){
                this.toggle(); 
            }
          })
          .catch((error) => {
            console.log(error);
            this.setState({
                saveStatus : error.response.status
              });            
            this.toggle();
          });                
    }

    updateName = (event) => {
        this.setState({
            name : event.target.value
        })
    } 

    updateStartBid = (event) => {
        this.setState({
            startBid : event.target.value
        })
    }

    updateBidStep = (event) => {
        this.setState({
            bidStep : event.target.value
        })
    } 

    updatePrize = (event) => {
        this.setState({
            prize : event.target.value
        })
    }
    
    updateStart = (moment) => {
        console.log(moment instanceof Date);
        
        this.setState({
            start : moment
        })
    }

    updateEnd = (moment) => {
        this.setState({
            end : moment
        })
    }

    updateBar = (event) => {
        this.setState({
            bar : event.target.value
        })
    }


    render(){
  
        return (
            <div>
                <p className='lead'>Update Auction</p>
            <form>
              <div className="form-group">
              <label htmlFor="inputName">Name</label>
              <input onChange={this.updateName} value={this.state.name} type="text" className="form-control" id="inputName" placeholder="Name"/>
              </div>                
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputStartBid">StartBid</label>
                  <input onChange={this.updateStartBid} value={this.state.startBid} type="text" className="form-control" id="inputStartBid" placeholder="100"/>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputBidStep">Bid Step</label>
                  <input onChange={this.updateBidStep} value={this.state.bidStep}  type="text" className="form-control" id="inputBidStep" placeholder="10"/>
                </div>                
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputStart">Start</label>
                  <Datetime onChange={this.updateStart} value={this.state.start}/>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputEnd">End</label>
                  <Datetime onChange={this.updateEnd} value={this.state.end}/>  
                </div>                
              </div>                              
              <div className="form-group">
              <label htmlFor="inputPrize">Prize</label>
              <input onChange={this.updatePrize} value={this.state.prize} type="text" className="form-control" id="inputPrize" placeholder="Prize"/>
              </div>              
              <div className="form-group">
                <label htmlFor="inputBarName">Bar</label>
                <input onChange={this.updateBar} value={this.state.bar} type="text" className="form-control" id="inputBarName" placeholder="Bar Name, Locality"/>
              </div>
              <div className="form-row mt-3">
              <button type="button" className="btn btn-primary" onClick={this.save}>Save</button>
              <button type="button" className="btn btn-primary ml-5" onClick={this.props.displayCurrentAuctions}>Close</button>
              </div>               
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

export default UpdateAuction;