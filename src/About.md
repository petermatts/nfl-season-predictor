# **Game Picker for NFL Regular Seasons**

---

## Abstract

This project was created in free time by a college student who likes coding and football.

View the code [here](https://github.com/petermatts/nfl-season-predictor "Code")!

---

## How It Began

The idea hatched when I watched a YouTube video of Adam Rank predicting all the football games for the 2019 season (the very same video he had the 49ers going 3-13). I thought the way he was pushing the buttons to pick games was fun and it would be nice if everyone had access to a way to make predictions in such a manner. So I decided to take my knowledge and enjoyment of coding and football and use it to build this season predictor for fun and for all to use (for free)!

---

## The Project

### Features

- Buttons for picking games, with time/date/primetime signification above
- Live standings that update as your picks are made (can sort by divisions or confrences)
  - All possible tie breakers have been implemented. Only those that involve points or number of touchdowns were not implemented because this picker only picks winners and not scores (yet?).
  - Normally, the last tie breaker is a coin toss. For the sake of consistency this was made deterministic.
- Post Season picking. You can pick your way through playoff brackets based on the standings results of your in season game outcomes.
- Settings to control:
  - The way you pick by team or week
  - The detail level of the standings
  - Show a progress bar of how many games of the total for the season have been picked
  - Show playoff brackets
  - Enable post season picking before all games have been picked (default is you must pick all season games first)

### Features (Hopefully) On The Way

- Login to save your picks in files
  - Share picks with friends or other users (2)
  - Create community statistics for game predictions (3)
  - Pick accuracy feedback (3)
  - Load current game results from a season, this would help compute accuracy feedback (3)
  - Save post season predictions (2)
- More settings
  - Maybe some backgrounds (2)
- Pick games with scores (3)

(1) short term/near future goal

(2) intermediate future goal

(3) longer term/distant future goal

---

## More

This webapp was designed for desktop/laptop monitors, but I have made it atleast usable (hopefully) for mobile devices, the bigger the screen the better it will probably look... but this is something I will keep working on.

I'll continue updating the README.md as I think of more details and stories about this project ;)

---

v1.3.1
