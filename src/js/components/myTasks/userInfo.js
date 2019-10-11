import React from "react";
import Avatar from "@material-ui/core/Avatar";
import SignOutImg from "../../../img/signOut.ico";
import ChangeAccountImg from "../../../img/changeAccount.ico";
import ResetPasswordImg from "../../../img/resetPassword.ico";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Button from "@material-ui/core/Button";

class UserInfo extends React.Component {
    constructor(props) {
        super(props);

        this.bgColor = this.getRandomBGColor();
        this.state = {
            loginAs: "name",
            visibility: "hidden",
        }
    }

    getRandomBGColor = () => {
        let r = Math.floor(Math.random()*255);
        let g = Math.floor(Math.random()*255);
        let b = Math.floor(Math.random()*255);

        const brightness = (Math.max(r,g,b) + Math.min(r,g,b)) / 510;
        if (brightness > 0.7) {
            return this.getRandomBGColor();
        } else {
            return 'rgb('+r+','+g+','+b+')';
        }
    };


    signOut = () => {
        console.log("sign out")
    };

    toResetPassword = () => {
        this.signOut();
        window.location.href='#ResetPassword';
    };

    toChangeAccount = () => {
        this.signOut();
        window.location.href='#SignIn';
    };

    toSignOut = () => {
        this.signOut();
        window.location.href='#';
    };

    showConfirmAlert = (title, content, func) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='userInfoConfirm'>
                        <h2>{title}</h2>
                        <p>{content}</p>
                        <Button
                            onClick={() => {
                                onClose();
                                if(typeof func === "function") {
                                    func();
                                }
                            }}
                            className='confirmButton'
                            color="primary"
                        >
                            Confirm
                        </Button>
                        <Button
                            onClick={onClose}
                            className="cancelButton"
                            color="secondary"
                        >
                            Cancel
                        </Button>
                    </div>
                );
            }
        });
    };

    handleInfoClick = () => {
        let newVisibility = "hidden";
        if (this.state.visibility === "hidden") {
            newVisibility = 'visible';
        }
        this.setState({
            visibility: newVisibility,
        });
    };

    handleResetPasswordClick = () => {
        const title = 'Confirm to sign out';
        const content = 'The current account will be signed out.';
        this.showConfirmAlert(title, content, this.toResetPassword);
    };

    handleChangeAccountClick = () => {
        const title = 'Confirm to sign out';
        const content = 'The current account will be signed out.';
        this.showConfirmAlert(title, content, this.toChangeAccount);
    };

    handleSignOutClick = () => {
        const title = 'Confirm to sign out';
        const content = 'The current account will be signed out.';
        this.showConfirmAlert(title, content, this.toSignOut);
    };

    render() {
        let initLetter = this.state.loginAs[0];
        const bgColor = this.bgColor;
        return (
            <div className='userInfo'>
                <Avatar
                    component={'div'}
                    className='userInfoImg'
                    style={{backgroundColor: bgColor}}
                    onClick={this.handleInfoClick}
                >
                    {initLetter}
                </Avatar>
                <div className="userInfoDetails" style={{visibility: this.state.visibility}}>
                    <p>Sign in as:</p>
                    <p className="userInfoName">{this.state.loginAs}</p>
                    <hr/>
                    <p className="funcButton" onClick={this.handleResetPasswordClick}>
                        <img src={ResetPasswordImg} alt="reset password" className="funcButtonImg"/>
                        Reset password
                    </p>

                    <p className="funcButton" onClick={this.handleChangeAccountClick}>
                        <img src={ChangeAccountImg} alt="change account" className="funcButtonImg"/>
                        Change account
                    </p>

                    <p className="funcButton" onClick={this.handleSignOutClick}>
                        <img src={SignOutImg} alt="sign out" className="funcButtonImg"/>
                        Sign out
                    </p>
                </div>

            </div>
        )
    }
}

export default UserInfo;
