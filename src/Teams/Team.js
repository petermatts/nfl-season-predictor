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
        // this.SOS = team[1].SOS;
        this.record = '0-0';
        this.pct = '0.0000';
        this.confRecord = '0-0';
        this.confPct = '0.0000';
        this.divRecord = '0-0';
        this.divPct = '0.0000';
        this.SOV = '0.000';

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

export { Team, teamHash };
