import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup } from 'reactstrap';
import './GameButton.css';
import '../Teams/TeamColors.css';
import { gameResult } from './../Actions';
import { bindActionCreators } from 'redux';

class GameSelector extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { pressed: false, home: false, tie: false, away: false };
    }

    render() {
        const { game } = this.props;
        const hometeam = Object.values(game.home)[0];
        const awayteam = Object.values(game.away)[0];

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
                        this.props.gameResult({ winner: game.home, loser: game.away }, this.state.pressed)
                        this.setState({ pressed: true, home: true, tie: false, away: false });
                    }}
                >
                    {hometeam}
                </button>
                <button 
                    className={`Tie-Button ${glowTie}`}
                    onClick={() => {
                        this.props.gameResult({ home: game.home, away: game.away }, this.state.pressed, true)
                        this.setState({ pressed: true, home: false, tie: true, away: false });
                    }}
                >
                    Tie
                </button>
                <button
                    className={`AwayTeam-Button ${awayteam} ${glowAway}`}
                    onClick={() => {
                        this.props.gameResult({winner: game.away, loser: game.home }, this.state.pressed)
                        this.setState({ pressed: true, home: false, tie: false, away: true });    
                    }}
                >
                    {awayteam}
                </button>
            </ButtonGroup>
        );
    }
}

// const mapStateToProps = (state) => {
//     const { NFL } = state;
//     return { NFL }; 
// };

const mapDispatchToProps = (dispatch, ownProps) => {
    const boundActions = bindActionCreators({ gameResult }, dispatch);
    return {
        gameResult: () => dispatch(gameResult()),
        ...boundActions,
        dispatch
    }
};

const GameButton = connect(null, mapDispatchToProps)(GameSelector);
export { GameButton };