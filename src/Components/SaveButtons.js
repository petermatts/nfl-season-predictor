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
    Spinner,
    Collapse
} from 'reactstrap'; 
import { connect } from 'react-redux';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { loadSave, saveSave } from '../Actions';
import { unpicked } from '../Actions/Constants';
import './CSS/SaveButtons.css';
import './CSS/LoginPage.css';

const ERR = {
    exists: "A save already exists under that name",
    warning: "Any unsaved data from the current save will be lost upon creating a new save",
    clear: ""
};

// eslint-disable-next-line no-useless-escape
const badChars = ['/', '.', ',', '\\', '\'', '\"', '\`'];

class Save extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            saveName: '',
            season: 2021,
            openDropdown: false,
            loading: false,
            error: ERR.clear
        };
        this.nameChange = this.nameChange.bind(this);
        this.createNew = this.createNew.bind(this);
        this.createFromPicks = this.createFromPicks.bind(this);
        this.dropdownToggle = this.dropdownToggle.bind(this);
    }

    nameChange(event) {
        const v = event.target.value
        if(!badChars.includes(v.charAt(v.length-1)))
            this.setState({ saveName: v });
    }
    dropdownToggle() { this.setState({ openDropdown: !this.state.openDropdown}); }
    setDropdown(season) { this.setState({ season }); }

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

    seasonDropdown() {
        return(
            <div>
                <label htmlFor="season-select" className="input-labels">Season</label>
                <Dropdown
                    isOpen={this.state.openDropdown}
                    toggle={this.dropdownToggle}
                    id="season-select"
                >
                    <DropdownToggle>{this.state.season}</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            onClick={() => this.setDropdown(2021)}
                        >
                            2021
                        </DropdownItem>
                        <DropdownItem
                            disabled
                            onClick={() => this.setDropdown(2022)}
                        >
                            2022
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }

    async createNew() {
        /* Push the new save with default picks (all games unpicked) to firebase */
        this.setState({ loading: true, error: ERR.clear });
        const { uid } = firebase.auth().currentUser;
        const { season, saveName } = this.state;
        let exists = null;
        await firebase.database().ref(`/users/${uid}/saves/${season}/${saveName}`).once('value')
            .then((snapshot) => snapshot.val()===null ? exists = false : exists = true);
        // console.log(exists);

        if(!exists) {
            const defaultList = new Array(272).fill(unpicked, 0,272).join().replaceAll(',','');
            firebase.database().ref(`/users/${uid}/saves/${season}/${saveName}`)
                .set(defaultList)
                .then(() => console.log('save successful'))
                .catch((error) => console.log(error)); 
    
            /* Load the save */
            this.props.loadSave(saveName, season);

            //! change this.props.settings.season to the newly selected season using this.props.updateSeason(season)
    
            //close the modal
            this.setState({ loading: false, showModal: false });
        } else {
            this.setState({ loading: false, saveName: "", error: ERR.exists });
        }
    }

    async createFromPicks() {
        // /* Push and name the save and picks to firebase, update saveStatus in userdata reducer  */
        this.setState({ loading: true, error: ERR.clear });
        const { uid } = firebase.auth().currentUser;
        const { season, saveName } = this.state;
        let exists = null;
        await firebase.database().ref(`/users/${uid}/saves/${season}/${saveName}`).once('value')
            .then((snapshot) => snapshot.val()===null ? exists = false : exists = true);
        // console.log(exists);

        if(!exists) {
            const list = this.props.userdata.gamelist.join().replaceAll(',','');
            firebase.database().ref(`/users/${uid}/saves/${season}/${saveName}`)
                .set(list)
                .then(() => console.log('save successful'))
                .catch((error) => console.log(error));

            /* Load the save */
            this.props.loadSave(saveName, season);
         
            //close the modal
            this.setState({ loading: false, showModal: false });
        } else {
            this.setState({ loading: false, saveName: "", error: ERR.exists });
        }
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
                        disabled={this.state.saveName === '' || this.state.season !== this.props.settings.season}
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
                <ModalHeader>Create New Save</ModalHeader>
                <ModalBody>
                    {this.seasonDropdown()}
                    {this.nameInput()}
                    <div className="auth-error">{this.state.error}</div>
                </ModalBody>
                {this.renderModalButtons()}
            </Modal>
        );
    }

    render() {
        const { saveStatus, saveData, gamelist, name } = this.props.userdata;
        const match = gamelist.join().replaceAll(',','') === saveData;

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
                    <div className="display-save-name">{`${name}${saveStatus}`}</div>
                    <button
                        className="save-buttons"
                        disabled={match}
                        onClick={() => this.props.saveSave()}
                    >
                        {match ? 'Saved!':'Save'}
                    </button>
                    {this.renderCreateModal()}
                    <button
                        className="save-buttons"
                        disabled={false}
                        onClick={() => this.setState({ showModal: true.valueOf, error: ERR.warning })}
                    >
                        Create Save
                    </button>
                </div>         
            );
        }
    }
}

