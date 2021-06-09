import React, { PureComponent } from 'react';
import { ButtonGroup, Button, Progress } from 'reactstrap';
import { connect } from 'react-redux';
import { getGameGrid, getGameList, getSchedule } from '../Actions';
import { WeekPicker } from  './WeekPicker';
import './WeekHolder.css';

class weekholder extends PureComponent {
    constructor(props) {
        super(props);
        props.getGameGrid(2021);
        props.getGameList(2021);
        props.getSchedule(2021);
        this.state = { selected: 1 };
    }

    picked(key) {
        if(key === this.state.selected) {
            return 'picked picked:hover .picked:focus';
        } else {
            return 'notpicked notpicked:hover';
        }
    }

    showWeek() {
        const { schedule } = this.props.schedule;
        if(schedule === null) {
            return null;
        } 

        const numWeeks = Object.keys(schedule).length;
        const weeks = [];
        for(let weekNum = 1; weekNum <= numWeeks; weekNum++) {
            const games = schedule['week'+weekNum].games;
            const byes = schedule['week'+weekNum].byes===undefined ? [] : schedule['week'+weekNum].byes;
            const weekpick = <WeekPicker games={games} byes={byes} week={weekNum} key={weekNum} />;
            weeks.push(weekpick);
        }
     
        return(
            <div className="week">
                {weeks.map((week) => {
                    if(weeks[this.state.selected-1] === week)
                        return week;
                    else
                        return null;
                })}
            </div>
        );
    }

    renderWeekButtons() {
        const { gamegrid } = this.props.schedule;

        if(gamegrid !== null) {
            let weekNum = 0;
            const butts = gamegrid[0].map((week) => {
                weekNum++;
                const key = weekNum;
                return (
                    <Button 
                        key={key}
                        onClick={() => {this.setState({ selected: key })}}
                        className={`${this.picked(key)}`}
                    >
                        {weekNum}
                    </Button>
                )
            }); 
            return butts;
        } else {
            return null;
        }
    }

    render() {
        const prog = this.props.userdata.gamespicked;
        let tot = 1;
        if(this.props.schedule.gamelist !== null)
            tot = this.props.schedule.gamelist.length;
        const pct = prog/tot;

        return (
            <div className="weekHolder">
                <ButtonGroup className="buttonHolder">
                    {this.renderWeekButtons()}
                    {/* <Button outline color="primary">
                        <b>Week:</b>
                    </Button> */}
                </ButtonGroup>
                {this.showWeek()}
                <div>{`Games Picked: ${prog}/${tot}`}</div>
                <Progress value={pct}>{`${prog}/${tot}`}</Progress>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { schedule, userdata } = state;
    return { schedule, userdata };
};

const WeekHolder = connect(mapStateToProps, { getGameGrid, getGameList, getSchedule })(weekholder);
export { WeekHolder };
