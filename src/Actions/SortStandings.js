import { SORT_DIVISION, SORT_CONFRENCE} from './types'

export const sortDivision = (division) => (
    {
        type: SORT_DIVISION,
        payload: division.sort((a, b) => compareDivision(a, b))
    }
);

function compareDivision(a, b) {
    if(a.pct !== b.pct)
        return b.pct-a.pct;
    else {
        // const winnerA = a.wins.includes(b);
        // const winnerB = b.wins.includes(a);
    }
}

export const sortConfrence = (confrence) => (
    {
        type: SORT_CONFRENCE,
        payload: confrence.sort((a, b) => compareConfrence(a, b))
    }
);

function compareConfrence(a, b) {

}