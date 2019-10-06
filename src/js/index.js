import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Router, Route, hashHistory} from "react-router";

import Home from "./components/home";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import MyTasks from "./components/myTasks";
import IndexRoute from "react-router/es/IndexRoute";

let indexRoute = function() {
	return Home;
};

ReactDOM.render(
	(
		<Router history={hashHistory}>
			<Route path='/' component={App}>
				<IndexRoute component={indexRoute()}/>
				<Route path='Home' component={Home}/>
				<Route path='SignIn' component={SignIn}/>
				<Route path='MyTasks' component={MyTasks}/>
				<Route path='SignUp' component={SignUp}/>
			</Route>
		</Router>
	),
	document.getElementById('root')
);