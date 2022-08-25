import store from '../src/store/index';

import {
    LANG_REQUEST,
    LANG_SUCCESS,
    LANG_ERROR,
    LANG_SETUP
} from '../src/store/actions/lang';

describe("LANG_ERROR", () => {
    test("will be state status: error", () => {
        store.commit(LANG_ERROR);
        expect(store.state.langstore.status).toEqual("error");
    }),
    test("will be lang: RU", () => {
        store.commit(LANG_SETUP, "RU");
        expect(store.state.langstore.lang.name).toEqual("RU");
    }),
    test("will be lang: EN", () => {
        store.commit(LANG_SETUP, "EN");
        expect(store.state.langstore.lang.name).toEqual("EN");
    }),
    test("will be lang.log_log: Вход", () => {
        store.commit(LANG_SETUP, "RU");
        expect(store.state.langstore.lang.lang.log_log).toEqual("Вход");
    })
})