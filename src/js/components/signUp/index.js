import React from 'react';
import Header from "../common/header";
import ReturnHomeButton from "../common/returnHomeButton";

import "../../../css/signUp.css";
import SignInButton from "../common/signInButton";

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.normalStyle = {
            border: '1px solid #1AF200',
            boxShadow: 'none',
        };

        this.errorStyle = {
            border: '1px solid rgb(255, 92, 51)',
            boxShadow: '0 0 5px rgb(255, 71, 26)',
        };

        this.state = {
            usernameOk: null,
            passwordOk: null,
            repeatOk: null,
            emailOk: null,
            captchaOk: null,
            notice: "",
            captchaSrc: "#",
        }
    }

    UNSAFE_componentWillMount() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    handleCheckSignUpUsername = () => {
        let username = this.refs.signUpUsername.value;
        if (username === "" || username.length > 35) {
            this.setState({
                usernameOk: false,
            });
        } else {
            this.setState({
                usernameOk: true,
            });
        }
    };


    handleCheckSignUpPassword = () => {
        let password = this.refs.signUpPassword.value;
        const reg = /^(?=.*\d)(?=.*[A-Za-z]).{8,25}$/;
        if (!password.match(reg)) {
            this.setState({
                passwordOk: false,
            });
        } else {
            this.setState({
                passwordOk: true,
            });
        }
    };
    handleCheckSignUpRepeat = () => {
        let repeat = this.refs.signUpRepeat.value;
        let password = this.refs.signUpPassword.value;
        const reg = /^(?=.*\d)(?=.*[A-Za-z]).{8,25}$/;
        if (!repeat.match(reg) || password !== repeat) {
            this.setState({
                repeatOk: false,
            });
        } else {
            this.setState({
                repeatOk: true,
            });
        }
    };
    handleCheckSignUpEmail = () => {
        let email = this.refs.signUpEmail.value;
        const reg = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!email.match(reg)) {
            this.setState({
                emailOk: false,
            });
        } else {
            this.setState({
                emailOk: true,
            });
        }
    };

    handleCheckSignUpCaptcha = () => {
        let captcha = this.refs.signUpCaptcha.value;
        const reg = /^[A-Za-z0-9]{4}$/;
        if (!captcha.match(reg)) {
            this.setState({
                captchaOk: false,
            });
        } else {
            this.setState({
                captchaOk: true,
            });
        }
    };

    handleCaptchaClick = () => {
        const src = "#?rnd=" + Math.random();
        this.setState({
            captchaSrc: src,
        });
    };

    render() {
        const usernameOk = this.state.usernameOk;
        const passwordOk = this.state.passwordOk;
        const repeatOk = this.state.repeatOk;
        const emailOk = this.state.emailOk;
        const captchaOk = this.state.captchaOk;

        return (
            <div>
                <Header leftContent={<ReturnHomeButton/>}/>
                <div className="main">
                    <p className="formTitle">Sign up in</p>
                    <p className="formTitle">
                        <span className="r">M </span>
                        <span className="y">T </span>
                        <span className="g">D </span>
                        <span className="b">L </span>
                    </p>
                    <form id="signUpForm">
                        <label
                            className="infoLabel"
                            htmlFor="signUpUsername"
                        >
                            Username:
                        </label>
                        <br/>
                        <input
                            ref="signUpUsername"
                            className="infoInput"
                            style={usernameOk === false ? this.errorStyle : this.normalStyle}
                            type="text"
                            id="signUpUsername"
                            placeholder="Within 35 digits"
                            maxLength='35'
                            onBlur={this.handleCheckSignUpUsername}
                        />

                        <label
                            className="infoLabel"
                            htmlFor="signUpPassword"
                        >
                            password:
                        </label>
                        <br/>
                        <input
                            ref="signUpPassword"
                            className="infoInput"
                            style={passwordOk === false ? this.errorStyle : this.normalStyle}
                            type="password"
                            id="signUpPassword"
                            placeholder="8-25 digits of English letters AND numbers"
                            maxLength="25"
                            minLength="8"
                            onBlur={this.handleCheckSignUpPassword}
                        />

                        <label
                            className="infoLabel"
                            htmlFor="signUpRepeat"
                        >
                            Repeat password:
                        </label>
                        <br/>
                        <input
                            ref="signUpRepeat"
                            className="infoInput"
                            style={repeatOk === false ? this.errorStyle : this.normalStyle}
                            type="password"
                            id="signUpRepeat"
                            placeholder="Enter the password again"
                            maxLength="25"
                            minLength="8"
                            onBlur={this.handleCheckSignUpRepeat}
                        />

                        <label
                            className="infoLabel"
                            htmlFor="signUpEmail"
                        >
                            Email:
                        </label>
                        <br/>
                        <input
                            ref="signUpEmail"
                            className="infoInput"
                            style={emailOk === false ? this.errorStyle : this.normalStyle}
                            type="email"
                            id="signUpEmail"
                            placeholder="Will be used for reset password"
                            onBlur={this.handleCheckSignUpEmail}
                        />

                        <label
                            className="infoLabel"
                            htmlFor="signUpCaptcha"
                        >
                            Captcha:
                        </label>
                        <br/>
                        <input
                            ref="signUpCaptcha"
                            className="infoInput captchaInput"
                            style={captchaOk === false ? this.errorStyle : this.normalStyle}
                            type="text"
                            id="signUpCaptcha"
                            placeholder="4 digits not case sensitive"
                            maxLength="4"
                            minLength="4"
                            onBlur={this.handleCheckSignUpCaptcha}
                        />
                        <img
                            src={this.state.captchaSrc}
                            alt="captcha"
                            className="captchaImg"
                            onClick={this.handleCaptchaClick}
                        />

                        <p className="notice">{this.state.notice}</p>

                        <button  className='primaryButton signUpButton'>Sign up</button>
                        <SignInButton
                            text={"Remember your password? Sign in"}
                            className="secondaryLinkButton signUpToSignIn"
                        />

                    </form>
                </div>
            </div>


        );
    }
}

export default SignUp;