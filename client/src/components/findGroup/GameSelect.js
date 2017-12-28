import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateGameSelection, joinLobbiesRoom } from '../../actions/actions';
import games from '../../utils/games';
import Selector from './Selector';

class GameSelect extends Component {
	constructor() {
		super();
		this._clickHandler = this._clickHandler.bind(this);
		this._selected = this._selected.bind(this);
	}

	_clickHandler() {
		this.props.dispatch(joinLobbiesRoom(this.props.userSelections));
	}

	_selected(title) {
		const gameTitle = title.toLowerCase().replace(/\s+/g, '');
		const { stateGameTitle, stateGameToggle } = this.props;
		if (stateGameTitle === gameTitle && stateGameToggle) {
			return 'selected';
		} else {
			return '';
		}
	}

	render() {
		const gameRender = games.map(game => {
			return (
				<Selector
					key={game.title}
					title={game.title}
					image={game.image}
					selectedClass={this._selected(game.title)}
					onClick={p =>
						this.props.dispatch(
							updateGameSelection(p.toLowerCase().replace(/\s+/g, ''))
						)
					}
				/>
			);
		});
		return (
			<div className="select-platform">
				<h2>Select Your Game</h2>
				<div className="platforms-container">{gameRender}</div>
				<div className="regionSelectButtonsContainer">
					<Link to={'/region'}>
						<button>Back</button>
					</Link>
					<Link to={'/lobby'}>
						<button onClick={this._clickHandler}>Find Lobby</button>
					</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stateGameTitle: state.findGroupReducers.userSelections.game.title,
		stateGameToggle: state.findGroupReducers.userSelections.game.toggle,
		userSelections: state.findGroupReducers.userSelections
	};
};

export default connect(mapStateToProps)(GameSelect);
