import Vue from 'vue';
import './plugins/vuetify';
import firebase from 'firebase/app';
import 'firebase/auth';

import App from './App';
import router from './router';
import store, {
  USER_MUTATION,
} from './store';

firebase.initializeApp();
firebase.auth().onAuthStateChanged(
  (user) => {
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');

    if (user !== null) {
      const {
        displayName, email, photoURL: picture, isAnonymous,
      } = user;
      store.commit(USER_MUTATION, {
        displayName, email, picture, isAnonymous,
      });
      if (router.currentRoute.name === 'login') {
        router.push({ path: '/' });
      }
    }
  },
);
