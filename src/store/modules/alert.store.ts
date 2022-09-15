import { ALERT_CLOSE, ALERT_CONFIRM, ALERT_ERROR, ALERT_SUCCESS } from '../actions/alert';

const state = { 
    alerttext: '', 
    alerttype: '',
    alerttitle: '' 
};

const getters = {
  alertText: (state: any) => {     
    return state.alerttext;
  },
  alertType: (state: any) => {     
    return state.alerttype;
  },
  alertTitle: (state: any) => {     
    return state.alerttitle;
  },
};

const actions = {        
};

const mutations = {
  [ALERT_CLOSE]: (state: any) => {
    state.alerttext = '', 
    state.alerttype = '';
    state.alerttitle = '';
  },
  [ALERT_CONFIRM]: (state: any, value: any) => {
    state.alerttext = value.mess, 
    state.alerttype = 'confirm'    
    state.alerttitle = value.title;
  },
  [ALERT_ERROR]: (state: any, value: any) => {
    state.alerttext = value.mess, 
    state.alerttype = 'error'
    state.alerttitle = value.title;    
  },
  [ALERT_SUCCESS]: (state: any, value: any) => {
    state.alerttext = value.mess, 
    state.alerttype = 'success'
    state.alerttitle = value.title;
  }      
};

export default {
  state,
  getters,
  actions,
  mutations
};
