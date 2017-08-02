import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';

class ChatRoom extends Component {

  render() {
    return (
    <div className="ChatRoom" >
        <Message />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.lobbyReducers
  }
}

export default connect(mapStateToProps)(ChatRoom);