import { UPDATE_UGAMELIST } from './../Actions/types';
import { unpicked, homewin, awaywin, tiegame, win, loss, tie } from './../Actions/Constants';

const defaultList = new Array(272).fill(unpicked, 0,272);
const defaultGrid = new Array(32);
for(let i = 0; i < defaultGrid.length; i++)
    defaultGrid[i] = new Array(18).fill(unpicked, 0, 18);

const INITIAL_STATE = {
    gamelist: defaultList,
    gamegrid: defaultGrid,
    gamespicked: 0
};

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case UPDATE_UGAMELIST:
            const { home, away } = action.payload.gridLocs;
            const { pick, week, key } = action.payload;

            const newList = state.gamelist;
            newList[key] = pick;
            const gamespicked = newList.filter((p) => p!==0).length;

            const newGrid = state.gamegrid;
            if(pick === homewin) {
                newGrid[home][week-1] = win;
                newGrid[away][week-1] = loss;
            } else if(pick === awaywin) {
                newGrid[home][week-1] = loss;
                newGrid[away][week-1] = win;
            } else if(pick === tiegame) {
                newGrid[home][week-1] = tie;
                newGrid[away][week-1] = tie;
            }

            return { ...state, gamelist: newList, gamegrid: newGrid, gamespicked };
        default:
            return state;
    }
}
