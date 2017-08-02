import React, { Component } from "react";
import { connect } from "react-redux";
import { chatRoom } from "../../actions/actions";

class Message extends Component {

  sendChat = event => {
    event.preventDefault();
    let message = this.input.value;
    this.props.dispatch(chatRoom(message));
  };

  showMessages() {
    return this.props.message.map((message, index) => <li key={index}>{message.message}</li>);
  }

  render() {
    return (
      <div>
      <ul>{this.showMessages()}</ul>
        <form onSubmit={e => this.sendChat(e)}>
          <input
            type="text"
            placeholder="Enter message..."
            ref={input => (this.input = input)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
 return {
   message: state.lobbyReducers.message
 }
}

export default connect(mapStateToProps)(Message);
