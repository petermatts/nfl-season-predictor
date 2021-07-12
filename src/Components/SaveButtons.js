import React, { Component } from 'react';
import { 
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Spinner
} from 'reactstrap'; 
import { connect } from 'react-redux';
import firebase from 'firebase';
import { loadSave } from '../Actions';
import { unpicked } from '../Actions/Constants';
import './CSS/SaveButtons.css';
import './CSS/LoginPage.css';

class Save extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            saveName: '',
            season: 2021,
            openDropdown: false,
            loading: false
        };
        this.nameChange = this.nameChange.bind(this);
        this.createNew = this.createNew.bind(this);
        this.createFromPicks = this.createFromPicks.bind(this);
    }

    nameChange(event) { this.setState({ saveName: event.target.value }); }

    nameInput() {
        return(
            <div>
                <label htmlFor="save-name" className="input-labels">Save Name</label>
                <input
                    placeholder="My Game Picks"
                    id="save-name"
                    className="text-input"
                    value={this.state.saveName}
                    onChange={this.nameChange}
                    autoComplete="off"
                    required
                />
            </div>
        );
    }

    //! will cause update state exceeds max depth error, good thing its not needed right now
    seasonDropdown() {
        return(
            <div>
                <Dropdown
                    isOpen={this.state.openDropdown}
                    toggle={() => this.setState({ openDropdown: !this.state.openDropdown})}
                >
                    <DropdownToggle>{this.state.season}</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            onClick={this.setState({ season: 2021, openDropdown: false })}
                        >
                            2021
                        </DropdownItem>
                        <DropdownItem
                            disabled
                            onClick={this.setState({ season: 2022, openDropdown: false })}
                        >
                            2022
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }

    createNew() {
        /* Push the new save with default picks (all games unpicked) to firebase */
        this.setState({ loading: true });
        const { uid } = firebase.auth().currentUser;
        const { season, saveName } = this.state;
        const defaultList = new Array(272).fill(unpicked, 0,272).join().replaceAll(',','');
        firebase.database().ref(`/users/${uid}/saves/${season}/${saveName}`)
            .set(defaultList)
            .then(() => console.log('save successful'))
            .catch((error) => console.log(error)); 

        /* Load the save */
        this.props.loadSave(saveName, season);

        //close the modal
        this.setState({ loading: false, showModal: false })
        return;
    }

    createFromPicks() {
        /* Push and name the save and picks to firebase, update saveStatus in userdata reducer  */
        return;
    }

    renderModalButtons() {
        if(!this.state.loading) {
            return(
                <ModalFooter>
                    <button
                        className="submit-modal"
                        disabled={this.state.saveName === ''}
                        onClick={this.createNew}
                    >
                        Create New
                    </button>
                    <button
                        className="submit-modal"
                        disabled={this.state.saveName === ''}
                        onClick={this.createFromPicks}
                    >
                        Create From Picks
                    </button>
                    <button
                        className="cancel-modal"
                        onClick={() => this.setState({ showModal: false, saveName: '' })}
                    >
                        Cancel
                    </button>
                </ModalFooter>
            );
        } else {
            return <ModalFooter><Spinner /></ModalFooter>
        }
    }

    renderCreateModal() {
        return(
            <Modal backdrop={true} isOpen={this.state.showModal}>
                <ModalHeader>
                    Create New Save
                </ModalHeader>
                <ModalBody>
                    {/* {this.seasonDropdown()} */}
                    {this.nameInput()}
                </ModalBody>
                {this.renderModalButtons()}
            </Modal>
        );
    }

    render() {
        const { saveStatus } = this.props.userdata;

        if(saveStatus === null) {
            return(
                <div className="save-holder">
                    {this.renderCreateModal()}
                    <button
                        className="save-buttons"
                        disabled={false}
                        onClick={() => this.setState({ showModal: true })}
                    >
                        Create Save
                    </button>
                </div>
            );
        } else {
            return(
                <div className="save-holder">
                    {this.renderCreateModal()}
                    <button
                        className="save-buttons"
                        disabled={false}
                        // onclick={func}
                    >
                        Create Save
                    </button>
                    <button
                        className="save-buttons"
                        disabled={false}
                        // onclick={func}
                    >
                        Save
                    </button>
                </div>
               
            );
        }
    }
}

class Load extends Component {
    render() {
        return(
            <button
                className="save-buttons"
                disabled={false}
                // onclick={func}
            >
                Load Save
            </button>
        );
    }
}

const mapStateToProps = (state) => {
    const { userdata } = state;
    return { userdata };
}

const SaveButton = connect(mapStateToProps, { loadSave })(Save);
const LoadButton = connect(mapStateToProps, {})(Load);

export { SaveButton, LoadButton };
