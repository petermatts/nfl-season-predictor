import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, UncontrolledTooltip } from 'reactstrap';
import { teamReverseHash } from '../Teams/Team';
import { TeamGameButton } from '../Components';
import { addBye } from '../Actions'
import { BYE } from '../Actions/Constants';
import './CSS/TeamPicker.css';

class Picker extends Component {
    addByeWeek(pickTeam, teamSchedule, teamSchedulePicks) {
        if(!teamSchedulePicks.includes(BYE)) {
            const bye = teamSchedule.indexOf(BYE);
            teamSchedulePicks[bye] = BYE;
            this.props.addBye(pickTeam, teamSchedulePicks);
        }
    }

    timeDisplay(week, gameId) {
        const game = this.props.schedule.gamelist[gameId];
        if(gameId === BYE) {
            return (
                <div>
                    <b id="Bye">{`Week ${week}`}</b>
                    <UncontrolledTooltip target="Bye" placement="top">
                        {BYE}
                    </UncontrolledTooltip>
                </div>
            );
        } else {
            const {day, date, time} = game;
            const dayAbrv = day==='Thursday' ? day.substring(0,4) : day.substring(0,3);
            if(day==='Sunday' && time==='8:20 PM') {
                return (
                    <div>
                        <b id="snf">{`Week ${week} SNF`}</b>
                        <UncontrolledTooltip target="snf" placement="top">
                            {`${dayAbrv}  ${date}  ${time}`}
                        </UncontrolledTooltip>
                    </div>
                );
            } else if(day==='Thursday' && time==='8:20 PM') {
                return (
                    <div>
                        <b id="tnf">{`Week ${week} TNF`}</b>
                        <UncontrolledTooltip target="tnf" placement="top">
                            {`${dayAbrv}  ${date}  ${time}`}
                        </UncontrolledTooltip>
                    </div>
                );
            } else if(day==='Monday' && time==='8:15 PM') {
                return (
                    <div>
                        <b id="mnf">{`Week ${week} MNF`}</b>
                        <UncontrolledTooltip target="mnf" placement="top">
                            {`${dayAbrv}  ${date}  ${time}`}
                        </UncontrolledTooltip>
                    </div>
                );
            } else if(date==='Invalid Date') {
                return (
                    <div>
                        <b>TBD</b>
                    </div>
                );
            } else {
                const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
                return (
                    <div>
                        <b id={`${id}`}>{`Week ${week}`}</b>
                        <UncontrolledTooltip target={`${id}`} placement="top">
                            {`${dayAbrv} ${date}  ${time}`}
                        </UncontrolledTooltip>
                    </div>
                );
            }
        }
    }


    renderGameButtons(abrv, TEAM_SHEDULE, teamSchedulePicks) {
        let week = 0, count = 0;
        const gamerow = TEAM_SHEDULE.map((gameId) => {
            return(
                <div key={++week}>
                    {this.timeDisplay(week, gameId)}
                    <TeamGameButton gameId={gameId} pick={teamSchedulePicks} team={abrv} week={week} />
                </div>
            );
        });

        // console.log(gamerow);
        const setup = [];
        const GPR = 3;
        for(let index = 0; index < gamerow.length; index+=GPR) {
            setup.push(gamerow.slice(index, index+GPR));
        }

        const row = setup.map((row) => {
            const thing = row.map((item) => {
                return(
                    <div key={item.key}>
                        {item}
                    </div>
                );
            });
            
            return(
                <div className="gamerow" key={++count}>
                    {thing}
                </div>
            );
        });

        return row;
    }

    render() {
        const { pickTeam } = this.props.settings;

        if(pickTeam !== null) {
            const abrv = teamReverseHash(pickTeam);
            const team = this.props.NFL[abrv];
            const TEAM_SHEDULE = this.props.schedule.gamegrid[pickTeam];
            const teamSchedulePicks = this.props.userdata.gamegrid[pickTeam];

            this.addByeWeek(pickTeam, TEAM_SHEDULE, teamSchedulePicks);

            return (
                <div>
                    <ListGroup>
                        <ListGroupItem color="secondary">
                            <div>
                                <h5><b>{team.FullName}</b></h5>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem color="secondary">
                            {this.renderGameButtons(abrv, TEAM_SHEDULE, teamSchedulePicks)}
                        </ListGroupItem>
                        {/* <ListGroupItem color="secondary">
                            {team.record}
                        </ListGroupItem> */}
                    </ListGroup>
                </div>
            );
        } else {
            //? Display a friendly message to user to pick a team
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    const { userdata, NFL, settings, schedule } = state;
    return { userdata, NFL, settings, schedule };
};

const TeamPicker = connect(mapStateToProps, { addBye })(Picker);

export { TeamPicker };
