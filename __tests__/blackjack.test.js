const {greeting, startGame, tally} = require("../blackjack")
const {deck, J, Q, K, A} = require("../src/deck")

// const readline = require("node:readline")
// const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     })

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
    // test("function should return the number of players participating in the game", () => {
    //     const mockFn = jest.fn()
    //     const convertInputToInt = (mockFn) => {
    //         rl.question(`Please state how many people are playing: `, num => {
    //             console.log(`You entered: ${num}.`)
    //             rl.close()
    //             const numOfPlayers = parseInt(num)
    //             if(typeof numOfPlayers === NaN) {
    //                 return console.log("An invalid number has been entered. Please try again.")
    //             }
    //             mockFn(num, numOfPlayers)
    //         })
    //     }
    //     convertInputToInt(mockFn)
    //     expect(mockFn).toBe(expectedResult)
    // })
    // test("function should return the number of players participating in the game", () => {
    //     const mockFn = jest.fn()
    //     const testFn = (mockFn) => {
    //         rl.question(`Please state how many people are playing: `, num => {
    //             console.log(`You entered: ${num}.`)
    //             rl.close()
    //             const numOfPlayers = parseInt(num)
    //             if(typeof numOfPlayers === NaN) {
    //                 return console.log("An invalid number has been entered. Please try again.")
    //             }
    //             mockFn(num, numOfPlayers)
    //         })
    //     }
    //     const received = (test)
    //     const expectedResult = 2
    //     expect(received).toBe(expectedResult)
    // })
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
    test("function updates the given player's score based on their current hand", () => {
        const input = [{
            name: "Sierra",
            hand: [{c:2}, {h:10}],
            score: 0,
            status: "valid"
        }]
        const received = tally(input)
        const expectedResult = [{
            name: "Sierra",
            hand: [{c:2}, {h:10}],
            score: 12,
            status: "valid"
        }]
        expect(received).toEqual(expectedResult)
    })
    test("function updates the scores of multiple players based on their current hand", () => {
        const input = [{
            name: "Sierra",
            hand: [{c:3}, {s:2}],
            score: 0,
            status: "valid"
        },{
            name: "Zulu",
            hand: [{d:6}, {h:K}],
            score: 0,
            status: "valid"
        },{
            name: "Wednesday",
            hand: [{h:9}, {d:8}],
            score: 0,
            status: "valid"
        },{
            name: "Alfa",
            hand: [{s:Q}, {c:J}],
            score: 0,
            status: "valid"
        }]
        const received = tally(input)
        const expectedResult = [{
            name: "Sierra",
            hand: [{c:3}, {s:2}],
            score: 5,
            status: "valid"
        },{
            name: "Zulu",
            hand: [{d:6}, {h:K}],
            score: 16,
            status: "valid"
        },{
            name: "Wednesday",
            hand: [{h:9}, {d:8}],
            score: 17,
            status: "valid"
        },{
            name: "Alfa",
            hand: [{s:Q}, {c:J}],
            score: 20,
            status: "valid"
        }]
        expect(received).toEqual(expectedResult)
    })
    test("function updates the scores of multiple players based on their current hand where a score was already present", () => {
        const input = [{
            name: "Sierra",
            hand: [{c:3}, {s:2}, {h:4}, {s:5}],
            score: 5,
            status: "valid"
        },{
            name: "Zulu",
            hand: [{d:6}, {h:K}, {d:2}, {d:A}],
            score: 16,
            status: "valid"
        },{
            name: "Wednesday",
            hand: [{h:9}, {d:8}, {h:7}],
            score: 17,
            status: "valid"
        },{
            name: "Alfa",
            hand: [{s:Q}, {c:J}, {s:A}],
            score: 20,
            status: "valid"
        }]
        const received = tally(input)
        const expectedResult = [{
            name: "Sierra",
            hand: [{c:3}, {s:2}, {h:4}, {s:5}],
            score: 14,
            status: "valid"
        },{
            name: "Zulu",
            hand: [{d:6}, {h:K}, {d:2}, {d:A}],
            score: 19,
            status: "valid"
        },{
            name: "Wednesday",
            hand: [{h:9}, {d:8}, {h:7}],
            score: 24,
            status: "valid"
        },{
            name: "Alfa",
            hand: [{s:Q}, {c:J}, {s:A}],
            score: 21,
            status: "valid"
        }]
        expect(received).toEqual(expectedResult)
    })
    test("function updates the given player's score to 21 where they have 9, Ace and Ace in their current hand", () => {
        const input = [{
            name: "Sierra",
            hand: [{c:9}, {h:A}, {s:A}],
            score: 0,
            status: "valid"
        }]
        const received = tally(input)
        const expectedResult = [{
            name: "Sierra",
            hand: [{c:9}, {h:A}, {s:A}],
            score: 21,
            status: "valid"
        }]
        expect(received).toEqual(expectedResult)
    })
    test("function updates the scores of multiple players based on their current hands, which may include multiple Aces", () => {
        const input = [{
            name: "Sierra",
            hand: [{c:9}, {h:A}, {s:A}],
            score: 0,
            status: "valid"
        },{
            name: "Zulu",
            hand: [{c:10}, {h:J}, {d:A}],
            score: 0,
            status: "valid"
        },{
            name: "Wednesday",
            hand: [{c:5}, {d:6}, {c:A}],
            score: 0,
            status: "valid"
        },{
            name: "Alfa",
            hand: [{s:A}, {h:A}, {d:A}],
            score: 0,
            status: "valid"
        }]
        const received = tally(input)
        const expectedResult = [{
            name: "Sierra",
            hand: [{c:9}, {h:A}, {s:A}],
            score: 21,
            status: "valid"
        },{
            name: "Zulu",
            hand: [{c:10}, {h:J}, {d:A}],
            score: 21,
            status: "valid"
        },{
            name: "Wednesday",
            hand: [{c:5}, {d:6}, {c:A}],
            score: 12,
            status: "valid"
        },{
            name: "Alfa",
            hand: [{s:A}, {h:A}, {d:A}],
            score: 13,
            status: "valid"
        }]
        expect(received).toEqual(expectedResult)
    })
    test("where the player's hand is empty, the score does not change", () => {
        const input = [{
            name: "Sierra",
            hand: [],
            score: 0,
            status: "valid"
        }]
        const received = tally(input)
        const expectedResult = [{
            name: "Sierra",
            hand: [],
            score: 0,
            status: "valid"
        }]
        expect(received).toEqual(expectedResult)
    })
});