export default class Team {
    constructor(team) {
        team = Object.entries(team)[0];

        this.abrv = team[0];
        this.FullName = team[1].FullName;
        this.NickName = team[1].NickName;
        this.Location = team[1].Location
        this.Confrence = team[1].Confrence;
        this.Division = team[1].Division;
        this.wins = team[1].wins;
        this.loses = team[1].loses;
        this.ties = team[1].ties;
        this.streak = team[1].streak;
        this.SOS = team[1].SOS;
        this.record = '0-0';
        this.pct = '0.0000';
        // Confrence pct
        // SOV

        // ? home record
        // ? away record
        
        // ! this is for if individual team selection pages are made 
        //this.makeTeamSchedule();
    }

    //move to actions?
    record() {
        const wins = this.wins.length;
        const loses = this.loses.length;
        const ties = this.ties.length;
        return ties === 0 ? `${wins}-${loses}`:`${wins}-${loses}-${ties}`;
    }

    //move to actions?
    calcPCT() {
        const wins = this.wins.length;
        const loses = this.loses.length;
        const ties = this.ties.length;
        if(wins+loses+ties === 0)
            return '0.0000';
        else
            return ((wins+(ties/2))/(wins+loses+ties)).toFixed(4);
    }

    // ! this is for if individual team selection pages are made 
    // makeTeamSchedule() {
    //     this.schedule = null;
    // }
}

