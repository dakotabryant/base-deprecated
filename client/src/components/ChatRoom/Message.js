import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chatRoom } from '../../actions/actions';

class Message extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };

		this.handleChange = this.handleChange.bind(this);
	}

	sendChat = event => {
		event.preventDefault();
		const message = this.state.value;
		const data = {
			message: message,
			name: this.props.currentUser.name,
			room: this.props.room
		};
		this.props.dispatch(chatRoom(data));
		this.setState({ value: '' });
	};

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	showMessages() {
		return this.props.message.map((message, index) => (
			<li key={index}>
				{message.message.name}: {message.message.message}
			</li>
		));
	}

	render() {
		return (
			<div className="message-container">
				<ul>{this.showMessages()}</ul>
				<form onSubmit={e => this.sendChat(e)}>
					<input
						value={this.state.value}
						type="text"
						placeholder="Enter message..."
						onChange={this.handleChange}
					/>
					<button type="submit">Send</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		message: state.lobbyReducers.message,
		room: state.lobbyReducers.room,
		currentUser: state.reducer.currentUser
	};
};

export default connect(mapStateToProps)(Message);
