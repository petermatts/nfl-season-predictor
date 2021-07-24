import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showAbout } from '../Actions'; 
import './CSS/About.css';

class About extends Component {
    render() {
        return (
            <div className="aboutHolder">
                <button
                    className="aboutButton"
                    id="about"
                    disabled={this.props.settings.showLogin}
                    onClick={() => this.props.showAbout() }
                >
                    About
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { settings } = state;
    return { settings };
}

const AboutButton = connect(mapStateToProps, { showAbout })(About);

export { AboutButton };
