import { schedule } from '../Schedule/2020';
import {} from './../Actions/types';

const INITIAL_STATE = schedule;

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

