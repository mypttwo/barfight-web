import React, { Component } from 'react';
import moment from 'moment';
import axios from "axios";

import { server } from "../../config";

class HomePageAuctionList extends Component{
    state = {
        auctionList : []
    }
    componentDidMount(){
        this.loadAllAuctions();
    }
    loadAllAuctions = () => {
        axios
          .get(`${server}/auctions/all`)
          .then(data => {
            this.setState({
              auctionList: data.data
            });
          })
          .catch(error => {
            console.log(`Could not retrieve Auctions ${error}`);
          });
      }
    render(){
        let markup = this.state.auctionList.reverse().map((auction) => {
            let liveBadge = '';
            let lastBidDetail = (<p className="card-text text-warning">Winning Bid : {auction.currentBid}</p>)
            if(auction.isLive){
                liveBadge = (<span className="badge badge-danger ml-3">Live</span>)
            }
            if(auction.isLive){
                lastBidDetail = (<p className="card-text text-danger">Current Bid : {auction.currentBid}</p>)
            } 
            let now = new Date();
            if(now < new Date(auction.start)){
                lastBidDetail = (<p className="card-text text-danger">Current Bid : {auction.currentBid}</p>)
            }           
            let start = '';
            if(auction.start){
                start = moment(auction.start).format('dddd DD/MM/YYYY h:mm A');
            }
            let end = '';
            if(auction.start){
                end = moment(auction.end).format('dddd DD/MM/YYYY h:mm A');
            }            
            return (
                <div class="col-sm-6 col-md-4 col-lg-3" key={auction._id}>
                <div className="card mb-4 text-center bg-dark text-white" key={auction._id}>
                <div className="card-header">{auction.bar}</div>
                  <img className="card-img-top" src="/images/c1.jpg" alt="Card image cap"/>
                  <div className="card-body">
                    <h5 className="card-title">{auction.name} {liveBadge}</h5>
                    <p className="card-text">{auction.prize}</p>
                    {lastBidDetail}
                  </div>
                  <div className="card-footer">
                    <div><small className="text-muted">Start : {start}</small></div>
                    <div><small className="text-muted">End : {end}</small></div>
                  </div>
                </div>
                </div>                
            );
        });
        return (
            <div className="card-deck">
            {markup}
            </div>      
                );
    }
}

export default HomePageAuctionList;