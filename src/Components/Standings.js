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

                // this.setState({
                //     teamList: {
                //         East: NFL.AFC_East,
                //         North: NFL.AFC_North,
                //         South: NFL.AFC_South,
                //         West: NFL.AFC_West
                //     }
                // });
            } else if(this.props.confrence === 'NFC') {
                const arr = NFL.NFC_East.concat(NFL.NFC_North.concat(NFL.NFC_South.concat(NFL.NFC_West)));
                this.setState({ teamList: arr });

                // this.setState({
                //     teamList: {
                //         East: NFL.NFC_East,
                //         North: NFL.NFC_North,
                //         South: NFL.NFC_South,
                //         West: NFL.NFC_West
                //     }
                // });
            }
        }
    }

    // calcPCT(wins, loses, ties) {
    //     if(wins+loses+ties === 0)
    //         return '0.0000';
    //     else
    //         return ((wins+(ties/2))/(wins+loses+ties)).toFixed(4);
    // }

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

            const stand = list.map((team) => {
                return (
                    <tr key={++rank}>
                        {/* <th scope="row" className={this.playColor(rank)}><small>{rank}</small></th> */}
                        <th scope="row"><small>{rank}</small></th>
                        <td><small>{team.abrv}</small></td>
                        <td><small>{team.record}</small></td>
                        <td><small>{team.pct}</small></td>
                        {/* <td><small>{team.streak}</small></td> */}
                        <td><small>{team.confRecord}</small></td>
                        <td><small>{team.divRecord}</small></td>
                        {/* <td><small>{team.SOS.toFixed(3)}</small></td> */}
                    </tr>
                )
            });

            return stand;
        }
    }

    //? Dont need
    playColor(rank) {
        if(!this.props.division) {
            switch (rank) {
                case 1:
                    return 'seed1';
                case 2:
                case 3:
                case 4:
                    return 'seed2-4';
                case 5:
                case 6:
                case 7:
                    return 'seed5-7';
                default:
                    return '';
            }
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
                <h4 className={this.props.confrence}>{header}</h4>    
                <Table size="sm" borderless responsive hover className="list">
                    <thead>
                        <tr className="standHead">
                            <th>#</th>
                            <th>Team</th>
                            <th>Record</th>
                            <th>Pct</th>
                            {/* <th>Strk</th> */}
                            <th>Conf</th>
                            <th>Div</th>
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

