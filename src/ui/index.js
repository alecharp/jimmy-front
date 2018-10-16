import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHome,
  faCalendarAlt,
  faUserCircle,
  faMinus,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

library.add(
  faHome,
  faCalendarAlt,
  faUserCircle,
  faMinus,
  faChevronRight,
)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

import './index.scss'
