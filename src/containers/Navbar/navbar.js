import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {appName} from '../../config';


class Navbar extends Component {

    getNavbarEntries = () => {      
        // if(this.context.authToken){
        //   return(
        //     <React.Fragment>
        //     <ul className="navbar-nav">
        //     <li className="nav-item">
        //       <a className={this.getClassName(this.ABOUT)} >About</a>
        //     </li>
        //     <li className="nav-item">
        //       <a className={this.getClassName(this.CONTACT)} >Contact</a>
        //     </li>
        //     <li className="nav-item dropdown">
        //   <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //     Theme
        //   </a>
        //   <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        //     {this.getThemesJSX()}
        //     <div className="dropdown-divider"></div>
        //     <a className="dropdown-item" href="#">Suggest...</a>
        //   </div>
        // </li>          
        //    </ul>      
        //     <ul className="nav navbar-nav ml-auto">
        //     <li className="nav-item">
        //       <a onClick={this.onClickDashboard} className={this.getClassName(this.DASHBOARD)} >Dashboard</a>
        //     </li>
        //     <li className="nav-item">
        //       <a onClick={this.onClickLive} className={this.getClassName(this.LIVE)} >Live</a>
        //     </li>
        //     <li className="nav-item">
        //       <a onClick={this.onClickSettings} className={this.getClassName(this.SETTINGS)} >Settings</a>
        //     </li>  
        //     <li className="nav-item">
        //           <a className="nav-link"  onClick={this.props.onClickLogout}><span className="fas fa-user"></span> Logout</a>
        //     </li>                 
        //   </ul> 
        //   </React.Fragment>
        //   )
        // } else {
          return (
              <React.Fragment>
              <ul className="navbar-nav">
              <li className="nav-item">
              <a className="nav-link" href="#" onClick={this.props.displayBarLogin}>Partners</a>
              </li>
              {/* <li className="nav-item">
                <a className={this.getClassName(this.CONTACT)} >Contact</a>
              </li> */}
             </ul>      
               
            </React.Fragment>              
          )
        // }
      }    
    
    render(){
        return (
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#" onClick={this.props.displayHome} >{appName}</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navb" className="navbar-collapse collapse hide">
                {this.getNavbarEntries()}
                </div>
            </nav>       
        )
    }
}

export default Navbar;