import React, { PureComponent } from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import { connect } from 'react-redux';
// import { getGameGrid, getGameList, getSchedule } from '../Actions';
import { WeekPicker } from  './WeekPicker';
import { ProgressBar } from '../ProgressBar';
import './CSS/WeekHolder.css';

class weekholder extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { selected: 1, season: props.settings.season };
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
        return (
            <div className="weekHolder">
                <ButtonGroup className="buttonHolder">
                    {/* <Button outline color="primary">
                        <b>Week:</b>
                    </Button> */}
                    {this.renderWeekButtons()}
                </ButtonGroup>
                {this.showWeek()}
                <ProgressBar />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { schedule, userdata, settings } = state;
    return { schedule, userdata, settings };
};

const WeekHolder = connect(mapStateToProps, {})(weekholder);
export { WeekHolder };
