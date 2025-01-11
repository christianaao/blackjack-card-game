const { dealCards, randomName } = require("./src/utils")
const readline = require("node:readline/promises")
const {deck, J, Q, K, A} = require("./src/deck")

// Global variables

let activePlayers = []

let bustedPlayers = []

let standingPlayers = []

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
        console.log("A minimum of 2 participants is required to play this game.")
        return "A minimum of 2 participants is required to play this game."
    }
    if (numOfPlayers > 26) {
        console.log("A maximum of 26 participants can play this game.")
        return "A maximum of 26 participants can play this game."
    }

    console.log(`Dealing cards for ${numOfPlayers} players.`)

    while(numOfPlayers > 0) {
        activePlayers.push({
            name: randomName(),
            hand: dealCards(2),
            score: 0,
            status: "valid"
        })
        numOfPlayers--
    }
    return activePlayers
}

const tallyCards = (players) => {
    players.forEach((player) => {
        let scoreEvaluation = 0
        player.hand.forEach((card) => {
            for (const suit in card) {
                let suitNumber = card[suit]
                if(suitNumber === A && player.score <= 10) {
                    scoreEvaluation = scoreEvaluation + 11
                } else {scoreEvaluation += suitNumber}
            }
            player.score = scoreEvaluation
        })
    })
    return players
}

const updateStatus = (players) => {
    let validPlayers = []
    players.forEach((player) => {
        if(player.score > 21) {
            player.status = "busted"
            bustedPlayers.push(player)
        } else {validPlayers.push(player)}
    })
    return validPlayers
}
const hit = (player) => {
    const getCard = dealCards(1)
    player.hand.push(getCard)
    return player
}

const stand = () => {}

const findWinner = () => {}

// greeting()

// startGame(4)
module.exports = {greeting, startGame, tallyCards, updateStatus, hit, stand}