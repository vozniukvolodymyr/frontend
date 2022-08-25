import store from '../src/store/index';
import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT,
    AUTH_TIMERRESTART,
    USER_REQUEST,
    USER_ERROR,
    USER_AVATAR,
    USER_ACCOUNT,
    USER_MESSAGE,
    USER_AUTOTRANSFER
} from '../src/store/actions/user';
import axios from 'axios';

describe("AUTH_ERROR", () => {
    test("will be state status: error", () => {
        store.commit(AUTH_ERROR);
        expect(store.state.userstore.status).toEqual("error");
    })
}),
    describe("AUTH_REQUEST", () => {
        test("will be state status: loading", () => {
            store.commit(AUTH_REQUEST);
            expect(store.state.userstore.status).toEqual("loading");
        })
    }),
    describe("AUTH_SUCCESS", () => {
        beforeEach(() => {
            store.commit(AUTH_SUCCESS, { token: "QRghjygfktr", events: [], enters: [], profits: [] });
        });
        test("will be state user refer: undefined", () => {
            expect(store.state.userstore.userservice.user.refer).toEqual(undefined)
        }),
            test("will be state avatar: undefined", () => {
                expect(store.state.userstore.avatar).toEqual(undefined)
            }),
            test("will be state user avatar: undefined", () => {
                expect(store.state.userstore.userservice.user.avatar).toEqual(undefined)
            })
    }),
    describe("AUTH_SUCCESS fill param", () => {
        beforeEach(() => {
            store.commit(AUTH_SUCCESS, { token: "QRghjygfktr", events: [], enters: [], profits: [], refer: "ujksrTe1", avatar: "//access/picture.jpeg" });
        });
        test("will be state status: success", () => {
            expect(store.state.userstore.status).toEqual("success");
        })
        test("will be state token: QRghjygfktr", () => {
            expect(store.state.userstore.token).toEqual("QRghjygfktr");
        })
        test("will be state user refer: ujksrTe1", () => {
            expect(store.state.userstore.userservice.user.refer).toEqual(window.location.origin + '/register?ref=ujksrTe1')
        }),
        test("will be state avatar: //access/picture.jpeg", () => {
            expect(store.state.userstore.avatar).toEqual("//access/picture.jpeg")
        }),
        test("will be state user avatar: //access/picture.jpeg", () => {
            expect(store.state.userstore.userservice.user.avatar).toEqual("//access/picture.jpeg")
        })
    }),
    describe("AUTH_TIMERRESTART", () => {
        test("will be state timertoken: 0", () => {
            expect(store.state.userstore.timertoken).toEqual(0);
        })
        test("will be state timertoken: > 0", () => {
            store.commit(AUTH_TIMERRESTART);
            expect(store.state.userstore.timertoken).toBeGreaterThan(0);
        })
    }),
    describe("AUTH_LOGOUT", () => {
        beforeEach(() => {
            store.commit(AUTH_LOGOUT);
        });
        test("will be state : empty", () => {
            expect(store.state.userstore.token).toEqual('');
        })
    }),
    describe("USER_ERROR", () => {
        test("will be state status: error", () => {
            store.commit(USER_ERROR);
            expect(store.state.userstore.status).toEqual("error");
        })
    }),
    describe("USER_REQUEST", () => {
        test("will be state status: loading", () => {
            store.commit(USER_REQUEST);
            expect(store.state.userstore.status).toEqual("loading");
        })
    }),
    describe("USER_AVATAR", () => {
        beforeEach(() => {
            store.commit(USER_AVATAR, "//access/picture.jpeg");
        });
        test("will be state status: success", () => {
            expect(store.state.userstore.status).toEqual("success");
        })
        test("will be state avatar: //access/picture.jpeg", () => {
            expect(store.state.userstore.avatar).toEqual("//access/picture.jpeg")
        }),
        test("will be state user avatar: //access/picture.jpeg", () => {
            expect(store.state.userstore.userservice.user.avatar).toEqual("//access/picture.jpeg")
        })
    }),
    describe("USER_ACCOUNT", () => {
        beforeEach(() => {
            store.commit(USER_ACCOUNT, { swift: {account: 410000000215, amount: 5000, free: 0},
                accounts: [{account: 110000000215, amount: 11678, free: 0}, 
                           {account: 210000000215, amount: 45, free: 0},
                           {account: 310000000215, amount: 400, free: 0}],
                versionaccount: "2022-07-09 14:02:21"}) 
        });
        test("will be state status: success", () => {
            expect(store.state.userstore.status).toEqual("success");
        }),
        test("will be account swift:", () => {
            expect(store.state.userstore.userservice.user.swift).toEqual({account: 410000000215, amount: 5000, free: 0});
        }),
        test("will be account investion:", () => {
            expect(store.state.userstore.userservice.user.accounts[0]).toEqual({account: 110000000215, amount: 11678, free: 0});
        }),
        test("will be account operation:", () => {
            expect(store.state.userstore.userservice.user.accounts[1]).toEqual({account: 210000000215, amount: 45, free: 0});
        }),
        test("will be account bonus:", () => {
            expect(store.state.userstore.userservice.user.accounts[2]).toEqual({account: 310000000215, amount: 400, free: 0});
        }),
        test("will be account version: 2022-07-09 14:02:21", () => {
            expect(store.state.userstore.userservice.user.versionaccount).toEqual("2022-07-09 14:02:21");
        })
    }),
    describe("USER_MESSAGE", () => {
        test("will be state user messagereaded: 5", () => {
            store.commit(USER_MESSAGE, 5);
            expect(store.state.userstore.userservice.user.messageunread).toEqual(5);
        })
    }),
    describe("USER_AUTOTRANSFER", () => {
        beforeEach(() => {
            store.commit(USER_AUTOTRANSFER, {autotransferprofit: true, autotransferbonus: true, versionuser: "2022-07-09 14:02:21"});
        });
        test("will be state user autotransferprofit: true", () => {
            expect(store.state.userstore.userservice.user.autotransferprofit).toBeTruthy();
        }),
        test("will be state user autotransferbonus: true", () => {
            expect(store.state.userstore.userservice.user.autotransferprofit).toBeTruthy();
        }),
        test("will be state user version: 2022-07-09 14:02:21", () => {
            expect(store.state.userstore.userservice.user.versionuser).toEqual("2022-07-09 14:02:21");
        })
    }),
    describe("AUTH_REQUEST", () => {
        beforeEach(() => {
        });
        test("will be status: success", async () => {
            jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve(
                { data: {token: "fdgdfgdfYggU12", events: [], enters: [], refer: "ewtfg7Utji"} } ));
            await store.dispatch(AUTH_REQUEST, {email: "address@gmail.com", password: '123456789'});
            expect(store.state.userstore.status).toEqual("success");
            expect(store.state.userstore.token).toEqual("fdgdfgdfYggU12");
            expect(store.state.userstore.userservice.user.refer).toEqual(window.location.origin + '/register?ref=ewtfg7Utji');
        })
    })
