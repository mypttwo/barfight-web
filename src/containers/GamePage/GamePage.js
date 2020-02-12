import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import io from "socket.io-client";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { server } from "../../config";
import d from "../../utils/dictionary";
import MySettings from "../MySettings/mySettings";
import {appName} from '../../config';
import withBidsFeedContext from "../../hocs/withBidsFeedContext";
import getAuctionRows from "../../components/auctionListRows";

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
    this.socket = io(server);
    this.socket.on('bidsUpdate', (updates) => {
      console.log(updates);
      this.loadAllAuctions();         
  });
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
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
          <Link className="navbar-brand" to="/" >{appName}</Link>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navb" className="navbar-collapse collapse hide">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={this.displayMySettings}>
                  My Settings
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={this.displayRecent}>
                  Recent / Upcoming Auctions
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={this.displayLive}>
                  Live Auctions
                </a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
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
  )
  }
 
  socket = null;
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
      if(this.state.bidStatus == 200){
        this.socket = io(server);
        this.socket.emit('update');
      }
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
    let markup = getAuctionRows(auctionList, 3, this.bid);
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
        title = 'Recent / Upcoming Auctions'
        break;
      case this.RECENT:
        title = 'Live Auctions'
        break;  
      case this.MYSETTINGS:
        title = 'Settings'
        break;          
      default:
       title = 'Live Auctions'
        break;
    }
    return (
      <React.Fragment>
        {this.getNavBar()}
        <div className="container mt-3">
        <h2>{title}</h2>
          {this.display()} 
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.getModalHeader()}</ModalHeader>
          <ModalBody>{this.getModalMessage()}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>OK</Button>{' '}
          </ModalFooter>
        </Modal>        
      </React.Fragment>
    );
  }
}

export default withBidsFeedContext(GamePage);
