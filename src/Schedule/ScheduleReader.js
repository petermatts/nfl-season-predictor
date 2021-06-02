import axios from 'axios';
import cheerio from 'cheerio';
import { teamHash } from '../Teams/Team';

async function getSchedule(year) {
    const gameList = [];
    const schedule = {};
    const gameGrid = new Array(32);
    for(let i = 0; i < 32; i++)
        gameGrid[i] = [];

    for(let week = 1; week < 19; week++) {
        console.log("week "+ week + " " + year);
        await axios.get(`https://www.espn.com/nfl/schedule/_/week/${week}/year/${year}`).then((response) => {
            if(response.status === 200) {
                const $ = cheerio.load(response.data);

                const timeNodes = $('a[name=&lpos=nfl:schedule:time]');
                const times = [];
                for(let index = 0; index < timeNodes.length; index++) {
                    const value = timeNodes[index].parent.attribs['data-date']
                    times[index] = (value !== undefined) ? value : 'TBD';
                }

                const teamNodes = $('abbr');
                const teams = [];
                for(let index = 0; index < teamNodes.length; index++) {
                    teams[index] = teamNodes[index].children[0].data;
                }
                
                //evens in teams[] are home, odds are away
                //number of teams on bye is (32-(times.length*2)), those teams will be at the end of teams[]
                const games = [];
                for(let i = 0; i < times.length; i++) {
                    const homeTeam = teams[2*i];
                    const awayTeam = teams[2*i+1];
                    const thisGame = new game(homeTeam, awayTeam, new Date(times[i]));

                    games.push(thisGame);
                    gameList.push(thisGame);
                    gameGrid[teamHash(homeTeam)][week - 1] = gameList.length - 1;
                    gameGrid[teamHash(awayTeam)][week - 1] = gameList.length - 1;
                }

                const byes = teams.slice(2*times.length);
                for(let index = 0; index < byes.length; index++) {
                    gameGrid[teamHash(byes[index])][week - 1] = "BYE";
                }

                Object.assign(schedule, {['week'+week]: { games, byes }});
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    console.log(gameGrid);
    console.log(schedule);
}

function game(away, home, d) {
    //!handle TBD dates
    const day = d.toLocaleDateString('en-US', { weekday: 'long' });
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

    return { home, away, day, date, time, primetime, picked: false, winner: null };
};

export { game, getSchedule };