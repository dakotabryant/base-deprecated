import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser, logoutUser, joinLobbiesRoom } from '../actions/actions';
import * as Cookies from 'js-cookie';

class SideBar extends Component {
	_userLogButton = () => {
		const { isLogged } = this.props.currentUser;
		const accessToken = Cookies.get('accessToken');

		if (!isLogged) {
			this.props.dispatch(fetchUser(accessToken));
		} else if (isLogged) {
			this.props.dispatch(logoutUser());
		}
	};

	render() {
		const { isLogged } = this.props.currentUser;
		let buttonText = '';
		let buttonPath = '';

		isLogged ? (buttonText = 'Log Out') : (buttonText = 'Log In');
		isLogged
			? (buttonPath = '/api/auth/logout')
			: (buttonPath = '/api/auth/google');

		return (
			<div className="sidebar">
				<Link to={'/'} className="main-text">
					<h1>Base</h1>
				</Link>
				{isLogged && (
					<Link to={'/profile'} className="profile-info">
						<h2>My Profile</h2>
					</Link>
				)}

				<div className="profile-container">
					<img src={this.props.profileImage} alt="" />
					<p>{this.props.name}</p>
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
		signerUpInfo: state.lobbyReducers.userInfo,
		acceptedUsers: state.lobbyReducers.acceptedUsers,
		feedback: state.lobbyReducers.feedback
	};
};

export default connect(mapStateToProps)(SideBar);
