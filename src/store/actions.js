import {EVENTS} from './mutation-types'

export default {
  getEvents: ({state, commit}) => {
    if (state.token !== '') {
      const headers = new Headers()
      headers.append('Accept', 'application/json')
      headers.append('Authorization', `Bearer ${state.token}`)
      fetch('/api/events', {
        headers,
        mode: 'cors',
      })
          .then(resp => {
            if (resp.ok) return resp.json();
            const {status, statusText} = resp;
            return Promise.reject({status, statusText})
          })
          .then(events => commit(EVENTS, {events}))
          .catch(console.error)
    }
  },
}
