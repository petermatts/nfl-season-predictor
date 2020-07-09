import React from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import './GameButton.css';
import '../Teams/TeamColors.css';

const GameButton = ({ game }) => {
    const hometeam = Object.keys(game.home)[0];
    const awayteam = Object.keys(game.away)[0];
    return (
        <div className="Group">
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