import React from 'react';

import '../../../css/header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leftContent: this.props.leftContent,
            rightContent: this.props.rightContent,
        }
    }

    render() {
        const leftContent = this.state.leftContent;
        return (
            <div className='header'>
                <div className = "leftHtml">
                    {leftContent}
                </div>
                <div className = "rightHtml">
                    {this.state.rightContent}
                </div>
            </div>
        );
    }
}

export default Header;
