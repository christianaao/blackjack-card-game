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
        const input = x
        const received = startGame(input)
        const expectedResult = {

        }
        expectedResult.forEach((player) => {
            expect(player).toMatchObject({

            })
            expect(received).toBe(x)
            expect(received).notToBe()
        })
    })
    test("each player is dealt their opening hand containing 2 cards", () => {
        const input = x
        const received = startGame(input)
        const expectedResult = y
        expect(received).toEqual(expectedResult)
    })
});