import Vue from 'vue';
import Vuetify, {
  VAlert,
  VApp,
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VContainer,
  VContent,
  VDataTable,
  VDialog,
  VFlex,
  VFooter,
  VIcon,
  VImg,
  VLayout,
  VProgressLinear,
  VSlideYTransition,
  VSpacer,
  VToolbar,
  VToolbarItems,
  VToolbarTitle,
} from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import '@fortawesome/fontawesome-free/css/all.css';

import en from 'vuetify/es5/locale/en';
import es from 'vuetify/es5/locale/es';
import fr from 'vuetify/es5/locale/fr';

Vue.use(Vuetify, {
  components: {
    VAlert,
    VApp,
    VBtn,
    VCard,
    VCardActions,
    VCardText,
    VContainer,
    VContent,
    VDataTable,
    VDialog,
    VFlex,
    VFooter,
    VIcon,
    VImg,
    VLayout,
    VProgressLinear,
    VSlideYTransition,
    VSpacer,
    VToolbar,
    VToolbarItems,
    VToolbarTitle,
  },
  lang: {
    locales: { en, es, fr },
    current: 'fr',
  },
  iconfont: 'fa',
});
