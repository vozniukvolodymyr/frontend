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
  USER_AUTOTRANSFER} from '../actions/user';
import UserService from '../../_services/user.service';
import { LANG_REQUEST } from '../actions/lang';
import { authenticate, get, update, getblob } from '../../_services/rest.data';
import User from '@/_models/user';
import store from '..';
import router from '@/router';

function events(): [] {
  const token = sessionStorage.getItem('token') || ''
  if (token !== ''){
    const ev = sessionStorage.getItem('events');
    if ( ev === null){
      return []
    }else{
      return JSON.parse(ev)
    }
  }else{
    return [];
  }
}

function enters(): [] {
  const token = sessionStorage.getItem('token') || ''
  if (token !== ''){
    const ev = sessionStorage.getItem('enters');
    if ( ev === null){
      return []
    }else{
      return JSON.parse(ev)
    }
  }else{
    return [];
  }
}

function profits(): [] {
  const token = sessionStorage.getItem('token') || ''
  if (token !== ''){
    const ev = sessionStorage.getItem('profits');
    if ( ev === null){
      return []
    }else{
      return JSON.parse(ev)
    }
  }else{
    return [];
  }
}

const state = {
  token: sessionStorage.getItem('token') || '',
  status: '',
  ikey: new Date().getTime().toString(),
  userservice: new UserService,
  timertoken: 0,
  avatar: '',
  events: events(),
  enters: enters(),
  profits: profits()
};

const getters = {
  authenticated: (state: any): any => {
    return state.token !== '';
  },
  token: (state: any): any => {
    return state.token;
  },
  authStatus:  (state: any): any => {
    return state.status
  },
  user: (state: any): User => state.userservice.user,
  avatar: (state: any) => state.userservice.user.avatar,
  messageunread: (state: any): number => state.userservice.user.messageunread,
  events: (state: any) => state.events,
  enters: (state: any) => state.enters,
  profits: (state: any) => state.profits
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }: { commit: any, dispatch: any }, user: any) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      authenticate( user.email, user.password, state.ikey)
        .then((res: any) => {
          commit(AUTH_SUCCESS, res.data);
          clearInterval(state.timertoken);
          if (state.token !== ''){
            commit(AUTH_TIMERRESTART);
          }
          dispatch(LANG_REQUEST);
          resolve(res);
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          reject(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({commit}: {commit: any}) => {
    return new Promise((resolve: any) => {
      commit(AUTH_LOGOUT);
      resolve();
    });
  },
  getpay: ({ commit }: { commit: any }): any => {
    commit(AUTH_TIMERRESTART);
    return get('/api/pay', {}, state.token);
  },
  getmessages: ({ commit }: { commit: any }, model: any): any => {
    commit(AUTH_TIMERRESTART);
    return get('/api/messages', model, state.token);
  },
  getmessage({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return get('/api/message', model, state.token);
  },
  getstructure({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return get('/api/structure', {id: model}, state.token);
  },
  getpartner({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return get('/api/partner', {account: model.receiver}, state.token);
  },
  gethelp({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return get('/api/help', model, state.token);
  },
  getpromotion({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return get('/api/promotion', model, state.token);
  },
  gettransaction({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return update('/api/transaction', model, '', state.token);
  },
  gettransactionfile({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return getblob('/api/transaction', model, state.token);
  },
  getcompanyprofit({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return get('/api/profit', model, state.token);
  },
  changeavatar({ commit }: { commit: any }, model: any): any {
    return new Promise((resolve, reject) => {
      commit(AUTH_TIMERRESTART);
      update('/api/avatar', {avatar: model.file}, model.idempotencykey, state.token)
        .then((res: any) => {
          commit(USER_AVATAR, res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  changeautotransfer({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return update('/api/changeautotransfer', model.data, model.idempotencykey, state.token);
  },
  changepass({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return update('/api/changepass', model.data, model.idempotencykey, state.token);
  },
  changeboss({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return update('/api/changeboss', model.data, model.idempotencykey, state.token);
  },
  partnerbecome({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return update('/api/partnerbecome', model.data, model.idempotencykey, state.token);
  },
  payio({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return update('/api/payio', model.data, model.idempotencykey, state.token);
  },
  payoi({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return update('/api/payoi', model.data, model.idempotencykey, state.token);
  },
  payoo({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return update('/api/payoo', model.data, model.idempotencykey, state.token);
  },
  paybo({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return update('/api/paybo', model.data, model.idempotencykey, state.token);
  },
  payop({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return update('/api/payop', model.data, model.idempotencykey, state.token);
  },
  paysi({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return update('/api/paysi', model.data, model.idempotencykey, state.token);
  },
  payso({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return update('/api/payso', model.data, model.idempotencykey, state.token);
  },
  paysp({ commit }: { commit: any }, model: any): any {
    commit(AUTH_TIMERRESTART);
    return update('/api/paysp', model.data, model.idempotencykey, state.token);
  }
};

const mutations = {
  [AUTH_REQUEST]: (state: any) => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state: any, body: any) => {
    state.status = "success";
    state.token = body.token;
    sessionStorage.setItem('token', body.token);
    delete body.token;
    state.events = body.events.slice();
    sessionStorage.setItem('events', JSON.stringify(body.events));
    delete body.events;
    state.enters = body.enters.slice();
    sessionStorage.setItem('enters', JSON.stringify(body.enters));
    delete body.enters;
    if (body.profits){
      state.profits = body.profits.slice();
      sessionStorage.setItem('profits', JSON.stringify(body.profits));
      delete body.profits;
    }
    if (body.refer){
      body.refer = window.location.origin + '/register?ref=' + body.refer;
    }
    state.userservice.assign(body);
    state.avatar=state.userservice.user.avatar;
  },
  [AUTH_TIMERRESTART]: (state: any) => {
      clearTimeout(state.timertoken);
      state.timertoken = setTimeout(() => {
        store.dispatch(AUTH_LOGOUT)
        .then(() => {
          router.push("/login");
        })
      }, 15 * 60000);
  },
  [AUTH_ERROR]: (state: any) => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: (state: any) => {
    state.token = '';
    sessionStorage.removeItem('token');
    state.userservice.user.clear();
    sessionStorage.removeItem('user');
    clearTimeout(state.timertoken);
  },
  [USER_REQUEST]: (state: any) => {
    state.status = "loading";
  },
  [USER_AVATAR]: (state: any, data: any) => {
    state.status = "success";
    state.userservice.assignavatar(data);
  },
  [USER_ACCOUNT]: (state: any, data: any) => {
    state.status = "success";
    state.userservice.assignaccount(data);
  },
  [USER_MESSAGE]: (state: any, data: any) => {
    state.userservice.messagereaded(data);
  },
  [USER_ERROR]: (state: any) => {
    state.status = "error";
  },
  [USER_AUTOTRANSFER]: (state: any, data: any) => {
    state.status = "success";
    state.userservice.assignautotransfer(data);
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
