import React from 'react';
import ReturnHomeImg from '../../../img/returnHome.ico';
import {Link} from "react-router";

class ReturnHomeButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link to='../home' onlyActiveOnIndex={true}>
                <img src={ReturnHomeImg} alt="return home"/>
            </Link>
        );
    }
}

export default ReturnHomeButton;
