import React, { Component } from 'react';
import { connect } from 'react-redux';

class Title extends Component {
  showModal = () => {
      alert('Yolo');
  }
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    title: 'Arthas Farming'
  };
}

export default connect(mapStateToProps)(Title);