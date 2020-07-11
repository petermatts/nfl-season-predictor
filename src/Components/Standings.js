import React, { Component } from 'react';
import { Jumbotron, Table } from 'reactstrap';
import { NFL } from '../Teams/NFL_Teams';
import './Standings.css';

class Standings extends Component {
    constructor(props) {
        super(props);
        this.state = { teamList: [] };
    }

    componentDidMount() {
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
        let rank = 0;
        const stand = this.state.teamList.map((team) => {
            const wins = team.wins.length;
            const loses = team.loses.length;
            const ties = team.ties.length;
            const record = ties === 0 ? `${wins}-${loses}`:`${wins}-${loses}-${ties}`;

            const pct = this.calcPCT(wins, loses, ties);
            return (
                <tr key={rank}>
                    <th scope="row">{++rank}</th>
                    <td>{team.abrv}</td>
                    <td>{record}</td>
                    <td>{pct}</td>
                </tr>
            )
        });

        return stand;
    }

    render() {
        console.log(this.state.teamList);
        let header = '';
        if(this.props.confrence && this.props.division)
            header = `${this.props.confrence} ${this.props.division}`;
        else if (this.props.confrence)
            header = this.props.confrence;  


        return(
            <div className="Standing">
                <h3>{header}</h3>    
                <Table size="sm" borderless striped responsive hover>
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

export { Standings };

