import User from "../src/_models/user";

describe("Class User", () => {
    beforeEach(() => {
    });
    test("will check function 'assign': result account: 410000000215, amount: 5000, free: 0", () => {
        const user = new User();
        user.assign({ swift: {account: 410000000215, amount: 5000, free: 0},
            accounts: [{account: 110000000215, amount: 11678, free: 0},
                       {account: 210000000215, amount: 45, free: 0},
                       {account: 310000000215, amount: 400, free: 0}],
            versionaccount: "2022-07-09 14:02:21",
            autotransferprofit: "false", autotransferbonus: "true", versionuser: "2022-07-09 14:02:21"});
            expect(user.autotransferprofit).toBe(false);
            expect(user.autotransferbonus).toBe(true);
            expect(user.versionuser).toEqual("2022-07-09 14:02:21");
            expect(user.swift).toEqual({account: 410000000215, amount: 5000, free: 0});
    })
    test("will check function 'assignaccount': result account: 410000000215, amount: 5000, free: 0", () => {
        const user = new User();
        user.assignaccount({ swift: {account: 410000000215, amount: 5000, free: 0},
            accounts: [{account: 110000000215, amount: 11678, free: 0},
                       {account: 210000000215, amount: 45, free: 0},
                       {account: 310000000215, amount: 400, free: 0}]});
        expect(user.swift).toEqual({account: 410000000215, amount: 5000, free: 0});
    })
    test("will check function 'assignautotransfer' when params string: result OK", () => {
        const user = new User();
        user.assignautotransfer({ autotransferprofit: "true", autotransferbonus: "false", versionuser: "2022-07-09 14:02:21"})
        expect(user.autotransferprofit).toBe(true);
        expect(user.autotransferbonus).toBe(false);
        expect(user.versionuser).toEqual("2022-07-09 14:02:21");
    })
    test("will check function 'assignautotransfer' when params string: result OK", () => {
        const user = new User();
        user.assignautotransfer({ autotransferprofit: "false", autotransferbonus: "true", versionuser: "2022-07-09 14:02:21"})
        expect(user.autotransferprofit).toBe(false);
        expect(user.autotransferbonus).toBe(true);
        expect(user.versionuser).toEqual("2022-07-09 14:02:21");
    })
    test("will check function 'assignautotransfer' when params boolean: result OK", () => {
        const user = new User();
        user.assignautotransfer({ autotransferprofit: true, autotransferbonus: false, versionuser: "2022-07-09 14:02:21"})
        expect(user.autotransferprofit).toBe(true);
        expect(user.autotransferbonus).toBe(false);
        expect(user.versionuser).toEqual("2022-07-09 14:02:21");
    })
    test("will check function 'assignautotransfer' when params number: result OK", () => {
        const user = new User();
        user.assignautotransfer({ autotransferprofit: 1, autotransferbonus: 1, versionuser: "2022-07-09 14:02:21"})
        expect(user.autotransferprofit).toBe(true);
        expect(user.autotransferbonus).toBe(true);
        expect(user.versionuser).toEqual("2022-07-09 14:02:21");
    })
    test("will check function 'assignautotransfer' when params number: result OK", () => {
        const user = new User();
        user.assignautotransfer({ autotransferprofit: 0, autotransferbonus: 0, versionuser: "2022-07-09 14:02:21"})
        expect(user.autotransferprofit).toBe(false);
        expect(user.autotransferbonus).toBe(false);
        expect(user.versionuser).toEqual("2022-07-09 14:02:21");
    })
    test("will check function 'allamount' is Swift: result 15445.11", () => {
        const user = new User();
        user.assignaccount({ swift: {account: 410000000215, amount: 5000, free: 0},
            accounts: [{account: 110000000215, amount: 10000, free: 0},
                       {account: 210000000215, amount: 45, free: 0},
                       {account: 310000000215, amount: 400.11, free: 0}]});
        expect(user.allamount()).toEqual("15445.11");
    })
    test("will check function 'allamount' not Swift: result 10445.00", () => {
        const user = new User();
        user.assignaccount({
            accounts: [{account: 110000000215, amount: 10000, free: 0},
                       {account: 210000000215, amount: 45, free: 0},
                       {account: 310000000215, amount: 400, free: 0}]});
        expect(user.allamount()).toEqual("10445.00");
    })
    test("will check function 'allamount' not Swift: result 1445.21", () => {
        const user = new User();
        user.assignaccount({
            accounts: [{account: 110000000215, amount: 1000, free: 0},
                       {account: 210000000215, amount: 45.21, free: 0},
                       {account: 310000000215, amount: 400, free: 0}]});
        expect(user.allamount()).toEqual("1445.21");
    })
    test("will check function 'allamount' not account: result 0.00", () => {
        const user = new User();
        expect(user.allamount()).toEqual("0.00");
    })
})