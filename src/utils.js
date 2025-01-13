const {deck, J, Q, K, A} = require("./deck")
const players = require("./players")

exports.dealCards = (numOfCards) => {
    let hand = []
    const dealRandomCard = () => {
        //get random suit
        let suits = Object.keys(deck)
        let suitIndex = Math.floor(Math.random() * suits.length)
        let randomSuit = suits[suitIndex]

        //get random card number
        let cards = deck[randomSuit]
        let cardIndex = Math.floor(Math.random() * cards.length)
        let randomCard = cards[cardIndex]

        let finalCard = {[randomSuit]: randomCard}
        return finalCard
    }

    while (numOfCards > 0) {
        hand.push(dealRandomCard())
        numOfCards--
    }

    return hand
}

exports.randomName = () => {
    let index = Math.floor(Math.random() * players.length)
    return players[index]
}

exports.suitName = (playerHand) => {
    let cardString = ""
    playerHand.forEach((card) => {
        for (const suit in card) {
            let suitNumber = card[suit]
            if (suitNumber === A) {
                cardString += "Ace"
            } else cardString += suitNumber.toString()
            console.log("after suitNum: ", cardString)
            if (suit === "c") {
                cardString += " of Clubs, "
            } else if (suit === "d") {
                cardString += " of Diamonds, "
            } else if (suit === "h") {
                cardString += " of Hearts, "
            } else if (suit === "s") {
                cardString += " of Spades, "
            }
        }
    })
    if (cardString) {
        return cardString.slice(0, -2)
    } else {return "There are no cards."}
}