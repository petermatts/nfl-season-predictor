import React, { Component } from 'react';
import { connect } from 'react-redux';

class Settings extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return null;
    }
}

const mapStateToProps = (state) => {
    const { settings } = state;
    return { settings }
}

const SettingsMenu = connect(mapStateToProps, {})(Settings);

export { SettingsMenu };
