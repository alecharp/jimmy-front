export const EVENTS = 'EVENTS'
export const USER = 'USER'

export default {
  [USER](state, {user}) {
    const {username, firstName, lastName, email} = user
    state.user = {username, firstName, lastName, email}
  },
  [EVENTS](state, {events}) {
    state.events = events
  },
}
