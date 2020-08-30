import { schedule }from '../Schedule/2020';
import { UPDATE_SCHEDULE } from '../Actions/types';

const INITIAL_STATE = schedule;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_SCHEDULE:

            switch(action.week) {
                case 'week1':
                    return {...state, week1: { ...state.week1,  } };
                case 'week2':
                case 'week3':
                case 'week4':
                case 'week5':
                case 'week6':
                case 'week7':
                case 'week8':
                case 'week9':
                case 'week10':
                case 'week11':
                case 'week12':
                case 'week13':
                case 'week14':
                case 'week15':
                case 'week16':
                case 'week17':
                    return;

                default:
                    return;
            }
        default:
            return state;
    }
}
