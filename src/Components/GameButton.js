import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup } from 'reactstrap';
import './GameButton.css';
import '../Teams/TeamColors.css';
import { gameResult, updateSchedule } from '../Actions';
//import { bindActionCreators } from 'redux';

class GameSelector extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            home: false,
            tie: false,
            away: false,
            hometeam: null,
            awayteam: null,
            pressed: false,
            homepress: false,
            awaypress: false, 
            tiepress: false
        };
    }

    componentDidMount() {
        const h_abrv = this.props.game.home;
        const a_abrv = this.props.game.away;

        this.setState({
            hometeam: this.props.NFL[h_abrv], 
            awayteam: this.props.NFL[a_abrv]
        });
    }

    render() {
        if(this.state.hometeam !== null) {
            const { game } = this.props;
            const home = this.state.hometeam;
            const away = this.state.awayteam;
            const gameWeek = `week${this.props.week}`;
            //!const pressed = this.props.game.picked;
            const pressed = this.state.pressed; //temporary until schedule redux state feature is functional
            const { code } = game; // ?
    
            // if(pressed) {
            //     const { winner } = this.props.game;
            //     if(winner === home.abrv)
            //         this.setState({ home: true, away: false, tie: false });
            //     else if(winner === away.abrv)
            //         this.setState({ home: false, away: true, tie: false });
            //     else if(winner === null)
            //         this.setState({ home: false, away: false, tie: true });
            // }
    
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
                        className={`HomeTeam-Button ${home.abrv} ${glowHome}`}
                        disabled={this.state.homepress}
                        onClick={() => {
                            this.props.gameResult({ winner: home, loser: away }, pressed, gameWeek, code, false );     
                            this.setState({ pressed: true, home: true, tie: false, away: false, homepress: true, awaypress: false, tiepress: false });
                            // this.props.updateSchedule(gameWeek, false, { winner: home, loser: away }, code);
                        }}
                    >
                        {home.abrv}
                    </button>
                    <button 
                        className={`Tie-Button ${glowTie}`}
                        disabled={this.state.tiepress}
                        onClick={() => {
                            this.props.gameResult({ home, away }, pressed, gameWeek, code , true);
                            this.setState({ pressed: true, home: false, tie: true, away: false, tiepress: true, awaypress: false, homepress: false });
                        }}
                    >
                        Tie
                    </button>
                    <button
                        className={`AwayTeam-Button ${away.abrv} ${glowAway}`}
                        disabled={this.state.awaypress}
                        onClick={() => {
                            this.props.gameResult({winner: away, loser: home }, pressed, gameWeek, code, false );
                            this.setState({ pressed: true, home: false, tie: false, away: true, awaypress: true, tiepress: false, homepress: false });    
                        }}
                    >
                        {away.abrv}
                    </button>
                </ButtonGroup>
            );
        } else {
            return null;
            // ! spinner?
        }
       
    }
}

const mapStateToProps = (state) => {
    const { NFL } = state;
    return { NFL };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//     const boundActions = bindActionCreators({ gameResult, updateSchedule }, dispatch);
//     return {
//         gameResult: () => dispatch(gameResult()),
//         updateSchedule: () => dispatch(updateSchedule()),
//         ...boundActions,
//         dispatch
//     }
// };

//const GameButton = connect(null, mapDispatchToProps)(GameSelector);
const GameButton = connect(mapStateToProps, { gameResult, updateSchedule })(GameSelector);
export { GameButton };