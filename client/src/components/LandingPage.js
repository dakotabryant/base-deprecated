import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <h2>Find Your Next Group</h2>
        <h3>Take the guesswork out of your next online match</h3>
        <Link to={'/platform'}>
          <button>Find a Group</button>
        </Link>
      </div>
    );
  }
}

export default LandingPage;
