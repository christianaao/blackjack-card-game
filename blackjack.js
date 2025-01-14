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

// Checker functions

const functionConnecter = () => {
    tallyCards(activePlayers)
    updateStatus(activePlayers)

    progressAnouncement(round)
    if (activePlayers.length === 0) {
        console.log("THE ROUNDS ARE NOW CONCLUDED.\nThe scores will now be evaluated to find the winner...\n")
        rl.close()
        let winners = findWinner(standingPlayers)
        if (winners.length === 1) {
            console.log(`\nWINNER!\nThe Winner is: ${winners[0].name}! They finished with a score of ${winners[0].score}. Finishing hand: ${readSuitName(winners[0].hand)}`)
        } else if (winners.length === 0) {
            console.log("\nHOUSE WINS! Every player was eliminated this round!")
        } else {
            console.log("\nIT'S A DRAW!")
            winners.forEach((winner) => {
                console.log(`${winner.name} finished with a score of ${winner.score}. Finishing hand: ${readSuitName(winner.hand)}`)
            })
        }
    } else {
        console.log("\nPLAYERS WILL NOW CHOOSE TO 'HIT' OR 'STAND'")
        playerActions()
        round++
    }
}

const progressAnouncement = (round) => {
    if (round === 1) {
        let counter = 1
        console.log("STARTING RESULTS:")
        activePlayers.forEach((player) => {
            console.log(`Player ${counter} will be known as ${player.name}, their current hand is ${readSuitName(player.hand)}, and their score is ${player.score}.\n`)
            counter++
        })
    } else {
        console.log(`ROUND ${round} RESULTS:\n`)
        bustedPlayers.forEach((bustPlayer) => {
            console.log(`${bustPlayer.name}'s current hand is ${readSuitName(bustPlayer.hand)}, and their score is ${bustPlayer.score}. They have been eliminated from the game.\n`)
            let index = activePlayers.indexOf(bustPlayer)
            activePlayers.splice(index, 1)
        })
        standingPlayers.forEach((stoodPlayer) => {
            let index = activePlayers.indexOf(stoodPlayer)
            activePlayers.splice(index, 1)
        })
        activePlayers.forEach((player) => {
            console.log(`${player.name}'s current hand is ${readSuitName(player.hand)}, and their score is ${player.score}.\n`)
        })
    }
}

const playerActions = () => {
    const askPlayerAction = () => {
        // first player's turn takes place here:
        if(activePlayers.length !== 0) {
            rl.question(rl.question(`${activePlayers[0].name}, please type "h" if you would like to hit, or "s" if you would like to stand: \n`, checkPlayerTurn))
        }
    }

    let currentPlayerCount = activePlayers.length
    let turnTakenPlayers = []
    const checkPlayerTurn = (input) => {
        // check that player input is valid:
        if (input.toLowerCase() !== "h" && input.toLowerCase() !== "s") {
            //**** test this to ensure it doesnt mess up player cards
            console.log("Please ensure that you enter a valid option. The round will start again.")
            playerActions()
        } else {
            turnTakenPlayers.push(input)
            // if every player has not yet taken their turn, ask again:
            if (turnTakenPlayers.length < currentPlayerCount) {
                rl.question(`${activePlayers[turnTakenPlayers.length].name}, please type "h" if you would like to hit, or "s" if you would like to stand: \n`, checkPlayerTurn)
            } else {console.log("\nALL PLAYERS HAVE TAKEN AN ACTION\nThe results will now be revealed...\n")
                applyAction()
            }
        }
    }

    askPlayerAction()

    // once every player's turn has been taken, actions are taken based on player's choice
    const applyAction = () => {
        for (let i = 0; i < turnTakenPlayers.length; i++) {
            if (turnTakenPlayers[i] === "h") {
                hit(activePlayers[i])
                console.log(`${activePlayers[i].name} has chosen to hit. A card will now be added to their current hand.`)
                }
            else if (turnTakenPlayers[i] === "s") {
                stand(activePlayers[i])
                console.log(`${activePlayers[i].name} has chosen to stand. They will now wait until the rounds have concluded for the final result.`)
                }
        }
        console.log("")
        functionConnecter()
    }
}

// Game functions

const greeting = () => {
    console.log("Hello and welcome to my game of Blackjack!\nI hope you enjoy playing.\n")
    console.log(`GAME RULES:\n

        ♣ 
        ♦
        ♥
        ♠
        `)
    rl.question("To begin the game, please enter the number of players: ", numOfPlayers => {
        const participants = parseInt(numOfPlayers)
        if (!Number.isInteger(participants)) {
            console.log(`"${numOfPlayers}" is not a valid number. Please try again.`)
            rl.close()
        } else if (participants < 2) {
            console.log("A minimum of 2 participants is required to play this game.")
            rl.close()
        } else if (participants > 26) {
            console.log("A maximum of 26 participants can play this game.")
            rl.close()
        } else {
            console.log(`Thank you. We will now prepare the game for ${participants} people.\n`)
            const startingPlayers = startGame(participants)
            activePlayers.push(...startingPlayers)
            functionConnecter()
        }
    })
}

const startGame = (numOfPlayers) => {
    console.log(`Dealing cards for ${numOfPlayers} players...\n`)

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
    console.log("The scores will now be calculated...\n")

    players.forEach((player) => {
        let playerHand = player.hand
        player.score = 0
        player.hand.forEach((card) => {
            for (const suit in card) {
                let suitNumber = card[suit]
                if(typeof suitNumber === "string") {
                    player.score += 10
                } else if(suitNumber === A && player.score <= 10) {
                    let index = playerHand.indexOf(card)
                    playerHand.splice(index, 1, {[suit]:11})
                    player.score += 11
                } else {player.score += suitNumber}
            }
        })
    })
    return players
}

const updateStatus = (players) => {
    console.log("Preparing the results...\n")
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
    if (player.score <= 21) {
        player.status = "stand"
        standingPlayers.push(player)
    }
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
    } else if (winners.length === 1) {
        winners[0].status = "winner"
    }
    return winners
}

// Game starts here:

greeting()

module.exports = {greeting, startGame, tallyCards, updateStatus, hit, stand, findWinner}