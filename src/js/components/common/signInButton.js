import React from 'react';
import {Link} from 'react-router';

class SignInButton extends React.Component {

    render() {
        return (
            <Link to='SignIn'
                  onlyActiveOnIndex={true}
                  className={this.props.className}
                  id={this.props.id}
            >
                {this.props.text}
            </Link>
        );
    }

}

export default SignInButton;
