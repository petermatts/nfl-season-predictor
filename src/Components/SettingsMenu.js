import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { updatePB, changePickType, standingsDetail, updatePlayoffPic } from '../Actions';
import './CSS/SettingsMenu.css';

class Settings extends Component {
    comingSoon() {
        return <h6>Coming Soon!</h6>
    }

    renderPB(settings) {
        //? add a header
        return (
            <div className="menu-item">
                Show Progress Bar:
                <Button
                    size='sm'
                    className="item-button"
                    color={settings.showProgress ? 'success':'danger'}
                    onClick={() => {this.props.updatePB()}}
                >
                    {settings.showProgress ? 'On':'Off'}
                </Button>
            </div>
        );
    }

    renderStandingsSettings(settings) {
        return (
            <div>
                <h6>Standings</h6>
                <div className="menu-item">
                    Detail:
                    <ButtonGroup>
                        <Button
                            size='sm'
                            className="item-button"
                            color={settings.advancedStandings===1 ? 'primary':'secondary'}
                            onClick={() => {this.props.standingsDetail(1)}}
                        >
                            Simple
                        </Button>
                        <Button
                            size='sm'
                            className="item-button"
                            color={settings.advancedStandings===2 ? 'primary':'secondary'}
                            onClick={() => {this.props.standingsDetail(2)}}
                        >
                            Moderate
                        </Button>
                        <Button
                            size='sm'
                            className="item-button"
                            color={settings.advancedStandings===3 ? 'primary':'secondary'}
                            onClick={() => {this.props.standingsDetail(3)}}
                        >
                            High
                        </Button>
                    </ButtonGroup>
                </div>
                <div className="menu-item">
                    Only Playoff Teams:
                    <Button
                    size='sm'
                    className="item-button"
                    color={settings.showplayoffpic ? 'success':'danger'}
                    onClick={() => {this.props.updatePlayoffPic()}}
                >
                    {settings.showplayoffpic ? 'On':'Off'}
                </Button>
                </div>
            </div>
        );
    }

    renderPickTypeSwitch(settings) {
        //? add a header
        return(
            <div className="menu-item">
                Pick By:
                <ButtonGroup>
                    <Button
                        size='sm'
                        className="item-button"
                        color={settings.pickByTeam ? 'secondary':'primary'}
                        onClick={() => {this.props.changePickType()}}
                    >
                        Week
                    </Button>
                    <Button
                        size='sm'
                        className="item-button"
                        color={settings.pickByTeam ? 'primary':'secondary'}
                        onClick={() => {this.props.changePickType()}}
                    >
                        Team
                    </Button>
                </ButtonGroup>
            </div>
);
    }

    render() {
        const { settings } = this.props;
        return (
            <div>
                <button 
                    className="settingsButton gear"
                    id="pop"
                >
                    Settings
                    <FontAwesomeIcon icon={faCog} />
                </button>
                <UncontrolledPopover 
                    trigger="legacy"
                    placement="bottom"
                    target="pop"
                >
                    <PopoverHeader>
                        <div className="menuHeader">
                            <b>Settings!</b>
                        </div>
                    </PopoverHeader>
                    <PopoverBody>
                        {this.renderPB(settings)}
                        <hr />
                        {this.renderStandingsSettings(settings)}
                        <hr />
                        {/* {this.comingSoon()} */}
                        {this.renderPickTypeSwitch(settings)}
                    </PopoverBody>
                </UncontrolledPopover>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { settings } = state;
    return { settings }
}

const SettingsMenu = connect(mapStateToProps, { updatePB, changePickType, standingsDetail, updatePlayoffPic })(Settings);

export { SettingsMenu };
