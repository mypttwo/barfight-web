import React, { Component } from "react";
import {Link} from 'react-router-dom';

import NewAuction from '../NewAuction/newAuction';
import AuctionList from '../AuctionList/auctionList';
import MySettings from "../MySettings/mySettings";
import {appName} from '../../config';
import UpdateAuction from '../UpdateAuction/updateAuction';


import d from '../../utils/dictionary';

class AuctionPage extends Component {
  displayHome = () => {
    this.props.displayHome();
  };

  //Update AuctionList constants if this changes
  ALL_AUCTIONS = 1;
  NEW_AUCTION = 2;
  CURRENT_AUCTIONS = 3;
  MYSETTINGS = 4;
  EDIT_AUCTION = 5;

  state = {
    display : this.CURRENT_AUCTIONS,
    auction : null
  }

  displayEditAuction = () => {
    this.setState({
      display : this.EDIT_AUCTION
    })    
  }

  displayMySettings = () => {
    this.setState({
      display : this.MYSETTINGS
    })    
  }


  displayCurrentAuctions = () => {
    this.setState({
      display : this.CURRENT_AUCTIONS
    })
  }

  displayAllAuctions = () => {
    this.setState({
      display : this.ALL_AUCTIONS
    })
  }

  displayNewAuction = () => {
    this.setState({
      display : this.NEW_AUCTION
    })
  }

  setAuction = (auction) => {
    this.setState({
      auction : auction
    })
  }

  allAuctionsContent = () => {
    return <AuctionList barAdminId={this.props.barAdminId} token={this.props.token} auctionStatus={this.ALL_AUCTIONS} displayEditAuction={this.displayEditAuction} setAuction={this.setAuction}/>;
  }

  currentAuctionsContent = () => {
    return <AuctionList barAdminId={this.props.barAdminId} token={this.props.token} auctionStatus={this.CURRENT_AUCTIONS}  displayEditAuction={this.displayEditAuction} setAuction={this.setAuction}/>;
  }

  newAuctionContent = () => {
    return <NewAuction barAdminId={this.props.barAdminId} token={this.props.token} displayAllAuctions={this.displayAllAuctions}/>
  } 

  renderMySettings = () => {
    return (
      <div>
        <MySettings token={this.props.token} userId={this.props.barAdminId} route="barAdmins" />
      </div>
    )
  }

  renderEditAuction = () => {
    return (
      <div>
        <UpdateAuction token={this.props.token} userId={this.props.barAdminId} auction={this.state.auction} displayCurrentAuctions={this.displayCurrentAuctions}/>
      </div>
    )
  }

  display = () => {
    switch (this.state.display) {
      case this.NEW_AUCTION:
      return this.newAuctionContent();
      case this.CURRENT_AUCTIONS:
      return this.currentAuctionsContent(); 
      case this.MYSETTINGS:
      return this.renderMySettings();  
      case this.EDIT_AUCTION:
      return this.renderEditAuction();        
      default:
      return this.allAuctionsContent();
    }
  }

  getNavBar = () => {
    return (
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
        <Link className="navbar-brand" to="/" >{appName}</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item">
              <a className="nav-link" href="#" onClick={this.displayMySettings}>MySettings</a>
            </li>          
          <li className="nav-item">
              <a className="nav-link" href="#" onClick={this.displayCurrentAuctions}>Current Auctions</a>
            </li>          
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={this.displayAllAuctions}>All Auctions</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={this.displayNewAuction}>New Auction</a>
            </li>            
          </ul>
          <form className="form-inline my-2 my-lg-0">
            {/* <input className="form-control mr-sm-2" placeholder="Search" type="text" /> */}
            <button
              className="btn btn-info my-2 my-sm-0"
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

  render() {
    let title = '';
    switch (this.state.display) {
      case this.NEW_AUCTION:
        title = 'New Auction'
        break;
      case this.CURRENT_AUCTIONS:
        title = 'Current Auctions'
        break;  
      case this.MYSETTINGS:
        title = 'Settings'
        break; 
      case this.ALL_AUCTIONS:
        title = 'All Auctions'
        break;          
      case this.EDIT_AUCTION:
          title = 'Edit Auction'
          break;                 
      default:
       title = 'All Auctions'
        break;
    }    
    return (
      <React.Fragment>
        {this.getNavBar()}
        <div className="container mt-3">
        <h2>{title}</h2>
          {this.display()}
        </div>
      </React.Fragment>
    );
  }
}

export default AuctionPage;
