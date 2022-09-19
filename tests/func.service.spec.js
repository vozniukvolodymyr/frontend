import {
    looksLikeMail,
    objecthash,
    objecthashmin,
    innerclassrank,
    innerclassstatus,
    checkpassvalid,
    commentvalid,
    amountvalid,
    dateformat,
    monthtostr
} from "../src/_services/func.service"
import store from '../src/store/index';
import { LANG_SETUP, LANG_SUCCESS } from '../src/store/actions/lang';

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

describe("Function objecthash", () => {
    it("will be 1889", () => {
        const data = { name: "Ostap", surname: "Ukraine", id: 30456, money: 20000.45 }
        expect(objecthash(data)).toEqual(1889);
    })
    it("will be 2118", () => {
        const data = { name: "1234Ostap", surname: "9876Ukraine", id: 456, money: 200.45 }
        expect(objecthash(data)).toEqual(2118);
    })
    it("will be 2930", () => {
        const data = { name: "Ostap378", surname: "UkraineBest", id: 1456, money: 2100.45, list: [123, 5678, 3456] }
        expect(objecthash(data)).toEqual(2930);
    })
    it("will be 2931", () => {
        const data = { name: "Kharkov", surname: "UkraineKiev", id: 146, money: 100.45, list: ["123", "5678", "3456"] }
        expect(objecthash(data)).toEqual(2873);
    })
})

describe("Function objecthashmin", () => {
    it("will be 1889", () => {
        const data = { name: "Ostap", surname: "Ukraine", id: 30456, money: 20000.45 }
        expect(objecthashmin(data)).toEqual(1889);
    })
    it("will be 2118", () => {
        const data = { name: "1234Ostap", surname: "9876Ukraine", id: 456, money: 200.45 }
        expect(objecthashmin(data)).toEqual(2118);
    })
    it("will be 2930", () => {
        const data = { name: "Ostap378", surname: "UkraineBest", id: 1456, money: 2100.45, list: [123, 5678, 3456] }
        expect(objecthashmin(data)).toEqual(2930);
    })
    it("will be 2931", () => {
        const data = { name: "Kharkov", surname: "UkraineKiev", id: 146, money: 100.45, list: ["123", "5678", "3456"] }
        expect(objecthashmin(data)).toEqual(2873);
    })
})

describe("Function innerclassrank", () => {
    it("will be has-text-weight-bold has-text-weight-bold has-text-black has-background-white-ter", () => {
        expect(innerclassrank(1)).toEqual("has-text-weight-bold has-text-weight-bold has-text-black has-background-white-ter");
    })
    it("will be has-text-weight-bold has-text-black has-background-warning", () => {
        expect(innerclassrank(2)).toEqual("has-text-weight-bold has-text-black has-background-warning");
    })
    it("will be has-text-weight-bold has-text-white has-background-grey", () => {
        expect(innerclassrank(3)).toEqual("has-text-weight-bold has-text-white has-background-grey");
    })
    it("will be has-text-weight-bold has-text-white color-back-menu", () => {
        expect(innerclassrank(4)).toEqual("has-text-weight-bold has-text-white color-back-menu");
    })
    it("will be has-text-weight-bold", () => {
        expect(innerclassrank(5)).toEqual("has-text-weight-bold");
    })
})

describe("Function innerclassstatus", () => {
    it("will be has-text-weight-bold has-text-white has-background-primary", () => {
        expect(innerclassstatus(1)).toEqual("has-text-weight-bold has-text-white has-background-primary");
    })
    it("will be has-text-weight-bold has-text-white has-background-danger", () => {
        expect(innerclassstatus(2)).toEqual("has-text-weight-bold has-text-white has-background-danger");
    })
    it("will be has-text-weight-bold has-text-black has-background-warning", () => {
        expect(innerclassstatus(3)).toEqual("has-text-weight-bold has-text-black has-background-warning");
    })
    it("will be has-text-weight-bold has-text-black has-background-warning", () => {
        expect(innerclassstatus(4)).toEqual("has-text-weight-bold has-text-black has-background-warning");
    })
})

