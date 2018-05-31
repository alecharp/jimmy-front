import {
  TOKEN,
  EVENTS,
  USER,
} from './mutation-types'

export default {
  [TOKEN](state, {token}) {
    state.token = token
  },
  [USER](state, {user}) {
    state.user = user
  },
  [EVENTS](state, {events}) {
    state.events = events
  },
}
