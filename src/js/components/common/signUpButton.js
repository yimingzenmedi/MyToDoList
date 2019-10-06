import React from 'react';
import {Link} from "react-router";

class SignUpButton extends React.Component {

    render() {
        return (
            <Link to='SignUp'
                  onlyActiveOnIndex={true}
                  className={this.props.className}
            >
                Sign Up
            </Link>
        );
    }
}

export default SignUpButton;