import React, { PureComponent } from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import { schedule as Schedule2020 } from '../Schedule/2020';
import { WeekPicker } from  './WeekPicker';
import './WeekHolder.css';

class WeekHolder extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { selected: 1 };
    }

    highlightButton(weekNum) {
        if(weekNum === this.state.selected)
            return 'primary';
        else
            return 'secondary';
    }

    showWeek() {
        const week1 = <WeekPicker games={Schedule2020.week1.games} byes={Schedule2020.week1.byes} week={1} />
        const week2 = <WeekPicker games={Schedule2020.week2.games} byes={Schedule2020.week2.byes} week={2} />
        const week3 = <WeekPicker games={Schedule2020.week3.games} byes={Schedule2020.week3.byes} week={3} />
        const week4 = <WeekPicker games={Schedule2020.week4.games} byes={Schedule2020.week4.byes} week={4} />
        const week5 = <WeekPicker games={Schedule2020.week5.games} byes={Schedule2020.week5.byes} week={5} />
        const week6 = <WeekPicker games={Schedule2020.week6.games} byes={Schedule2020.week6.byes} week={6} />
        const week7 = <WeekPicker games={Schedule2020.week7.games} byes={Schedule2020.week7.byes} week={7} />
        const week8 = <WeekPicker games={Schedule2020.week8.games} byes={Schedule2020.week8.byes} week={8} />
        const week9 = <WeekPicker games={Schedule2020.week9.games} byes={Schedule2020.week9.byes} week={9} />
        const week10 = <WeekPicker games={Schedule2020.week10.games} byes={Schedule2020.week10.byes} week={10} />
        const week11 = <WeekPicker games={Schedule2020.week11.games} byes={Schedule2020.week11.byes} week={11} />
        const week12 = <WeekPicker games={Schedule2020.week12.games} byes={Schedule2020.week12.byes} week={12} />
        const week13 = <WeekPicker games={Schedule2020.week13.games} byes={Schedule2020.week13.byes} week={13} />
        const week14 = <WeekPicker games={Schedule2020.week14.games} byes={Schedule2020.week14.byes} week={14} />
        const week15 = <WeekPicker games={Schedule2020.week15.games} byes={Schedule2020.week15.byes} week={15} />
        const week16 = <WeekPicker games={Schedule2020.week16.games} byes={Schedule2020.week16.byes} week={16} />
        const week17 = <WeekPicker games={Schedule2020.week17.games} byes={Schedule2020.week17.byes} week={17} />
     
        return(
            <div className="week">
                {this.state.selected===1 && week1}
                {this.state.selected===2 && week2}
                {this.state.selected===3 && week3}
                {this.state.selected===4 && week4}
                {this.state.selected===5 && week5}
                {this.state.selected===6 && week6}
                {this.state.selected===7 && week7}
                {this.state.selected===8 && week8}
                {this.state.selected===9 && week9}
                {this.state.selected===10 && week10}
                {this.state.selected===11 && week11}
                {this.state.selected===12 && week12}
                {this.state.selected===13 && week13}
                {this.state.selected===14 && week14}
                {this.state.selected===15 && week15}
                {this.state.selected===16 && week16}
                {this.state.selected===17 && week17}
            </div>
        );
    }

    render() {
        return (
            <div className="weekHolder">
                <ButtonGroup className="buttonHolder">
                    <Button outline color="primary">
                        <b>Week:</b>
                    </Button>
                    <Button 
                        color={this.highlightButton(1)}
                        onClick={() => { this.setState({ selected: 1 })}}
                    >
                        1
                    </Button>
                    <Button 
                        color={this.highlightButton(2)}
                        onClick={() => { this.setState({ selected: 2 })}}
                    >
                        2
                    </Button>
                    <Button 
                        color={this.highlightButton(3)}
                        onClick={() => { this.setState({ selected: 3 })}}
                    >
                        3
                    </Button>
                    <Button 
                        color={this.highlightButton(4)}
                        onClick={() => { this.setState({ selected: 4 })}}
                    >
                        4
                    </Button>
                    <Button 
                        color={this.highlightButton(5)}
                        onClick={() => { this.setState({ selected: 5 })}}
                    >
                        5
                    </Button>
                    <Button 
                        color={this.highlightButton(6)}
                        onClick={() => { this.setState({ selected: 6 })}}
                    >
                        6
                    </Button>
                    <Button 
                        color={this.highlightButton(7)}
                        onClick={() => { this.setState({ selected: 7 })}}
                    >
                        7
                    </Button>
                    <Button 
                        color={this.highlightButton(8)}
                        onClick={() => { this.setState({ selected: 8 })}}
                    >
                        8
                    </Button>
                    <Button 
                        color={this.highlightButton(9)}
                        onClick={() => { this.setState({ selected: 9 })}}
                    >
                        9
                    </Button>
                    <Button 
                        color={this.highlightButton(10)}
                        onClick={() => { this.setState({ selected: 10 })}}
                    >
                        10
                    </Button>
                    <Button 
                        color={this.highlightButton(11)}
                        onClick={() => { this.setState({ selected: 11 })}}
                    >
                        11
                    </Button>
                    <Button 
                        color={this.highlightButton(12)}
                        onClick={() => { this.setState({ selected: 12 })}}
                    >
                        12
                    </Button>
                    <Button 
                        color={this.highlightButton(13)}
                        onClick={() => { this.setState({ selected: 13 })}}
                    >
                        13
                    </Button>
                    <Button 
                        color={this.highlightButton(14)}
                        onClick={() => { this.setState({ selected: 14 })}}
                    >
                        14
                    </Button>
                    <Button 
                        color={this.highlightButton(15)}
                        onClick={() => { this.setState({ selected: 15 })}}
                    >
                        15
                    </Button>
                    <Button 
                        color={this.highlightButton(16)}
                        onClick={() => { this.setState({ selected: 16 })}}
                    >
                        16
                    </Button>
                    <Button 
                        color={this.highlightButton(17)}
                        onClick={() => { this.setState({ selected: 17 })}}
                    >
                        17
                    </Button>
                </ButtonGroup>
                {this.showWeek()}
            </div>
        );
    }
}

export { WeekHolder };