class Load extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            loading: false, 
            options: null,
            selection: null,
            collapseOpen: new Set(),
            
            error: ERR.clear
        };
    }

    componentDidMount() {
        this.getLoadOptions();
    }

    async getLoadOptions() {
        this.setState({ loading: true });
        const { uid } = firebase.auth().currentUser;
        let options = null;

        await firebase.database().ref(`/users/${uid}/saves`).once('value')
            .then((snapshot) => options = snapshot.val());

        this.setState({ options, loading: false });
    }

    renderLoadOptions() {
        const { loading, options, collapseOpen, selection } = this.state;
        if(loading)
            return <Spinner />;

        if(options === null) {
            return <div>No Existing Saves Found</div>;
        } else {
            const years = Object.keys(options);

            return years.map((year) => {
                const isOpen = collapseOpen.has(year);
                const saves = options[year];
                const select = Object.keys(saves).map((s) => {
                    return(
                        <button
                            className="load-save-button"
                            disabled={s === selection}
                            onClick={() => this.setState({ selection: s, season: year })}
                        >
                            {s}
                        </button>
                    );
                });

                return(
                    <div>
                        <button
                            className="load-season-button"
                            onClick={() => {
                                const open = collapseOpen;
                                isOpen ? open.delete(year) : open.add(year);
                                this.setState({ collapseOpen: open });
                            }}
                        >
                            {year}
                            {isOpen ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}
                        </button>
                        <Collapse isOpen={collapseOpen.has(year)}>
                            <div className="load-save-holder">{select}</div>
                        </Collapse>
                    </div>
                );
            });
        }
    }

    renderModalButtons() {
        const { loading, options, selection, season } = this.state;
        if(!this.state.loading) {
            return(
                <ModalFooter className="load-footer">
                    <h5>Selection</h5>
                    {selection===null ? 'No Save Selected' : <b className="save-selected">{selection}</b>}
                    <div className="load-footer-button-holder">
                        <button
                            className="submit-modal"
                            disabled={loading || options === null || selection === null}
                            onClick={() => {
                                this.props.loadSave(selection, season);
                                this.setState({ showModal: false, selection: null, collapseOpen: new Set() });
                            }}
                        >
                            Load
                        </button>
                        <button
                            className="cancel-modal"
                            disabled={loading}
                            onClick={() => this.setState({ showModal: false, selection: null, collapseOpen: new Set() })}
                        >
                            Cancel
                        </button>
                    </div>
                </ModalFooter>
            );
        } else {
            return <ModalFooter><Spinner /></ModalFooter>
        }
    }

    renderLoadModal() {
        return(
            <Modal backdrop={true} isOpen={this.state.showModal}>
                <ModalHeader>Load Save</ModalHeader>
                <ModalBody>{this.renderLoadOptions()}</ModalBody>
                {this.renderModalButtons()}
            </Modal>
        );
    }

    render() {
        return(
            <div>
                {this.renderLoadModal()}
                <button
                    className="save-buttons"
                    disabled={false}
                    onClick={() => this.setState({ showModal: true })}
                >
                    Load Save
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { userdata, settings } = state;
    return { userdata, settings };
}

const SaveButton = connect(mapStateToProps, { loadSave, saveSave })(Save);
const LoadButton = connect(mapStateToProps, { loadSave })(Load);

export { SaveButton, LoadButton };
