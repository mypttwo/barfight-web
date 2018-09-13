import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { server } from "../../config";
import d from "../../utils/dictionary";
import MySettings from "../MySettings/mySettings";

class GamePage extends Component {
  displayHome = () => {
    this.props.displayHome();
  };

  RECENT = 1;
  LIVE = 2;
  MYSETTINGS = 3;

  displayLive = () => {
    this.setState({
      display : this.LIVE,
    })
  }

  displayRecent = () => {
    this.setState({
      display : this.RECENT
    })
  }

  displayMySettings = () => {
    this.setState({
      display : this.MYSETTINGS
    })    
  }

  display = () => {
    switch (this.state.display) {
      case this.RECENT:
      return this.renderRecentAuctionList();
      case this.MYSETTINGS:
      return this.renderMySettings();      
      default:
      return this.renderLiveAuctionList();
    }
  }

  state = {
    auctionList: [],
    display : this.LIVE,
    modal : false,
    bidStatus : 200
  };

  getModalMessage = () => {
    switch (this.state.bidStatus) {
      case 200:
        return 'Your bid has been placed! Good Luck!';
      case 420:
        return 'Looks like someone has bid higher in the meanwhile. Please refresh and try again.'
      case 421:
        return 'Sorry, your bid failed. It looks like the auction has ended!'    
      default:
      return 'Sorry, your bid failed. Something went wrong :('
    }
  }
  getModalHeader = () => {
    switch (this.state.bidStatus) {
      case 200:
        return 'Keep your fingers crossed!';
      case 420:
        return 'Uh oh :('
      case 421:
        return 'Uh oh :('    
      default:
      return 'Uh oh :('
    }
  }

  toggle = () => {
      this.setState({
        modal: !this.state.modal
      });
    }

  componentDidMount() {
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

  getNavBar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        
          <img src="images/l11.png" />
        
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="#" onClick={this.displayMySettings}>
                My Settings
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#" onClick={this.displayRecent}>
                Recent Auctions
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#" onClick={this.displayLive}>
                Live Auctions
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            {/* <input className="form-control mr-sm-2" placeholder="Search" type="text" /> */}
            <button
              className="btn btn-danger my-2 my-sm-0"
              type="button"
              onClick={this.displayHome}
            >
              Exit
            </button>
          </form>
        </div>
      </nav>
    );
  };

  bid = (auctionId,currentBidVal) => {
    let headers = {
      "Content-Type": "application/json",
      "x-access-token": this.props.token
    };

    let params = {
      id: this.props.userId
    };

    let config = { headers, params };    

    axios.post(`${server}/bids`, {
      userId:this.props.userId,
      auctionId: auctionId,
      value: currentBidVal     
    }, config)
    .then((response) => {
      this.setState({
        bidStatus : response.status
      });
      this.toggle();        
      this.loadAllAuctions();
    })
    .catch((error) => {
      this.setState({
        bidStatus : error.response.status
      });
      this.toggle();        
      this.loadAllAuctions();
    }); 
  }

  renderLiveAuctionList = () => {
    let liveAuctions = this.state.auctionList.filter((auction) => {
      return auction.isLive
    });
   
    return <div className="card-deck">{this.renderAuctionList(liveAuctions)}</div>
  }

  renderRecentAuctionList = () => {
    let recentAuctions = this.state.auctionList.filter((auction) => {
      return !auction.isLive
    });
    
    return <div className="card-deck">{this.renderAuctionList(recentAuctions)}</div>
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
      
      let currentBidVal = auction.currentBid + auction.bidStep;
      let bidLabel = "Winning Bid";
      let action = '';
      let now = new Date();
      if(now > new Date(auction.start) && now < new Date(auction.end)){
      //if(true) {  
        bidLabel = "Current Bid";
        action = (
          <button type="button" onClick={()=>this.bid(auction._id, currentBidVal)} className="btn btn-outline-primary btn-sm">Bid Rs {currentBidVal}</button>
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
        <h5 className="card-title">{auction.prize}</h5>
        <p><small className="text-muted">Start : {start}</small></p>
        <p><small className="text-muted">End : {end}</small></p>
        <p><small className="text-muted">Start Bid : Rs {auction.startBid},Step : Rs {auction.bidStep}</small></p>
        <p className="card-text">{bidLabel} : Rs {auction.currentBid}</p>
        {action}
      </div>
    </div>);
    })
    return markup;
  }

  renderMySettings = () => {
    return (
      <div>
        <MySettings token={this.props.token} userId={this.props.userId} route='users' />
      </div>
    )
  }

  render() {
    let title = '';
    switch (this.state.display) {
      case this.RECENT:
        title = 'Recent Auctions'
        break;
      case this.RECENT:
        title = 'Live Auctions'
        break;  
      case this.MYSETTINGS:
        title = ''
        break;          
      default:
       title = 'Live Auctions'
        break;
    }
    return (
      <div>
        {this.getNavBar()}
        <div className="container mt-3">
        <p className='lead'>{title}</p>
          {this.display()} 
        </div>
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

export default GamePage;
