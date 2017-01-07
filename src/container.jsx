import React from 'react';
import { GoogleApiWrapper, Map, HeatMap } from 'google-maps-react';
import * as firebase from 'firebase';

const Container = React.createClass({
	getInitialState () {
		return {
			positions: []
		};
	},

	componentDidMount: function() {
		var _this = this;
		const latest = firebase.database().ref('/tweets');
		latest.on('value', function(snap) {
			var locations = [];
			snap.forEach((data) => {
				let tweet = data.val();
				locations.push(tweet.location);
			});
			_this.setState({
				positions: locations
			});
		});
	},

	render: function() {
		console.log(this.state.positions);
		const zoom = 4;
		const center = {
			lat: 39.8282,
			lng: -98.5795
		}
		const gradient = [
			'rgba(0, 255, 255, 0)',
			'rgba(0, 255, 255, 1)',
			'rgba(0, 191, 255, 1)',
			'rgba(0, 127, 255, 1)',
			'rgba(0, 63, 255, 1)',
			'rgba(0, 0, 255, 1)',
			'rgba(0, 0, 223, 1)',
			'rgba(0, 0, 191, 1)',
			'rgba(0, 0, 159, 1)',
			'rgba(0, 0, 127, 1)',
			'rgba(63, 0, 91, 1)',
			'rgba(127, 0, 63, 1)',
			'rgba(191, 0, 31, 1)',
			'rgba(255, 0, 0, 1)'
		];
		return (
			<Map google={this.props.google}
					 style={{width: '100%', height: '100%', position: 'relative'}}
					 className={'map'}
					 zoom={zoom}
					 center={center}>
				<HeatMap
					positions={this.state.positions}
					gradient={{gradient}}
					radius={50}/>
			</Map>
		)
	}
});

export default GoogleApiWrapper({
	apiKey: 'AIzaSyCftNsn-f8UvwxcTpSapPCVcfAVay7fj14',
	libraries: ['places', 'visualization'],
	version: 3.26
})(Container)
