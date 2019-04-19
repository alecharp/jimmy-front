import Vue from 'vue';
import moment from 'moment';

import './plugins/vuetify';
import {
  auth,
} from './firebase';

import App from './App';
import router from './router';
import store, {
  USER_MUTATION,
} from './store';

moment.locale(window.navigator.userLanguage || window.navigator.language);

Vue.filter('asDate', date => moment(date).format('LL'));

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
