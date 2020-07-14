import { NFL } from '../Teams/NFL_Teams';

const INITIAL_STATE = NFL;

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        default:
            return state;
    }
};