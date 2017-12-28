import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Icon from './Icon';
import Title from './Title';
import Required from './Required';
import Modal from './Modal';
import { getLobbiesFromDatabase, signUp, storeRoom } from '../../actions/lobby';
import FontAwesome from 'react-fontawesome';

class Lobby extends Component {
	componentDidMount() {
		this.props.dispatch(getLobbiesFromDatabase());
	}

	_clickHandler(event) {
		const roomNumber = event.target.id;
		const data = {
			name: this.props.currentUser.name,
			googleId: this.props.currentUser.googleId,
			roomNumber: roomNumber
		};

		this.props.dispatch(signUp(data));
		this.props.dispatch(storeRoom(roomNumber));
	}
	render() {
		let databaseLobbies = this.props.databaseLobbies.map((lobby, index) => {
			return (
				<div className="room" key={index}>
					<h3>{lobby.lobby.title}</h3>
					<p>{lobby.lobby.description}</p>
					<p>
						Voice Required: <FontAwesome name="rocket" /> {lobby.lobby.voice}
					</p>
					<p>Start Time: {lobby.lobby.startTime}</p>
					<p> Ideal Party Size: {lobby.lobby.partySize}</p>
					<Link to={'/chatroom'}>
						<button
							id={lobby.lobby.roomNumber}
							onClick={event => this._clickHandler(event)}
						>
							Sign Up
						</button>
					</Link>
				</div>
			);
		});

		let socketLobbies = this.props.socketLobbies.map((lobby, index) => {
			return (
				<div className="room" key={index}>
					<h3>{lobby.title}</h3>
					<p>{lobby.description}</p>
					<p>Voice Required: {lobby.voice}</p>
					<p>Start Time: {lobby.startTime}</p>
					<p> Ideal Party Size: {lobby.partySize}</p>
					<Link to={'/chatroom'}>
						<button
							id={lobby.roomNumber}
							onClick={event => this._clickHandler(event)}
						>
							Sign Up
						</button>
					</Link>
				</div>
			);
		});
		return (
			<div className="lobby-container">
				<h3 className="title">Select A Lobby</h3>
				{databaseLobbies}
				{socketLobbies}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		socketLobbies: state.lobbyReducers.socketLobbies,
		selections: state.reducer.userSelections,
		currentUser: state.reducer.currentUser,
		databaseLobbies: state.lobbyReducers.databaseLobbies
	};
};

export default connect(mapStateToProps)(Lobby);
