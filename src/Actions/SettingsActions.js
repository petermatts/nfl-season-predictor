import { 
    UPDATE_PROGRESSBAR,
    CHANGE_PICK_TYPE,
    UPDATE_STANDINGS_DETAILS,
    UPDATE_PLAYOFF_PIC,
    CHANGE_TEAM_PICK
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