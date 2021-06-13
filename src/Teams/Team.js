class Team {
    constructor(team) {
        team = Object.entries(team)[0];

        this.abrv = team[0];
        this.FullName = team[1].FullName;
        this.NickName = team[1].NickName;
        this.Location = team[1].Location
        this.Confrence = team[1].Confrence;
        this.Division = team[1].Division;
        
        this.wins = [];
        this.loses = [];
        this.ties = [];
        
        // this.streak = '-';
        this.record = '0-0';
        this.pct = '0.0000';
        this.confRecord = '0-0';
        this.confPct = '0.0000';
        this.divRecord = '0-0';
        this.divPct = '0.0000';
        this.SOV = 0.000;
        this.SOS = 0.000;

        //? this.homeRecord = '0-0';
        //? this.awayRecord = '0-0';

        //this.hash = this.teamHash(team[0]);
        
        // ! this is for if individual team selection pages are made 
        //this.makeTeamSchedule();
    }
}

function teamHash(id) {
    switch(id) {
        case 'ARI':
            return 0;
        case 'ATL':
            return 1;
        case 'BAL':
            return 2;
        case 'BUF':
            return 3;
        case 'CAR':
            return 4;
        case 'CHI':
            return 5;
        case 'CIN':
            return 6;
        case 'CLE':
            return 7;
        case 'DAL':
            return 8;
        case 'DEN':
            return 9;
        case 'DET':
            return 10;
        case 'GB':
            return 11;
        case 'HOU':
            return 12;
        case 'IND':
            return 13;
        case 'JAX':
            return 14;
        case 'KC':
            return 15;
        case 'LV':
            return 16;
        case 'LAC':
            return 17;
        case 'LAR':
            return 18;
        case 'MIA':
            return 19;
        case 'MIN':
            return 20;
        case 'NE':
            return 21;
        case 'NO':
            return 22;
        case 'NYG':
            return 23;
        case 'NYJ':
            return 24;
        case 'PHI':
            return 25;
        case 'PIT':
            return 26;
        case 'SEA':
            return 27;
        case 'SF':
            return 28;
        case 'TB':
            return 29;
        case 'TEN':
            return 30;
        case 'WAS': case'WSH':
            return 31;
        default:
            return -1;
    }
}

function teamReverseHash(hash) {
    switch(hash) {
        case 0:
            return 'ARI';
        case 1:
            return 'ATL';
        case 2:
            return 'BAL';
        case 3:
            return 'BUF';
        case 4:
            return 'CAR';
        case 5:
            return 'CHI';
        case 6:
            return 'CIN';
        case 7:
            return 'CLE';
        case 8:
            return 'DAL';
        case 9:
            return 'DEN';
        case 10:
            return 'DET';
        case 11:
            return 'GB';
        case 12:
            return 'HOU';
        case 13:
            return 'IND';
        case 14:
            return 'JAX';
        case 15:
            return 'KC';
        case 16:
            return 'LV';
        case 17:
            return 'LAC';
        case 18:
            return 'LAR';
        case 19:
            return 'MIA';
        case 20:
            return 'MIN';
        case 21:
            return 'NE';
        case 22:
            return 'NO';
        case 23:
            return 'NYG';
        case 24:
            return 'NYJ';
        case 25:
            return 'PHI';
        case 26:
            return 'PIT';
        case 27:
            return 'SEA';
        case 28:
            return 'SF';
        case 29:
            return 'TB';
        case 30:
            return 'TEN';
        case 31:
            return 'WAS';
        default:
            return 'Error: Not a team';
    }
}

export { Team, teamHash, teamReverseHash };
