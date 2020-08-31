/* eslint-disable eqeqeq */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup } from 'reactstrap';
import './GameButton.css';
import '../Teams/TeamColors.css';
import { gameResult } from '../Actions';

class GameSelector extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hometeam: null,
            awayteam: null,
            pressed: false,
            homepress: false,
            awaypress: false, 
            tiepress: false
        };
    }

    checkPressed() {
        const { NFL, game, week } = this.props;

        let t1 = false;
        let t2 = false;

        if(NFL[game.home].wins[week-1] !== null) {
            t1 = true;
            this.setState({ homepress: true });
        } else if(NFL[game.away].wins[week-1] !== null) {
            t2 = true;
            this.setState({ awaypress: true });
        } else if(NFL[game.home].ties[week-1] !== null && NFL[game.away].ties[week-1] !== null) {
            this.setState({ tiepress: true });
        }

        this.setState({ pressed: t1 && t2 });
    }

    componentDidMount() {
        const h_abrv = this.props.game.home;
        const a_abrv = this.props.game.away;

        this.setState({
            hometeam: this.props.NFL[h_abrv], 
            awayteam: this.props.NFL[a_abrv]
        });

        this.checkPressed();
    }

    render() {
        //console.log(this.state.pressed)
        if(this.state.hometeam !== null) {
            const { game } = this.props;
            const home = this.state.hometeam;
            const away = this.state.awayteam;
            const gameWeek = this.props.week;
            const pressed = this.state.pressed;
            const { code } = game; // ? get rid of this in 2020.js first

            if(code == 1)
                console.log(this.state);
    
            let glowHome, glowAway, glowTie;
            if(this.state.homepress) {
                glowHome = 'glow';
                glowTie ='';
                glowAway ='';
            } else if(this.state.tiepress) {
                glowHome = '';
                glowTie ='glow';
                glowAway ='';
            } else if(this.state.awaypress) {
                glowHome = '';
                glowTie ='';
                glowAway ='glow';
            }
    
            return (
                <ButtonGroup>
                    <button 
                        className={`HomeTeam-Button ${home.abrv} ${glowHome}`}
                        disabled={this.state.homepress}
                        onClick={() => {
                            this.props.gameResult({ winner: home, loser: away }, pressed, gameWeek, code, false );     
                            this.setState({ pressed: true, homepress: true, awaypress: false, tiepress: false });
                        }}
                    >
                        {home.abrv}
                    </button>
                    <button 
                        className={`Tie-Button ${glowTie}`}
                        disabled={this.state.tiepress}
                        onClick={() => {
                            this.props.gameResult({ home, away }, pressed, gameWeek, code , true);
                            this.setState({ pressed: true, tiepress: true, awaypress: false, homepress: false });
                        }}
                    >
                        Tie
                    </button>
                    <button
                        className={`AwayTeam-Button ${away.abrv} ${glowAway}`}
                        disabled={this.state.awaypress}
                        onClick={() => {
                            this.props.gameResult({winner: away, loser: home }, pressed, gameWeek, code, false );
                            this.setState({ pressed: true, awaypress: true, tiepress: false, homepress: false });    
                        }}
                    >
                        {away.abrv}
                    </button>
                </ButtonGroup>
            );
        } else {
            return null;
            // ! spinner?
        }
       
    }
}

const mapStateToProps = (state) => {
    const { NFL } = state;
    return { NFL };
};

const GameButton = connect(mapStateToProps, { gameResult })(GameSelector);
export { GameButton };