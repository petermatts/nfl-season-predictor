import React, { Component } from 'react';
import { Collapse, Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import ReactMarkdown from 'react-markdown';
import { getGameGrid, getGameList, getSchedule } from './Actions';
import { WeekHolder, TeamHolder, SettingsMenu, StandingsHolder, Instructions, AboutButton } from './Components';
import { scrapeSchedule } from './Schedule/ScheduleReader';
import ReadMePath from './README.md';
import './App.css';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFootballBall } from '@fortawesome/free-solid-svg-icons';
/* <FontAwesomeIcon icon={faFootballBall} rotation={45} /> */

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { README: null };
    }

    componentDidMount() {
        this.props.getGameGrid(2021);
        this.props.getGameList(2021);
        this.props.getSchedule(2021);

        fetch(ReadMePath).then((response) => response.text()).then((text) => {
            // console.log(text);
            this.setState({ README: text })
        })
        .catch(err => console.log(err));
    }

    /**
     * ! This button is for dev use ONLY
     */
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
                </header>

                <h2 className="App-subheader">
                    {/* {this.scrapeButton()} */}
                    <AboutButton />
                    <Instructions />
                    <SettingsMenu />
                </h2>

                <div className="App-Body">
                    <Collapse isOpen={this.props.settings.showAbout} className="Collapse">
                        <Card className="Card">
                            <CardBody>
                                <ReactMarkdown children={this.state.README} className="md" />
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>

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