import React from 'react';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leftHtml: null,
            rightHtml: null,
        }
    }

    render() {
        return (
            <div>
                <div className = "leftHtml">{this.state.leftHtml}</div>
                <div className = "rightHtml">{this.state.rightHtml}</div>
            </div>
        );
    }
}

export default Header;
