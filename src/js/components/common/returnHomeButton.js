import React from 'react';
import ReturnHomeImg from '../../../img/returnHome.ico';
import {Link} from "react-router";

import '../../../css/returnHomeButton.css';

class ReturnHomeButton extends React.Component {
    render() {
        return (
            <Link
                to='/'
                onlyActiveOnIndex={true}
                className={this.props.className}
            >
                <img className='returnHomeButton' src={ReturnHomeImg} alt="return home" title="return to homepage"/>
            </Link>
        );
    }
}

export default ReturnHomeButton;
