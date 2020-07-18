import React, { Component } from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import { Schedule as Schedule2020 } from '../Schedule/2020';
import { WeekPicker } from  './WeekPicker';

class WeekHolder extends Component {
    constructor(props) {
        super(props);
        this.state = { selcted: 1 };
    }

    highlightButton(weekNum) {
        if(weekNum === this.state.selcted)
            return 'primary';
        else
            return 'secondary';
    }

    showWeek() {

    }

    render() {
        return (
            <ButtonGroup horizontal>
                <Button 
                    color={this.highlightButton()}
                >
                    {'<'}
                </Button>
                <Button 
                    color={this.highlightButton(1)}
                    onClick={() => { this.setState({ selcted: 1 })}}
                >
                    1
                </Button>
                <Button 
                    color={this.highlightButton(2)}
                    onClick={() => { this.setState({ selcted: 2 })}}
                >
                    2
                </Button>
                <Button 
                    color={this.highlightButton(3)}
                    onClick={() => { this.setState({ selcted: 3 })}}
                >
                    3
                </Button>
                <Button 
                    color={this.highlightButton(4)}
                    onClick={() => { this.setState({ selcted: 4 })}}
                >
                    4
                </Button>
                <Button 
                    color={this.highlightButton(5)}
                    onClick={() => { this.setState({ selcted: 5 })}}
                >
                    5
                </Button>
                <Button 
                    color={this.highlightButton(6)}
                    onClick={() => { this.setState({ selcted: 6 })}}
                >
                    6
                </Button>
                <Button 
                    color={this.highlightButton(7)}
                    onClick={() => { this.setState({ selcted: 7 })}}
                >
                    7
                </Button>
                <Button 
                    color={this.highlightButton(8)}
                    onClick={() => { this.setState({ selcted: 8 })}}
                >
                    8
                </Button>
                <Button 
                    color={this.highlightButton(9)}
                    onClick={() => { this.setState({ selcted: 9 })}}
                >
                    9
                </Button>
                <Button 
                    color={this.highlightButton(10)}
                    onClick={() => { this.setState({ selcted: 10 })}}
                >
                    10
                </Button>
                <Button 
                    color={this.highlightButton(11)}
                    onClick={() => { this.setState({ selcted: 11 })}}
                >
                    11
                </Button>
                <Button 
                    color={this.highlightButton(12)}
                    onClick={() => { this.setState({ selcted: 12 })}}
                >
                    12
                </Button>
                <Button 
                    color={this.highlightButton(13)}
                    onClick={() => { this.setState({ selcted: 13 })}}
                >
                    13
                </Button>
                <Button 
                    color={this.highlightButton(14)}
                    onClick={() => { this.setState({ selcted: 14 })}}
                >
                    14
                </Button>
                <Button 
                    color={this.highlightButton(15)}
                    onClick={() => { this.setState({ selcted: 15 })}}
                >
                    15
                </Button>
                <Button 
                    color={this.highlightButton(16)}
                    onClick={() => { this.setState({ selcted: 16 })}}
                >
                    16
                </Button>
                <Button 
                    color={this.highlightButton(17)}
                    onClick={() => { this.setState({ selcted: 17 })}}
                >
                    17
                </Button>
                <Button 
                    color={this.highlightButton()}
                >
                    {'>'}
                </Button>
            </ButtonGroup>
        );
    }
}

export { WeekHolder };
