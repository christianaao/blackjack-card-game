const { dealCards, randomName, readSuitName } = require("../src/utils");
const players = require("../src/players")
const {deck, J, Q, K, A} = require("../src/deck")

describe('dealCards', () => {
    test("function returns array of requested number of cards as objects", () => {
        const input = 2
        const received = dealCards(input)
        expect(received.length).toBe(2)
        received.forEach((card) => {
            const checkObject = card instanceof Object
            expect(checkObject).toBe(true)
        })
    })
    test("function removes cards from the original array", () => {
        const input = 2
        const received = dealCards(input)
        let compareSuit = ""
        let checkSuitNum = 0
        received.forEach((card) => {
            // find random suit and card number that was returned
            for (let suit in card) {
                let cardNumber = card[suit]
                compareSuit = suit
                checkSuitNum = cardNumber
            // compare against deck current card numbers to see that it has been removed
                for (let deckSuit in deck) {
                    let deckSuitArray = deck[deckSuit]
                    if (deckSuit === compareSuit) {
                        expect(deckSuitArray).not.toContain(checkSuitNum)
                    }
                }
            }
        })
    })
    test("function removes cards from the original array", () => {
        const input = 6
        const received = dealCards(input)
        let compareSuit = ""
        let checkSuitNum = 0
        received.forEach((card) => {
            // find random suit and card number that was returned
            for (let suit in card) {
                let cardNumber = card[suit]
                compareSuit = suit
                checkSuitNum = cardNumber
            // compare against deck current card numbers to see that it has been removed
                for (let deckSuit in deck) {
                    let deckSuitArray = deck[deckSuit]
                    if (deckSuit === compareSuit) {
                        expect(deckSuitArray).not.toContain(checkSuitNum)
                    }
                }
            }
        })
    })
});

describe('randomName', () => {
    test("should return a name from the players list", () => {
        const received = randomName()
        expect(players).not.toContain(received)
        expect(players.length).toBe(25)
    })
});

describe('readSuitName', () => {
    test("should return the card names of whatever hand is passed", () => {
        const input = [{h:2}, {d:7}]
        const received = readSuitName(input)
        const expectedResult = "2 of Hearts, 7 of Diamonds"
        expect(received).toBe(expectedResult)
    })
    test("should return the card names of whatever hand is passed", () => {
        const input = [{c:A}, {d:J}, {h:Q}, {s:K}]
        const received = readSuitName(input)
        const expectedResult = "Ace (1) of Clubs, Jack of Diamonds, Queen of Hearts, King of Spades"
        expect(received).toBe(expectedResult)
    })
    test("should return the card names of whatever hand is passed", () => {
        const input = [{c:11}, {d:J}]
        const received = readSuitName(input)
        const expectedResult = "Ace (11) of Clubs, Jack of Diamonds"
        expect(received).toBe(expectedResult)
    })
    test("should return an error message where an empty hand is passed", () => {
        const input = [{}, {}]
    const received = readSuitName(input)
    const expectedResult = "There are no cards."
    expect(received).toBe(expectedResult)
    })
});