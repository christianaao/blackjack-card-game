const { dealCards, randomName } = require("./src/utils")
const readline = require("node:readline/promises")

// Global variables

let players = []

const greeting = () => {
    // const rl = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // })
    // console.log("Hello and welcome to my game of Blackjack!")
    // rl.question(`Please enter your name: `, name => {
    //     console.log(`Hello ${name}, thank you for playing!`)
    // }).then(() => {
    //     rl.question(`Please state how many people are playing: `, num => {
    //         console.log("Thank you.")
    //         const numOfPlayers = parseInt(num)
    //         if(typeof numOfPlayers === NaN) {
    //             return console.log("An invalid number has been entered. Please try again.")
    //         } else {startGame(numOfPlayers)}
    //     })
    //     .then(() => {
    //         rl.close()
    //     })
    // })
}

const startGame = (numOfPlayers) => {
    if (numOfPlayers < 2) {
        return console.log("A minimum of 2 participants is required to play this game.")
    }
    if (numOfPlayers > 26) {
        return console.log("A maximum of 26 participants can play this game.")
    }

    console.log(`Dealing cards for ${numOfPlayers} players.`)

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

greeting()

module.exports = {greeting, startGame, tally}