import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { name, showLogin } from '../Actions';
import './CSS/LoginPage.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "" };

        this.signOut = this.signOut.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.updateName = this.updateName.bind(this);
    }

    nameChange(event) { this.setState({ name: event.target.value }); }

    updateName() { 
        const { name } = this.state;
        const user = firebase.auth().currentUser;
        this.props.name(name);
        user.updateProfile({ displayName: name });
        // firebase.database().ref(`/users/${uid}/profile/uname`).set(name);
    }

    componentDidMount() {
        const { name } = this.props.userdata;
        if(name !== null)
            this.setState({ name });
    }

    signOut() {
        firebase.auth().signOut()
            .then(() => console.log('signed out'))
            .catch((error) => console.log(error));

        this.props.name(null);
        this.props.showLogin();
    }

    signOutButton() {
        return (
            <div className="input-group">
                <button
                    className="sign-button"
                    onClick={this.signOut}
                >
                    Sign out
                </button>
            </div>
        );
    }

    nickname() {
        return (
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
                {this.state.name !== this.props.userdata.name && <button
                    className="sign-button"
                    onClick={this.updateName}
                >
                    Update Change
                </button>}
            </div>
        );
    }

    render() {
        return (
            <div>
                <h3>Profile</h3>
                {this.nickname()}
                {this.signOutButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { userdata } = state;
    return { userdata };
}

const ProfilePage = connect(mapStateToProps, { name, showLogin })(Profile);

export { ProfilePage };
