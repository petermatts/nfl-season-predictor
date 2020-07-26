function compareDivision(a, b) {
    if(a.pct !== b.pct)
        return b.pct-a.pct;
    else {
        const winnerA = a.wins.includes(b);
        const winnerB = b.wins.includes(a);

        if(winnerA && !winnerB)
            return -1;
        else if (!winnerA && winnerB)
            return 1;
        else {
            return 0;
        }
    }
}


function compareConfrence(a, b) {

}

const sortDivision = (division) => {
    return division.sort((a, b) => compareDivision(a, b));
};

const sortConfrence = (confrence) => {
    return confrence.sort((a, b) => compareConfrence(a, b));
};

export { sortDivision, sortConfrence };