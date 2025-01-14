const { dealCards, randomName, readSuitName } = require("../src/utils");
const players = require("../src/players")
const {J, Q, K, A} = require("../src/deck")

describe('dealCards', () => {
    test("function returns array of card objects", () => {
        const input = 2
        const received = dealCards(input)
        received.forEach((card) => {
            const checkObject = card instanceof Object
            expect(checkObject).toBe(true)
        })
    })
    test("function returns the requested number of cards", () => {
        const input = 2
        const received = dealCards(input)
        expect(received.length).toBe(2)
    })
    test("function returns the requested number of cards", () => {
        const input = 6
        const received = dealCards(input)
        expect(received.length).toBe(6)
    })
    //need to figure out how to ensure only 1 of each card can be called, i.e. ensure 2 players can't ever have 2 of Hearts at the same time
});

describe('randomName', () => {
    test("should return a name from the players list", () => {
        const received = randomName()
        expect(players).toContain(received)
    })
    // need to figure out how to ensure name is only called once so there arent duplicated names for players
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