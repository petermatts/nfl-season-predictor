import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TeamPicker, TeamSelector, ProgressBar } from '../Components';

class Holder extends Component {
    render() {
        return(
            <div>
                <TeamSelector />
                <TeamPicker />
                <ProgressBar />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { settings } = state;
    return { settings };
}

const TeamHolder = connect(mapStateToProps, {})(Holder);

export { TeamHolder };
