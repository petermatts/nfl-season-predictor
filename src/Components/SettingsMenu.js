import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { Button,
    ButtonGroup,
    UncontrolledPopover,
    PopoverHeader,
    PopoverBody,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import {
    updatePB,
    changePickType,
    standingsDetail,
    updatePlayoffPic,
    updateSeason,
    placeStandings
} from '../Actions';
import './CSS/SettingsMenu.css';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = { seasonDropdown: false };
        this.toggleSD = this.toggleSD.bind(this);
    }

    toggleSD() { this.setState({ seasonDropdown: !this.state.seasonDropdown }); }
    setSeason(season) {
        this.props.updateSeason(season);
        //!load new season schedule
        // console.log(season);

        //close dropdown
        this.setState({ seasonDropdown: false });
    }

    comingSoon() {
        return <h6>Coming Soon!</h6>
    }

    renderSeasonOptions(settings) {
        return (
            <div>
                <h5>Season</h5>
                <div className="menu-item">
                    <Dropdown
                        size="sm"
                        isOpen={this.state.seasonDropdown}
                        toggle={this.toggleSD}
                        id="season-setting"
                    >
                        <DropdownToggle caret>{settings.season}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => this.setSeason(2021)}>2021</DropdownItem>
                            <DropdownItem disabled onClick={() => this.setSeason(2022)}>2022</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        );
    }

    renderPB(settings) {
        return (
            <div>
                <h5>Status</h5>
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
            </div>
        );
    }

    renderStandingsSettings(settings) {
        const disablePosition = isMobile;
        console.log(disablePosition);
        return (
            <div>
                <h5>Standings</h5>
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
                    Placement:
                    <ButtonGroup>
                        <Button
                            size='sm'
                            className="item-button"
                            disabled={disablePosition}
                            color={settings.standPlacement===0 ? 'primary':'secondary'}
                            onClick={() => {this.props.placeStandings(0)}}
                        >
                            Bottom
                        </Button>
                        <Button
                            size='sm'
                            className="item-button"
                            disabled={disablePosition}
                            color={settings.standPlacement===1 ? 'primary':'secondary'}
                            onClick={() => {this.props.placeStandings(1)}}
                        >
                            Right
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
        return(
            <div>
                <h5>Pick Style</h5>
                <div className="menu-item">
                    Pick By:
                    <ButtonGroup>
                        <Button
                            size='sm'
                            className="item-button"
                            color={settings.pickByTeam ? 'primary':'secondary'}
                            onClick={() => {this.props.changePickType()}}
                        >
                            Team
                        </Button>
                        <Button
                            size='sm'
                            className="item-button"
                            color={settings.pickByTeam ? 'secondary':'primary'}
                            onClick={() => {this.props.changePickType()}}
                        >
                            Week
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }

    render() {
        const { settings } = this.props;
        return (
            <div className="settingsHolder">
                <button 
                    className="settingsButton gear"
                    id="settings"
                >
                    Settings
                    <FontAwesomeIcon icon={faCog} />
                </button>
                <UncontrolledPopover 
                    trigger="legacy"
                    placement="bottom"
                    target="settings"
                >
                    <PopoverHeader>
                        <div className="menuHeader">
                            <b>Settings!</b>
                        </div>
                    </PopoverHeader>
                    <PopoverBody>
                        {this.renderSeasonOptions(settings)}
                        <hr />
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

const SettingsMenu = connect(mapStateToProps, {
    updatePB,
    changePickType,
    standingsDetail,
    updatePlayoffPic,
    updateSeason,
    placeStandings
})(Settings);

export { SettingsMenu };
