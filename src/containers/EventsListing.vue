<template>
  <div>
    <EventsListingItem v-for="event in events" :event="event"></EventsListingItem>
  </div>
</template>

<script>
  export default {
    name: 'EventsListing',
    components: {
      EventsListingItem: () => import(/* webpackChunkName: 'Events' */ 'components/EventsListingItem'),
    },
    data: () => ({events: []}),
    beforeCreate: function () {
      const token = window.localStorage.getItem('keycloak-token')
      const headers = new Headers()
      headers.append('Accept', 'application/json')
      headers.append('Authorization', `Bearer ${token}`)
      fetch('/api/events', {headers})
          .then(resp => {
            if (resp.ok) return resp.json();
            const {status, statusText} = resp;
            return Promise.reject({status, statusText})
          })
          .then(events => this.events = events)
          .catch(console.error)
    }
  }
</script>
