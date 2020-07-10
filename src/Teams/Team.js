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
        
        //this.makeTeamSchedule();
    }

    // makeTeamSchedule() {
    //     this.schedule = null;
    // }
}

