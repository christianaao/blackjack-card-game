const { dealCards } = require("../src/utils");

describe('dealCards', () => {
    test("function returns array of card objects", () => {
        const input = 2
        const received = dealCards(input)
        received.forEach((card) => {
            expect(card).toMatchObject({
                
            })
        })
    })
    test("function returns the requested number of cards", () => {
        const input = 2
        const received = dealCards(input)
        expect(received.length).toBe(2)
    })
});