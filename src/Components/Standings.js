import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { CreateNFL } from '../Teams/NFL_Teams';
import { sortDivision, sortConfrence } from '../Actions/SortStandings';
import './Standings.css';

class Standing extends Component {
    constructor(props) {
        super(props);
        this.state = { teamList: [] };
    }

    componentDidMount() {
        const NFL = CreateNFL(this.props.NFL);
        console.log(this.props.NFL);
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

    calcPCT(wins, loses, ties) {
        if(wins+loses+ties === 0)
            return '0.0000';
        else
            return ((wins+(ties/2))/(wins+loses+ties)).toFixed(4);
    }

    renderRows() {
        // ! sort teamList//
        //console.log(this.state.teamList);
        if(this.state.teamList !== undefined && !this.state.teamList.includes(undefined)) {
            let rank = 0;
            const list = sortDivision(this.state.teamList);
            const stand = list.map((team) => {
                const wins = team.wins.length;
                const loses = team.loses.length;
                const ties = team.ties.length;
                const record = ties === 0 ? `${wins}-${loses}`:`${wins}-${loses}-${ties}`;

                const pct = this.calcPCT(wins, loses, ties);
                return (
                    <tr key={rank}>
                        <th scope="row"><small>{++rank}</small></th>
                        <td><small>{team.abrv}</small></td>
                        <td><small>{record}</small></td>
                        <td><small>{pct}</small></td>
                    </tr>
                )
            });

            return stand;
        }
    }

    render() {
        let header = '';
        if(this.props.confrence && this.props.division)
            header = `${this.props.confrence} ${this.props.division}`;
        else if (this.props.confrence)
            header = this.props.confrence;  

        return(
            <div className="Standing">
                <h4 className="label">{header}</h4>    
                <Table size="sm" borderless striped responsive hover className="list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Team</th>
                            <th>Record</th>
                            <th>Pct</th>
                            {/* <th>Strk</th> */}
                            {/* <th>SOS</th> */}
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
    const { NFL } = state;
    return { NFL };
};

const Standings = connect(mapStateToProps)(Standing);

export { Standings };

