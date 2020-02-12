import React, { Component } from "react";

import Registration from '../Registration/registration';
import Login from '../Login/login';
import AdminLogin from '../AdminLogin/adminlogin';
import BarAdminLogin from '../BarAdminLogin/baradminlogin';
import HomePageAuctionList from '../HomePageAuctionList/auctionList';

import Navbar from "../Navbar/navbar";




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
    return <HomePageAuctionList/>;
  }

  render(){

    return (
      <React.Fragment>
        <div>
          <Navbar 
          displayHome={this.displayHome}
          displayBarLogin={this.displayBarLogin}/>
          {this.display()}
          {this.getRecentContent()} 
        </div>
      </React.Fragment>      
    )
  }
}

export default HomePage ;
