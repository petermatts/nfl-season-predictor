import { UPDATE_PROGRESSBAR, CHANGE_PICK_TYPE, UPDATE_STANDINGS_DETAILS, UPDATE_PLAYOFF_PIC } from './../Actions/types';

const INITIAL_STATE = {
    showProgress: true,
    pickByTeam: false,
    pickTeam: null,

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
        default:
            return state;
    }
}
