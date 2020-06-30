import T from '../Teams/Teams.json';
/*
0: ARI  1: ATL  2: BAL  3: BUF  4: CAR  5: CHI  6: CIN  7: CLE
8: DAL  9: DEN  10: DET  11: GB  12: HOU  13: IND  14: JAX  15: KC
16: LV  17: LAC  18: LAR  19: MIA  20: MIN  21: NE  22: NYG  23: NYJ
24: NO  25: PHI  26: PIT  27: SF  28: SEA  29: TB  30: TEN  31: WAS
*/

const game = (away, home, d) => {
    const day = d.toLacaleDateString('en-US', { weekday: 'long' });
    const date = d.toLocaleDateString('en-US');

    const timeOptions = {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit'
    };
    let time = d.toLocaleTimeString('en-US', timeOptions);
    if(time.startsWith('0')) {
        time = time.replace('0', '');
    }

    let primetime = false;
    if(day === 'Thursday' || day === 'Monday' || 
       day === 'Friday' || day === 'Saturday' 
       || (day === 'Sunday' && time === '8:20 PM')) { 
        primetime = true;
    }

    return { home, away, day, date, time, primetime };
};

const schedule = {
    week1: {
        games: [
            game(T[12], T[15], new Date(2020, 8, 10, 20, 20)),
            game(T[28], T[1], new Date(2020, 8, 13, 13, 0)),
            game(T[23], T[3], new Date(2020, 8, 13, 13, 0)),
            game(T[5], T[10], new Date(2020, 8, 13, 13, 0)),
            game(T[11], T[20], new Date(2020, 8, 13, 13, 0)),
            game(T[19], T[21], new Date(2020, 8, 13, 13, 0)),
            game(T[25], T[31], new Date(2020, 8, 13, 13, 0)),
            game(T[16], T[4], new Date(2020, 8, 13, 13, 0)),
            game(T[13], T[14], new Date(2020, 8, 13, 13, 0)),
            game(T[7], T[2], new Date(2020, 8, 13, 13, 0)),
            game(T[17], T[6], new Date(2020, 8, 13, 16, 5)),
            game(T[29], T[24], new Date(2020, 8, 13, 16, 25)),
            game(T[0], T[27], new Date(2020, 8, 13, 16, 25)),
            game(T[8], T[18], new Date(2020, 8, 13, 20, 20)),
            game(T[26], T[22], new Date(2020, 8, 14, 19, 15)),
            game(T[30], T[9], new Date(2020, 8, 14, 22, 10))
        ],
        byes: []
    },
    week2: {
        games: [
            game(T[6], T[7], new Date(2020, 8, 17, 20, 20)),
            game(T[22], T[5], new Date(2020, 8, 20, 13, 0)),
            game(T[1], T[8], new Date(2020, 8, 20, 13, 0)),
            game(T[10], T[11], new Date(2020, 8, 20, 13, 0)),
            game(T[14], T[30], new Date(2020, 8, 20, 13, 0)),
            game(T[20], T[13], new Date(2020, 8, 20, 13, 0)),
            game(T[3], T[19], new Date(2020, 8, 20, 13, 0)),
            game(T[27], T[23], new Date(2020, 8, 20, 13, 0)),
            game(T[18], T[25], new Date(2020, 8, 20, 13, 0)),
            game(T[9], T[26], new Date(2020, 8, 20, 13, 0)),
            game(T[4], T[29], new Date(2020, 8, 20, 13, 0)),
            game(T[31], T[0], new Date(2020, 8, 20, 16, 5)),
            game(T[15], T[17], new Date(2020, 8, 20, 16, 25)),
            game(T[2], T[12], new Date(2020, 8, 20, 16, 25)),
            game(T[21], T[28], new Date(2020, 8, 20, 20, 20)),
            game(T[24], T[16], new Date(2020, 8, 21, 20, 15))
        ],
        byes: []
    },
    week3: {
        games: [
            game(T[19], T[14], new Date(2020, 8, 24, 20, 20)),
            game(T[5], T[1], new Date(2020, 8, 27, 13, 0)),
            game(T[18], T[3], new Date(2020, 8, 27, 13, 0)),
            game(T[31], T[7], new Date(2020, 8, 27, 13, 0)),
            game(T[30], T[20], new Date(2020, 8, 27, 13, 0)),
            game(T[16], T[21], new Date(2020, 8, 27, 13, 0)),
            game(T[27], T[22], new Date(2020, 8, 27, 13, 0)),
            game(T[6], T[25], new Date(2020, 8, 27, 13, 0)),
            game(T[12], T[26], new Date(2020, 8, 27, 13, 0)),
            game(T[23], T[13], new Date(2020, 8, 27, 16, 5)),
            game(T[4], T[17], new Date(2020, 8, 27, 16, 5)),
            game(T[29], T[9], new Date(2020, 8, 27, 16, 25)),
            game(T[10], T[0], new Date(2020, 8, 27, 16, 25)),
            game(T[8], T[28], new Date(2020, 8, 27, 16, 25)),
            game(T[11], T[24], new Date(2020, 8, 27, 20, 20)),
            game(T[15], T[2], new Date(2020, 8, 28, 20, 15))
        ],
        byes: []
    },
    week4: {
        games: [
            game(T[9], T[23], new Date(2020, 9, 1, 20, 20)),
            game(T[13], T[5], new Date(2020, 9, 4, 13, 0)),
            game(T[14], T[6], new Date(2020, 9, 4, 13, 0)),
            game(T[7], T[8], new Date(2020, 9, 4, 13, 0)),
            game(T[24], T[10], new Date(2020, 9, 4, 13, 0)),
            game(T[26], T[30], new Date(2020, 9, 4, 13, 0)),
            game(T[28], T[19], new Date(2020, 9, 4, 13, 0)),
            game(T[17], T[29], new Date(2020, 9, 4, 13, 0)),
            game(T[2], T[31], new Date(2020, 9, 4, 13, 0)),
            game(T[0], T[4], new Date(2020, 9, 4, 13, 0)),
            game(T[20], T[12], new Date(2020, 9, 4, 13, 0)),
            game(T[22], T[18], new Date(2020, 9, 4, 16, 5)),
            game(T[21], T[15], new Date(2020, 9, 4, 16, 25)),
            game(T[3], T[16], new Date(2020, 9, 4, 16, 25)),
            game(T[25], T[27], new Date(2020, 9, 4, 20, 20)),
            game(T[1], T[11], new Date(2020, 9, 5, 20, 15)),
        ],
        byes: []
    },
    week5: {
        games: [],
        byes: [T[10], T[11]]
    },
    week6: {
        games: [],
        byes: [T[16], T[21], T[24], T[28]]
    },
    week7: {
        games: [],
        byes: [T[30], T[31], T[20], T[14]]
    },
    week8: {
        games: [],
        byes: [T[9], T[0], T[26], T[31], T[2], T[12]]
    },
    week9: {
        games: [],
        byes: [T[6], T[7], T[18], T[25]]
    },
    week10: {
        games: [],
        byes: [T[1], T[8], T[15], T[17]]
    },
    week11: {
        games: [],
        byes: [T[3], T[5], T[19], T[22], T[23], T[27]]
    },
    week12: {
        games: [],
        byes: []
    },
    week13: {
        games: [],
        byes: [T[29], T[4]]
    },
    week14: {
        games: [],
        byes: []
    },
    week15: {
        games: [],
        byes: []
    },
    week16: {
        games: [],
        byes: []
    },
    week17: {
        games: [],
        byes: []
    }
};

export { schedule };