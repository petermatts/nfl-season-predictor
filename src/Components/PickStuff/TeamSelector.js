import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { changeTeamPick } from '../../Actions';
import { teamHash } from '../../Teams/Team';
import { CreateNFL } from '../../Teams/NFL_Teams';
import './CSS/TeamSelector.css';
import '../../Teams/TeamColors.css';

class PickTeamButtons extends Component {
    constructor(props) {
        super(props);
        this.state = { picked: null };
    }

    componentDidMount() {
        this.setState({ picked: this.props.settings.pickTeam });
    }

    renderDiv(division, divTitle) {
        const buttons = division.map((team) => {
            const hash = teamHash(team.abrv);
            return (
                <button 
                    key={hash}
                    className={`team-button ${team.abrv} ${this.state.picked===hash ? 'glow':''}`}
                    disabled={this.state.picked===hash}
                    onClick={() => {
                        this.props.changeTeamPick(hash);
                        this.setState({ picked: hash });
                    }}
                >
                    {team.abrv}
                </button>
            );
        });

        return (
            <div className="division">
                <div className="division-buttons">
                    <h6>{divTitle}</h6>
                    {buttons}
                </div>
            </div>
        );
    }

    render() {
        const NFL = CreateNFL(this.props.NFL);
        
        return (
            <div className="league">
                <ListGroup horizontal>
                    <ListGroupItem color="secondary">
                        <h5><b>AFC</b></h5>
                        <div className="confrence">
                            {this.renderDiv(NFL.AFC_North, 'North')}
                            {this.renderDiv(NFL.AFC_South, 'South')}
                            {this.renderDiv(NFL.AFC_East, 'East')}
                            {this.renderDiv(NFL.AFC_West, 'West')}
                        </div>
                    </ListGroupItem>
                    <ListGroupItem color="secondary">
                        <h5><b>NFC</b></h5>
                        <div className="confrence">
                            {this.renderDiv(NFL.NFC_North, 'North')}
                            {this.renderDiv(NFL.NFC_South, 'South')}
                            {this.renderDiv(NFL.NFC_East, 'East')}
                            {this.renderDiv(NFL.NFC_West, 'West')}
                        </div>
                    </ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { settings, NFL } = state;
    return { settings, NFL };
}

const TeamSelector = connect(mapStateToProps, { changeTeamPick })(PickTeamButtons);

export { TeamSelector };
