import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TeamPicker, TeamSelector } from '../PickStuff';
import { ProgressBar } from '../../Components';
import './CSS/TeamHolder.css';

class Holder extends Component {
    render() {
        return(
            <div className="teamHolder">
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
