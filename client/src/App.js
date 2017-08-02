import React, { Component } from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { fetchUser } from './actions/actions';
import ProfilePage from './components/ProfilePage/profilePage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SideBar from './components/SideBar';


import CreateLobby from './components/createLobby';

import Lobby from './components/Lobby/Lobby';

import GameSelect from './components/Main/GameSelect';
import PlatformSelect from './components/Main/PlatformSelect';
import RegionSelect from './components/Main/RegionSelect';
import ChatRoom from './components/ChatRoom/ChatRoom';



class App extends Component {
  componentDidMount() {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      this.props.dispatch(fetchUser(accessToken));
    }
  }
  render() {
    // socket.on('user-joined', data => {
    //   console.log(data);
    // });
    return (
      <Router>
        <div className="app">
          <SideBar
            name={this.props.currentUser.name}
            profileImage={this.props.currentUser.photo}
          />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/platform" component={PlatformSelect} />
          <Route exact path="/games" component={GameSelect} />
          <Route exact path="/region" component={RegionSelect} />
          <Route exact path="/lobby" component={Lobby} />
          <Route exact path="/chatroom" component={ChatRoom} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.reducer.currentUser
});

export default connect(mapStateToProps)(App);
