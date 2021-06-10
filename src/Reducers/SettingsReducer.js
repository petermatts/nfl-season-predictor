import { UPDATE_PROGRESSBAR, CHANGE_PICK_TYPE } from './../Actions/types';

const INITIAL_STATE = {
    showProgress: true,
    pickByTeam: false,

    advancedStandings: false,
    showplayoffpic: false
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_PROGRESSBAR:
            return { ...state, showProgress: !state.showProgress };
        case CHANGE_PICK_TYPE:
                return { ...state, pickByTeam: !state.pickByTeam };
        default:
            return state;
    }
}
