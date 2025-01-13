const { dealCards, randomName } = require("./src/utils")
const readline = require("node:readline")
const {A} = require("./src/deck")
const { start } = require("node:repl")

// Global variables

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let activePlayers = []

let bustedPlayers = []

let standingPlayers = []

let winningPlayers = []

// const gameProgression = () => {
//     greeting()
//     .then((numOfPlayers) => {
//         startGame(numOfPlayers)
//     })
//     .then((players) => {
//         players.push(activePlayers)
//         tallyCards(activePlayers)
//     })
//     .then((players) => {

//     })
// }

const gameProgression = () => {
    console.log("active players in PROGRESSION: ", activePlayers)
    tallyCards(activePlayers)
    updateStatus(activePlayers)
    let counter = 1
    activePlayers.forEach((player) => {
        console.log(`Player ${counter} will be known as ${player.name}, their current hand is  and their score is ${player.score}`)
        counter++
    })
}

const greeting = () => {
    console.log("Hello and welcome to my game of Blackjack!")
    rl.question(`Thank you for playing. Please enter the number of players: `, numOfPlayers => {
        const participants = parseInt(numOfPlayers)
        if (Number.isNaN(participants)) {
            console.log(`${numOfPlayers} is not a valid number. Please try again.`)
            rl.close()
        } else {
            console.log(`Thank you. We will now prepare the game for ${numOfPlayers} people.`)
            rl.close()
            let startingPlayers = startGame(numOfPlayers)
            activePlayers.push(...startingPlayers)
            gameProgression()
        }
    })
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

    console.log(`Dealing cards for ${numOfPlayers} players...`)

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

const tallyCards = (players) => {
    console.log("The scores will now be calculated...")
    players.forEach((player) => {
        let scoreEvaluation = 0
        player.hand.forEach((card) => {
            for (const suit in card) {
                let suitNumber = card[suit]
                if(typeof suitNumber === "string") {
                    scoreEvaluation += 10
                } else if(suitNumber === A && player.score <= 10) {
                    scoreEvaluation = scoreEvaluation + 11
                } else {scoreEvaluation += suitNumber}
            }
            player.score = scoreEvaluation
        })
    })
    console.dir(players)
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

const stand = (player) => {
    if(player.score <= 21) {
        player.status = "stand"
    } else {bustedPlayers.push(player)}
    return player
}

const findWinner = (playersOnStand) => {
    let playerScores = []
    let winners = []
    playersOnStand.forEach((player) => {
        playerScores.push(player.score)
    })
    let highestScore = Math.max(...playerScores)
    playersOnStand.forEach((player) => {
        if (player.score === highestScore) {
            winners.push(player)
        }
    })
    if (winners.length > 1) {
        winners.forEach((winner) => {
            winner.status = "draw"
        })
    } else {winners[0].status = "winner"}
    return winners
}

// gameProgression()

greeting()

// startGame(4)
module.exports = {greeting, startGame, tallyCards, updateStatus, hit, stand, findWinner}