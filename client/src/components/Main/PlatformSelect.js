import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updatePlatformSelection } from '../../actions/actions';
import Selector from './Selector';
import platforms from '../../utils/platforms';

class PlatformSelect extends Component {
  render() {
    const platformRender = platforms.map(platform => {
      return (
        <Selector
          key={platform.title}
          title={platform.title}
          image={platform.image}
          onClick={p => this.props.dispatch(updatePlatformSelection(p.toLowerCase().replace(/\s+/g, '')))}
        />
      );
    });
    return (
      <div className="select-platform">
        <h2>Select Your Platform</h2>
        <div className="platforms-container">
          {platformRender}
        </div>
        <Link to={'/region'}>
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

export default connect(mapStateToProps)(PlatformSelect);
