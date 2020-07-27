import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup } from 'reactstrap';
import './GameButton.css';
import '../Teams/TeamColors.css';
import { gameResult, updateSchedule } from './../Actions';
import { bindActionCreators } from 'redux';

class GameSelector extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { home: false, tie: false, away: false };
    }

    render() {
        const { game } = this.props;
        const hometeam = Object.values(game.home)[0];
        const awayteam = Object.values(game.away)[0];
        const gameWeek = `week${this.props.week}`;
        const pressed = this.props.game.picked;

        if(pressed) {
            const { winner } = this.props.game;
            if(winner === hometeam)
                this.setState({ home: true, away: false, tie: false });
            else if(winner === awayteam)
                this.setState({ home: false, away: true, tie: false });
            else if(winner === null)
                this.setState({ home: false, away: false, tie: true });
        }

        let glowHome, glowAway, glowTie;
        if(this.state.home) {
            glowHome = 'glow';
            glowTie ='';
            glowAway ='';
        } else if(this.state.tie) {
            glowHome = '';
            glowTie ='glow';
            glowAway ='';
        } else if(this.state.away) {
            glowHome = '';
            glowTie ='';
            glowAway ='glow';
        }

        return (
            <ButtonGroup>
                <button 
                    className={`HomeTeam-Button ${hometeam} ${glowHome}`}
                    onClick={() => {
                        this.props.gameResult({ winner: game.home, loser: game.away }, pressed);
                        this.props.updateSchedule(gameWeek, false, hometeam);
                        this.setState({ pressed: true, home: true, tie: false, away: false });
                    }}
                >
                    {hometeam}
                </button>
                <button 
                    className={`Tie-Button ${glowTie}`}
                    onClick={() => {
                        this.props.gameResult({ home: game.home, away: game.away }, pressed, true);
                        this.props.updateSchedule(gameWeek, true, hometeam, awayteam);
                        this.setState({ pressed: true, home: false, tie: true, away: false });
                    }}
                >
                    Tie
                </button>
                <button
                    className={`AwayTeam-Button ${awayteam} ${glowAway}`}
                    onClick={() => {
                        this.props.gameResult({winner: game.away, loser: game.home }, pressed);
                        this.props.updateSchedule(gameWeek, false, awayteam);
                        this.setState({ pressed: true, home: false, tie: false, away: true });    
                    }}
                >
                    {awayteam}
                </button>
            </ButtonGroup>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const boundActions = bindActionCreators({ gameResult, updateSchedule }, dispatch);
    return {
        gameResult: () => dispatch(gameResult()),
        updateSchedule: () => dispatch(updateSchedule()),
        ...boundActions,
        dispatch
    }
};

const GameButton = connect(null, mapDispatchToProps)(GameSelector);
export { GameButton };