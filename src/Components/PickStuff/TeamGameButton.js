import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup } from 'reactstrap';
import { gameResult, updateUserGamePicks } from '../../Actions';
import { BYE, homewin, awaywin, tiegame } from '../../Actions/Constants';
import { teamHash } from '../../Teams/Team';
import '../../Teams/TeamColors.css';
import './CSS/TeamGameButton.css';

class TeamGameSelector extends Component {
    getGridLocations(gameId, week, team, otherTeam, isHome) {
        const { gamegrid } = this.props.schedule;
        const result = {};
        for(let i = 0; i < gamegrid.length; i++) {
            if(gamegrid[i][week-1] === gameId) {
                if(i === teamHash(team)) {
                    if(isHome)
                        Object.assign(result, { home: i });
                    else
                        Object.assign(result, { away: i });
                }

                if(i === teamHash(otherTeam)) {
                    if(isHome)
                        Object.assign(result, { away: i });
                    else
                        Object.assign(result, { home: i });
                }
            }
        }
        return result;
    }

    render() {
        const { week, gameId, team, NFL, schedule, userdata } = this.props;

        if(gameId !== 'BYE') {
            const game = schedule.gamelist[gameId];
            const pick = userdata.gamelist[gameId];
            const otherTeam = NFL[team===game.home ? game.away : game.home];
            const thisTeam = NFL[team];
            const isHome = team===game.home;
            const where = isHome ? 'VS' : '@';
            const gridLoc = this.getGridLocations(gameId, week, team, otherTeam.abrv, isHome);

            let glowThisTeam, glowOtherTeam, glowTie;
            if(isHome) {
                if(pick === homewin) {
                    glowThisTeam = 'glow';
                    glowTie ='';
                    glowOtherTeam ='';
                } else if(pick === awaywin) {
                    glowThisTeam = '';
                    glowTie ='';
                    glowOtherTeam ='glow';
                } else if(pick === tiegame) {
                    glowThisTeam = '';
                    glowTie ='glow';
                    glowOtherTeam ='';       
                }
            } else {
                if(pick === homewin) {
                    glowThisTeam = '';
                    glowTie ='';
                    glowOtherTeam ='glow';
                } else if(pick === awaywin) {
                    glowThisTeam = 'glow';
                    glowTie ='';
                    glowOtherTeam ='';
                } else if(pick === tiegame) {
                    glowThisTeam = '';
                    glowTie ='glow';
                    glowOtherTeam ='';       
                }
            }

            return (
                <ButtonGroup className="button-group">
                    <button 
                        className={`Team-Button ${team} ${glowThisTeam}`}
                        disabled={glowThisTeam==='glow'}
                        onClick={() => {
                            if(isHome) {
                                this.props.updateUserGamePicks(gameId, homewin, gridLoc, week);
                                this.props.gameResult({ winner: thisTeam, loser: otherTeam }, gameId);
                            } else {
                                this.props.updateUserGamePicks(gameId, awaywin, gridLoc, week);
                                this.props.gameResult({ winner: thisTeam, loser: otherTeam }, gameId);
                            }
                        }}
                    >
                        {team}
                    </button>
                    <button 
                        className={`Tie-Button ${glowTie}`}
                        disabled={glowTie==='glow'}
                        onClick={() => {
                            this.props.updateUserGamePicks(gameId, tiegame, gridLoc, week);
                            if(isHome) {
                                this.props.gameResult({ home: thisTeam, away: otherTeam }, gameId);
                            } else {
                                this.props.gameResult({ home: otherTeam, away: thisTeam }, gameId);
                            }
                        }}
                    >
                        {where}
                    </button>
                    <button
                        className={`Team-Button ${otherTeam.abrv} ${glowOtherTeam}`}
                        disabled={glowOtherTeam==='glow'}
                        onClick={() => {
                            if(isHome) {
                                this.props.updateUserGamePicks(gameId, awaywin, gridLoc, week);
                                this.props.gameResult({ winner: otherTeam, loser: thisTeam }, gameId);
                            } else {
                                this.props.updateUserGamePicks(gameId, homewin, gridLoc, week);
                                this.props.gameResult({ winner: otherTeam, loser: thisTeam }, gameId);
                            } 
                        }}
                    >
                        {otherTeam.abrv}
                    </button>
                </ButtonGroup>
            );
        } else {
            return (
                <ButtonGroup className="button-group">
                    <button disabled className="bye-button">
                        {BYE}
                    </button>
                </ButtonGroup>
            );
        }
    }
}

const mapStateToProps = (state) => {
    const { userdata, schedule, NFL } = state;
    return { userdata, schedule, NFL };
}

const TeamGameButton = connect(mapStateToProps, { gameResult, updateUserGamePicks })(TeamGameSelector);

export { TeamGameButton };
