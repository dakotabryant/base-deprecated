import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Icon from './Icon';
// import Title from './Title';
import Lobby from './Lobby';
// import Required from './Required';


class Room extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    
    return (
      <div className="lobby" >
        <h3>{platform} - {region} - {game}</h3>
          <Lobby />
      </div>
    ); 
  }

}

const mapStateToProps = (state) => {
  const { platform, region, game } = state.reducer.userSelections;
  return {
    platform,
    region,
    game
  }
}

export default connect(mapStateToProps)(Room);