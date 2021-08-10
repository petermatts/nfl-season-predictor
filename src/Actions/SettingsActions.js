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
    STANDINGS_PLACE
} from './types';

export const updatePB = () => {
    return {
        type: UPDATE_PROGRESSBAR
    };
};

export const changePickType = () => {
    return {
        type: CHANGE_PICK_TYPE
    };
};

export const standingsDetail = (detailLevel) => {
    return {
        type: UPDATE_STANDINGS_DETAILS,
        payload: detailLevel
    }
};

export const updatePlayoffPic = () => {
    return {
        type: UPDATE_PLAYOFF_PIC
    };
}

export const changeTeamPick = (newPick) => {
    return {
        type: CHANGE_TEAM_PICK,
        payload: newPick
    };
};

export const showAbout = () => {
    return {
        type: SHOW_ABOUT
    };
}

export const showInstructions = () => {
    return {
        type: SHOW_INSTRUCTIONS
    };
}

export const showLogin = () => {
    return {
        type: SHOW_LOGIN
    };
};

export const updateSeason = (season) => {
    return {
        type: SET_SEASON,
        payload: season
    };
};

export const placeStandings = (place) => {
    return {
        type: STANDINGS_PLACE,
        payload: place
    };
};
