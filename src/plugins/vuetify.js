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
  VDivider,
  VFlex,
  VFooter,
  VIcon,
  VImg,
  VLayout,
  VList,
  VListTile,
  VListTileContent,
  VListTileAction,
  VListTileAvatar,
  VNavigationDrawer,
  VSpacer,
  VToolbar,
  VToolbarSideIcon,
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
    VDivider,
    VFlex,
    VFooter,
    VIcon,
    VImg,
    VLayout,
    VList,
    VListTile,
    VListTileContent,
    VListTileAction,
    VListTileAvatar,
    VNavigationDrawer,
    VSpacer,
    VToolbar,
    VToolbarSideIcon,
    VToolbarTitle,
  },
  lang: {
    locales: { en, es, fr },
    current: window.navigator.userLanguage || window.navigator.language,
  },
  iconfont: 'fa',
});
