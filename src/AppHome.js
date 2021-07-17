import React, { Component } from 'react';
import { Collapse, Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import ReactMarkdown from 'react-markdown';
import { getGameGrid, getGameList, getSchedule } from './Actions';
import {
    WeekHolder,
    TeamHolder,
    SettingsMenu,
    StandingsHolder,
    InstructionsButton,
    AboutButton,
    LoginButton,
    LoginPage,
    ProfilePage,
    SaveButton,
    LoadButton
} from './Components';
import { scrapeSchedule } from './Schedule/ScheduleReader';
import AboutPath from './About.md';
import InstructionsPath from './Instructions.md';
import './App.css';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFootballBall } from '@fortawesome/free-solid-svg-icons';
// <FontAwesomeIcon icon={faFootballBall} rotation={45} />

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { about: null, instr: null };
    }

    componentDidMount() {
        this.props.getGameGrid(2021);
        this.props.getGameList(2021);
        this.props.getSchedule(2021);

        fetch(AboutPath).then((response) => response.text()).then((text) => {
            // console.log(text);
            this.setState({ about: text });
        })
        .catch(err => console.log(err));

        fetch(InstructionsPath).then((response) => response.text()).then((text) => {
            // console.log(text);
            this.setState({ instr: text });
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

    renderBody() {
        let m = '';
        if(isMobile) {
            m = 'mobile';
        }

        if(!this.props.settings.showLogin) {
            return (
                <div className="Body">
                    <div className="App-Body">
                        <Collapse isOpen={this.props.settings.showAbout} className="Collapse">
                            <Card className="Card">
                                <CardBody>
                                    <ReactMarkdown children={this.state.about} linkTarget="_blank" className="md" />
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>

                    <div className="App-Body">
                        <Collapse isOpen={this.props.settings.showInstructions} className="Collapse">
                            <Card className="Card">
                                <CardBody>
                                    <ReactMarkdown children={this.state.instr} className="md" />
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
                </div>
            );
        } else {
            if(this.props.userdata.name === null)
                return <LoginPage />;
            else
                return <ProfilePage />;
        }
    }

    render() {
        return(
            <div className="App">
                <header className="App-header">
                    <b className="title">NFL Season Predictor</b>
                </header>

                <h2 className="App-subheader">
                    <LoginButton />
                    {/* {this.scrapeButton()} */}
                    <AboutButton />
                    <InstructionsButton />
                    <SettingsMenu />
                </h2>

                {this.renderBody()}

                {this.props.userdata.name!==null && <footer className="App-Footer">
                    <SaveButton />
                    <LoadButton />
                </footer>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { settings, userdata } = state;
    return { settings, userdata };
};

const AppHome = connect(mapStateToProps, { getGameGrid, getGameList, getSchedule })(Home);

export { AppHome };