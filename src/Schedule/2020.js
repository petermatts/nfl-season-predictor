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
        games: [
          game(T[29], T[5], new Date(2020, 9, 8, 20, 20)),
          game(T[4], T[1], new Date(2020, 9, 11, 13, 0)),
          game(T[16], T[30], new Date(2020, 9, 11, 13, 0)),
          game(T[9], T[15], new Date(2020, 9, 11, 13, 0)),
          game(T[0], T[21], new Date(2020, 9, 11, 13, 0)),
          game(T[25], T[23], new Date(2020, 9, 11, 13, 0)),
          game(T[18], T[26], new Date(2020, 9, 11, 13, 0)),
          game(T[6], T[31], new Date(2020, 9, 11, 13, 0)),
          game(T[14], T[2], new Date(2020, 9, 11, 13, 0)),
          game(T[19], T[12], new Date(2020, 9, 11, 16, 5)),
          game(T[13], T[27], new Date(2020, 9, 11, 16, 25)),
          game(T[22], T[7], new Date(2020, 9, 11, 16, 25)),
          game(T[20], T[8], new Date(2020, 9, 11, 20, 20)),
          game(T[17], T[28], new Date(2020, 9, 12, 20, 15))
        ],
        byes: [T[10], T[11]]
    },
    week6: {
        games: [
          game(T[15], T[3], new Date(2020, 9, 15, 20, 20)),
          game(T[12], T[30], new Date(2020, 9, 18, 13, 0)),
          game(T[6], T[13], new Date(2020, 9, 18, 13, 0)),
          game(T[1], T[20], new Date(2020, 9, 18, 13, 0)),
          game(T[31], T[22], new Date(2020, 9, 18, 13, 0)),
          game(T[2], T[25], new Date(2020, 9, 18, 13, 0)),
          game(T[7], T[26], new Date(2020, 9, 18, 13, 0)),
          game(T[5], T[4], new Date(2020, 9, 18, 13, 0)),
          game(T[10], T[14], new Date(2020, 9, 18, 13, 0)),
          game(T[19], T[9], new Date(2020, 9, 18, 16, 5)),
          game(T[23], T[17], new Date(2020, 9, 18, 16, 5)),
          game(T[11], T[29], new Date(2020, 9, 18, 16, 25)),
          game(T[18], T[27], new Date(2020, 9, 18, 20, 20)),
          game(T[0], T[8], new Date(2020, 9, 19, 20, 15)),
        ],
        byes: [T[16], T[21], T[24], T[28]]
    },
    week7: {
        games: [
          game(T[22], T[25], new Date(2020, 9, 22, 20, 20)),
          game(T[10], T[1], new Date(2020, 9, 25, 13, 0)),
          game(T[7], T[6], new Date(2020, 9, 25, 13, 0)),
          game(T[17], T[19], new Date(2020, 9, 25, 13, 0)),
          game(T[4], T[24], new Date(2020, 9, 25, 13, 0)),
          game(T[3], T[23], new Date(2020, 9, 25, 13, 0)),
          game(T[8], T[31], new Date(2020, 9, 25, 13, 0)),
          game(T[26], T[2], new Date(2020, 9, 25, 13, 0)),
          game(T[11], T[12], new Date(2020, 9, 25, 13, 0)),
          game(T[28], T[0], new Date(2020, 9, 25, 16, 5)),
          game(T[15], T[9], new Date(2020, 9, 25, 16, 25)),
          game(T[27], T[21], new Date(2020, 9, 25, 16, 25)),
          game(T[29], T[16], new Date(2020, 9, 25, 20, 20)),
          game(T[5], T[18], new Date(2020, 9, 26, 20, 15))
        ],
        byes: [T[30], T[31], T[20], T[14]]
    },
    week8: {
        games: [
          game(T[1], T[4], new Date(2020, 9, 29, 20, 20)),
          game(T[21], T[3], new Date(2020, 10, 1, 13, 0)),
          game(T[30], T[6], new Date(2020, 10, 1, 13, 0)),
          game(T[16], T[7], new Date(2020, 10, 1, 13, 0)),
          game(T[13], T[10], new Date(2020, 10, 1, 13, 0)),
          game(T[20], T[11], new Date(2020, 10, 1, 13, 0)),
          game(T[23], T[15], new Date(2020, 10, 1, 13, 0)),
          game(T[18], T[19], new Date(2020, 10, 1, 13, 0)),
          game(T[14], T[17], new Date(2020, 10, 1, 16, 5)),
          game(T[24], T[5], new Date(2020, 10, 1, 16, 25)),
          game(T[27], T[28], new Date(2020, 10, 1, 16, 25)),
          game(T[8], T[25], new Date(2020, 10, 1, 20, 20)),
          game(T[29], T[22], new Date(2020, 10, 2, 20, 15))

        ],
        byes: [T[9], T[0], T[26], T[31], T[2], T[12]]
    },
    week9: {
        games: [
          game(T[11], T[27], new Date(2020, 10, 5, 20, 20)),
          game(T[9], T[1], new Date(2020, 10, 8, 13, 0)),
          game(T[28], T[3], new Date(2020, 10, 8, 13, 0)),
          game(T[5], T[30], new Date(2020, 10, 8, 13, 0)),
          game(T[2], T[13], new Date(2020, 10, 8, 13, 0)),
          game(T[4], T[15], new Date(2020, 10, 8, 13, 0)),
          game(T[10], T[20], new Date(2020, 10, 8, 13, 0)),
          game(T[22], T[31], new Date(2020, 10, 8, 13, 0)),
          game(T[12], T[14], new Date(2020, 10, 8, 13, 0)),
          game(T[16], T[17], new Date(2020, 10, 8, 16, 5)),
          game(T[26], T[8], new Date(2020, 10, 8, 16, 25)),
          game(T[19], T[0], new Date(2020, 10, 8, 16, 25)),
          game(T[24], T[29], new Date(2020, 10, 8, 20, 20)),
          game(T[21], T[23], new Date(2020, 10, 9, 20, 15))
        ],
        byes: [T[6], T[7], T[18], T[25]]
    },
    week10: {
        games: [
          game(T[13], T[30], new Date(2020, 10, 12, 20, 20)),
          game(T[12], T[7], new Date(2020, 10, 15, 13, 0)),
          game(T[31], T[10], new Date(2020, 10, 15, 13, 0)),
          game(T[14], T[11], new Date(2020, 10, 15, 13, 0)),
          game(T[25], T[22], new Date(2020, 10, 15, 13, 0)),
          game(T[6], T[26], new Date(2020, 10, 15, 13, 0)),
          game(T[29], T[4], new Date(2020, 10, 15, 13, 0)),
          game(T[9], T[16], new Date(2020, 10, 15, 16, 5)),
          game(T[23], T[19], new Date(2020, 10, 15, 16, 5)),
          game(T[3], T[0], new Date(2020, 10, 15, 16, 5)),
          game(T[27], T[18], new Date(2020, 10, 15, 16, 25)),
          game(T[28], T[24], new Date(2020, 10, 15, 16, 25)),
          game(T[2], T[21], new Date(2020, 10, 15, 20, 20)),
          game(T[20], T[5], new Date(2020, 10, 16, 20, 15))
        ],
        byes: [T[1], T[8], T[15], T[17]]
    },
    week11: {
        games: [
          game(T[0], T[28], new Date(2020, 10, 19, 20, 20)),
          game(T[25], T[7], new Date(2020, 10, 22, 13, 0)),
          game(T[11], T[13], new Date(2020, 10, 22, 13, 0)),
          game(T[1], T[24], new Date(2020, 10, 22, 13, 0)),
          game(T[6], T[31], new Date(2020, 10, 22, 13, 0)),
          game(T[10], T[4], new Date(2020, 10, 22, 13, 0)),
          game(T[26], T[14], new Date(2020, 10, 22, 13, 0)),
          game(T[30], T[2], new Date(2020, 10, 22, 13, 0)),
          game(T[21], T[12], new Date(2020, 10, 22, 13, 0)),
          game(T[17], T[9], new Date(2020, 10, 22, 16, 5)),
          game(T[8], T[20], new Date(2020, 10, 22, 16, 25)),
          game(T[15], T[16], new Date(2020, 10, 22, 20, 20)),
          game(T[18], T[29], new Date(2020, 10, 23, 20, 15))
        ],
        byes: [T[3], T[5], T[19], T[22], T[23], T[27]]
    },
    week12: {
        games: [
          game(T[12], T[10], new Date(2020, 10, 26, 12, 30)),
          game(T[31], T[8], new Date(2020, 10, 26, 16, 30)),
          game(T[2], T[26], new Date(2020, 10, 26, 20, 20)),
          game(T[16], T[1], new Date(2020, 10, 29, 13, 0)),
          game(T[17], T[3], new Date(2020, 10, 29, 13, 0)),
          game(T[22], T[6], new Date(2020, 10, 29, 13, 0)),
          game(T[30], T[13], new Date(2020, 10, 29, 13, 0)),
          game(T[4], T[20], new Date(2020, 10, 29, 13, 0)),
          game(T[0], T[21], new Date(2020, 10, 29, 13, 0)),
          game(T[19], T[23], new Date(2020, 10, 29, 13, 0)),
          game(T[7], T[14], new Date(2020, 10, 29, 13, 0)),
          game(T[24], T[9], new Date(2020, 10, 29, 16, 5)),
          game(T[27], T[18], new Date(2020, 10, 29, 16, 5)),
          game(T[15], T[29], new Date(2020, 10, 29, 16, 25)),
          game(T[5], T[11], new Date(2020, 10, 29, 20, 20)),
          game(T[28], T[25], new Date(2020, 10, 30, 20, 15)),
        ],
        byes: []
    },
    week13: {
        games: [
          game(T[8, T[2], new Date(2020, 11, 3, 20, 20)),
          game(T[24], T[1], new Date(2020, 11, 6, 13, 0)),
          game(T[10], T[5], new Date(2020, 11, 6, 13, 0)),
          game(T[7], T[30], new Date(2020, 11, 6, 13, 0)),
          game(T[6], T[19], new Date(2020, 11, 6, 13, 0)),
          game(T[14], T[20], new Date(2020, 11, 6, 13, 0)),
          game(T[16], T[23], new Date(2020, 11, 6, 13, 0)),
          game(T[31], T[26], new Date(2020, 11, 6, 13, 0)),
          game(T[13], T[12], new Date(2020, 11, 6, 13, 0)),
          game(T[18], T[0], new Date(2020, 11, 6, 16, 5)),
          game(T[22], T[28], new Date(2020, 11, 6, 16, 5)),
          game(T[25], T[11], new Date(2020, 11, 6, 16, 25)),
          game(T[21], T[17], new Date(2020, 11, 6, 16, 25)),
          game(T[9], T[15], new Date(2020, 11, 6, 20, 20)),
          game(T[3], T[27], new Date(2020, 11, 7, 20, 15))
        ],
        byes: [T[29], T[4]]
    },
    week14: {
        games: [
          game(T[21], T[18], new Date(2020, 11, 10, 20, 20)),
          game(T[12], T[5], new Date(2020, 11, 13, 13, 0)),
          game(T[8], T[6], new Date(2020, 11, 13, 13, 0)),
          game(T[11], T[10], new Date(2020, 11, 13, 13, 0)),
          game(T[15], T[19], new Date(2020, 11, 13, 13, 0)),
          game(T[0], T[22], new Date(2020, 11, 13, 13, 0)),
          game(T[20], T[29], new Date(2020, 11, 13, 13, 0)),
          game(T[9], T[4], new Date(2020, 11, 13, 13, 0)),
          game(T[30], T[14], new Date(2020, 11, 13, 13, 0)),
          game(T[13], T[16], new Date(2020, 11, 13, 16, 5)),
          game(T[23], T[28], new Date(2020, 11, 13, 16, 5)),
          game(T[24], T[25], new Date(2020, 11, 13, 16, 25)),
          game(T[1], T[17], new Date(2020, 11, 13, 16, 25)),
          game(T[31], T[27], new Date(2020, 11, 13, 16, 25)),
          game(T[26], T[3], new Date(2020, 11, 13, 20, 20)),
          game(T[2], T[7], new Date(2020, 11, 14, 20, 15))
        ],
        byes: []
    },
    week15: {
        games: [
          game(T[17], T[16], new Date(2020, 11, 17, 20, 20)),
          game(T[3], T[9], new Date(2020, 11, 20)), // TBD
          game(T[4], T[11], new Date(2020, 11, 20)), // TBD
          game(T[10], T[30], new Date(2020, 11, 20)), // TBD
          game(T[12], T[13], new Date(2020, 11, 20)), // TBD
          game(T[23], T[18], new Date(2020, 11, 20)), // TBD
          game(T[29], T[1], new Date(2020, 11, 20, 13, 0)),
          game(T[21], T[19], new Date(2020, 11, 20, 13, 0)),
          game(T[5], T[20], new Date(2020, 11, 20, 13, 0)),
          game(T[7], T[22], new Date(2020, 11, 20, 13, 0)),
          game(T[28], T[31], new Date(2020, 11, 20, 13, 0)),
          game(T[14], T[2], new Date(2020, 11, 20, 13, 0)),
          game(T[25], T[0], new Date(2020, 11, 20, 16, 5)),
          game(T[15], T[24], new Date(2020, 11, 20, 16, 25)),
          game(T[27], T[8], new Date(2020, 11, 20, 20, 20)),
          game(T[26], T[6], new Date(2020, 11, 21, 20, 15))
        ],
        byes: []
    },
    week16: {
        games: [
          game(T[20], T[24], new Date(2020, 11, 25, 4, 30)),
          game(T[29], T[10], new Date(2020, 11, 27)), //TBD
          game(T[19], T[16], new Date(2020, 11, 27)), //TBD
          game(T[7], T[22], new Date(2020, 11, 27)), //TBD
          game(T[27], T[0], new Date(2020, 11, 27)), //TBD
          game(T[9], T[17], new Date(2020, 11, 27)), //TBD
          game(T[1], T[15], new Date(2020, 11, 27, 13, 0)),
          game(T[13], T[26], new Date(2020, 11, 27, 13, 0)),
          game(T[4], T[31], new Date(2020, 11, 27, 13, 0)),
          game(T[5], T[14], new Date(2020, 11, 27, 13, 0)),
          game(T[22], T[2], new Date(2020, 11, 27, 13, 0)),
          game(T[6], T[12], new Date(2020, 11, 27, 13, 0)),
          game(T[18], T[28], new Date(2020, 11, 27, 16, 5)),
          game(T[25], T[8], new Date(2020, 11, 27, 16, 25)),
          game(T[30], T[11], new Date(2020, 11, 27, 20, 20)),
          game(T[3], T[21], new Date(2020, 11, 28, 20, 15))
        ],
        byes: []
    },
    week17: {
        games: [
          game(T[19], T[3], new Date(2021, 0, 3, 13, 0)),
          game(T[11], T[5], new Date(2021, 0, 3, 13, 0)),
          game(T[2], T[6], new Date(2021, 0, 3, 13, 0)),
          game(T[26], T[7], new Date(2021, 0, 3, 13, 0)),
          game(T[20], T[10], new Date(2021, 0, 3, 13, 0)),
          game(T[14], T[13], new Date(2021, 0, 3, 13, 0)),
          game(T[17], T[15], new Date(2021, 0, 3, 13, 0)),
          game(T[22], T[21], new Date(2021, 0, 3, 13, 0)),
          game(T[8], T[22], new Date(2021, 0, 3, 13, 0)),
          game(T[31], T[25], new Date(2021, 0, 3, 13, 0)),
          game(T[1], T[29], new Date(2021, 0, 3, 13, 0)),
          game(T[24], T[4], new Date(2021, 0, 3, 13, 0)),
          game(T[30], T[12], new Date(2021, 0, 3, 13, 0)),
          game(T[16], T[9], new Date(2021, 0, 3, 16, 25)),
          game(T[0], T[18], new Date(2021, 0, 3, 16, 25)),
          game(T[28], T[27], new Date(2021, 0, 3, 16, 25))
        ],
        byes: []
    }
};

export { schedule };
