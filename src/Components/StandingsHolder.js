import React, { Component } from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import { Standings } from './Standings';
import './StandingsHolder.css';

class StandingsHolder extends Component {
    constructor(props) {
        super(props);
        this.state = { conf: true, div: false };
    }

    renderStandings() {
        if(this.state.conf) {
            return (
                <div className="confrenceDisplay">
                    <Standings confrence="AFC" />
                    <Standings confrence="NFC" />
                </div>
            );
        } else if (this.state.div) {
            return(
                <div className="thing">
                    <div className="divisionDisplay">
                        <Standings confrence="AFC" division="East" />
                        <Standings confrence="NFC" division="East" />
                    </div>
                    <div className="divisionDisplay">
                        <Standings confrence="AFC" division="North" />
                        <Standings confrence="NFC" division="North" />
                    </div>
                    <div className="divisionDisplay">
                        <Standings confrence="AFC" division="South" />
                        <Standings confrence="NFC" division="South" />
                    </div>
                    <div className="divisionDisplay">
                        <Standings confrence="AFC" division="West" />
                        <Standings confrence="NFC" division="West" />
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="holder">
                <ButtonGroup className="options">
                    <Button
                        className="button"
                        color={this.state.conf ? "primary" : "secondary" }
                        onClick={() => {this.setState({ conf: true, div: false })}}
                    >
                        Confrence
                    </Button>
                    <Button
                        className="button"
                        color={this.state.div ? "primary" : "secondary" }
                        onClick={() => {this.setState({ conf: false, div: true })}}
                    >
                        Division
                    </Button>
                </ButtonGroup>
                {this.renderStandings()}
            </div>
        );
    }
}

export { StandingsHolder };