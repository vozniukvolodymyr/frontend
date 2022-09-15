import { createStore } from 'vuex'

import userstore from './modules/user.store';
import langstore from './modules/lang.store';
import alertstore from './modules/alert.store';

export default createStore({
  state: {    
  },
  mutations: {
  },
  actions: {
  },
  modules: {   
    userstore,    
    langstore ,
    alertstore
  }
})
