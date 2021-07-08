import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLogin } from '../Actions'; 
import './CSS/LoginButton.css';

class LogButton extends Component {
    render() {
        let title = 'Sign In';
        if(this.props.userdata.name !== null)
            title = this.props.userdata.name;

        return (
            <div className="loginButtonHolder">
                <button
                    className="loginButton"
                    disabled={this.props.userdata.name===null && this.props.settings.showLogin}
                    onClick={() => this.props.showLogin() }
                >
                    {title}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { settings, userdata } = state;
    return { settings, userdata };
};

const LoginButton = connect(mapStateToProps, { showLogin })(LogButton);

export { LoginButton };
