const {greeting, startGame, tally} = require("../blackjack")
const readline = require("node:readline")
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

/* Test Objectives: 
 - should not mutate object/array
 - should not return the same object/array
 - should return a new object/array, where required
 - should return the correct data type
 - should return expected result
*/

describe.skip('greeting', () => {
    // test("function should return the number of players participating in the game", () => {
    //     return greeting().then((result => {
    //         expect(result).toBe(2)
    //     }))
    // })
    test("function should return the number of players participating in the game", () => {
        const mockFn = jest.fn()
        const convertInputToInt = (mockFn) => {
            rl.question(`Please state how many people are playing: `, num => {
                console.log(`You entered: ${num}.`)
                rl.close()
                const numOfPlayers = parseInt(num)
                if(typeof numOfPlayers === NaN) {
                    return console.log("An invalid number has been entered. Please try again.")
                }
                mockFn(num, numOfPlayers)
            })
        }
        convertInputToInt(mockFn)
        expect(mockFn).toBe(expectedResult)
    })
    test("function should return the number of players participating in the game", () => {
        const mockFn = jest.fn()
        const testFn = (mockFn) => {
            rl.question(`Please state how many people are playing: `, num => {
                console.log(`You entered: ${num}.`)
                rl.close()
                const numOfPlayers = parseInt(num)
                if(typeof numOfPlayers === NaN) {
                    return console.log("An invalid number has been entered. Please try again.")
                }
                mockFn(num, numOfPlayers)
            })
        }
        const received = (test)
        const expectedResult = 2
        expect(received).toBe(expectedResult)
    })
    test("game does not continue if an invalid data type is given", () => {
        const input = NaN
        const received = startGame(input)
        const expectedResult = "An invalid number has been entered. Please try again."
        expect(received).toBe(expectedResult)
    })
});
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
            // console.log(player)
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
describe('tally', () => {
    // test("function calculates the given player's score based on their hand", () => {
    //     const input = {
    //                 name: "Sierra",
    //                 hand: [{c:2}, {h:10}],
    //                 score: 0,
    //                 status: "valid"
    //             }
    //     const received = tally(input)
    //     const expectedResult = {
    //         name: "Sierra",
    //         hand: [{c:2}, {h:10}],
    //         score: 12,
    //         status: "valid"
    //     }
    // })
    // test("", () => {
        
    // })
    // test("", () => {
        
    // })
    // test("", () => {
        
    // })
});