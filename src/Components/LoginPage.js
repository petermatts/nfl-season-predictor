import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
import { showLogin, name } from '../Actions'; 
import './CSS/LoginPage.css';

const IN = "sign_in";
const UP = "sign_up"
const ERR = {
    short: "Password too short",
    noMatch: "Passwords do not match",
    email: "Invalid email address",
    emailFormat: "Badly formated email",
    password: "Incorrect Password",
    exists: "Email address in use by another account",
    other: "Something went wrong :(",
    clear: ""
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { type: IN, email: "", password: "", confirm: "", name: "", loading: false, error: "" };
        //! TODO handle and display error messages and also dont forget to deal with forgot/reset password
        
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.confirmChange = this.confirmChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    emailChange(event) { this.setState({ email: event.target.value }); }
    passwordChange(event) { this.setState({ password: event.target.value }); }
    confirmChange(event) { this.setState({ confirm: event.target.value }); }
    nameChange(event) { this.setState({ name: event.target.value }); }

    signIn() {
        const { email, password } = this.state;
        this.setState({ error: "", loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.signInSuccess.bind(this))
            .catch((error) => {
                console.log(`Error code: ${error.code}\nMessage: ${error.message}`);
                switch (error.code) {
                    case "auth/user-not-found":
                    case "auth/invalid-email":
                        this.fail(ERR.email);
                        break;
                    case "auth/wrong-password":
                        this.fail(ERR.password);
                        break;
                    default:
                        this.fail(ERR.other);
                        console.log(error.code);
                }
            });   
    }

    signInSuccess() { 
        this.setState({ email: "", password: "", confirm: "", name: "", loading: false, error: "" });

        const { uid } = firebase.auth().currentUser;
        firebase.database().ref(`/users/${uid}/profile/uname`).once('value').then((snapshot) => {
            this.props.name(snapshot.val());
        })
        .catch((error) => console.log(error));
        this.props.showLogin();
    }

    signUp() {
        const { email, password, confirm } = this.state;
        if(password.length < 8) {
            this.fail(ERR.short);
            return;
        }

        if(password === confirm) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.signUpSuccess.bind(this))
                .catch((error) => {
                    console.log(`Error code: ${error.code}\nMessage: ${error.message}`);
                    switch(error.code) {
                        case "auth/invalid-email":
                            this.fail(ERR.emailFormat);
                            break;
                        case "auth/email-already-in-use":
                            this.fail(ERR.exists);
                            break;
                        default:
                            this.fail(ERR.other);
                            console.log(error.code);
                    }
                });
        } else {
            this.fail(ERR.noMatch);
        }
    }

    signUpSuccess() {
        const { name } = this.state;
        const { uid } = firebase.auth().currentUser;
        // console.log(uid);
        this.props.name(name);
        firebase.database().ref(`/users/${uid}/profile/uname`).set(name);
        this.setState({ email: "", password: "", confirm: "", name: "", loading: false, error: ERR.clear });
        this.props.showLogin();
    }

    fail(error) {
        this.setState({ password: "", confirm: "", error });
    }

    renderForm() {
        if(this.state.type === IN) {
            return(
                <div className="login-form">
                    <h3>Sign In</h3>
                    <div className="input-group">
                        {/* <label for="email">Email:</label> */}
                        <input
                            placeholder="Email"
                            type="email"
                            id="email"
                            className="text-input" 
                            value={this.state.email}
                            onChange={this.emailChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            placeholder="Password"
                            type="password"
                            className="text-input"
                            value={this.state.password}
                            onChange={this.passwordChange}
                            required
                        />
                        {/* <i><FontAwesomeIcon icon={faEye} /></i> */}
                    </div>
                    <div className="input-group auth-error">{this.state.error}</div>
                    <div className="input-group">
                        <button
                            className="sign-button"
                            onClick={this.signIn}
                        >
                            Sign In
                        </button>
                    </div>

                    <div className="input-group">
                        <button
                            className="text-button"
                            onClick={() => this.setState({ type: UP, email: "", password: "", confirm: "", name: "", error: ERR.clear })}
                        >
                            <u>Sign Up</u>
                        </button>
                    </div>
                    {/* <div className="input-group">
                        <button
                            className="text-button"
                        >
                            <u>Forgot Password</u>
                        </button>
                    </div> */}
                    <div className="input-group">
                        <button 
                            className="text-button"
                            onClick={() => this.props.showLogin()}
                        >
                            <u>Cancel</u>
                        </button>
                    </div>
                </div>
            );
        } else if(this.state.type === UP) {
            return(
                <div className="login-form">
                    <h3>Sign Up</h3>
                    <div className="input-group">
                        <label htmlFor="nickname" className="input-labels">Name</label>
                        <input
                            placeholder="Nickname"
                            id="nickname"
                            className="text-input"
                            value={this.state.name}
                            onChange={this.nameChange}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email" className="input-labels">Email</label>
                        <input
                            placeholder="Email"
                            type="email"
                            id="email"
                            className="text-input"
                            value={this.state.email}
                            onChange={this.emailChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="input-labels">Password (min 8 characters)</label>
                        <input
                            placeholder="Password"
                            type="password"
                            id="password"
                            className="text-input"
                            value={this.state.password}
                            onChange={this.passwordChange}
                            required
                            minLength="8"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            placeholder="Confirm Password"
                            type="password"
                            className="text-input"
                            value={this.state.confirm}
                            onChange={this.confirmChange}
                            required
                        />
                    </div>
                    <div className="input-group auth-error">{this.state.error}</div>
                    <div className="input-group">
                        <button
                            className="sign-button"
                            onClick={this.signUp}
                        >
                            Sign Up
                        </button>
                    </div>
                    <div className="input-group">
                        <button 
                            className="text-button"
                            onClick={() => this.setState({ type: IN, email: "", password: "", confirm: "", name: "", error: ERR.clear })}
                        >
                            <u>Cancel</u>
                        </button>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderForm()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { settings, userdata } = state;
    return { settings, userdata };
}

const LoginPage = connect(mapStateToProps, { showLogin, name })(Login);

export { LoginPage };