describe("Function checkpassvalid", () => {
    it("When Input '' will be false", () => {
        expect(checkpassvalid('')).toBe(false);
    })
    it("When Input '123' will be false", () => {
        expect(checkpassvalid('123')).toBe(false);
    })
    it("When Input 'qwertyuioasdfghjk' will be false", () => {
        expect(checkpassvalid('qwertyuioasdfghjk')).toBe(false);
    })
    it("When Input null will be false", () => {
        expect(checkpassvalid(null)).toBe(false);
    })
    it("When Input 'qwertyuioas' will be true", () => {
        expect(checkpassvalid('qwertyuioas')).toBe(true);
    })
})
describe("Function commentvalid", () => {
    it("When Input null will be false", () => {
        expect(commentvalid(null)).toBe(false);
    })
    it("When Input Symbols.length>128 will be false", () => {
        expect(commentvalid(Array(129).join('x'))).toBe(true);
    })
    it("When Input 'qwertyuioasdfghjk' will be true", () => {
        expect(commentvalid('qwertyuioasdfghjk')).toBe(true);
    })
})

describe("Function amountvalid", () => {
    it("When Input null will be false", () => {
        expect(amountvalid(null)).toBe(false);
    })
    it("When Input 'asdfg' will be false", () => {
        expect(amountvalid('asdfg')).toBe(false);
    })
    it("When Input '-1' will be true", () => {
        expect(amountvalid('-1')).toBe(false);
    })
    it("When Input '0' will be true", () => {
        expect(amountvalid('0')).toBe(false);
    })
    it("When Input '1000001' will be true", () => {
        expect(amountvalid('1000001')).toBe(false);
    })
    it("When Input 150 will be true", () => {
        expect(amountvalid(150)).toBe(true);
    })
    it("When Input '1500' will be true", () => {
        expect(amountvalid('1500')).toBe(true);
    })
})

describe("Function dateformat", () => {
    it("When Input 2022-04-01 will be 2022-04-01", () => {
        expect(dateformat(new Date("2022-04-01"))).toEqual("2022-04-01");
    })
    it("When Input 2022-04-01 will be 2022-04-01", () => {
        expect(dateformat(new Date("2022/04/01"))).toEqual("2022-04-01");
    })
    it("When Input 2022-04-01 will be 2022-04-01", () => {
        expect(dateformat(new Date("2022.04.01"))).toEqual("2022-04-01");
    })
    it("When Input null will be null", () => {
        expect(dateformat(null)).toBe("");
    })
})

describe("Function monthtostr", () => {
    store.commit(LANG_SETUP, "EN");
    store.commit(LANG_SUCCESS, {
        "month_January": "January",
        "month_February": "February",
        "month_March": "March",
        "month_April": "April",
        "month_May": "May",
        "month_June": "June",
        "month_July": "July",
        "month_August": "August",
        "month_September": "September",
        "month_October": "October",
        "month_November": "November",
        "month_December": "December"
    });
    it("When Input Month 1 be 'January'", () => {
        expect(monthtostr(1, store.getters.locale)).toEqual('January');
    })
    it("When Input Month 2 be 'February'", () => {
        expect(monthtostr(2, store.getters.locale)).toEqual('February');
    })
    it("When Input Month 3 be 'March'", () => {
        expect(monthtostr(3, store.getters.locale)).toEqual('March');
    })
    it("When Input Month 4 be 'April'", () => {
        expect(monthtostr(4, store.getters.locale)).toEqual('April');
    })
    it("When Input Month 5 be 'May'", () => {
        expect(monthtostr(5, store.getters.locale)).toEqual('May');
    })
    it("When Input Month 6 be 'June'", () => {
        expect(monthtostr(6, store.getters.locale)).toEqual('June');
    })
    it("When Input Month 7 be 'July'", () => {
        expect(monthtostr(7, store.getters.locale)).toEqual('July');
    })
    it("When Input Month 8 be 'August'", () => {
        expect(monthtostr(8, store.getters.locale)).toEqual('August');
    })
    it("When Input Month 9 be 'September'", () => {
        expect(monthtostr(9, store.getters.locale)).toEqual('September');
    })
    it("When Input Month 10 be 'October'", () => {
        expect(monthtostr(10, store.getters.locale)).toEqual('October');
    })
    it("When Input Month 11 be 'November'", () => {
        expect(monthtostr(11, store.getters.locale)).toEqual('November');
    })
    it("When Input Month 12 be 'December'", () => {
        expect(monthtostr(12, store.getters.locale)).toEqual('December');
    })
    it("When Input Month 0 be ''", () => {
        expect(monthtostr(0, store.getters.locale)).toEqual('');
    })
    it("When Input Month null be ''", () => {
        expect(monthtostr(null, store.getters.locale)).toEqual('');
    })
})