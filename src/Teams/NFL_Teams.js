import T from './Teams.json';
import { Team } from './Team';

const Teams = [];
const TeamAbvrs = [];

// const SOS2020 = [0.518, 0.525, 0.438, 0.525, 0.500, 0.509, 0.477, 0.461, 0.459, 0.512, 0.525, 0.504, 0.518, 0.502, 0.494, 0.500, 0.496, 0.492, 0.516, 0.529, 0.516, 0.537, 0.490, 0.482, 0.533, 0.486, 0.457, 0.509, 0.527, 0.502, 0.498, 0.465];
const SOS2021 = [0.507, 0.454, 0.563, 0.478, 0.472, 0.550, 0.529, 0.518, 0.452, 0.471, 0.529, 0.542, 0.504, 0.478, 0.491, 0.511, 0.526, 0.493, 0.515, 0.471, 0.531, 0.489, 0.483, 0.474, 0.489, 0.430, 0.574, 0.511, 0.489, 0.465, 0.507, 0.504];

for(let i = 0; i < T.length; i++) {
    Teams[i] = new Team(T[i]);
    Teams[i].SOS = SOS2021[i];
    TeamAbvrs[i] = Teams[i].abrv;
}

const CreateNFL = (Teams) => ({
    AFC_North: [Teams.BAL, Teams.CIN, Teams.CLE, Teams.PIT],
    AFC_South: [Teams.HOU, Teams.IND, Teams.JAX, Teams.TEN],
    AFC_East: [Teams.BUF, Teams.MIA, Teams.NE, Teams.NYJ],
    AFC_West: [Teams.DEN, Teams.KC, Teams.LAC, Teams.LV],

    NFC_North: [Teams.CHI, Teams.DET, Teams.GB, Teams.MIN],
    NFC_South: [Teams.ATL, Teams.CAR, Teams.NO, Teams.TB],
    NFC_East: [Teams.DAL, Teams.NYG, Teams.PHI, Teams.WAS],
    NFC_West: [Teams.ARI, Teams.LAR, Teams.SEA, Teams.SF]
});

// export { NFL, CreateNFL, Teams };
export { CreateNFL, Teams, TeamAbvrs };
