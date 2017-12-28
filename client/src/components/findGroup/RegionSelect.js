import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateRegionSelection } from '../../actions/actions';
import regions from '../../utils/regions';
import Selector from './Selector';

class RegionSelect extends Component {
	constructor() {
		super();
		this._selected = this._selected.bind(this);
	}

	_selected(title) {
		const regionTitle = title.toLowerCase().replace(/\s+/g, '');
		const { stateRegionTitle, stateRegionToggle } = this.props;
		if (stateRegionTitle === regionTitle && stateRegionToggle) {
			return 'selected';
		} else {
			return '';
		}
	}

	render() {
		const regionRender = regions.map(region => {
			return (
				<Selector
					key={region.title}
					title={region.title}
					image={region.image}
					selectedClass={this._selected(region.title)}
					onClick={p =>
						this.props.dispatch(
							updateRegionSelection(p.toLowerCase().replace(/\s+/g, ''))
						)
					}
				/>
			);
		});
		return (
			<div className="select-platform">
				<h2>Select Your Region</h2>
				<div className="platforms-container">{regionRender}</div>
				<div className="regionSelectButtonsContainer">
					<Link to={'/platform'}>
						<button>Back</button>
					</Link>
					<Link to={'/games'}>
						<button>Next</button>
					</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stateRegionTitle: state.findGroupReducers.userSelections.region.title,
		stateRegionToggle: state.findGroupReducers.userSelections.region.toggle
	};
};

export default connect(mapStateToProps)(RegionSelect);
