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

const parseEventsQuery = querySnapshot => querySnapshot.docs
  .map((doc) => {
    const data = doc.data();
    return { ...data, id: doc.id, date: data.date.toDate() };
  });

const fetchEventsAttending = userId => firestore.collection('events')
  .where('attendees', 'array-contains', userId)
  .get()
  .then(parseEventsQuery);

const fetchEventsOrganizing = userId => firestore.collection('events')
  .where('organizers', 'array-contains', userId)
  .get()
  .then(parseEventsQuery);

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
    logout: ({ commit }) => auth.signOut().then(() => {
      commit(USER_MUTATION, { isAnonymous: true });
    }),
    fetchEvents: async ({ commit, state }) => commit(
      EVENTS_LIST_MUTATION,
      [
        ...await fetchEventsOrganizing(state.user.uid),
        ...await fetchEventsAttending(state.user.uid),
      ],
    ),
  },
  getters: {
    isAuthenticated: state => () => state.user && !state.user.isAnonymous,
  },
});
