import { UPDATE_PROGRESSBAR, CHANGE_PICK_TYPE } from './types';

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