import React from 'react';
import {Link} from 'react-router';

class SignInButton extends React.Component {

    render() {
        return (
            <Link to='SignIn'
                  onlyActiveOnIndex={true}
                  className={this.props.className}
            >
                Sign In
            </Link>
        );
    }

}

export default SignInButton;
