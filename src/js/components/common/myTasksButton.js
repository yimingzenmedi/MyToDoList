import React from 'react';
import {Link} from "react-router";

class MyTasksButton extends React.Component {

    render() {
        return (
            <Link to={this.props.to}
                  onlyActiveOnIndex={true}
                  className={this.props.className}
            >
                View My Tasks >>>
            </Link>
        );
    }
}

export default MyTasksButton;