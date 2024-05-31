import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup } from 'reactstrap';
import { sortConfrence } from '../../Actions/SortStandings';
import { AFC, NFC } from '../../Actions/Constants';
import { CreateNFL } from '../../Teams/NFL_Teams';
import * as logos from '../../Teams/Logos';
import { numToRoman } from '../../Schedule/RomanNumerals';
import Lombardi from '../../Schedule/LombardiTrophy.png';
import './CSS/PlayoffPicker.css';
import '../../Teams/TeamColors.css';


class PostSeasonPickerClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            1: {
                "AFC": [2,3,4,5,6,7],
                "NFC": [2,3,4,5,6,7]                
            },
            2: {
                "AFC": [1],
                "NFC": [1]
            },
            3: {
                "AFC": [],
                "NFC": []
            },
            4: {
                "AFC": [],
                "NFC": []
            },
            champion: null
        };
    }

    resetBrackets() {
        this.setState({
            1: {
                "AFC": [2,3,4,5,6,7],
                "NFC": [2,3,4,5,6,7]                
            }, 2: {
                "AFC": [1],
                "NFC": [1]
            },
            3: {
                "AFC": [],
                "NFC": []
            },
            4: {
                "AFC": [],
                "NFC": []
            },
            champion: null
        });
    }

    updateBrackets(round, confrence, advancing_seed, alternate_seed) {
        const next_round = round + 1;
        const next_round_state = this.state[next_round];

        // remove alternate seed
        const idx = next_round_state[confrence].indexOf(alternate_seed);
        if(idx !== -1)
            next_round_state[confrence].splice(idx, 1);
        
        // add the advancing seed and sort
        next_round_state[confrence].push(advancing_seed)
        next_round_state[confrence].sort((a,b) => a-b);

        // update state
        const AFC3 = this.state[3][AFC];
        const AFC4 = this.state[4][AFC];
        const NFC3 = this.state[3][NFC];
        const NFC4 = this.state[4][NFC];
        if(next_round === 2) {
            if(confrence === AFC) {
                this.setState({
                    2: next_round_state,
                    3: { "AFC": [], "NFC": NFC3 },
                    4: { "AFC": [], "NFC": NFC4 },
                    champion: null
                 });
            } else {
                this.setState({
                    2: next_round_state,
                    3: { "AFC": AFC3, "NFC": [] },
                    4: { "AFC": AFC4, "NFC": [] },
                    champion: null
                 });
            }
        } else if(next_round === 3) {
            if(confrence == AFC) {
                this.setState({
                    3: next_round_state,
                    4: { "AFC": [], "NFC": NFC4 },
                    champion: null
                });
            } else {
                this.setState({
                    3: next_round_state,
                    4: { "AFC": AFC4, "NFC": [] },
                    champion: null
                });
            }
        } else if(next_round === 4) {
            this.setState({ 4: next_round_state });
        } else {
            console.error("This should never happen")
        }
        // console.log(this.state);
    }

    renderChampion(LOGO, afc_team, nfc_team) {
        if(this.state.champion === AFC) {
            return (
                <button disabled className={`Champion ${afc_team}`}>
                    {LOGO ? <img src={logos[afc_team]} alt='AFC_SB' className='Champion-Image' /> : afc_team}
                </button>
            );
        } else if(this.state.champion === NFC) {
            return (
                <button disabled className={`Champion ${nfc_team}`}>
                    {LOGO ? <img src={logos[nfc_team]} alt='NFC_SB' className='Champion-Image' /> : nfc_team}
                </button>
            );
        } else {
            return <button disabled className="invisible"></button>;
        }
    }

    renderPlayoffGameButton(round, higherSeed, lowerSeed, confrence_data, confrence) {
        const LOGO = this.props.settings.logo;
        let allowPick = true;
        if(!this.props.settings.playoffsNow)
            allowPick = false;
        
        if(round === 4) {
            const AFC_Champ = this.state[round][AFC];
            const NFC_Champ = this.state[round][NFC];
            let afc_team = null;
            let nfc_team = null;
            let afc_glow = '';
            let nfc_glow = '';

            if(AFC_Champ.length !== 1 || NFC_Champ.length !== 1) {
                allowPick = false;
            }

            if(AFC_Champ.length === 1) {
                afc_team = this.state.DATA[AFC][AFC_Champ[0]-1].abrv;
            }
            if(NFC_Champ.length === 1) {
                nfc_team = this.state.DATA[NFC][NFC_Champ[0]-1].abrv;
            }

            if(this.state.champion === AFC) {
                afc_glow = 'glow';
            } else if(this.state.champion === NFC) {
                nfc_glow = 'glow';
            } else {
                afc_glow = '';
                nfc_glow = '';
            }

            return (
                <div className='Round-Holder'>
                    <ButtonGroup className='playoff-button-group'>
                        {afc_team !== null ? <button disabled={!allowPick} className={`Team-Button ${afc_team} ${afc_glow}`}
                        onClick={() => this.state.champion !== AFC ? this.setState({ champion: AFC }) : this.setState({ champion: null })}>
                            {LOGO ? <img src={logos[afc_team]} alt={`${afc_team}_SB`} /> : afc_team}
                        </button> : <button className='Empty-Button' disabled/>}
                        <button disabled className="Playoff-Middle-Button">VS</button>
                        {nfc_team !== null ? <button disabled={!allowPick} className={`Team-Button ${nfc_team} ${nfc_glow}`}
                        onClick={() => this.state.champion !== NFC ? this.setState({ champion: NFC }) : this.setState({ champion: null })}>
                            {LOGO ? <img src={logos[nfc_team]} alt={`${nfc_team}_SB`} /> : nfc_team}
                        </button> : <button className='Empty-Button' disabled/>}
                    </ButtonGroup>
                    {this.renderChampion(LOGO, afc_team, nfc_team)}
                </div>
            );
        } else {
            let homeTeam = null;
            let awayTeam = null;
            let away_glow = '';
            let home_glow = '';
            if(higherSeed !== null) {
                homeTeam = confrence_data[higherSeed-1].abrv;
            } else {
                allowPick = false;
            }
            if(lowerSeed !== null) {
                awayTeam = confrence_data[lowerSeed-1].abrv;
            } else {
                allowPick = false;
            }
            
            if(this.state[round+1][confrence].indexOf(higherSeed) !== -1) {
                home_glow = 'glow';
            }
            if(this.state[round+1][confrence].indexOf(lowerSeed) !== -1) {
                away_glow = 'glow';
            }
            
            return (
                <ButtonGroup className="playoff-button-group">
                    {awayTeam !== null ? <button disabled={!allowPick} className={`Team-Button ${awayTeam} ${away_glow}`}
                    onClick={() => this.updateBrackets(round, confrence, lowerSeed, higherSeed)}>
                        {LOGO ? <img src={logos[awayTeam]} alt={`${awayTeam}_round${round}`} /> : awayTeam}
                    </button> : <button className='Empty-Button' disabled/>}
                    <button disabled className='Playoff-Middle-Button'>
                        @
                    </button>
                    {homeTeam !== null ? <button disabled={!allowPick} className={`Team-Button ${homeTeam} ${home_glow}`}
                    onClick={() => this.updateBrackets(round, confrence, higherSeed, lowerSeed)}>
                        {LOGO ? <img src={logos[homeTeam]} alt={`${homeTeam}_round${round}`} /> : homeTeam}
                    </button> : <button className='Empty-Button' disabled/>}
                </ButtonGroup>
            );
        }
    }

    getTeam(round, confrence, seed) {
        if((round === 2 && this.state[round][confrence].length === 4) ||
           (round === 3 && this.state[round][confrence].length === 2)) {
            return this.state[round][confrence][seed-1];
        } else {
            return null;
        }
    }

    renderButtons(round, confrence, data) {
        if(data !== undefined) {
            if(round === 1) {
                return (
                    <div className="Round-Holder">
                        {this.renderPlayoffGameButton(round, 2, 7, data[confrence], confrence)}
                        {this.renderPlayoffGameButton(round, 3, 6, data[confrence], confrence)}
                        {this.renderPlayoffGameButton(round, 4, 5, data[confrence], confrence)}
                    </div>
                );
            } else if(round === 2) {
                return (
                    <div className='Round-Holder'>
                        {this.renderPlayoffGameButton(round, 1, this.getTeam(round, confrence, 4), data[confrence], confrence)}
                        {this.renderPlayoffGameButton(round, this.getTeam(round, confrence, 2), this.getTeam(round, confrence, 3), data[confrence], confrence)}
                    </div>
                );
            } else if(round === 3) {
                return (
                    <div className='Round-Holder'>
                        {this.renderPlayoffGameButton(round, this.getTeam(round, confrence, 1), this.getTeam(round, confrence, 2), data[confrence], confrence)}
                    </div>
                );
            } else if(round === 4) {
                return this.renderPlayoffGameButton(round, null, null, null, null);
            } else {
                console.error("Invalid round");
                return null;
            }
        }
    }

    componentDidMount() {
        const league = CreateNFL(this.props.NFL);
        const AFC_DATA = sortConfrence(league[`AFC_East`].concat(league[`AFC_North`]).concat(league[`AFC_South`]).concat(league[`AFC_West`])).slice(0,7);
        const NFC_DATA = sortConfrence(league[`NFC_East`].concat(league[`NFC_North`]).concat(league[`NFC_South`]).concat(league[`NFC_West`])).slice(0,7);
        const DATA = { AFC: AFC_DATA, NFC: NFC_DATA };
        this.setState({ DATA: DATA });
    }

    componentDidUpdate() {
        const league = CreateNFL(this.props.NFL);
        const AFC_DATA = sortConfrence(league[`AFC_East`].concat(league[`AFC_North`]).concat(league[`AFC_South`]).concat(league[`AFC_West`])).slice(0,7);
        const NFC_DATA = sortConfrence(league[`NFC_East`].concat(league[`NFC_North`]).concat(league[`NFC_South`]).concat(league[`NFC_West`])).slice(0,7);
        const DATA = { AFC: AFC_DATA, NFC: NFC_DATA };
        if(JSON.stringify(DATA) !== JSON.stringify(this.state.DATA)) {
            this.resetBrackets();
            this.setState({ DATA: DATA });
        }
    }

    render() {
        const FACTOR = 1965;
        const SB_ROMAN = numToRoman(this.props.settings.season - FACTOR);
        return (
            <div className='outer'>
                <div className="msg-text">
                    {!this.props.settings.playoffsNow ? 'You must pick all season games before the playoffs or enable playoffs now': null}
                </div>
                <div className="Post-Season-Main">
                    <div className="Post-Season-Brackets">
                        <h3>AFC Wildcard</h3>
                        {this.renderButtons(1, AFC, this.state.DATA)}
                    </div>
                    <div className="Post-Season-Brackets">
                        <h3>AFC Divisional</h3>
                        {this.renderButtons(2, AFC, this.state.DATA)}
                    </div>
                    <div className="Post-Season-Brackets">
                        <h3>AFC Championship</h3>
                        {this.renderButtons(3, AFC, this.state.DATA)}
                    </div>
                    <div className="Post-Season-Brackets">
                        <h3>{`Super Bowl ${SB_ROMAN}`}</h3>
                        {this.renderButtons(4, null, this.state.DATA)}
                        <img src={Lombardi} alt="Lombardi Trophy" className="trophy" />
                    </div>
                    <div className="Post-Season-Brackets">
                        <h3>NFC Championship</h3>
                        {this.renderButtons(3, NFC, this.state.DATA)}
                    </div>
                    <div className="Post-Season-Brackets">
                        <h3>NFC Divisional</h3>
                        {this.renderButtons(2, NFC, this.state.DATA)}
                    </div>
                    <div className="Post-Season-Brackets">
                        <h3>NFC Wildcard</h3>
                        {this.renderButtons(1, NFC, this.state.DATA)}
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    const { NFL, settings } = state;
    return { NFL, settings };
};

const PostSeasonPicker = connect(mapStateToProps, {})(PostSeasonPickerClass);

export { PostSeasonPicker };
