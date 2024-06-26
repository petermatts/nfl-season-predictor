import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup } from 'reactstrap';
import './CSS/GameButton.css';
import '../../Teams/TeamColors.css';
import { gameResult, updateUserGamePicks } from '../../Actions';
import { homewin, awaywin, tiegame } from '../../Actions/Constants';
import { teamHash } from '../../Teams/Team';
import * as logos from '../../Teams/Logos';

class GameSelector extends Component {
    getGridLocations(gameId, week, home, away) {
        const { gamegrid } = this.props.schedule;
        const result = {};
        for(let i = 0; i < gamegrid.length; i++) {
            if(gamegrid[i][week-1] === gameId) {
                if(i === teamHash(home.abrv))
                    Object.assign(result, { home: i });

                if(i === teamHash(away.abrv))
                    Object.assign(result, { away: i });
            }
        }
        return result;
    }

    render() {
        const LOGO = this.props.settings.logo;
        const gameId = this.props.game.hash;
        const pick = this.props.userdata.gamelist[gameId];
        const home = this.props.NFL[this.props.game.home];
        const away = this.props.NFL[this.props.game.away];
        const { week } = this.props;
        const gridLoc = this.getGridLocations(gameId, week, home, away);

        let glowHome, glowAway, glowTie;
        if(pick === homewin) {
            glowHome = 'glow';
            glowTie ='';
            glowAway ='';
        } else if(pick === tiegame) {
            glowHome = '';
            glowTie ='glow';
            glowAway ='';
        } else if(pick === awaywin) {
            glowHome = '';
            glowTie ='';
            glowAway ='glow';
        }

        return (
            <ButtonGroup className="button-group">
                <button
                    className={`AwayTeam-Button ${away.abrv} ${glowAway}`}
                    disabled={glowAway==='glow'}
                    onClick={() => {
                        this.props.updateUserGamePicks(gameId, awaywin, gridLoc, week);
                        this.props.gameResult({winner: away, loser: home }, gameId);  
                    }}
                >
                    {LOGO ? <img src={logos[away.abrv]} alt={away.abrv} /> : away.abrv}
                </button>
                <button 
                    className={`Tie-Button ${glowTie}`}
                    disabled={glowTie==='glow'}
                    onClick={() => {
                        this.props.updateUserGamePicks(gameId, tiegame, gridLoc, week);
                        this.props.gameResult({ home, away }, gameId);
                    }}
                >
                    @
                </button>
                <button 
                    className={`HomeTeam-Button ${home.abrv} ${glowHome}`}
                    disabled={glowHome==='glow'}
                    onClick={() => {
                        this.props.updateUserGamePicks(gameId, homewin, gridLoc, week);
                        this.props.gameResult({ winner: home, loser: away }, gameId);
                    }}
                >
                    {LOGO ? <img src={logos[home.abrv]} alt={home.abrv} /> : home.abrv}
                </button>
            </ButtonGroup>
        );   
    }
}

const mapStateToProps = (state) => {
    const { NFL, userdata, schedule, settings } = state;
    return { NFL, userdata, schedule, settings };
};

const GameButton = connect(mapStateToProps, { gameResult, updateUserGamePicks })(GameSelector);
export { GameButton };