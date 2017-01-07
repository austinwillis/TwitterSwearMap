import React, { Component } from 'react';
import './app.scss';

import Container from './container';

class App extends Component {
	renderHeader() {
		return (
			<div className="App-header">
				<h2>Twitter Swear Map</h2>
			</div>
		);
	}

	renderMap() {
		return <Container/>
	}

	render() {
		return (
			<div ref="map">
				{this.renderHeader()}
				{this.renderMap()}
			</div>
		);
	}
}

export default App;
