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
                <Button className={`HomeTeam-Button ${hometeam}`} value="Home">
                    {hometeam}
                </Button>
                <Button className="Tie-Button" value="Tie">
                    Tie
                </Button>
                <Button className={`AwayTeam-Button ${awayteam}`} value="Away">
                    {awayteam}
                </Button>
            </ButtonGroup>
        </div>
    );
};

export { GameButton };