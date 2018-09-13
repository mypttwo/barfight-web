import React, { Component } from "react";
import axios from 'axios';

import {server} from '../../config';
import Registration from '../Registration/registration';
import Login from '../Login/login';
import AdminLogin from '../AdminLogin/adminlogin';
import BarAdminLogin from '../BarAdminLogin/baradminlogin';
import HomePageAuctionList from '../HomePageAuctionList/auctionList';

import d from '../../utils/dictionary';


class HomePage extends Component {
  HOME = 1;
  RULES = 2;
  BARLOGIN = 3;
  REGISTRATION = 4;
  ADMIN = 5;

  state = {
    display: this.HOME
  };

  displayHome = () => {
    this.setState({
      display: this.HOME
    });
  };

  displayRules = () => {
    this.setState({
      display: this.RULES
    });
  };

  displayBarLogin = () => {
    this.setState({
      display: this.BARLOGIN
    });
  };

  displayRegistration = () => {
    this.setState({
      display: this.REGISTRATION
    });
  };  

  displayAdmin = () => {
    this.setState({
      display: this.ADMIN
    });
  };

  display = () => {
    switch (this.state.display) {
      case this.HOME:
        return this.loginContent();
      case this.RULES:
        return this.rulesContent();
      case this.BARLOGIN:
        return this.barAdminLoginContent();
      case this.REGISTRATION:
        return this.registrationContent();        
      case this.ADMIN:
        return this.adminLoginContent();          
      default:
        return this.loginContent();
    }
  };

  loginContent = () => {
    return <Login displayRegistration={this.displayRegistration} displayApp={this.props.displayApp}/>  ;
  };

  rulesContent = () => {
    return (
      <main role="main" className="inner mt-3 text-left">
        <h3 className="text-center text-white">Rules</h3>
      </main>
    );
  };



  registrationContent = () => {
    return (<Registration displayHome={this.displayHome}/>      
    );
  } 
  
  adminLoginContent = () => {
    return <AdminLogin displayAdminZone={this.props.displayAdminZone}/>;
  } 

  barAdminLoginContent = () => {
    return <BarAdminLogin displayBarAdminZone={this.props.displayBarAdminZone} displayAdmin={this.displayAdmin}/>; 
  }

  getRecentContent = () => {
    return (
      <HomePageAuctionList />     
    );
  }

  render() {
    let style = {
      "backgroundImage" : "url('/images/c6.jpg')"
    }
    return (
      <div className="pb-5" style={style}>
        <div className="text-center">
          <div className="container d-flex h-100 p-3 mx-auto flex-column">
            <header className="mb-auto">
              <div className="inner">
                {/* <h3 className=" text-white">{d.appTitle}</h3> */}
                <nav className="nav justify-content-center">
                  <a className="nav-link active" href="#" onClick={this.displayHome}>
                    Home
                  </a>
                  <a className="nav-link" href="#" onClick={this.displayBarLogin}>
                    Partners
                  </a>
                </nav>
              </div>
              <img className="img-fluid" src="images/l1.png" />
            </header>
            {this.display()}
          </div>
        </div>
        <div className="container">
        {this.getRecentContent()}          
        </div>
        <footer className="footer">
          <div className="container text-center">
            <nav className="nav justify-content-center">
              <a className="nav-link small" href="#" onClick={this.displayRules}>
                Terms and Conditions
              </a>
            </nav>
          </div>
        </footer>
      </div>
    );
  }
}

export default HomePage;
