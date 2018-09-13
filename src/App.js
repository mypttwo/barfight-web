import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import GamePage from './containers/GamePage/GamePage';
import HomePage from './containers/HomePage/HomePage';
import AdminPage from './containers/AdminPage/AdminPage';
import BarAdminPage from './containers/BarAdminPage/BarAdminPage';

import d from './utils/dictionary';

class App extends Component {
  HOME = 1;
  APP = 2;
  ADMIN = 3;
  BARADMIN = 4;

  state = {
    display : this.HOME,
    userId : '',
    barAdminId : '',
    token : ''
  }
  
  displayApp = (userId, token) =>{
    this.setState({
      display : this.APP,
      userId : userId,
      token : token
    })
  }

  displayHome = () =>{
    this.setState({
      display : this.HOME
    })
  }

  displayAdminZone = () =>{
    this.setState({
      display : this.ADMIN
    })
  }

  displayBarAdminZone = (barAdminId, token) =>{
    this.setState({
      display : this.BARADMIN,
      barAdminId : barAdminId,
      token : token
    })
  }

  loadPage = () => {

    switch (this.state.display) {
      case this.APP:
      return <GamePage token={this.state.token} userId={this.state.userId} displayHome={this.displayHome}/>  
      case this.ADMIN:
      return <AdminPage displayHome={this.displayHome}/> 
      case this.BARADMIN:
      return <BarAdminPage token={this.state.token} barAdminId={this.state.barAdminId} displayHome={this.displayHome}/>                
      default:
      return <HomePage displayApp={this.displayApp} displayAdminZone={this.displayAdminZone} displayBarAdminZone={this.displayBarAdminZone}/>
    }
  }

  verify = ({ match }) => {
    return(
      <div>Havent decided how to verify as yet :{match.params.id}</div>
    );
  }

  render() {
    return (
      <div className="App">
         <Router>
           <Switch>
             <Route exact path='/' component={this.loadPage} />
             <Route exact path='/verify/:id' component={this.verify} />
           </Switch>
         </Router>      
      </div>
    );
  }
}

export default App;
