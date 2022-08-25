import {looksLikeMail} from "../src/_services/func.service"

describe("Testing looksLikeMail", () => {
    test("will be False", () => {
        expect(looksLikeMail("qwerty")).toBe(false)
    }),
    test("will be False", () => {
        expect(looksLikeMail("qwerty@")).toBe(false)
    }),
    test("will be False", () => {
        expect(looksLikeMail("qwerty@qwe")).toBe(false)
    }),
    test("will be False", () => {
        expect(looksLikeMail("qwerty@qwe.")).toBe(false)
    }),
    test("will be True", () => {
        expect(looksLikeMail("qwerty@qwe.com")).toBe(true)
    })
})