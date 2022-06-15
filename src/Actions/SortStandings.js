/**
 * Order of seeding by:
 * https://operations.nfl.com/the-rules/nfl-tiebreaking-procedures/
 */

/**
 * 0 Win-Loss-Tie percentage
 * 1 Head-to-head (best won-lost-tied percentage in games between the clubs)
 * 2 Best won-lost-tied percentage in games played within the division
 * 3 Best won-lost-tied percentage in common games
 * 4 Best won-lost-tied percentage in games played within the conference
 * 5 Strength of victory
 * 6 Strength of schedule
 * ! 7 Best combined ranking among conference teams in points scored and points allowed
 * ! 8 Best combined ranking among all teams in points scored and points allowed
 * ! 9 Best net points in common games
 * ! 10 Best net points in all games
 * ! 11 Best net touchdowns in all games
 * 12 Coin toss
 * @param {team} a  
 * @param {team} b
 */
function compareDivision(a, b) {
    // 0 win pct
    if(a.pct !== b.pct)
        return b.pct - a.pct;
    else {
        // 1 head to head
        const a_wins = a.wins.filter((win) => win===b.abrv).length;
        const b_wins = b.wins.filter((win) => win===a.abrv).length;

        if(a_wins !== b_wins) {
            return b_wins - a_wins;
        } else {
            // 2 Division pct
            if(a.divPct !== b.divPct) {
                return b.divPct - a.divPct;
            } else {
                // 3 Common Games
                const a_games = a.wins.concat(a.loses).concat(a.ties);
                const b_games = b.wins.concat(b.loses).concat(b.ties);
                const commonGames = a_games.filter((game) => b_games.includes(game));
                let a_c_score = 0; //a common game score
                let b_c_score = 0; //b common game score

                for(let i = 0; i < commonGames.length; i++) {
                    const game = commonGames[i];
                    if(a.wins.includes(game))
                        a_c_score++;
                    else if(a.ties.includes(game))
                        a_c_score += 0.5;
                    
                    if(b.wins.includes(game))
                        b_c_score++;
                    else if(b.ties.includes(game))
                        b_c_score += 0.5;
                }

                if(a_c_score !== b_c_score) {
                    return b_c_score - a_c_score;
                } else {
                    // 4 Confrence pct
                    if(a.confPct !== b.confPct) {
                        return b.confPct - a.confPct;
                    } else {
                        // 5 SOV
                        if(a.SOV !== b.SOV) {
                            return b.SOV - a.SOV;
                        } else {
                            // 6 SOS
                            if(a.SOS !== b.SOS) {
                                return b.SOS - a.SOS;
                            } else {
                                // 12 Coin toss
                                if(Math.random() < 0.50) {
                                    return -1;
                                } else {
                                    return 1;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


/**
 * Seeds:
 * 1 The division champion with the best record (First round bye)
 * 2 The division champion with the second-best record
 * 3 The division champion with the third-best record
 * 4 The division champion with the fourth-best record
 * 5 The wild card club with the best record
 * 6 The wild card club with the second-best record
 * 7 The wild card club with the third-best record
 * 
 * Seeding rules: (for wild card apply division rules if teams are in the same division)
 * 0 Win-Loss-Tie percentage
 * 1 Head-to-head, if applicable
 * 2 Best won-lost-tied percentage in games played within the conference
 * 3 Best won-lost-tied percentage in common games, minimum of four
 * 4 Strength of victory
 * 5 Strength of schedule
 * ! 6 Best combined ranking among conference teams in points scored and points allowed
 * ! 7 Best combined ranking among all teams in points scored and points allowed
 * ! 8 Best net points in conference games
 * ! 9 Best net points in all games
 * ! 10 Best net touchdowns in all games
 * 11 Coin toss
 * 
 * @param {*} a 
 * @param {*} b 
 */
function compareConfrence(a, b, wc) {
    // 0 win pct
    if(a.pct !== b.pct) {
        return b.pct - a.pct;
    } else {
        // 1 head to head
        const winnerA = a.wins.includes(b);
        const winnerB = b.wins.includes(a);
        if(winnerA && !winnerB)
            return -1;
        else if (!winnerA && winnerB)
            return 1;
        else {
            // 2 Confrence pct
            if(a.confPct !== b.confPct) {
                return b.confPct - a.confPct;
            } else {
                // 3 Common Games
                const a_games = a.wins.concat(a.loses).concat(a.ties);
                const b_games = b.wins.concat(b.loses).concat(b.ties);
                const commonGames = a_games.filter((game) => b_games.includes(game));
                let a_c_score = 0; //a common game score
                let b_c_score = 0; //b common game score

                if(commonGames.length >= 4) { 
                    for(let i = 0; i < commonGames.length; i++) {
                        const game = commonGames[i];
                        if(a.wins.includes(game))
                            a_c_score++;
                        else if(a.ties.includes(game))
                            a_c_score += 0.5;
                       
                        if(b.wins.includes(game))
                            b_c_score++;
                        else if(b.ties.includes(game))
                            b_c_score += 0.5;
                   }
                }
 
                if(a_c_score !== b_c_score) {
                    return b_c_score - a_c_score;
                } else {
                    // 4 SOV
                    if(a.SOV !== b.SOV) {
                        return b.SOV - a.SOV;
                    } else {
                        // 5 SOS
                        if(a.SOS !== b.SOS) {
                            return b.SOS - a.SOS;
                        } else {
                            // 11 Coin toss
                            if(Math.random() < 0.50) {
                                return -1;
                            } else {
                                return 1;
                            }
                        }
                    }
                }
            }
        }
    }
    
}


const sortDivision = (division) => {
    return division.sort((a, b) => compareDivision(a, b));
};

const sortConfrence = (confrence) => {
    const East = confrence.slice(0,4);
    const North = confrence.slice(4,8);
    const South = confrence.slice(8,12);
    const West = confrence.slice(12);

    East.sort((a, b) => compareDivision(a, b));
    South.sort((a, b) => compareDivision(a, b));
    North.sort((a, b) => compareDivision(a, b));
    West.sort((a, b) => compareDivision(a, b));

    //put leaders in their own array, top 4 seeds in confrence
    const divLeaders = [East[0], North[0], South[0], West[0]];

    //remove the division leader from division
    East.reverse().pop();
    North.reverse().pop();
    South.reverse().pop();
    West.reverse().pop();

    const rest = East.concat(North.concat(South.concat(West)));

    divLeaders.sort((a, b) => compareConfrence(a, b, false));
    rest.sort((a, b) => compareConfrence(a, b, true));

    const result = divLeaders.concat(rest);

    // console.log(divLeaders.concat(rest));
    // console.log(confrence);

    if(!result.includes(undefined)) {
        return result
    }
    return confrence;
};

export { sortDivision, sortConfrence };