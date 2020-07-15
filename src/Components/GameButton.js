import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup } from 'reactstrap';
import './GameButton.css';
import '../Teams/TeamColors.css';
import { gameResult } from './../Actions';
import { bindActionCreators } from 'redux';

class GameSelector extends Component {
    constructor(props) {
        super(props);
        this.state = { pressed: false };
    }

    render() {
        const { game } = this.props;
        const hometeam = Object.values(game.home)[0];
        const awayteam = Object.values(game.away)[0];
    
        return (
            <div className="Group">
                <div>
                    <small>{game.time}</small>
                </div>
                <ButtonGroup>
                    <button 
                        className={`HomeTeam-Button ${hometeam}`}
                        onClick={() => {
                            this.props.gameResult({ winner: game.home, loser: game.away }, this.state.pressed)
                            this.setState({ pressed: true });
                        }}
                    >
                        {hometeam}
                    </button>
                    <button 
                        className="Tie-Button"
                        onClick={() => {
                            this.props.gameResult({ home: game.home, away: game.away }, this.state.pressed, true)
                            this.setState({ pressed: true });
                        }}
                    >
                        Tie
                    </button>
                    <button
                        className={`AwayTeam-Button ${awayteam}`}
                        onClick={() => {
                            this.props.gameResult({winner: game.away, loser: game.home }, this.state.pressed)
                            this.setState({ pressed: true });    
                        }}
                    >
                        {awayteam}
                    </button>
                </ButtonGroup>
            </div>
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