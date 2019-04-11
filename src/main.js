import Vue from 'vue';
import './plugins/vuetify';

import {
  auth,
} from './firebase';

import App from './App';
import router from './router';
import store, {
  USER_MUTATION,
} from './store';

auth.onAuthStateChanged(
  (user) => {
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');

    if (user !== null) {
      const {
        displayName, email, photoURL: picture, isAnonymous, uid,
      } = user;
      store.commit(USER_MUTATION, {
        displayName, email, picture, isAnonymous, uid,
      });
      if (router.currentRoute.name === 'login') {
        router.push({ path: '/' });
      }
    }
  },
);
