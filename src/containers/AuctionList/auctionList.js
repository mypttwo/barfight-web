import React, {Component} from 'react';
import moment from 'moment';
import axios from 'axios';

import {server} from '../../config';
import auctionList from '../HomePageAuctionList/auctionList';
import UpdateAuction from '../UpdateAuction/updateAuction';

class AuctionList extends Component{
    //Update BarAdminPage constants if this changes
    ALL_AUCTIONS = 1;
    CURRENT_AUCTIONS = 3;

    state = {
        auctionList : [],
        bidList : []
    }

    componentDidMount(){
        this.loadAllAuctions();
    }

    loadAllAuctions = () => {
        let headers = {
            'Content-Type': 'application/json',
            'x-access-token': this.props.token
        };
        let params = {
            id : this.props.barAdminId
        };
        
        let config = {headers,params};        
        axios.get(`${server}/auctions`, config)
        .then((data) => {
            this.setState({
                auctionList : data.data
            });
        })
        .catch((error) => {
            console.log(`Could not retrieve Auctions ${error}`);
        })
    }

    call = (auctionId, action) => {
        let headers = {
            'Content-Type': 'application/json',
            'x-access-token': this.props.token
        };
        let params = {
            id : this.props.barAdminId
        };
        let config = {headers,params};        
        axios.post(`${server}/auctions/${action}`,{
            auctionId : auctionId
        },config)
        .then((data) => {
            console.log(data);
            let updatedList = this.state.auctionList;
            if(action ==='fulfill'){
                updatedList = this.state.auctionList.map((auction) => {
                    if(auction._id === data.data._id){
                        auction.isFulfilled = true;
                    }
                    return auction;
                })
            }
            if(action ==='declare'){
                updatedList = this.state.auctionList.map((auction) => {
                    if(auction._id === data.data._id){
                        auction.isDeclared = true;
                    }
                    return auction;
                })
            }
            this.setState({
                auctionList : updatedList
            });
        })
        .catch((error) => {
            console.log(`Could not retrieve Auctions ${error}`);
        })
    }
   
      renderRecentAuctionList = () => {
        let recentAuctions = this.state.auctionList.filter((auction) => {
            switch (this.props.auctionStatus) {
                case this.ALL_AUCTIONS:
                    return true;
                case this.CURRENT_AUCTIONS:
                if(auction.isFulfilled && auction.isDeclared){
                    return false;            
                } else {
                    return true;
                }
                default:
                    return true;
            }
          }); 
          let title = 'Current Auctions'
          if(this.props.auctionStatus === this.ALL_AUCTIONS){
              title = 'All Auctions'
          }                   
        return (
            <div>
            <p className='lead'>{title}</p>
                <div className="card-deck">
                {this.renderAuctionList(recentAuctions)}
                </div>
            </div>
            );
      }

      displayAuctionList = () => {
        this.setState({
            display : this.AUCTION_LIST
        })
      }

      edit = (auctionId) => {
        let auctionList = this.state.auctionList.filter((auction) => {
                if(auction._id === auctionId){    
                return auction;
            }
        });
        if(auctionList.length > 0){
            this.props.setAuction(auctionList[0])
            this.props.displayEditAuction();
          } else {
              console.log(`ERROR : cannot find auction with id ${this.state.auctionId} to edit!`);
          }        
      }

      showBids = (auctionId) => {
          console.log(auctionId);
      }

      renderBids = () => {
          this.state.bidList.map((bid) => {
              return (<li className="list-group-item text-primary">{bid.time} : Rs {bid.value}</li>)
          });
      }

      renderAuctionList = (auctionList) => {
        let markup = auctionList.map((auction) => {
          let start = '';
          if(auction.start){
              start = moment(auction.start).format('dddd DD/MM/YYYY h:mm A');
          }
          let end = '';
          if(auction.start){
              end = moment(auction.end).format('dddd DD/MM/YYYY h:mm A');
          }
          let liveBadge = '';
          if(auction.isLive){
              liveBadge = (<span className="badge badge-danger ml-3">Live</span>)
          }          
          let currentBidVal = auction.currentBid + auction.bidStep;
          let bidLabel = "Winning Bid";
          let edit = "";
          let now = new Date();
          if(now < new Date(auction.start)){
          //if(true) {              
              edit = (
                <li className="nav-item">
                <button type="button" className="btn btn-primary btn-sm" onClick={()=>this.edit(auction._id)}>Edit</button>
              </li>                  
              )
            }
          
          if(now < new Date(auction.end)){
          //if(true) {  
            bidLabel = "Current Bid";
          }
          let fulfilled = '';
          if(!auction.isLive && !auction.isFulfilled){
              if(now > new Date(auction.end)){
                fulfilled = (
                    <li className="nav-item">
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => this.call(auction._id, 'fulfill')}>Fulfill</button>
                    </li> 
                  )
              }
          }
          let declared = '';
          if(!auction.isLive && !auction.isDeclared){
            if(now > new Date(auction.end)){
                declared = (
                    <li className="nav-item">
                      <button type="button" className="btn btn-primary btn-sm" onClick={() => this.call(auction._id, 'declare')}>Declare</button>
                    </li>
                  )
            }
          }
          let showBids = ''
          if(now > new Date(auction.start)){
            showBids = (
                <li className="nav-item">
                  <button type="button" data-toggle="collapse" data-target="#collapseBids" aria-expanded="false" aria-controls="collapseBids" className="btn btn-primary btn-sm" onClick={() => this.showBids(auction._id)}>Show Bids</button>
                </li>
              )
        }                    
         
          return (<div className="card text-center mb-3 bg-dark text-white" key={auction._id}>
          <div className="card-header">{auction.bar}</div>
          <img
            className="card-img-top"
            src="/images/c6.jpg"
            alt={auction.bar}
          />
          <div className="card-body">
            <h5 className="card-title">{auction.prize} {liveBadge}</h5>
            <p><small className="text-muted">Start : {start}</small></p>
            <p><small className="text-muted">End : {end}</small></p>
            <p><small className="text-muted">Start Bid : Rs {auction.startBid},Step : Rs {auction.bidStep}</small></p>
            <p className="card-text">{bidLabel} : Rs {auction.currentBid}</p>
                 <div className="mt-3">
                   <ul className="nav nav-pills nav-fill">
                       {edit} 
                       {declared}                      
                       {fulfilled}
                       {/* {showBids}   */}
                   </ul>
                 </div>
                    <div className="collapse mt-3" id="collapseBids">
                        <ul className="list-group">{this.renderBids()}</ul>
                    </div>                             
          </div>
        </div>);
        })
        return markup;
      }

      display = () => {
        return this.renderRecentAuctionList();
      }

    render() {
        return (<div>{this.display()}</div>);
    }
}

export default AuctionList;