const { dealCards } = require("./src/utils")

const startGame = (numOfPlayers) => {
    let players = []
    let card = dealCards()
    return card
}

console.log(startGame(2))

const tally = () => {}

const status = () => {}

const hit = () => {}

const stand = () => {}

const findWinner = () => {}


module.exports = {startGame}