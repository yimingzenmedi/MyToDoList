import React from 'react';
import MyTasksButton from '../common/myTasksButton';

import LogoImg from '../../../img/logo.png';
import ListStyle1 from '../../../img/listStyle1.png';
import ListStyle2 from '../../../img/listStyle2.png';
import '../../../css/home.css';
import '../../../css/index.css';


class Home extends React.Component {
	getPath() {
		const loginAs = null;
		if (loginAs === null) {
			return "SignIn";
		} else {
			return "MyTasks";
		}
	}

	componentWillMount() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}

	render() {
		return (
			<div>
				<div id="homeTop">
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
						<div>
							<MyTasksButton to={this.getPath()} className='myTasksHomeButton'/>
						</div>
					</div>
				</div>
				<table id="homeBottom">
					<tbody>
						<tr>
							<td id="leftDescription">
								<p className='descriptionL'>If these are you:</p>
								<div id='leftDescriptionUl'>
									<p>
										<img src={ListStyle1} className='listStyle' alt='list style'/>
										Always forget what to do
									</p>
									<p>
										<img src={ListStyle1} className='listStyle' alt='list style'/>
										Struggling with missing deadlines
									</p>
									<p>
										<img src={ListStyle1} className='listStyle' alt='list style'/>
										Want to coordinately manage tasks
									</p>
									<p>
										<img src={ListStyle1} className='listStyle' alt='list style'/>
										Hate untidy sticky notes everywhere
									</p>
									<p>
										<img src={ListStyle1} className='listStyle' alt='list style'/>
										Want a simple but powerful To Do List
									</p>
									<p>
										<img src={ListStyle1} className='listStyle' alt='list style'/>
										······
									</p>
								</div>
								<p className='descriptionL'>This is made for you!</p>
							</td>
							<td id="rightDescription">
								<p className='descriptionR'>
									This is a simple To Do List, but we provide lots of useful functions to help you manage your tasks:
								</p>
								<div id='rightDescriptionUl'>
									<p>
										<img src={ListStyle2} className='listStyle' alt='list style'/>
										Time filter, show what you want most
									</p>
									<p>
										<img src={ListStyle2} className='listStyle' alt='list style'/>
										Sequencer, put the important tasks in front
									</p>
									<p>
										<img src={ListStyle2} className='listStyle' alt='list style'/>
										Create your account, sync your tasks anywhere
									</p>
									<p>
										<img src={ListStyle2} className='listStyle' alt='list style'/>
										Set alarms, prevent missed deadlines
									</p>
									<p>
										<img src={ListStyle2} className='listStyle' alt='list style'/>
										Clear and simple interface, easy to use
									</p>
									<p>
										<img src={ListStyle2} className='listStyle' alt='list style'/>
										Try it to discover more...
									</p>
								</div>
								<p className="descriptionR">
									Try it to manage your tasks!
								</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

		);
	}

}

export default Home;