const {deck, A} = require("./deck")
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
        
        // removing card number from the suit
        let randomCard = cards.splice(cardIndex, 1)
        let finalCard = {[randomSuit]: randomCard[0]}
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
    const name = players.splice(index, 1)
    return name
}

exports.readSuitName = (playerHand) => {
    let cardString = ""
    playerHand.forEach((card) => {
        for (const suit in card) {
            let suitNumber = card[suit]
            // checking for A, J, Q and K
            if (suitNumber === A) {
                cardString += "Ace (1)"
            } else if (suitNumber === 11) {
                cardString += "Ace (11)"
            } else cardString += suitNumber.toString()

            // checking for suit
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