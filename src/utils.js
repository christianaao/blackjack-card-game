const deck = require("./deck")

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