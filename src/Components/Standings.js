import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { CreateNFL } from '../Teams/NFL_Teams';
import { sortDivision, sortConfrence } from '../Actions/SortStandings';
import * as logos from '../Teams/Logos';
import './CSS/Standings.css';

class Standing extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { this.setState({ num: this.props.userdata.gamespicked }); }

    renderRows() {
        const { division, confrence, NFL } = this.props;
        const AS = this.props.settings.advancedStandings;
        const LOGO = this.props.settings.logo;
        const playoffs = this.props.settings.showplayoffpic;
        const league = CreateNFL(NFL);

        let teams = null;

        if(division !== undefined) {
            teams = sortDivision(league[`${confrence}_${division}`]);
            // console.log(`${confrence}_${division}`, teams);
        } else {
            teams = sortConfrence(league[`${confrence}_East`].concat(league[`${confrence}_North`]).concat(league[`${confrence}_South`]).concat(league[`${confrence}_West`]));
            // console.log(`${confrence}`, teams);
        }

        if(teams !== null) {
            let rank = 0;
            let stand = null;
            if(!playoffs && this.props.division===undefined) {
                stand = teams.map((team) => {
                    return (
                        <tr key={++rank}>
                            {rank < 8 ? <th scope="row"><small><b>{rank}</b></small></th> : <th scope="row"><small>{rank}</small></th>}
                            {LOGO ? <td><img src={logos[team.abrv]} alt={team.abrv} /></td> : <td><small>{team.abrv}</small></td>}
                            <td><small>{team.record}</small></td>
                            <td><small>{team.pct}</small></td>
                            {/* <td><small>{team.streak}</small></td> */}
                            {AS > 1 ? <td><small>{team.confRecord}</small></td> : null}
                            {AS > 1 ? <td><small>{team.divRecord}</small></td> : null}
                            {AS > 2 ? <td><small>{team.SOS.toFixed(3)}</small></td> : null}
                            {AS > 2 ? <td><small>{team.SOV.toFixed(3)}</small></td> : null}
                        </tr>
                    );
                });
            } else {
                stand = teams.slice(0,7).map((team) => {
                    return (
                        <tr key={++rank}>
                            <th scope="row"><small><b>{rank}</b></small></th>
                            {LOGO ? <td><img src={logos[team.abrv]} alt={team.abrv} /></td> : <td><small>{team.abrv}</small></td>}
                            <td><small>{team.record}</small></td>
                            <td><small>{team.pct}</small></td>
                            {/* <td><small>{team.streak}</small></td> */}
                            {AS > 1 ? <td><small>{team.confRecord}</small></td> : null}
                            {AS > 1 ? <td><small>{team.divRecord}</small></td> : null}
                            {AS > 2 ? <td><small>{team.SOS.toFixed(3)}</small></td> : null}
                            {AS > 2 ? <td><small>{team.SOV.toFixed(3)}</small></td> : null}
                        </tr>
                    );
                });
            }
            
            return stand;
        }
    }

    render() {
        let header = '';
        const AS = this.props.settings.advancedStandings;
        if(this.props.confrence && this.props.division)
            header = `${this.props.confrence} ${this.props.division}`;
        else if (this.props.confrence)
            header = this.props.confrence;  

        return(
            <div className="Standing">
                <h4 className={this.props.confrence}>{header}</h4>
                <Table size="sm" borderless responsive hover className="list">
                    <thead>
                        <tr className="standHead">
                            <th>#</th>
                            <th>Team</th>
                            <th>Record</th>
                            <th>Pct</th>
                            {/* <th>Strk</th> */}
                            {AS > 1 ? <th>Conf</th> : null}
                            {AS > 1 ? <th>Div</th> : null}
                            {AS > 2 ? <th>SOS</th> : null}
                            {AS > 2 ? <th>SOV</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { NFL, settings, userdata } = state;
    return { NFL, settings, userdata };
};

const Standings = connect(mapStateToProps)(Standing);

export { Standings };

