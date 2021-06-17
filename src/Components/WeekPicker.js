import React, { Component } from 'react';
import { ListGroup, ListGroupItem, UncontrolledTooltip } from 'reactstrap';
import { isMobile, isMobileOnly } from 'react-device-detect';
import { GameButton } from './GameButton';
import '../Teams/TeamColors.css';
import './CSS/WeekPicker.css';


class WeekPicker extends Component {
    constructor(props) {
        super(props);
        this.state = { games: props.games, byes: props.byes, dates: [] };
    }

    componentDidMount() {
        const games = this.state.games;
        let dates = []
        let days = [];
        const array = [];
        for(let i = 0; i < games.length; i++) {
            const date = games[i].date;
            const day = games[i].day;
            
            days.push(day);
            dates.push(date);
        }

        // ! days and dates should be parrallel arrays!
        days = Array.from(new Set(days));
        dates = Array.from(new Set(dates));

        for(let i = 0; i < days.length; i++)
            array.push({ day: days[i], date: dates[i] });

        this.setState({ dates: array });
    }

    timeDisplay({date, day, time}) {
        // console.log(day, date, time);
        const dayAbrv = day==='Thursday' ? day.substring(0,4) : day.substring(0,3);
        if(day==='Sunday' && time==='8:20 PM') {
            return (
                <div>
                    <b id="snf">SNF</b>
                    {!isMobile && <UncontrolledTooltip target="snf" placement="top">
                        {`${day}  ${date}  ${time}`}
                    </UncontrolledTooltip>}
                </div>
            );
        } else if(day==='Thursday' && time==='8:20 PM') {
            return (
                <div>
                    <b id="tnf">TNF</b>
                    {!isMobile && <UncontrolledTooltip target="tnf" placement="top">
                        {`${day}  ${date}  ${time}`}
                    </UncontrolledTooltip>}
                </div>
            );
        } else if(day==='Monday' && time==='8:15 PM') {
            return (
                <div>
                    <b id="mnf">MNF</b>
                    {!isMobile && <UncontrolledTooltip target="mnf" placement="top">
                        {`${day}  ${date}  ${time}`}
                    </UncontrolledTooltip>}
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
                    <b id={`${id}`}>{`${dayAbrv} ${time}`}</b>
                   {!isMobile && <UncontrolledTooltip target={`${id}`} placement="top">
                        {`${date}`}
                    </UncontrolledTooltip>}
                </div>
            );
        }
    }

    displayGrid() {
        let key = 0, count = 0;
        const gamerow = this.state.games.map((game) => {
            return (
                <div key={++key}>
                    {this.timeDisplay(game)}
                    <GameButton game={game} week={this.props.week} />
                </div>
            );
        });

        const setup = [];
        let GPR = 4;
        if(isMobileOnly)
            GPR = 3;
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

        return (
            <ListGroupItem color="secondary">
                <h2>
                    <b>{`Week ${this.props.week}`}</b>
                </h2>
                {row}
            </ListGroupItem>
        );
    }

    byeDisplay() {
        const byes = this.state.byes.map((team) => {
            const cn = `Bye ${team}`;
            return (
                <button key={team} className={cn} disabled>
                    {team}
                </button>
            );
        });

        if(this.state.byes.length !== 0) {
            return (
                <ListGroupItem color="secondary">
                    <h6 className="Day">Byes</h6>
                    <div className="ByeHolder">                        
                        {byes}
                    </div>
                </ListGroupItem>
            );
        } else
            return null;
    }

    render() {
        return (
            <div className="Component">
                <ListGroup>
                    {this.displayGrid()}
                    {this.byeDisplay()}
                </ListGroup>
            </div>
        );
    }
}

export { WeekPicker };