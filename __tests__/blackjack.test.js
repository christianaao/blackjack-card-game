const {startGame} = require("../blackjack")

/* Test Objectives: 
 - should not mutate object/array
 - should not return the same object/array
 - should return a new object/array, where required
 - should return the correct data type
 - should return expected result
*/

describe('startGame', () => {
    test("function returns an object for each participating player in an array", () => {
        const input = 2
        const received = startGame(input)
        expect(received.length).toBe(2)
        received.forEach((player) => {
            expect(player).toMatchObject({
                name: expect.any(String),
                hand: expect.any(Array),
                score: 0,
                status: "valid"
            })
        })
    })
    test("each player is dealt their opening hand containing 2 cards", () => {
        const input = 4
        const received = startGame(input)
        received.forEach((player) => {
            console.log(player)
            expect(player.hand.length).toBe(2)
        })
    })
    test("game does not continue if there is less than 2 players participating", () => {
        const input = 1
        const received = startGame(input)
        const expectedResult = "A minimum of 2 participants is required to play this game."
        expect(received).toBe(expectedResult)
    })
    test("game does not continue if there is more than 26 players participating", () => {
        const input = 27
        const received = startGame(input)
        const expectedResult = "A maximum of 26 participants can play this game."
        expect(received).toBe(expectedResult)
    })
});