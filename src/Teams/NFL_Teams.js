import T from './Teams.json';
import Team from './Team';

const Teams = [];
for(let i = 0; i < T.length; i++) {
    Teams[i] = new Team(T[i]);
}

const CreateNFL = (Teams) => ({
    AFC_North: [Teams.BAL, Teams.CIN, Teams.CLE, Teams.PIT],
    AFC_South: [Teams.HOU, Teams.IND, Teams.JAX, Teams.TEN],
    AFC_East: [Teams.BUF, Teams.MIA, Teams.NE, Teams.NYJ],
    AFC_West: [Teams.DEN, Teams.KC, Teams.LV, Teams.LAC],

    NFC_North: [Teams.CHI, Teams.DET, Teams.GB, Teams.MIN],
    NFC_South: [Teams.ATL, Teams.CAR, Teams.NO, Teams.TB],
    NFC_East: [Teams.DAL, Teams.NYG, Teams.PHI, Teams.WAS],
    NFC_West: [Teams.ARI, Teams.LAR, Teams.SEA, Teams.SF]
});

// const NFL = {
//     AFC_North: [Teams[2], Teams[6], Teams[7], Teams[26]],
//     AFC_South: [Teams[12], Teams[13], Teams[14], Teams[30]],
//     AFC_East: [Teams[3], Teams[19], Teams[21], Teams[23]],
//     AFC_West: [Teams[9], Teams[15], Teams[16], Teams[17]],
//     NFC_North: [Teams[5], Teams[10], Teams[11], Teams[20]],
//     NFC_South: [Teams[1], Teams[4], Teams[24], Teams[29]],
//     NFC_East: [Teams[8], Teams[22], Teams[25], Teams[31]],
//     NFC_West: [Teams[0], Teams[18], Teams[27], Teams[28]]
// }

// export { NFL, CreateNFL, Teams };
export { CreateNFL, Teams };
