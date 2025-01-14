const {startGame, tallyCards, updateStatus, hit, stand, findWinner} = require("../blackjack")
const {J, Q, K, A} = require("../src/deck")

describe('startGame', () => {
    test("function returns a card object for each participating player in an array", () => {
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
            expect(player.hand.length).toBe(2)
        })
    })
});
describe('tallyCards', () => {
    test("function updates the given player's score based on their current hand", () => {
        const input = [{
            name: "Sierra",
            hand: [{c:2}, {h:10}],
            score: 0,
            status: "valid"
        }]
        const received = tallyCards(input)
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
            hand: [{d:A}, {h:K}],
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
        const received = tallyCards(input)
        const expectedResult = [{
            name: "Sierra",
            hand: [{c:3}, {s:2}],
            score: 5,
            status: "valid"
        },{
            name: "Zulu",
            hand: [{d:11}, {h:K}],
            score: 21,
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
            score: 9,
            status: "valid"
        },{
            name: "Zulu",
            hand: [{d:6}, {h:K}, {d:2}, {d:A}],
            score: 18,
            status: "valid"
        },{
            name: "Wednesday",
            hand: [{h:9}, {d:8}, {h:7}],
            score: 17,
            status: "valid"
        },{
            name: "Alfa",
            hand: [{s:Q}, {c:K}, {s:A}],
            score: 20,
            status: "valid"
        }]
        const received = tallyCards(input)
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
            hand: [{s:Q}, {c:K}, {s:A}],
            score: 21,
            status: "valid"
        }]
        expect(received).toEqual(expectedResult)
    })
    test("function updates the given player's score to 21 where they have 9, Ace and Ace in their current hand", () => {
        const input = [{
            name: "Sierra",
            hand: [{c:9}, {h:A}, {s:A}],
            score: 20,
            status: "valid"
        }]
        const received = tallyCards(input)
        const expectedResult = [{
            name: "Sierra",
            hand: [{c:9}, {h:11}, {s:A}],
            score: 21,
            status: "valid"
        }]
        expect(received).toEqual(expectedResult)
    })
    test("function updates the scores of multiple players based on their current hands, which may include multiple Aces", () => {
        const input = [{
            name: "Sierra",
            hand: [{c:9}, {h:A}, {s:A}],
            score: 20,
            status: "valid"
        },{
            name: "Zulu",
            hand: [{c:10}, {h:J}, {d:A}],
            score: 20,
            status: "valid"
        },{
            name: "Wednesday",
            hand: [{c:2}, {d:3}, {c:A}],
            score: 5,
            status: "valid"
        },{
            name: "Alfa",
            hand: [{s:A}, {h:A}, {d:A}],
            score: 12,
            status: "valid"
        }]
        const received = tallyCards(input)
        const expectedResult = [{
            name: "Sierra",
            hand: [{c:9}, {h:11}, {s:A}],
            score: 21,
            status: "valid"
        },{
            name: "Zulu",
            hand: [{c:10}, {h:J}, {d:1}],
            score: 21,
            status: "valid"
        },{
            name: "Wednesday",
            hand: [{c:2}, {d:3}, {c:11}],
            score: 16,
            status: "valid"
        },{
            name: "Alfa",
            hand: [{s:11}, {h:A}, {d:A}],
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
        const received = tallyCards(input)
        const expectedResult = [{
            name: "Sierra",
            hand: [],
            score: 0,
            status: "valid"
        }]
        expect(received).toEqual(expectedResult)
    })
});
describe('updateStatus', () => {
    test("returns array of players with their status set to valid where the score is 21 or less", () => {
        const input = [{
            name: "Sierra",
            hand: [{c:2}, {h:10}],
            score: 12,
            status: "valid"
        }]
        const received = updateStatus(input)
        const expectedResult = [{
            name: "Sierra",
            hand: [{c:2}, {h:10}],
            score: 12,
            status: "valid"
        }]
        expect(received).toEqual(expectedResult)
    })
    test("returns array of players with their status set to valid where the score is 21 or less", () => {
        const input = [{
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
        const received = updateStatus(input)
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
            name: "Alfa",
            hand: [{s:Q}, {c:J}, {s:A}],
            score: 21,
            status: "valid"
        }]
        expect(received).toEqual(expectedResult)
    })
    test("returns an empty array of players where all player scores are 22 or more", () => {
        const input = [{
            name: "Wednesday",
            hand: [{h:9}, {d:8}, {h:7}],
            score: 24,
            status: "valid"
        },{
            name: "Alfa",
            hand: [{s:Q}, {c:J}, {s:K}],
            score: 30,
            status: "valid"
        }]
        const received = updateStatus(input)
        const expectedResult = []
        expect(received).toEqual(expectedResult)
    })
    // ** may add additional tests here or update tests above for "stand" status** 
});
describe('hit', () => {
    test("function adds a card to the selected player's hand", () => {
        const input = {
            name: "Sierra",
            hand: [{c:2}, {h:10}],
            score: 12,
            status: "valid"
        }
        const received = hit(input)
        const checkObject = received.hand[2] instanceof Object
        expect(received.hand.length).toBe(3)
        expect(checkObject).toBe(true)
    })
    test("function adds a card to the selected player's hand", () => {
        const input = {
            name: "Zulu",
            hand: [{d:6}, {h:K}, {d:2}, {d:A}],
            score: 19,
            status: "valid"
        }
        const received = hit(input)
        const checkObject = received.hand[4] instanceof Object
        expect(received.hand.length).toBe(5)
        expect(checkObject).toBe(true)
    })
});
describe('stand', () => {
    test("function does not add a new card to player and sets player status to stand", () => {
        const input = {
            name: "Sierra",
            hand: [{c:2}, {h:10}],
            score: 12,
            status: "valid"
        }
        const expectedResult = {
            name: "Sierra",
            hand: [{c:2}, {h:10}],
            score: 12,
            status: "stand"
        }
        const received = stand(input)
        expect(received).toEqual(expectedResult)
    })
    test("function does not add a new card to player and sets player status to stand", () => {
        const input = {
            name: "Zulu",
            hand: [{d:6}, {h:K}, {d:2}, {d:A}],
            score: 19,
            status: "valid"
        }
        const expectedResult = {
            name: "Zulu",
            hand: [{d:6}, {h:K}, {d:2}, {d:A}],
            score: 19,
            status: "stand"
        }
        const received = stand(input)
        expect(received).toEqual(expectedResult)
    })
});
describe('findWinner', () => {
    test("function takes array of standing players and returns an array with the player's status set to winner where the score is the closest to 21", () => {
        const input = [{
            name: "Sierra",
            hand: [{c:3}, {s:2}, {h:4}, {s:5}],
            score: 14,
            status: "stand"
        },{
            name: "Zulu",
            hand: [{d:6}, {h:K}, {d:2}, {d:A}],
            score: 19,
            status: "stand"
        },{
            name: "Alfa",
            hand: [{s:Q}, {c:J}, {s:A}],
            score: 21,
            status: "stand"
        }]
        const received = (findWinner(input))
        const expectedResult = [{
            name: "Alfa",
            hand: [{s:Q}, {c:J}, {s:A}],
            score: 21,
            status: "winner"
        }]
        expect(received).toEqual(expectedResult)
    })
    test("function takes returns an array of players where there is a draw with each player's status set to draw", () => {
        const input = [{
            name: "Sierra",
            hand: [{c:9}, {h:A}, {s:A}],
            score: 21,
            status: "stand"
        },{
            name: "Zulu",
            hand: [{c:10}, {h:J}, {d:A}],
            score: 21,
            status: "stand"
        },{
            name: "Wednesday",
            hand: [{c:5}, {d:6}, {c:A}],
            score: 12,
            status: "stand"
        },{
            name: "Alfa",
            hand: [{s:A}, {h:A}, {d:A}],
            score: 13,
            status: "stand"
        }]
        const received = (findWinner(input))
        const expectedResult = [{
            name: "Sierra",
            hand: [{c:9}, {h:A}, {s:A}],
            score: 21,
            status: "draw"
        },{
            name: "Zulu",
            hand: [{c:10}, {h:J}, {d:A}],
            score: 21,
            status: "draw"
        }]
        expect(received).toEqual(expectedResult)
    })
});