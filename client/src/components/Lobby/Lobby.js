import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from './Icon';
import Title from './Title';
import Required from './Required';
import Modal from './Modal';
import {getLobbiesFromDatabase, signUp} from '../../actions/lobby';

class Lobby extends Component {
  
  componentDidMount() {
     this.props.dispatch(getLobbiesFromDatabase());
  }

  _clickHandler(event) {
    const roomNumber = event.target.id;
    const data = {
      name:this.props.currentUser.name,
      googleId: this.props.currentUser.googleId,
      roomNumber: roomNumber
    }

    this.props.dispatch(signUp(data));
  }
  render() {

    let databaseLobbies = this.props.databaseLobbies.map((lobby, index) => {
      
      return (
        <div className= 'room'  key={index} style={styles.roomStyles}>
          <h3>{lobby.lobby.title}</h3>
          <p>{lobby.lobby.description}</p>
          <p>Voice Required: {lobby.lobby.voice}</p>
          <p>Start Time: {lobby.lobby.startTime}</p>
          <p> Ideal Party Size: {lobby.lobby.partySize}</p>
          <button id={lobby.lobby.roomNumber} onClick={event => this._clickHandler(event)}>Sign Up</button>
        </div>
      )
    })
    
    let socketLobbies = this.props.socketLobbies.map((lobby, index) => {
      return (
        <div className= 'room' key={index} style={styles.roomStyles}>
          <h3>{lobby.title}</h3>
          <p>{lobby.description}</p>
          <p>Voice Required: {lobby.voice}</p>
          <p>Start Time: {lobby.startTime}</p>
          <p> Ideal Party Size: {lobby.partySize}</p>
          <button id={lobby.roomNumber}>Sign Up</button>
        </div>
      )
    })
    return (
      <div className='lobby-container'>
      <h3>{this.props.selections.platform}</h3>
        {databaseLobbies}
        {socketLobbies}
      </div>
    );
  }
}

const styles = {
  roomStyles: {
    display: 'flex',
    flex: 1,
    borderStyle: 'solid',
    padding: 10,
    margin: 10
  }
};



const mapStateToProps = state => {
  return {
    socketLobbies: state.lobbyReducers.socketLobbies,
    selections: state.reducer.userSelections,
    currentUser: state.reducer.currentUser,
    databaseLobbies: state.lobbyReducers.databaseLobbies
  };
};

export default connect(mapStateToProps)(Lobby);

