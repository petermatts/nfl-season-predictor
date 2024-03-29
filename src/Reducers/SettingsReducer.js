import {
    UPDATE_PROGRESSBAR, 
    CHANGE_PICK_TYPE,
    UPDATE_STANDINGS_DETAILS,
    UPDATE_PLAYOFF_PIC,
    CHANGE_TEAM_PICK,
    SHOW_ABOUT,
    SHOW_INSTRUCTIONS,
    SHOW_LOGIN,
    SET_SEASON,
    STANDINGS_PLACE,
    LOGOS
} from './../Actions/types';

const INITIAL_STATE = {
    showProgress: false,
    pickByTeam: true,
    pickTeam: null,
    advancedStandings: 1,
    standPlacement: 0,
    showplayoffpic: false,
    season: 2023,
    logo: false,

    showAbout: false,
    showInstructions: false,
    showLogin: false
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
        case SHOW_LOGIN:
            return { ...state, showLogin: !state.showLogin, showAbout: false, showInstructions: false };
        case SET_SEASON:
            return { ...state, season: action.payload };
        case STANDINGS_PLACE:
            return { ...state, standPlacement: action.payload };
        case LOGOS:
            return { ...state, logo: !state.logo };
        default:
            return state;
    }
}
