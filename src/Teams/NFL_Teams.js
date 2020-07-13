import T from './Teams.json';
import Team from './Team';

const Teams = [];
for(let i = 0; i < T.length; i++) {
    Teams[i] = new Team(T[i]);
}

const NFL = {
    AFC_North: [Teams[2], Teams[6], Teams[7], Teams[26]],
    AFC_South: [Teams[12], Teams[13], Teams[14], Teams[30]],
    AFC_East: [Teams[3], Teams[19], Teams[21], Teams[23]],
    AFC_West: [Teams[9], Teams[15], Teams[16], Teams[17]],
    NFC_North: [Teams[5], Teams[10], Teams[11], Teams[20]],
    NFC_South: [Teams[1], Teams[4], Teams[24], Teams[29]],
    NFC_East: [Teams[8], Teams[22], Teams[25], Teams[31]],
    NFC_West: [Teams[0], Teams[18], Teams[27], Teams[28]]
};

export { NFL, Teams };
