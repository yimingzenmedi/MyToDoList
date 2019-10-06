import React from 'react';
import {Link} from "react-router";

class MyTasksButton extends React.Component {

    render() {
        return (
            <Link to='MyTasks'
                  onlyActiveOnIndex={true}
                  className={this.props.className}
            >
                My Tasks >>
            </Link>
        );
    }
}

export default MyTasksButton;