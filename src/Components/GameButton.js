/* eslint-disable eqeqeq */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup } from 'reactstrap';
import './GameButton.css';
import '../Teams/TeamColors.css';
import { gameResult, updateUserGamePicks } from '../Actions';
import { homewin, awaywin, tiegame } from '../Actions/Constants';
import { teamHash } from '../Teams/Team';

class GameSelector extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hometeam: null,
            awayteam: null,
            homepress: false,
            awaypress: false, 
            tiepress: false
        };
    }

    checkPressed() {
        const { gamelist } = this.props.userdata;
        const gameId = this.props.game.hash;
        // console.log(gamelist[gameId]);
        if(gamelist[gameId] === homewin) {
            this.setState({ homepress: true });
        } else if(gamelist[gameId] === awaywin) {
            this.setState({ awaypress: true });
        } else if(gamelist[gameId] === tiegame) {
            this.setState({ tiepress: true });
        }     
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
        if(this.state.hometeam !== null) {
            const gameId = this.props.game.hash;
            const home = this.state.hometeam;
            const away = this.state.awayteam;
            const { week } = this.props;
            const gridLoc = this.getGridLocations(gameId, week, home, away);
    
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
                <ButtonGroup className="button-group">
                    <button 
                        className={`HomeTeam-Button ${home.abrv} ${glowHome}`}
                        disabled={this.state.homepress}
                        onClick={() => {
                            this.props.gameResult({ winner: home, loser: away }, false);
                            this.props.updateUserGamePicks(gameId, homewin, gridLoc, week);
                            this.setState({ homepress: true, awaypress: false, tiepress: false });
                        }}
                    >
                        {home.abrv}
                    </button>
                    <button 
                        className={`Tie-Button ${glowTie}`}
                        disabled={this.state.tiepress}
                        onClick={() => {
                            this.props.gameResult({ home, away }, true);
                            this.props.updateUserGamePicks(gameId, tiegame, gridLoc, week);
                            this.setState({ tiepress: true, awaypress: false, homepress: false });
                        }}
                    >
                        @
                    </button>
                    <button
                        className={`AwayTeam-Button ${away.abrv} ${glowAway}`}
                        disabled={this.state.awaypress}
                        onClick={() => {
                            this.props.gameResult({winner: away, loser: home }, false);
                            this.props.updateUserGamePicks(gameId, awaywin, gridLoc, week);
                            this.setState({ awaypress: true, tiepress: false, homepress: false });    
                        }}
                    >
                        {away.abrv}
                    </button>
                </ButtonGroup>
            );
        } else {
            return null;
            // ! spinner?
            //from reactstrap
        }
       
    }
}

const mapStateToProps = (state) => {
    const { NFL, userdata, schedule } = state;
    return { NFL, userdata, schedule };
};

const GameButton = connect(mapStateToProps, { gameResult, updateUserGamePicks })(GameSelector);
export { GameButton };