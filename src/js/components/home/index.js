import React from 'react';
import SignUpButton from '../common/signUpButton';
import SignInButton from '../common/signInButton';
import MyTasksButton from '../common/myTasksButton';

import LogoImg from '../../../img/logo.png';

import './index.css';
import '../../../css/index.css';



class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginAs: 1,
		};
	}

	renderSignInOrMyTasks() {
		if (this.state.loginAs == null) {
			return (
				<SignInButton className='signInHomeButton homeButtons'/>
			);
		} else {
			return (
				<MyTasksButton className='myTasksHomeButton homeButtons'/>
			);
		}
	}

	render() {
		let signInOrMyTasks = this.renderSignInOrMyTasks();
		return (
			<div>
				<div id="top">
					<img id="logoImg" src={LogoImg} alt="logo"/>
					<div id="welcome">
						<div id="title">
							<span style={{color: 'rgba(250,250,250,0.9)'}}>Welcome to</span>
							<br/>
							<span className="r"> My</span>
							<span className="y"> To</span>
							<span className="g"> Do</span>
							<span className="b"> List</span>
						</div>
						<div id="buttons">
							<SignUpButton className='signUpHomeButton homeButtons'/>
							{signInOrMyTasks}
						</div>
					</div>
				</div>
			</div>

		);
	}

}

export default Home;