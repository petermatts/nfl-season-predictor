import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SettingsMenu, WeekHolder, StandingsHolder } from './Components';
import { getSchedule } from './Schedule/ScheduleReader';
import './App.css'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFootballBall } from '@fortawesome/free-solid-svg-icons';
/* <FontAwesomeIcon icon={faFootballBall} rotation={45} /> */

class Home extends Component { 
    // constructor(props) {
    //     super(props);
    // }

    //
    scrapeButton() {
        return (
            <button onClick={() => {
                getSchedule(2021);
            }}>
                scrape
            </button>
        );
    }

    pickStyle() {
        if(this.props.settings.pickByTeam) {
            return null;
        } else {
            return <WeekHolder />
        }
    }

    render() {
        return(
            <div className="App">
                <header className="App-header">
                    <b className="title">NFL Season Predictor</b>
                    {/* {this.scrapeButton()} //! for dev use only */}
                    <SettingsMenu />                 
                </header>

                {/* <h2 className="App-subheader">
                    2021
                </h2> */}

                <div className="App-Body">
                    <div className="main-section">
                        {this.pickStyle()}
                    </div>
                    <div className="main-section">
                        <StandingsHolder />
                    </div>
                </div>
                <footer className="App-Footer" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { settings } = state;
    return { settings };
};

const AppHome = connect(mapStateToProps, {})(Home);

export { AppHome };