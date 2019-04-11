import Vue from 'vue';
import Vuex from 'vuex';

import {
  auth,
} from './firebase';

Vue.use(Vuex);

const { version: appVersion } = require('../package.json');

export const USER_MUTATION = 'USER_MUTATION';

export default new Vuex.Store({
  state: {
    user: { isAnonymous: true },
    appVersion,
  },
  mutations: {
    [USER_MUTATION](state, user) {
      Object.assign(state, { ...state, user });
    },
  },
  actions: {
    logout: context => auth.signOut()
      .then(() => {
        context.commit(USER_MUTATION, { isAnonymous: true });
      })
    ,
  },
  getters: {
    isAuthenticated: state => () => state.user && !state.user.isAnonymous,
  },
});
