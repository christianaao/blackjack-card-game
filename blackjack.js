const { dealCards, randomName } = require("./src/utils")

const startGame = (numOfPlayers) => {
    if (numOfPlayers < 2) {
        return "A minimum of 2 participants is required to play this game."
    }
    if (numOfPlayers > 26) {
        return "A maximum of 26 participants can play this game."
    }

    let players = []

    while(numOfPlayers > 0) {
        players.push({
            name: randomName(),
            hand: dealCards(2),
            score: 0,
            status: "valid"
        })
        numOfPlayers--
    }
    return players
}

const tally = () => {}

const status = () => {}

const hit = () => {}

const stand = () => {}

const findWinner = () => {}


module.exports = {startGame}