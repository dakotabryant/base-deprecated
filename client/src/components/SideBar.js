import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser, logoutUser } from '../actions/actions';
import * as Cookies from 'js-cookie';
import CreateLobby from './createLobby';



class SideBar extends Component {
  _userLogButton = () => {
    const accessToken = Cookies.get('accessToken');
    if (!this.props.currentUser.isLogged) {
      console.log('fetch user');
      this.props.dispatch(fetchUser(accessToken));
    } else if (this.props.currentUser.isLogged) {
      console.log('logout user');
      this.props.dispatch(logoutUser());
    }
  };


  render() {

    let signerUppers = this.props.signerUpInfo.map((user, index) => {
      
      return (
        <div className= 'user-info'  key={index}>
          <h3>{user.user.name}</h3>
         
        </div>
      )
    })
    let buttonText = '';
    this.props.currentUser.isLogged
      ? (buttonText = 'Log Out')
      : (buttonText = 'Log In');

    let buttonPath = '';
    this.props.currentUser.isLogged
      ? (buttonPath = '/api/auth/logout')
      : (buttonPath = '/api/auth/google');

    return (
      <div className="sidebar">
        <Link to={'/'} className="main-text">
          <h1>Base</h1>
        </Link>
        <CreateLobby />
        {signerUppers}
        <div className="profile-container">
          <img src={this.props.profileImage} alt="" />
          <p>
            {this.props.name}
          </p>
        </div>
        <a href={buttonPath}>
          <button className="logout" onClick={this._userLogButton}>
            {buttonText}
          </button>
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reducer.currentUser,
    selection: state.reducer.userSelections,
    signerUpInfo: state.lobbyReducers.userInfo
  };
};

export default connect(mapStateToProps)(SideBar);
