import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { CreateNFL } from '../Teams/NFL_Teams';
import { sortDivision, sortConfrence } from '../Actions/SortStandings';
import './CSS/Standings.css';

class Standing extends Component {
    constructor(props) {
        super(props);
        this.state = { teamList: [] };
    }

    componentDidMount() {
        const NFL = CreateNFL(this.props.NFL);
        if(this.props.division && this.props.confrence) {
            if(this.props.confrence === 'AFC') {
                switch(this.props.division) {
                    case "North":
                        this.setState({ teamList: NFL.AFC_North});
                        break;
                    case "South":
                        this.setState({ teamList: NFL.AFC_South});
                        break;
                    case "East":
                        this.setState({ teamList: NFL.AFC_East});
                        break;
                    case "West":
                        this.setState({ teamList: NFL.AFC_West});
                        break;
                    default: 
                        console.log('Something is probably wrong if this gets logged');
                }
            } else if (this.props.confrence === 'NFC') {
                switch(this.props.division) {
                    case "North":
                        this.setState({ teamList: NFL.NFC_North});
                        break;
                    case "South":
                        this.setState({ teamList: NFL.NFC_South});
                        break;
                    case "East":
                        this.setState({ teamList: NFL.NFC_East});
                        break;
                    case "West":
                        this.setState({ teamList: NFL.NFC_West});
                        break;
                    default: 
                        console.log('Something is probably wrong if this gets logged');
                }
            }
        } else if(this.props.confrence) {
            
            if(this.props.confrence === 'AFC') {
                const arr = NFL.AFC_East.concat(NFL.AFC_North.concat(NFL.AFC_South.concat(NFL.AFC_West)));
                this.setState({ teamList: arr });
            } else if(this.props.confrence === 'NFC') {
                const arr = NFL.NFC_East.concat(NFL.NFC_North.concat(NFL.NFC_South.concat(NFL.NFC_West)));
                this.setState({ teamList: arr });
            }
        }
    }

    renderRows() {
        // ! sort teamList//
        //console.log(this.state.teamList);
        if(this.state.teamList !== undefined && !this.state.teamList.includes(undefined)) {
            let rank = 0;
            let list = [];

            if(this.props.confrence && this.props.division)
                list = sortDivision(this.state.teamList);
            else if (this.props.confrence)
                list = sortConfrence(this.state.teamList);

            const AS = this.props.settings.advancedStandings;
            const playoffs = this.props.settings.showplayoffpic;

            let stand = null;
            if(!playoffs && this.props.division===undefined) {
                stand = list.map((team) => {
                    return (
                        <tr key={++rank}>
                            {rank < 8 ? <th scope="row"><small><b>{rank}</b></small></th> : <th scope="row"><small>{rank}</small></th>}
                            <td><small>{team.abrv}</small></td>
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
                stand = list.slice(0,7).map((team) => {
                    return (
                        <tr key={++rank}>
                            <th scope="row"><small><b>{rank}</b></small></th>
                            <td><small>{team.abrv}</small></td>
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
                {/* <Table size="sm" borderless responsive hover className="list"> */}
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
    const { NFL, settings } = state;
    return { NFL, settings };
};

const Standings = connect(mapStateToProps)(Standing);

export { Standings };

