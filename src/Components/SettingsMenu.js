import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { updatePB, changePickType } from '../Actions';
import './CSS/SettingsMenu.css';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }

    comingSoon() {
        return <h6>Cooming Soon</h6>
    }

    render() {
        const { settings } = this.props;
        return (
            <div>
                <button 
                    className="settingsButton"
                    id="pop"
                    onClick={() => {this.setState({ visible: !this.state.visible });}}
                >
                    <FontAwesomeIcon icon={faCog} className="gear" />
                </button>
                <Popover 
                    // trigger="click"
                    placement="bottom"
                    isOpen={this.state.visible}
                    target="pop"
                >
                    <PopoverHeader>
                        <div className="menuHeader">
                            <b>Settings!</b>
                        </div>
                    </PopoverHeader>
                    <PopoverBody>
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
                        <hr />
                        {this.comingSoon()}
                        <div className="menu-item">
                            Pick By:
                            <ButtonGroup>
                                <Button disabled
                                    size='sm'
                                    className="item-button"
                                    color={settings.pickByTeam ? 'danger':'success'}
                                    onClick={() => {this.props.changePickType()}}
                                >
                                    Week
                                </Button>
                                <Button disabled
                                    size='sm'
                                    className="item-button"
                                    color={settings.pickByTeam ? 'success':'danger'}
                                    onClick={() => {this.props.changePickType()}}
                                >
                                    Team
                                </Button>
                            </ButtonGroup>
                        </div>
                        {/* <div className="menu-item">
                            Standings Detail:
                            <ButtonGroup>
                                <Button disabled
                                    size='sm'
                                    className="item-button"
                                    color={settings.pickByTeam ? 'danger':'success'}
                                    onClick={() => {this.props.changePickType()}}
                                >
                                    Low
                                </Button>
                                <Button disabled
                                    size='sm'
                                    className="item-button"
                                    color={settings.pickByTeam ? 'success':'danger'}
                                    onClick={() => {this.props.changePickType()}}
                                >
                                    Medium
                                </Button>
                                <Button disabled
                                    size='sm'
                                    className="item-button"
                                    color={settings.pickByTeam ? 'danger':'success'}
                                    onClick={() => {this.props.changePickType()}}
                                >
                                    High
                                </Button>
                            </ButtonGroup>
                        </div> */}
                    </PopoverBody>
                </Popover>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { settings } = state;
    return { settings }
}

const SettingsMenu = connect(mapStateToProps, { updatePB, changePickType })(Settings);

export { SettingsMenu };
