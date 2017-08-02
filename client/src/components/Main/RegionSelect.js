import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateRegionSelection } from '../../actions/actions';
import regions from '../../utils/regions';
import Selector from './Selector';

class RegionSelect extends Component {
  render() {
    const regionRender = regions.map(region => {
      return (
        <Selector
          key={region.title}
          title={region.title}
          image={region.image}
          onClick={p => this.props.dispatch(updateRegionSelection(p.toLowerCase().replace(/\s+/g, '')))}
        />
      );
    });
    return (
      <div className="select-platform">
        <h2>Select Your Region</h2>
        <div className="platforms-container">
          {regionRender}
        </div>
        <Link to={'/games'}>
          <button>Next</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userSelections: state.userSelections
  };
};

export default connect(mapStateToProps)(RegionSelect);
