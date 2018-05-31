import {
  TOKEN,
  EVENTS,
} from './mutation-types'

export default {
  [TOKEN](state, {token}) {
    state.token = token
  },
  [EVENTS](state, {events}) {
    state.events = events
  },
}
