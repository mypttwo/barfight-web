import React, {Component} from 'react';
import axios from 'axios';
import Datetime from 'react-datetime';
import moment from 'moment';


import {server} from '../../config';

class NewAuction extends Component{

    state = {
        name : '', 
        startBid : '',
        bidStep: '',
        prize : '',
        bar : '', 
        start : new Date().toISOString(),
        end : new Date().toISOString(),         
        validation : ''
    }

    save = () => {
        let headers = {
            'Content-Type': 'application/json',
            'x-access-token': this.props.token
        }
        axios.post(`${server}/createauction`, {
            barAdminId:this.props.barAdminId,
            name: this.state.name,
            startBid: this.state.startBid,
            bidStep: this.state.bidStep,
            prize: this.state.prize,
            bar: this.state.bar,
            start: this.state.start,
            end: this.state.end            
          }, headers)
          .then((response) => {
            if(response.status === 200){
                this.props.displayAllAuctions();
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
                <p className='lead'>New Auction</p>
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
                  <Datetime onChange={this.updateStart}/>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputEnd">End</label>
                  <Datetime onChange={this.updateEnd} />  
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
              <button type="button" className="btn btn-primary" onClick={this.save}>Save</button>
            </form>
            </div>
          );
    }
}

export default NewAuction;