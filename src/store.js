import Vue from 'vue';
import Vuex from 'vuex';

import {
  auth,
  firestore,
} from './firebase';

Vue.use(Vuex);

const { version: appVersion } = require('../package.json');

export const USER_MUTATION = 'USER_MUTATION';
export const EVENTS_LIST_MUTATION = 'EVENTS_LIST_MUTATION';

export default new Vuex.Store({
  state: {
    user: { isAnonymous: true },
    events: [],
    appVersion,
  },
  mutations: {
    [USER_MUTATION](state, user) {
      Object.assign(state, { ...state, user });
    },
    [EVENTS_LIST_MUTATION](state, events) {
      Object.assign(state, { ...state, events });
    },
  },
  actions: {
    logout: context => auth.signOut().then(() => {
      context.commit(USER_MUTATION, { isAnonymous: true });
    }),
    fetchEventsList: context => firestore.collection('events').get()
      .then(querySnapshot => querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      .then(events => events.map(event => ({ ...event, date: event.date.toDate() })))
      .then((events) => {
        context.commit(EVENTS_LIST_MUTATION, events);
      })
    ,
  },
  getters: {
    isAuthenticated: state => () => state.user && !state.user.isAnonymous,
  },
});
