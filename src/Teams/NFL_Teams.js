import T from './Teams.json';
import { Team } from './Team';

const TeamAbvrs = [];

// const SOS2020 = [0.518, 0.525, 0.438, 0.525, 0.500, 0.509, 0.477, 0.461, 0.459, 0.512, 0.525, 0.504, 0.518, 0.502, 0.494, 0.500, 0.496, 0.492, 0.516, 0.529, 0.516, 0.537, 0.490, 0.482, 0.533, 0.486, 0.457, 0.509, 0.527, 0.502, 0.498, 0.465];
const SOS2021 = [0.507, 0.454, 0.563, 0.478, 0.472, 0.550, 0.529, 0.518, 0.452, 0.471, 0.529, 0.542, 0.504, 0.478, 0.491, 0.511, 0.526, 0.493, 0.515, 0.471, 0.531, 0.489, 0.483, 0.474, 0.489, 0.430, 0.574, 0.511, 0.489, 0.465, 0.507, 0.504];
const SOS2022 = [0.543, 0.524, 0.474, 0.512, 0.512, 0.471, 0.536, 0.495, 0.462, 0.509, 0.467, 0.478, 0.488, 0.469, 0.469, 0.533, 0.528, 0.519, 0.567, 0.481, 0.484, 0.498, 0.528, 0.465, 0.495, 0.464, 0.512, 0.517, 0.533, 0.535, 0.471, 0.462];
const SOS2023 = [0.519, 0.417, 0.484, 0.542, 0.453, 0.497, 0.510, 0.460, 0.549, 0.517, 0.495, 0.476, 0.431, 0.434, 0.477, 0.512, 0.524, 0.517, 0.533, 0.554, 0.497, 0.549, 0.427, 0.549, 0.545, 0.566, 0.470, 0.517, 0.514, 0.483, 0.448, 0.535];

//! needs to become adaptable to changing a season

const Teams = (season) => {
    const teamlist = [];
    let SOS = null;
    // eslint-disable-next-line eqeqeq
    if(season == 2021)
        SOS = SOS2021;
    else if(season === 2022)
        SOS = SOS2022;
    else if(season === 2023)
        SOS = SOS2023;
    else
        return [];

    for(let i = 0; i < T.length; i++) {
        teamlist[i] = new Team(T[i]);
        teamlist[i].SOS = SOS[i];
        TeamAbvrs[i] = teamlist[i].abrv;
    }

    return teamlist;
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
