import Language from '@/_models/language';
import { LANG_REQUEST, LANG_SETUP, LANG_ERROR, LANG_SUCCESS } from '../actions/lang';
import { get } from '../../_services/rest.data';
import store from '../index';

const state = {
  lang: new Language
};

const getters = {
  languages: () => [
    { name: 'EN', value: 'EN' },
    { name: 'RU', value: 'RU' }
  ],
  locale: (state: any) => state.lang.lang,
  glname: (state: any) => state.lang.name,
  companyname: () =>'companyname',
  companysemail: () =>'support@companyname.com',
  companypemail: () =>'privacy@companyname.com',
  companysite: () =>'companyname.com',
};

const actions = {
  [LANG_REQUEST]: ({ commit, dispatch }: { commit: any, dispatch: any }) => {
    if (!store.getters.authenticated){ return; }
    if ((!state.lang.loaded.langen && state.lang.name === 'EN') || (!state.lang.loaded.langru && state.lang.name === 'RU')){
        commit(LANG_REQUEST);
        get('/assets/lang/'.concat(state.lang.name.toLowerCase(), '.json'), {}, store.getters.token)
        .then(res => {
            commit(LANG_SUCCESS, res.data);
        })
        .catch(() => {
            commit(LANG_ERROR);
        });
    }
  },
  [LANG_SETUP]: ({ commit, dispatch }: { commit: any, dispatch: any }, value: string) => {
    if (state.lang.name !== value) {
        commit(LANG_SETUP, value);
        if (store.getters.authenticated &&
            ((! state.lang.loaded.langen &&  state.lang.name === 'EN') || (! state.lang.loaded.langru &&  value === 'RU'))){
            dispatch(LANG_REQUEST);
        }
        localStorage.setItem('language', value);
    }
  }
};

const mutations = {
  [LANG_REQUEST]: (state: any) => {
    state.status = "loading";
  },
  [LANG_SUCCESS]: (state: any, data: any) => {
    state.status = "success";
    if (state.lang.name === 'EN'){
        state.lang.loaded.langen = true;
        Object.assign(state.lang.langen, data);
        state.lang.lang = state.lang.langen;
    }else{
        state.lang.loaded.langru = true;
        Object.assign(state.lang.langru, data);
        state.lang.lang = state.lang.langru;
    }
  },
  [LANG_SETUP]: (state: any, value: string) => {
    state.lang.name = value;
    if (value === 'RU'){
      state.lang.lang =  state.lang.langru;
    }else{
      state.lang.lang =  state.lang.langen;
    }
  },
  [LANG_ERROR]: (state: any) => {
    state.status = "error";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
