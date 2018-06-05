export const EVENTS = 'EVENTS'
export const USER = 'USER'

export default {
  [USER](state, {user}) {
    state.user = user
  },
  [EVENTS](state, {events}) {
    state.events = events
  },
}
