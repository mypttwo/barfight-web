import React, {Component} from 'react';
import axios from 'axios';

import {server} from '../../config';

class BarAdminList extends Component{
    state = {
        barAdminList : []
    }

    componentDidMount(){
        axios.get(`${server}/barAdmins`)
        .then((data) => {
            this.setState({
                barAdminList : data.data
            });
        })
        .catch((error) => {
            console.log(`Could not retrieve BarAdmins ${error}`);
        })
    }

    render() {
        let listMarkup = this.state.barAdminList.map((barAdmin) => {
            return (
                <div className="list-group-item list-group-item-action flex-column align-items-start" key={barAdmin._id}>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{barAdmin.name}</h5>
                  <small>{barAdmin.phone}</small>
                </div>
                <p className="mb-1">{barAdmin.bar}</p>
                <small>{barAdmin.email}</small>
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
            );
        })
        return (<div className="list-group">{listMarkup}</div>);
    }
}

export default BarAdminList;