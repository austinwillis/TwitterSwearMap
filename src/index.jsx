import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import * as firebase from 'firebase';
import './index.scss';

var config = {
	apiKey: "AIzaSyCWJ7bOg_76qbUCCS92UrKFxwo9TLIhCCk",
	authDomain: "twitterangerlevel.firebaseapp.com",
	databaseURL: "https://twitterangerlevel.firebaseio.com",
	storageBucket: "twitterangerlevel.appspot.com",
	messagingSenderId: "523715061517"
};

firebase.initializeApp(config);

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
