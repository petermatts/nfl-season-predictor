import axios from 'axios';
import cheerio from 'cheerio';
import firebase from 'firebase';
import { teamHash } from '../Teams/Team';
import T from '../Teams/Teams.json';

// let ax = axios.create({headers: {'Access-Control-Allow-Origin':'*'}});
// axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

async function scrapeSchedule(year) {
    const gameList = [];
    const schedule = {};
    const gameGrid = new Array(32);
    for(let i = 0; i < 32; i++)
        gameGrid[i] = [];
        
    const teams = [];
    // console.log(Object.keys(T[0])[0]);
    for(let i = 0; i< T.length; i++) {
        teams.push(Object.keys(T[i])[0]);
    }

    let num = 0;
    for(let week = 1; week < 19; week++) {
        console.log("week "+ week + " " + year);
        // NOTE turn on Allow CORS chrome extension before scraping, or you will get CORS errors
        // eslint-disable-next-line no-loop-func
        await axios.get(`https://www.espn.com/nfl/schedule/_/week/${week}/year/${year}`).then((response) => {
            // console.log(response.data);

            if(response.status === 200) {
                const $ = cheerio.load(response.data);

                const dateNodes = $('div[class=Table__Title]');
                // console.log(dateNodes);
                let rawDateStrs = [];
                for(let i = 0; i < dateNodes.length; i++) {
                    rawDateStrs.push(dateNodes[i].children[0].data);
                }
                // console.log(rawDateStrs);

                const gameNodes = $('tr');
                // console.log(gameNodes);

                const games = [];
                const byes = Array.from(teams, x => x);

                let dayctr = -1;
                for (let i = 0; i < gameNodes.length; i++) {
                    const didx = gameNodes[i].attribs['data-idx'];
                    if(didx === undefined) {
                        continue;
                    } 
                    
                    if(didx === '0') {
                        dayctr++;
                    }
                    if(dayctr >= rawDateStrs.length) {
                        continue;
                    }         

                    let homeTeam = gameNodes[i].children[0].children[0].children[0].children[1].attribs['href'].split('/');
                    homeTeam = homeTeam[homeTeam.length-2].toUpperCase();
                    // console.log(homeTeam);

                    let awayTeam = gameNodes[i].children[1].children[0].children[1].children[1].attribs['href'].split('/');
                    awayTeam = awayTeam[awayTeam.length-2].toUpperCase();
                    // console.log(awayTeam);

                    //TODO this also fetchs the result if the game has already been played
                    // conditionally switch on if time or result is in the table header (class=Table__THEAD)
                    // warning: updating data with score may erase the time stored. Be sure to address this when implementing
                    const time = gameNodes[i].children[2].children[0].children[0].data;
                    const result = null;

                    if(homeTeam === 'WSH')
                        homeTeam = 'WAS';
                    if(awayTeam === 'WSH')
                        awayTeam = 'WAS';

                    byes.splice(byes.indexOf(homeTeam), 1);
                    byes.splice(byes.indexOf(awayTeam), 1);

                    // console.log(awayTeam, '@',homeTeam, rawDateStrs[dayctr], time);
                    const g = new game(homeTeam, awayTeam, new Date(rawDateStrs[dayctr]), time, num, result);
                    // console.log(g);

                    gameGrid[teamHash(homeTeam)][week - 1] = num;
                    gameGrid[teamHash(awayTeam)][week - 1] = num;

                    // games.push(g);
                    gameList.push(g);
                    games.push(g);
                    num++;
                }

                // console.log(byes);
                for(let b = 0; b < byes.length; b++) {
                    gameGrid[teamHash(byes[b])][week - 1] = 'BYE';
                }

                Object.assign(schedule, {['week'+week]: { games, byes }});
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    console.log(gameList);
    console.log(gameGrid);
    console.log(schedule);

    //push scraped data to firebase
    firebase.database().ref(`/data/${year}/GameList`).set(gameList);
    firebase.database().ref(`/data/${year}/GameGrid`).set(gameGrid);
    firebase.database().ref(`/data/${year}/Schedule`).set(schedule);
}

function game(away, home, d, time, hash, result) {
    // TODO handle TBD dates
    const day = d.toLocaleDateString('en-US', { weekday: 'long' });
    const date = d.toLocaleDateString('en-US');

    // const timeOptions = {
    //     timeZone: 'America/New_York',
    //     hour: '2-digit',
    //     minute: '2-digit'
    // };
    // let time = d.toLocaleTimeString('en-US', timeOptions);
    if(time.startsWith('0')) {
        time = time.replace('0', '');
    }

    let primetime = false;
    if(day === 'Thursday' || day === 'Monday' ||
       day === 'Friday' || day === 'Saturday'
       || (day === 'Sunday' && time === '8:20 PM')) {
       primetime = true;
    }

    return { home, away, day, date, time, primetime, picked: false, winner: null, hash, result };
};

export { game, scrapeSchedule };