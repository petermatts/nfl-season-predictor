import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { getGameGrid, getGameList, getSchedule } from './Actions';
import { SettingsMenu, WeekHolder, StandingsHolder, TeamHolder } from './Components';
import { scrapeSchedule } from './Schedule/ScheduleReader';
import './App.css'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFootballBall } from '@fortawesome/free-solid-svg-icons';
/* <FontAwesomeIcon icon={faFootballBall} rotation={45} /> */

class Home extends Component { 
    componentDidMount() {
        this.props.getGameGrid(2021);
        this.props.getGameList(2021);
        this.props.getSchedule(2021);
    }

    scrapeButton() {
        return (
            <button onClick={() => {
                scrapeSchedule(2021);
            }}>
                scrape
            </button>
        );
    }

    pickStyle() {
        if(this.props.settings.pickByTeam) {
            return <TeamHolder />;
        } else {
            return <WeekHolder />
        }
    }

    render() {
        let m = '';
        if(isMobile) {
            m = 'mobile';
        }

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

                <div className={`App-Body ${m}`}>
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

const AppHome = connect(mapStateToProps, { getGameGrid, getGameList, getSchedule })(Home);

export { AppHome };