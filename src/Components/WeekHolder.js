import React, { PureComponent } from 'react';
import { ButtonGroup, Button } from 'reactstrap';
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

    highlightButton(weekNum) {
        if(weekNum === this.state.selected)
            return 'primary';
        else
            return 'secondary';
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
                        color={this.highlightButton(weekNum)}
                        onClick={() => {this.setState({ selected: key })}}
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
                    {this.renderWeekButtons()}
                    {/* <Button outline color="primary">
                        <b>Week:</b>
                    </Button> */}
                </ButtonGroup>
                {this.showWeek()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { schedule } = state;
    return { schedule };
};

const WeekHolder = connect(mapStateToProps, { getGameGrid, getGameList, getSchedule })(weekholder);
export { WeekHolder };
