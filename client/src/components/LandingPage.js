import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CreateLobby from './createLobby'
import { clearSelections } from '../actions/actions'
import { connect } from 'react-redux'

class LandingPage extends Component {
	render() {
		return (
			<div className="landing-page">
				<h2>Find Your Next Group</h2>
				<h3>Take the guesswork out of your next online match</h3>
				<div className="button-div">
					<CreateLobby />
					<p>or</p>
					<Link to={'/platform'}>
						<button className='find-button' onClick={this.props.dispatch(clearSelections())}>Find a Group</button>
					</Link>
				</div>
			</div>
		)
	}
}

export default connect()(LandingPage)

// <div className="landing-page">
//         <video
//           src="https://d33jl3tgfli0fm.cloudfront.net/helix/videos/hero-loop-webm.webm"
//           loop
//           autoPlay
//           muted
//         />
//         <div className="overlay" />
//         <div className="copy">
//           <h2>Find Your Next Group</h2>
//           <h3>Take the guesswork out of your next online match</h3>
//           <div className="button-div">
//             <CreateLobby />
//             <p>or</p>
//             <Link to={"/platform"}>
//               <button>Find a Group</button>
//             </Link>
//           </div>
//         </div>
//       </div>
