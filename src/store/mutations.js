export const EVENTS = 'EVENTS'

export default {
  [EVENTS](state, events) {
    state.events = events
  },
}
