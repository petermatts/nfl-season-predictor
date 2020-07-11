import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { GameButton } from './GameButton';
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

    renderGameButtons(date) {
        console.log(date);
        const buttons = this.state.games.map(game => {
            if(game.day === date.day && game.date === date.date)
                return <GameButton game={game} />;
            else
                return null;
        })
        return buttons;
    }

    renderColumnsHeads() {
        let key = 0;
        const cols = this.state.dates.map(dates => (
            <ListGroupItem color="secondary" key={++key}>
                <h5 className="Day">{dates.day}</h5>
                <h6>{dates.date}</h6>
                {this.renderGameButtons(dates)}
            </ListGroupItem>
        ));
        return cols;
    }

    render() {
        return (
            <ListGroup className="Component" horizontal>
                {this.renderColumnsHeads()}
            </ListGroup>
        );
    }
}

export { WeekPicker };