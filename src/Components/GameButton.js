import React from 'react';
import { ButtonGroup } from 'reactstrap';
import './GameButton.css';
import '../Teams/TeamColors.css';

const GameButton = ({ game }) => {
    const hometeam = Object.values(game.home)[0];
    const awayteam = Object.values(game.away)[0];
    return (
        <div className="Group">
            <div>
                <small>{game.time}</small>
            </div>
            <ButtonGroup>
                <button className={`HomeTeam-Button ${hometeam}`}>
                    {hometeam}
                </button>
                <button className="Tie-Button">
                    Tie
                </button>
                <button className={`AwayTeam-Button ${awayteam}`}>
                    {awayteam}
                </button>
            </ButtonGroup>
        </div>
    );
};

export { GameButton };