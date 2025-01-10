const { dealCards, randomName } = require("../src/utils");
const players = require("../src/players")

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
});

describe('randomName', () => {
    test("should return a name from the players list", () => {
        const received = randomName()
        expect(players).toContain(received)
    })
    // need to figure out how to ensure name is only called once so there arent duplicated names for players
});