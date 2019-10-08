import React from "react";
import Avatar from '@material-ui/core/Avatar';


class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // loginAs: this.props.loginAs,
            loginAs: null,
        }
    }

    static getRandomColor() {
        let r = Math.floor(Math.random()*255);
        let g = Math.floor(Math.random()*255);
        let b = Math.floor(Math.random()*255);
        const min = Math.min(r, g, b);
        if (min > 170) {
            r -= min;
            g -= min;
            b -= min;
        }
        return 'rgb('+r+','+g+','+b+')';
    }

    renderAvatar() {
        const initial = this.state.loginAs[0];
        const bgColor = UserInfo.getRandomColor();
        return (
            <Avatar style={{backgroundColor: bgColor}} component='div'>{initial}</Avatar>
        );
    }

    render() {
        const avatar = this.renderAvatar();
        if (this.state.loginAs != null) {
            return (
                <div id="userInfo">
                    {avatar}
                </div>
            );
        } else {
            return (
                <div id="userInfo"> </div>
            )
        }
    }

}


export default UserInfo;