import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Router, Route, hashHistory} from "react-router";

import Home from "./components/home";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import MyTasks from "./components/myTasks";
import IndexRoute from "react-router/es/IndexRoute";
import ResetPassword from "./components/resetPassword";
import "../css/index.css";


ReactDOM.render(
	(
		<Router history={hashHistory}>
			<Route path='/' component={App}>
				<IndexRoute component={Home}/>
				<Route path='MyTasks' component={MyTasks}/>
				<Route path='SignIn' component={SignIn}/>
				<Route path='SignUp' component={SignUp}/>
				<Route path='ResetPassword' component={ResetPassword}/>
			</Route>
		</Router>
	),
	document.getElementById('root')
);