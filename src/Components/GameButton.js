import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup } from 'reactstrap';
import './GameButton.css';
import '../Teams/TeamColors.css';
import { gameResult } from './../Actions/TeamActions';

class GameSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                        type="button"
                        onClick={gameResult({ winner: hometeam, loser: awayteam })}
                    >
                        {hometeam}
                    </button>
                    <button 
                        className="Tie-Button"
                        type="button"
                        onClick={gameResult("Tie")}
                    >
                        Tie
                    </button>
                    <button
                        className={`AwayTeam-Button ${awayteam}`}
                        type="button"
                        onClick={gameResult({ winner: awayteam, loser: hometeam })}
                    >
                        {awayteam}
                    </button>
                </ButtonGroup>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {};
};

const GameButton = connect(mapStateToProps, {})(GameSelector);
export { GameButton };