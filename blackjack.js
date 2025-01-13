const { dealCards, randomName, readSuitName } = require("./src/utils")
const readline = require("node:readline")
const {A} = require("./src/deck")

// Global variables

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let activePlayers = []

let bustedPlayers = []

let standingPlayers = []

let round = 1

// Main utility functions

const functionConnecter = () => {
    console.dir("Current active players: ", [activePlayers])
    tallyCards(activePlayers)
    updateStatus(activePlayers)

    if (activePlayers.length !== 0) {
        progressAnouncement(round)
        console.log("Players will now choose to 'hit' or 'stand'.")
        playerActions()
        round++
    } else {
        console.log("All players have now chosen to stand. The scores will now be evaluated to find the winner")
        let winners = findWinner(standingPlayers)
        if (winners.length === 1) {
            console.log(`Our winner is ${winners[1].name}!!!`)
        }
    }
}

const progressAnouncement = (round) => {
    if (round === 1) {
        let counter = 1
        activePlayers.forEach((player) => {
            console.log(`Player ${counter} will be known as ${player.name}, their current hand is ${readSuitName(player.hand)}, and their score is ${player.score}.`)
            counter++
        })
    } else {
        console.log(`ROUND: ${round}`)
        bustedPlayers.forEach((bustPlayer) => {
            console.log(`${bustPlayer.name}'s current hand is ${readSuitName(bustPlayer.hand)}, and their score is ${bustPlayer.score}. They have been eliminated from the game.\n`)
            // **** figure out whuch array method to use here to remove bust players from active player list
            // activePlayers.splice(activePlayers.indexOf(bustPlayer))
        })
        activePlayers.forEach((player) => {
            console.log(`${player.name}'s current hand is ${readSuitName(player.hand)}, and their score is ${player.score}.\n`)
        })
    }
}

const playerActions = () => {
    let currentPlayerCount = activePlayers.length
    let turnTakenPlayers = []
    const checkPlayerTurn = function(input) {
        // check that player input is valid:
        if (input.toLowerCase() !== "h" && input.toLowerCase() !== "s") {
            console.log("Please ensure that you enter a valid option. The round will start again.")
            playerActions()
        } else {
            turnTakenPlayers.push(input)
            // if every player has not yet taken their turn, ask again:
            if (turnTakenPlayers.length < currentPlayerCount) {
                rl.question(`${activePlayers[turnTakenPlayers.length].name}, please type "h" if you would like to hit, or "s" if you would like to stand: \n`, checkPlayerTurn)
            } else {console.log("All players have taken an action. The results will now be revealed.")
                applyAction()
            }
        }
    }

    // first player's turn takes place here:
    if(activePlayers.length === 0) {

    }
    rl.question(rl.question(`${activePlayers[0].name}, please type "h" if you would like to hit, or "s" if you would like to stand: \n`, checkPlayerTurn))

    // once every player's turn has been taken, actions are taken based on player's choice
    const applyAction = () => {
        for (let i = 0; i < turnTakenPlayers.length; i++) {
            if (turnTakenPlayers[i] === "h") {
                hit(activePlayers[i])
                console.log(`${activePlayers[i].name} has chosen to hit`)
                }
        else if (turnTakenPlayers[i] === "s") {
            stand(activePlayers[i])
            console.log(`${activePlayers[i].name} has chosen to stand`)
            standingPlayers.push()
            console.log(`${activePlayers[i].name} is now waiting for the rounds to conclude`)
            }
        }
        functionConnecter()
    }
}

// Game functions

const greeting = () => {
    console.log("Hello and welcome to my game of Blackjack!")
    console.log("**** RULES HERE")
    rl.question("To begin, please enter the number of players: ", numOfPlayers => {
        const participants = parseInt(numOfPlayers)
        if (Number.isNaN(participants)) {
            console.log(`${numOfPlayers} is not a valid number. Please try again.`)
            rl.close()
        } else {
            console.log(`Thank you. We will now prepare the game for ${numOfPlayers} people.`)
            let startingPlayers = startGame(numOfPlayers)
            activePlayers.push(...startingPlayers)
            functionConnecter()
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
    return players
}

const updateStatus = (players) => {
    console.log("player statuses will now be updated...")
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
    const card = dealCards(1)
    player.hand.push(...card)
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

// Game starts here:

greeting()

module.exports = {greeting, startGame, tallyCards, updateStatus, hit, stand, findWinner}