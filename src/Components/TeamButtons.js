import React, {PureComponent } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup } from 'reactstrap';
// import {} from '../Actions';
import { teamHash } from '../Teams/Team';

class PickTeamButtons extends PureComponent {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return null;
    }
}

const mapStateToProps = (state) => {
    const { settings } = state;
    return { settings };
}

const TeamButtons = connect(mapStateToProps, {})(PickTeamButtons);

export { TeamButtons };
