const {startGame} = require("../blackjack")
const { deck, players } = require("../src/index")

/* Test Objectives: 
 - should not mutate object/array
 - should not return the same object/array
 - should return a new object/array, where required
 - should return the correct data type
 - should return expected result
*/

describe('startGame', () => {
    test("function returns an object for each participating player", () => {
        const input = 2
        const received = startGame(input)
        const expectedResult = [
            {
                name: "A",
                hand: [],
                score: 0,
                status: "valid"
            },
            {
                name: "B",
                hand: [],
                score: 0,
                status: "valid"
            }]
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
            expect(player.hand.length).toBe(2)
        })
        expect(received).toEqual(expectedResult)
    })
});
// describe('Name of the group', () => {
//     test("", () => {
//         expect(received).toBe(x)
//         expect(received).notToBe()

//     })
// });