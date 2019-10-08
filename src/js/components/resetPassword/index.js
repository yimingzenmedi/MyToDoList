import React from 'react';
import Header from "../common/header";
import ReturnHomeButton from "../common/returnHomeButton";
import SignUpButton from "../common/signUpButton";

import "../../../css/resetPassword.css";
import SignInButton from "../common/signInButton";

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);

        this.normalStyle = {
            border: '1px solid #EED900',
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

    componentWillMount() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    handleCheckResetPasswordUsername = () => {
        let username = this.refs.resetPasswordUsername.value;
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


    handleCheckResetPasswordNew = () => {
        let password = this.refs.resetPasswordNew.value;
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
    handleCheckResetPasswordRepeat = () => {
        let repeat = this.refs.resetPasswordRepeat.value;
        let password = this.refs.resetPasswordNew.value;
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
    handleCheckResetPasswordEmail = () => {
        let email = this.refs.resetPasswordEmail.value;
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

    handleCheckResetPasswordCaptcha = () => {
        let captcha = this.refs.resetPasswordCaptcha.value;
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
                    <p className="formTitle">Reset password of</p>
                    <p className="formTitle">
                        <span className="r">M </span>
                        <span className="y">T </span>
                        <span className="g">D </span>
                        <span className="b">L </span>
                    </p>
                    <form id="resetPasswordForm">
                        <label
                            className="infoLabel"
                            htmlFor="resetPasswordUsername"
                        >
                            Username:
                        </label>
                        <br/>
                        <input
                            ref="resetPasswordUsername"
                            className="infoInput"
                            style={usernameOk === false ? this.errorStyle : this.normalStyle}
                            type="text"
                            id="resetPasswordUsername"
                            placeholder="Within 35 digits"
                            maxLength='35'
                            onBlur={this.handleCheckResetPasswordUsername}
                        />

                        <label
                            className="infoLabel"
                            htmlFor="resetPasswordNew"
                        >
                            New password:
                        </label>
                        <br/>
                        <input
                            ref="resetPasswordNew"
                            className="infoInput"
                            style={passwordOk === false ? this.errorStyle : this.normalStyle}
                            type="password"
                            id="resetPasswordNew"
                            placeholder="8-25 digits of English letters AND numbers"
                            maxLength="25"
                            minLength="8"
                            onBlur={this.handleCheckResetPasswordNew}
                        />

                        <label
                            className="infoLabel"
                            htmlFor="resetPasswordRepeat"
                        >
                            Repeat password:
                        </label>
                        <br/>
                        <input
                            ref="resetPasswordRepeat"
                            className="infoInput"
                            style={repeatOk === false ? this.errorStyle : this.normalStyle}
                            type="password"
                            id="resetPasswordRepeat"
                            placeholder="Enter the new password again"
                            maxLength="25"
                            minLength="8"
                            onBlur={this.handleCheckResetPasswordRepeat}
                        />

                        <label
                            className="infoLabel"
                            htmlFor="resetPasswordEmail"
                        >
                            Email:
                        </label>
                        <br/>
                        <input
                            ref="resetPasswordEmail"
                            className="infoInput"
                            style={emailOk === false ? this.errorStyle : this.normalStyle}
                            type="email"
                            id="resetPasswordEmail"
                            placeholder="The same email as when you sign up"
                            onBlur={this.handleCheckResetPasswordEmail}
                        />

                        <label
                            className="infoLabel"
                            htmlFor="resetPasswordCaptcha"
                        >
                            Captcha:
                        </label>
                        <br/>
                        <input
                            ref="resetPasswordCaptcha"
                            className="infoInput captchaInput"
                            style={captchaOk === false ? this.errorStyle : this.normalStyle}
                            type="text"
                            id="resetPasswordCaptcha"
                            placeholder="4 digits not case sensitive"
                            maxLength="4"
                            minLength="4"
                            onBlur={this.handleCheckResetPasswordCaptcha}
                        />
                        <img
                            src={this.state.captchaSrc}
                            alt="captcha"
                            className="captchaImg"
                            onClick={this.handleCaptchaClick}
                        />

                        <p className="notice">{this.state.notice}</p>

                        <button  className='primaryButton resetButton'>Reset password</button>
                        <SignInButton text={"Remember your password? Sign in"}
                                      className="secondaryLinkButton resetPasswordToSignIn"
                        />

                        <SignUpButton text={"Don't have an account? Sign up"}
                                      className="secondaryLinkButton resetPasswordToSignUp"
                        />
                    </form>
                </div>
            </div>


        );
    }
}

export default ResetPassword;