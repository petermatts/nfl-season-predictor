import {
    UPDATE_PROGRESSBAR, 
    CHANGE_PICK_TYPE,
    UPDATE_STANDINGS_DETAILS,
    UPDATE_PLAYOFF_PIC,
    CHANGE_TEAM_PICK,
    SHOW_ABOUT,
    SHOW_INSTRUCTIONS
} from './../Actions/types';

const INITIAL_STATE = {
    showProgress: false,
    pickByTeam: true,
    pickTeam: null,
    showAbout: false,
    showInstructions: false,

    advancedStandings: 1,
    showplayoffpic: false
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_PROGRESSBAR:
            return { ...state, showProgress: !state.showProgress };
        case CHANGE_PICK_TYPE:
            return { ...state, pickByTeam: !state.pickByTeam };
        case UPDATE_STANDINGS_DETAILS:
            return { ...state, advancedStandings: action.payload };
        case UPDATE_PLAYOFF_PIC:
            return { ...state, showplayoffpic: !state.showplayoffpic };
        case CHANGE_TEAM_PICK:
            return { ...state, pickTeam: action.payload };
        case SHOW_ABOUT:
            return { ...state, showAbout: !state.showAbout, showInstructions: false };
        case SHOW_INSTRUCTIONS:
            return { ...state, showInstructions: !state.showInstructions, showAbout: false };
        default:
            return state;
    }
}
