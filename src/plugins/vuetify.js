import Vue from 'vue';
import Vuetify, {
  VApp,
  VLayout,
  VFlex,
  VCard,
  VCardText,
  VImg,
  VCardActions,
  VBtn,
  VIcon,
  VSpacer,
  VSlideYTransition,
  VToolbarTitle,
  VContainer,
  VToolbarItems,
  VToolbar,
  VFooter,
  VContent,
  VDialog,
  VProgressLinear,
} from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import '@fortawesome/fontawesome-free/css/all.css';

import en from 'vuetify/es5/locale/en';
import es from 'vuetify/es5/locale/es';
import fr from 'vuetify/es5/locale/fr';

Vue.use(Vuetify, {
  components: {
    VApp,
    VLayout,
    VFlex,
    VCard,
    VCardText,
    VImg,
    VCardActions,
    VBtn,
    VIcon,
    VSpacer,
    VSlideYTransition,
    VToolbarTitle,
    VContainer,
    VToolbarItems,
    VToolbar,
    VFooter,
    VContent,
    VDialog,
    VProgressLinear,
  },
  lang: {
    locales: { en, es, fr },
    current: 'fr',
  },
  iconfont: 'fa',
});
