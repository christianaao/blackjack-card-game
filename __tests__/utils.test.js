const { dealCards, randomName, checkValidPlayer } = require("../src/utils");
const players = require("../src/players")
const {deck, J, Q, K, A} = require("../src/deck")

// afterEach(() => {
//     jest.restoreAllMocks()
// })

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

// describe('checkValidPlayer', () => {
//     test.only("function returns true where player status is set to valid or stand", () => {
//         const input = [{
//             name: "Sierra",
//             hand: [{c:3}, {s:2}, {h:4}, {s:5}],
//             score: 14,
//             status: "stand"
//         },{
//             name: "Zulu",
//             hand: [{d:6}, {h:K}, {d:2}, {d:A}],
//             score: 19,
//             status: "invalid"
//         },{
//             name: "Wednesday",
//             hand: [{h:9}, {d:8}, {h:3}],
//             score: 20,
//             status: "stand"
//         },{
//             name: "Alfa",
//             hand: [{s:Q}, {c:J}, {s:A}],
//             score: 21,
//             status: "invalid"
//         }]
//         input.forEach((player) => {
//             if(player.status === "invalid") {
//                 jest.replaceProperty(player, "status", "valid")
//             }
//             console.log("outside if: ", player)
//         })
//         const received = checkValidPlayer(input)
//         expect(received).toBe(true)
//     })
//     test.only("function returns false where player status is set to bust", () => {
//         const input = [{
//             name: "Sierra",
//             hand: [{c:3}, {s:10}, {h:4}, {s:5}],
//             score: 22,
//             status: "valid"
//         },{
//             name: "Zulu",
//             hand: [{d:6}, {h:K}, {d:Q}, {d:A}],
//             score: 27,
//             status: "valid"
//         },{
//             name: "Wednesday",
//             hand: [{h:9}, {d:8}, {h:7}],
//             score: 24,
//             status: "valid"
//         },{
//             name: "Alfa",
//             hand: [{s:Q}, {c:J}, {s:K}],
//             score: 30,
//             status: "valid"
//         }]
//         input.forEach((player) => {
//             if(player.score > 21) {
//                 jest.replaceProperty(player, "status", "bust")
//             }
//             console.log("outside if: ", player)
//         })
//         const received = checkValidPlayer(input)
//         expect(received).toBe(false)
//     })
// });