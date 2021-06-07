import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { GameButton } from './GameButton';
import '../Teams/TeamColors.css';
import './WeekPicker.css';


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

    timeString(time) {
        return (
            <div>
                <small className="homeLabel">Home</small>
                {time}
                <small className="awayLabel">Away</small>
            </div>
        );
    }

    renderGameButtons(date) {
        const timesTaken = [];
        let key = 0;
        const buttons = this.state.games.map(game => {
            if(game.day === date.day && game.date === date.date) {
                const time = timesTaken.includes(game.time) ? null : this.timeString(game.time);
                timesTaken.push(game.time);
                return (
                    <div className="select" key={++key}>
                        {time}
                        <GameButton game={game} week={this.props.week}/>
                    </div>
                );
            } else
                return null;
        });
        return buttons;
    }

    renderColumnsHeads() {
        let key = 0;
        const cols = this.state.dates.map(dates => (
            <ListGroupItem color="secondary" key={++key}>
                <h5>
                    <b>{`${dates.day}   `}</b>
                    <small>{dates.date}</small>
                </h5>
                {this.renderGameButtons(dates)}
            </ListGroupItem>
        ));
        return cols;
    }

    byeDisplay() {
        const byes = this.state.byes.map((team) => {
            const cn = `Bye ${team}`;
            return (
                <button className={cn} disabled>
                    {team}
                </button>
            );
        });

        if(this.state.byes.length !== 0) {
            return (
                <ListGroupItem color="secondary">
                    <div className="ByeHolder">
                        <h5 className="Day">Byes</h5>
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
                <ListGroup horizontal>
                    {this.renderColumnsHeads()}
                    {this.byeDisplay()}
                </ListGroup>
            </div>
        );
    }
}

export { WeekPicker };