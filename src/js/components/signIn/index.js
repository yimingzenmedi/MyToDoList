import React from 'react';
import Header from "../common/header";
import ReturnHomeButton from "../common/returnHomeButton";
import SignUpButton from "../common/signUpButton";
import {Link} from 'react-router';

import "../../../css/signIn.css";

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.normalStyle = {
            border: '1px solid lightblue',
            boxShadow: 'none',
        };

        this.errorStyle = {
            border: '1px solid rgb(255, 92, 51)',
            boxShadow: '0 0 5px rgb(255, 71, 26)',
        };

        this.state={
            usernameOk: null,
            passwordOk: null,
            captchaOk: null,
            notice: "",
            captchaSrc: "#",
        };
    }

    UNSAFE_componentWillMount() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    handleCheckSignInUsername = () => {
        let username = this.refs.signInUsername.value;
        if (username === "" || username.length > 35) {
            this.setState({
                usernameOk: false,
            })
        } else {
            this.setState({
                usernameOk: true,
            })
        }
    };

    handleCheckSignInPassword = () => {
        let password = this.refs.signInPassword.value;
        const reg = /^(?=.*\d)(?=.*[A-Za-z]).{8,25}$/;
        if (!password.match(reg)) {
            this.setState({
                passwordOk: false,
            })
        } else {this.setState({
                passwordOk: true,
            })
        }
    };

    handleCheckSignInCaptcha = () => {
        let captcha = this.refs.signInCaptcha.value;
        const reg = /^[A-Za-z0-9]{4}$/;
        if (!captcha.match(reg)) {
            this.setState({
                captchaOk: false,
            })
        } else {
            this.setState({
                captchaOk: true,
            })
        }
    };

    handleCaptchaClick = () => {
        const src = "#?rnd=" + Math.random();
        this.setState({
            captchaSrc: src,
        });
    };
    render() {
        let usernameOk = this.state.usernameOk;
        let passwordOk = this.state.passwordOk;
        let captchaOk = this.state.captchaOk;

        return (
            <div style={{width: '100%', height: '100%'}}>
                <Header leftContent={<ReturnHomeButton/>}/>
                <div className="main">
                    <p className="formTitle">Sign in to</p>
                    <p className="formTitle">
                        <span className="r">M </span>
                        <span className="y">T </span>
                        <span className="g">D </span>
                        <span className="b">L </span>
                    </p>
                    <form id="signInForm">
                        <label
                            className="infoLabel"
                            htmlFor="signInUsername"
                        >
                            Username:
                        </label>
                        <br/>
                        <input
                            ref="signInUsername"
                            className="infoInput"
                            style={usernameOk === false ? this.errorStyle : this.normalStyle}
                            type="text"
                            id="signInUsername"
                            placeholder="Within 35 digits"
                            maxLength='35'
                            onBlur={this.handleCheckSignInUsername}
                        />

                        <label
                            className="infoLabel"
                            htmlFor="signInPassword"
                        >
                            Password:
                        </label>
                        <br/>
                        <input
                            ref="signInPassword"
                            className="infoInput"
                            style={passwordOk === false ? this.errorStyle : this.normalStyle}
                            type="password"
                            id="signInPassword"
                            placeholder="8-25 digits of English letters AND numbers"
                            maxLength="25"
                            minLength="8"
                            onBlur={this.handleCheckSignInPassword}
                        />

                        <label
                            className="infoLabel"
                            htmlFor="signInCaptcha"
                        >
                            Captcha:
                        </label>
                        <br/>
                        <input
                            ref="signInCaptcha"
                            className="infoInput captchaInput"
                            style={captchaOk === false ? this.errorStyle : this.normalStyle}
                            type="text"
                            id="signInCaptcha"
                            placeholder="4 digits not case sensitive"
                            maxLength="4"
                            minLength="4"
                            onBlur={this.handleCheckSignInCaptcha}
                        />
                        <img
                            src={this.state.captchaSrc}
                            alt="captcha"
                            className="captchaImg"
                            onClick={this.handleCaptchaClick}
                        />

                        <p className="notice">{this.state.notice}</p>

                        <button className='primaryButton signInButton'>Sign in</button>
                        <SignUpButton text={"Don't have an account? Sign up"}
                                      className="secondaryLinkButton signInToSignUp"
                        />.

                        <p id="resetPasswordLink">
                            Forget password？
                            <Link to="ResetPassword"
                                  component={'span'}
                                  onlyActiveOnIndex={true}
                            >
                                Reset password
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignIn;
