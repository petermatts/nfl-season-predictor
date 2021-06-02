/*
0: ARI  1: ATL  2: BAL  3: BUF  4: CAR  5: CHI  6: CIN  7: CLE
8: DAL  9: DEN  10: DET  11: GB  12: HOU  13: IND  14: JAX  15: KC
16: LV  17: LAC  18: LAR  19: MIA  20: MIN  21: NE  22: NYG  23: NYJ
24: NO  25: PHI  26: PIT  27: SF  28: SEA  29: TB  30: TEN  31: WAS
*/

/*
Array index for each team found in ../Teams/TeamOrder.txt
*/
import { game } from './ScheduleReader';

//! DEPRECIATE 2020
const schedule = {
    week1: {
        games: [
            game('HOU', 'KC', new Date(2020, 8, 10, 20, 20)),
            game('SEA', 'ATL', new Date(2020, 8, 13, 13, 0)),
            game('NYJ', 'BUF', new Date(2020, 8, 13, 13, 0)),
            game('CHI', 'DET', new Date(2020, 8, 13, 13, 0)),
            game('GB', 'MIN', new Date(2020, 8, 13, 13, 0)),
            game('MIA', 'NE', new Date(2020, 8, 13, 13, 0)),
            game('PHI', 'WAS', new Date(2020, 8, 13, 13, 0)),
            game('LV', 'CAR', new Date(2020, 8, 13, 13, 0)),
            game('IND', 'JAX', new Date(2020, 8, 13, 13, 0)),
            game('CLE', 'BAL', new Date(2020, 8, 13, 13, 0)),
            game('LAC', 'CIN', new Date(2020, 8, 13, 16, 5)),
            game('TB', 'NO', new Date(2020, 8, 13, 16, 25)),
            game('ARI', 'SF', new Date(2020, 8, 13, 16, 25)),
            game('DAL', 'LAR', new Date(2020, 8, 13, 20, 20)),
            game('PIT', 'NYG', new Date(2020, 8, 14, 19, 15)),
            game('TEN', 'DEN', new Date(2020, 8, 14, 22, 10))
        ],
        byes: []
    },
    week2: {
        games: [
            game('CIN', 'CLE', new Date(2020, 8, 17, 20, 20)),
            game('NYG', 'CHI', new Date(2020, 8, 20, 13, 0)),
            game('ATL', 'DAL', new Date(2020, 8, 20, 13, 0)),
            game('DET', 'GB', new Date(2020, 8, 20, 13, 0)),
            game('JAX', 'TEN', new Date(2020, 8, 20, 13, 0)),
            game('MIN', 'IND', new Date(2020, 8, 20, 13, 0)),
            game('BUF', 'MIA', new Date(2020, 8, 20, 13, 0)),
            game('SF', 'NYJ', new Date(2020, 8, 20, 13, 0)),
            game('LAR', 'PHI', new Date(2020, 8, 20, 13, 0)),
            game('DEN', 'PIT', new Date(2020, 8, 20, 13, 0)),
            game('CAR', 'TB', new Date(2020, 8, 20, 13, 0)),
            game('WAS', 'ARI', new Date(2020, 8, 20, 16, 5)),
            game('KC', 'LAC', new Date(2020, 8, 20, 16, 25)),
            game('BAL', 'HOU', new Date(2020, 8, 20, 16, 25)),
            game('NE', 'SEA', new Date(2020, 8, 20, 20, 20)),
            game('NO', 'LV', new Date(2020, 8, 21, 20, 15))
        ],
        byes: []
    },
    week3: {
        games: [
            game('MIA', 'JAX', new Date(2020, 8, 24, 20, 20)),
            game('CHI', 'ATL', new Date(2020, 8, 27, 13, 0)),
            game('LAR', 'BUF', new Date(2020, 8, 27, 13, 0)),
            game('WAS', 'CLE', new Date(2020, 8, 27, 13, 0)),
            game('TEN', 'MIN', new Date(2020, 8, 27, 13, 0)),
            game('LV', 'NE', new Date(2020, 8, 27, 13, 0)),
            game('SF', 'NYG', new Date(2020, 8, 27, 13, 0)),
            game('CIN', 'PHI', new Date(2020, 8, 27, 13, 0)),
            game('HOU', 'PIT', new Date(2020, 8, 27, 13, 0)),
            game('NYJ', 'IND', new Date(2020, 8, 27, 16, 5)),
            game('CAR', 'LAC', new Date(2020, 8, 27, 16, 5)),
            game('TB', 'DEN', new Date(2020, 8, 27, 16, 25)),
            game('DET', 'ARI', new Date(2020, 8, 27, 16, 25)),
            game('DAL', 'SEA', new Date(2020, 8, 27, 16, 25)),
            game('GB', 'NO', new Date(2020, 8, 27, 20, 20)),
            game('KC', 'BAL', new Date(2020, 8, 28, 20, 15))
        ],
        byes: []
    },
    week4: {
        games: [
            game('DEN', 'NYJ', new Date(2020, 9, 1, 20, 20)),
            game('IND', 'CHI', new Date(2020, 9, 4, 13, 0)),
            game('JAX', 'CIN', new Date(2020, 9, 4, 13, 0)),
            game('CLE', 'DAL', new Date(2020, 9, 4, 13, 0)),
            game('NO', 'DET', new Date(2020, 9, 4, 13, 0)),
            game('PIT', 'TEN', new Date(2020, 9, 4, 13, 0)),
            game('SEA', 'MIA', new Date(2020, 9, 4, 13, 0)),
            game('LAC', 'TB', new Date(2020, 9, 4, 13, 0)),
            game('BAL', 'WAS', new Date(2020, 9, 4, 13, 0)),
            game('ARI', 'CAR', new Date(2020, 9, 4, 13, 0)),
            game('MIN', 'HOU', new Date(2020, 9, 4, 13, 0)),
            game('NYG', 'LAR', new Date(2020, 9, 4, 16, 5)),
            game('NE', 'KC', new Date(2020, 9, 4, 16, 25)),
            game('BUF', 'LV', new Date(2020, 9, 4, 16, 25)),
            game('PHI', 'SF', new Date(2020, 9, 4, 20, 20)),
            game('ATL', 'GB', new Date(2020, 9, 5, 20, 15)),
        ],
        byes: []
    },
    week5: { // !
        games: [
          game('TB', 'CHI', new Date(2020, 9, 8, 20, 20)),
          game('CAR', 'ATL', new Date(2020, 9, 11, 13, 0)),
          game('BUF', 'TEN', new Date(2020, 9, 11, 13, 0)),
          game('LV', 'KC', new Date(2020, 9, 11, 13, 0)),
          game('DEN', 'NE', new Date(2020, 9, 11, 13, 0)),
          game('ARI', 'NYJ', new Date(2020, 9, 11, 13, 0)),
          game('PHI', 'PIT', new Date(2020, 9, 11, 13, 0)),
          game('LAR', 'WAS', new Date(2020, 9, 11, 13, 0)),
          game('CIN', 'BAL', new Date(2020, 9, 11, 13, 0)),
          game('JAX', 'HOU', new Date(2020, 9, 11, 13, 0)),
          game('MIA', 'SF', new Date(2020, 9, 11, 16, 5)),
          game('IND', 'CLE', new Date(2020, 9, 11, 16, 25)),
          game('NYG', 'DAL', new Date(2020, 9, 11, 16, 25)),
          game('MIN', 'SEA', new Date(2020, 9, 11, 20, 20)),
          game('LAC', 'NO', new Date(2020, 9, 12, 20, 15))
        ],
        byes: ['DET', 'GB']
    },
    week6: {
        games: [
          game('KC', 'BUF', new Date(2020, 9, 15, 20, 20)),
          game('HOU', 'TEN', new Date(2020, 9, 18, 13, 0)),
          game('CIN', 'IND', new Date(2020, 9, 18, 13, 0)),
          game('ATL', 'MIN', new Date(2020, 9, 18, 13, 0)),
          game('WAS', 'NYG', new Date(2020, 9, 18, 13, 0)),
          game('BAL', 'PHI', new Date(2020, 9, 18, 13, 0)),
          game('CLE', 'PIT', new Date(2020, 9, 18, 13, 0)),
          game('CHI', 'CAR', new Date(2020, 9, 18, 13, 0)),
          game('DET', 'JAX', new Date(2020, 9, 18, 13, 0)),
          game('MIA', 'DEN', new Date(2020, 9, 18, 16, 5)),
          game('NYJ', 'LAC', new Date(2020, 9, 18, 16, 5)),
          game('GB', 'TB', new Date(2020, 9, 18, 16, 25)),
          game('LAR', 'SF', new Date(2020, 9, 18, 20, 20)),
          game('ARI', 'DAL', new Date(2020, 9, 19, 20, 15)),
        ],
        byes: ['LV', 'NE', 'NO', 'SEA']
    },
    week7: {
        games: [
          game('NYG', 'PHI', new Date(2020, 9, 22, 20, 20)),
          game('DET', 'ATL', new Date(2020, 9, 25, 13, 0)),
          game('CLE', 'CIN', new Date(2020, 9, 25, 13, 0)),
          game('LAC', 'MIA', new Date(2020, 9, 25, 13, 0)),
          game('CAR', 'NO', new Date(2020, 9, 25, 13, 0)),
          game('BUF', 'NYJ', new Date(2020, 9, 25, 13, 0)),
          game('DAL', 'WAS', new Date(2020, 9, 25, 13, 0)),
          game('PIT', 'BAL', new Date(2020, 9, 25, 13, 0)),
          game('GB', 'HOU', new Date(2020, 9, 25, 13, 0)),
          game('SEA', 'ARI', new Date(2020, 9, 25, 16, 5)),
          game('KC', 'DEN', new Date(2020, 9, 25, 16, 25)),
          game('SF', 'NE', new Date(2020, 9, 25, 16, 25)),
          game('TB', 'LV', new Date(2020, 9, 25, 20, 20)),
          game('CHI', 'LAR', new Date(2020, 9, 26, 20, 15))
        ],
        byes: ['TEN', 'IND', 'MIN', 'JAX']
    },
    week8: {
        games: [
          game('ATL', 'CAR', new Date(2020, 9, 29, 20, 20)),
          game('NE', 'BUF', new Date(2020, 10, 1, 13, 0)),
          game('TEN', 'CIN', new Date(2020, 10, 1, 13, 0)),
          game('LV', 'CLE', new Date(2020, 10, 1, 13, 0)),
          game('IND', 'DET', new Date(2020, 10, 1, 13, 0)),
          game('MIN', 'GB', new Date(2020, 10, 1, 13, 0)),
          game('NYJ', 'KC', new Date(2020, 10, 1, 13, 0)),
          game('LAR', 'MIA', new Date(2020, 10, 1, 13, 0)),
          game('JAX', 'LAC', new Date(2020, 10, 1, 16, 5)),
          game('NO', 'CHI', new Date(2020, 10, 1, 16, 25)),
          game('SF', 'SEA', new Date(2020, 10, 1, 16, 25)),
          game('DAL', 'PHI', new Date(2020, 10, 1, 20, 20)),
          game('TB', 'NYG', new Date(2020, 10, 2, 20, 15))

        ],
        byes: ['DEN', 'ARI', 'PIT', 'WAS', 'BAL', 'HOU']
    },
    week9: {
        games: [
          game('GB', 'SF', new Date(2020, 10, 5, 20, 20)),
          game('DEN', 'ATL', new Date(2020, 10, 8, 13, 0)),
          game('SEA', 'BUF', new Date(2020, 10, 8, 13, 0)),
          game('CHI', 'TEN', new Date(2020, 10, 8, 13, 0)),
          game('BAL', 'IND', new Date(2020, 10, 8, 13, 0)),
          game('CAR', 'KC', new Date(2020, 10, 8, 13, 0)),
          game('DET', 'MIN', new Date(2020, 10, 8, 13, 0)),
          game('NYG', 'WAS', new Date(2020, 10, 8, 13, 0)),
          game('HOU', 'JAX', new Date(2020, 10, 8, 13, 0)),
          game('LV', 'LAC', new Date(2020, 10, 8, 16, 5)),
          game('PIT', 'DAL', new Date(2020, 10, 8, 16, 25)),
          game('MIA', 'ARI', new Date(2020, 10, 8, 16, 25)),
          game('NO', 'TB', new Date(2020, 10, 8, 20, 20)),
          game('NE', 'NYJ', new Date(2020, 10, 9, 20, 15))
        ],
        byes: ['CIN', 'CLE', 'LAR', 'PHI']
    },
    week10: {
        games: [
          game('IND', 'TEN', new Date(2020, 10, 12, 20, 20)),
          game('HOU', 'CLE', new Date(2020, 10, 15, 13, 0)),
          game('WAS', 'DET', new Date(2020, 10, 15, 13, 0)),
          game('JAX', 'GB', new Date(2020, 10, 15, 13, 0)),
          game('PHI', 'NYG', new Date(2020, 10, 15, 13, 0)),
          game('CIN', 'PIT', new Date(2020, 10, 15, 13, 0)),
          game('TB', 'CAR', new Date(2020, 10, 15, 13, 0)),
          game('DEN', 'LV', new Date(2020, 10, 15, 16, 5)),
          game('NYJ', 'MIA', new Date(2020, 10, 15, 16, 5)),
          game('BUF', 'ARI', new Date(2020, 10, 15, 16, 5)),
          game('SF', 'LAR', new Date(2020, 10, 15, 16, 25)),
          game('SEA', 'NO', new Date(2020, 10, 15, 16, 25)),
          game('BAL', 'NE', new Date(2020, 10, 15, 20, 20)),
          game('MIN', 'CHI', new Date(2020, 10, 16, 20, 15))
        ],
        byes: ['ATL', 'DAL', 'KC', 'LAC']
    },
    week11: {
        games: [
          game('ARI', 'SEA', new Date(2020, 10, 19, 20, 20)),
          game('PHI', 'CLE', new Date(2020, 10, 22, 13, 0)),
          game('GB', 'IND', new Date(2020, 10, 22, 13, 0)),
          game('ATL', 'NO', new Date(2020, 10, 22, 13, 0)),
          game('CIN', 'WAS', new Date(2020, 10, 22, 13, 0)),
          game('DET', 'CAR', new Date(2020, 10, 22, 13, 0)),
          game('PIT', 'JAX', new Date(2020, 10, 22, 13, 0)),
          game('TEN', 'BAL', new Date(2020, 10, 22, 13, 0)),
          game('NE', 'HOU', new Date(2020, 10, 22, 13, 0)),
          game('LAC', 'DEN', new Date(2020, 10, 22, 16, 5)),
          game('DAL', 'MIN', new Date(2020, 10, 22, 16, 25)),
          game('KC', 'LV', new Date(2020, 10, 22, 20, 20)),
          game('LAR', 'TB', new Date(2020, 10, 23, 20, 15))
        ],
        byes: ['BUF', 'CHI', 'MIA', 'NYG', 'NYJ', 'SF']
    },
    week12: {
        games: [
          game('HOU', 'DET', new Date(2020, 10, 26, 12, 30)),
          game('WAS', 'DAL', new Date(2020, 10, 26, 16, 30)),
          game('BAL', 'PIT', new Date(2020, 10, 26, 20, 20)),
          game('LV', 'ATL', new Date(2020, 10, 29, 13, 0)),
          game('LAC', 'BUF', new Date(2020, 10, 29, 13, 0)),
          game('NYG', 'CIN', new Date(2020, 10, 29, 13, 0)),
          game('TEN', 'IND', new Date(2020, 10, 29, 13, 0)),
          game('CAR', 'MIN', new Date(2020, 10, 29, 13, 0)),
          game('ARI', 'NE', new Date(2020, 10, 29, 13, 0)),
          game('MIA', 'NYJ', new Date(2020, 10, 29, 13, 0)),
          game('CLE', 'JAX', new Date(2020, 10, 29, 13, 0)),
          game('NO', 'DEN', new Date(2020, 10, 29, 16, 5)),
          game('SF', 'LAR', new Date(2020, 10, 29, 16, 5)),
          game('KC', 'TB', new Date(2020, 10, 29, 16, 25)),
          game('CHI', 'GB', new Date(2020, 10, 29, 20, 20)),
          game('SEA', 'PHI', new Date(2020, 10, 30, 20, 15)),
        ],
        byes: []
    },
    week13: {
        games: [
          game('DAL', 'BAL', new Date(2020, 11, 3, 20, 20)),
          game('NO', 'ATL', new Date(2020, 11, 6, 13, 0)),
          game('DET', 'CHI', new Date(2020, 11, 6, 13, 0)),
          game('CLE', 'TEN', new Date(2020, 11, 6, 13, 0)),
          game('CIN', 'MIA', new Date(2020, 11, 6, 13, 0)),
          game('JAX', 'MIN', new Date(2020, 11, 6, 13, 0)),
          game('LV', 'NYJ', new Date(2020, 11, 6, 13, 0)),
          game('WAS', 'PIT', new Date(2020, 11, 6, 13, 0)),
          game('IND', 'HOU', new Date(2020, 11, 6, 13, 0)),
          game('LAR', 'ARI', new Date(2020, 11, 6, 16, 5)),
          game('NYG', 'SEA', new Date(2020, 11, 6, 16, 5)),
          game('PHI', 'GB', new Date(2020, 11, 6, 16, 25)),
          game('NE', 'LAC', new Date(2020, 11, 6, 16, 25)),
          game('DEN', 'KC', new Date(2020, 11, 6, 20, 20)),
          game('BUF', 'SF', new Date(2020, 11, 7, 20, 15))
        ],
        byes: ['TB', 'CAR']
    },
    week14: {
        games: [
          game('NE', 'LAR', new Date(2020, 11, 10, 20, 20)),
          game('HOU', 'CHI', new Date(2020, 11, 13, 13, 0)),
          game('DAL', 'CIN', new Date(2020, 11, 13, 13, 0)),
          game('GB', 'DET', new Date(2020, 11, 13, 13, 0)),
          game('KC', 'MIA', new Date(2020, 11, 13, 13, 0)),
          game('ARI', 'NYG', new Date(2020, 11, 13, 13, 0)),
          game('MIN', 'TB', new Date(2020, 11, 13, 13, 0)),
          game('DEN', 'CAR', new Date(2020, 11, 13, 13, 0)),
          game('TEN', 'JAX', new Date(2020, 11, 13, 13, 0)),
          game('IND', 'LV', new Date(2020, 11, 13, 16, 5)),
          game('NYJ', 'SEA', new Date(2020, 11, 13, 16, 5)),
          game('NO', 'PHI', new Date(2020, 11, 13, 16, 25)),
          game('ATL', 'LAC', new Date(2020, 11, 13, 16, 25)),
          game('WAS', 'SF', new Date(2020, 11, 13, 16, 25)),
          game('PIT', 'BUF', new Date(2020, 11, 13, 20, 20)),
          game('BAL', 'CLE', new Date(2020, 11, 14, 20, 15))
        ],
        byes: []
    },
    week15: {
        games: [
          game('LAC', 'LV', new Date(2020, 11, 17, 20, 20)),
          game('BUF', 'DEN', new Date(2020, 11, 20)), // TBD
          game('CAR', 'GB', new Date(2020, 11, 20)), // TBD
          game('DET', 'TEN', new Date(2020, 11, 20)), // TBD
          game('HOU', 'IND', new Date(2020, 11, 20)), // TBD
          game('NYJ', 'LAR', new Date(2020, 11, 20)), // TBD
          game('TB', 'ATL', new Date(2020, 11, 20, 13, 0)),
          game('NE', 'MIA', new Date(2020, 11, 20, 13, 0)),
          game('CHI', 'MIN', new Date(2020, 11, 20, 13, 0)),
          game('CLE', 'NYG', new Date(2020, 11, 20, 13, 0)),
          game('SEA', 'WAS', new Date(2020, 11, 20, 13, 0)),
          game('JAX', 'BAL', new Date(2020, 11, 20, 13, 0)),
          game('PHI', 'ARI', new Date(2020, 11, 20, 16, 5)),
          game('KC', 'NO', new Date(2020, 11, 20, 16, 25)),
          game('SF', 'DAL', new Date(2020, 11, 20, 20, 20)),
          game('PIT', 'CIN', new Date(2020, 11, 21, 20, 15))
        ],
        byes: []
    },
    week16: {
        games: [
          game('MIN', 'NO', new Date(2020, 11, 25, 4, 30)),
          game('TB', 'DET', new Date(2020, 11, 27)), //TBD
          game('MIA', 'LV', new Date(2020, 11, 27)), //TBD
          game('CLE', 'NYJ', new Date(2020, 11, 27)), //TBD
          game('SF', 'ARI', new Date(2020, 11, 27)), //TBD
          game('DEN', 'LAC', new Date(2020, 11, 27)), //TBD
          game('ATL', 'KC', new Date(2020, 11, 27, 13, 0)),
          game('IND', 'PIT', new Date(2020, 11, 27, 13, 0)),
          game('CAR', 'WAS', new Date(2020, 11, 27, 13, 0)),
          game('CHI', 'JAX', new Date(2020, 11, 27, 13, 0)),
          game('NYG', 'BAL', new Date(2020, 11, 27, 13, 0)),
          game('CIN', 'HOU', new Date(2020, 11, 27, 13, 0)),
          game('LAR', 'SEA', new Date(2020, 11, 27, 16, 5)),
          game('PHI', 'DAL', new Date(2020, 11, 27, 16, 25)),
          game('TEN', 'GB', new Date(2020, 11, 27, 20, 20)),
          game('BUF', 'NE', new Date(2020, 11, 28, 20, 15))
        ],
        byes: []
    },
    week17: {
        games: [
          game('MIA', 'BUF', new Date(2021, 0, 3, 13, 0)),
          game('GB', 'CHI', new Date(2021, 0, 3, 13, 0)),
          game('BAL', 'CIN', new Date(2021, 0, 3, 13, 0)),
          game('PIT', 'CLE', new Date(2021, 0, 3, 13, 0)),
          game('MIN', 'DET', new Date(2021, 0, 3, 13, 0)),
          game('JAX', 'IND', new Date(2021, 0, 3, 13, 0)),
          game('LAC', 'KC', new Date(2021, 0, 3, 13, 0)),
          game('NYJ', 'NE', new Date(2021, 0, 3, 13, 0)),
          game('DAL', 'NYG', new Date(2021, 0, 3, 13, 0)),
          game('WAS', 'PHI', new Date(2021, 0, 3, 13, 0)),
          game('ATL', 'TB', new Date(2021, 0, 3, 13, 0)),
          game('NO', 'CAR', new Date(2021, 0, 3, 13, 0)),
          game('TEN', 'HOU', new Date(2021, 0, 3, 13, 0)),
          game('LV', 'DEN', new Date(2021, 0, 3, 16, 25)),
          game('ARI', 'LAR', new Date(2021, 0, 3, 16, 25)),
          game('SEA', 'SF', new Date(2021, 0, 3, 16, 25))
        ],
        byes: []
    }
};

export { schedule };
