import React, { Component } from "react";

import NewBar from '../NewBar/newBar';
import BarAdminList from '../BarAdminList/barAdminList';

import d from '../../utils/dictionary';

class AdminPage extends Component {
  displayHome = () => {
    this.props.displayHome();
  };

  ALL_BAR_ADMINS = 1;
  NEW_BAR_ADMIN = 2;

  state = {
    display : this.ALL_BAR_ADMINS,
  }

  displayAllBarAdmins = () => {
    this.setState({
      display : this.ALL_BAR_ADMINS
    })
  }

  displayNewBarAdmin = () => {
    this.setState({
      display : this.NEW_BAR_ADMIN
    })
  }

  allBarAdminsContent = () => {
    return <BarAdminList />;
  }

  allBarAdminsContent_ = () => {
    return (
          <div className="list-group">
            <div className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Ashish Kothare</h5>
                  <small>9845012345</small>
                </div>
                <p className="mb-1">Legends of Rock, Koramangala</p>
                <small>ashish@lor.com</small>
                <div className="mt-3">
                  <ul className="nav nav-pills nav-fill">
                      <li className="nav-item">
                        <button type="button" className="btn btn-primary btn-sm">Edit</button>
                      </li>
                      <li className="nav-item">
                        <button type="button" className="btn btn-secondary btn-sm ml-3">Auctions</button>
                      </li>
                  </ul>
                </div>
            </div>
          </div>
    );
  }

  newBarAdminContent = () => {
    return <NewBar displayAllBarAdmins={this.displayAllBarAdmins}/>
  } 

  display = () => {
    switch (this.state.display) {
      case this.NEW_BAR_ADMIN:
      return this.newBarAdminContent();
      default:
      return this.allBarAdminsContent();
    }
  }

  getNavBar = () => {
    return (
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="#">{d.appTitle}</a>
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
              <a className="nav-link" href="#" onClick={this.displayAllBarAdmins}>All Bar Admins</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={this.displayNewBarAdmin}>New Bar Admin</a>
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
    return (
      <div>
        {this.getNavBar()}
        <div className="container mt-3">{this.display()}</div>
      </div>
    );
  }
}

export default AdminPage;
