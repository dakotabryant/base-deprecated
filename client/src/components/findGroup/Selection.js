import { Component } from 'react';
import SelectionBox from './SelectionBox';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Selection extends Component {
	render() {
		return (
			<div>
				<div style={{ textAlign: 'center', fontSize: 30 }}>
					{this.props.title}
				</div>
				<div>
					<ul style={{ listStyle: 'none', width: '100%' }}>
						<SelectionBox text={'PC'}>
							{' '}
							<Link to="/games" />{' '}
						</SelectionBox>
						<SelectionBox text={'XBOX'} />
						<SelectionBox text={'Playstation'} />
						<SelectionBox text={'Mobile'} />
						<h1>
							<Link to="/games">Trelloish</Link>
						</h1>
						<button>
							<Link to="/games">Trelloish</Link>
						</button>
					</ul>
				</div>
			</div>
		);
	}
}
