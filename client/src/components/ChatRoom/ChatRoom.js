import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from './Message';
import { joinLobbiesRoom } from '../../actions/actions';
import { userAccepted, userDeclined } from '../../actions/lobby';

class ChatRoom extends Component {
	constructor() {
		super();
		this.state = {
			hideUser: [],
			showFeedback: false
		};
		this._clickHandler = this._clickHandler.bind(this);
	}

	acceptedHandler(name, room) {
		const data = {
			name: name,
			room: room
		};
		console.log('the data is', data);
		this.props.dispatch(userAccepted(data));
		this.setState({ hideUser: [...this.state.hideUser, true] });
	}

	declinedHandler(socketId) {
		console.log('hello');
		this.props.dispatch(userDeclined(socketId));
		this.setState({ hideUser: [...this.state.hideUser, true] });
		this.setState({ showFeedback: true });
	}

	_clickHandler() {
		this.props.dispatch(joinLobbiesRoom(this.props.selection));
		this.setState({ showFeedback: false });
	}
	render() {
		let feedback = this.props.feedback.map((feedback, index) => {
			return (
				<div className="feedback" key={index}>
					<p>{feedback}</p>
					<Link to={'/lobby'}>
						<button onClick={this._clickHandler}>Lobby Room</button>
					</Link>
				</div>
			);
		});

		let signerUppers = this.props.signerUpInfo.map((user, index) => {
			if (this.state.hideUser[index] === true) {
				return '';
			}
			return (
				<div className="user-info" key={index}>
					<h3>Pending: {user[0].user.name}</h3>
					<button
						className="accept-btn"
						onClick={() =>
							this.acceptedHandler(
								this.props.signerUpInfo[index][0].user.name,
								this.props.signerUpInfo[index][0].user.roomNumber
							)
						}
					>
						Accept
					</button>
					<button
						className="decline-btn"
						onClick={() =>
							this.declinedHandler(this.props.signerUpInfo[index][1])
						}
					>
						Decline
					</button>
				</div>
			);
		});

		let acceptedUsers = this.props.acceptedUsers.map((user, index) => {
			return (
				<div className="accepted-user" key={index}>
					<h6>{user.user.name}</h6>
				</div>
			);
		});

		return (
			<div className="chatRoom">
				<Message />
				{signerUppers}
				<div className="party-container">
					<h3>Party Members</h3>
					{acceptedUsers}
				</div>
				{feedback}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		message: state.lobbyReducers,
		currentUser: state.reducer.currentUser,
		selection: state.reducer.userSelections,
		signerUpInfo: state.lobbyReducers.userInfo,
		acceptedUsers: state.lobbyReducers.acceptedUsers,
		feedback: state.lobbyReducers.feedback
	};
};

export default connect(mapStateToProps)(ChatRoom);
