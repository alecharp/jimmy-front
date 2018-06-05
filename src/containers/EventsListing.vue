<template>
  <div>
    <button @click="refresh">Refresh</button>
    <EventsListingItem v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'EventsListing',
    components: {
      EventsListingItem: () => import(/* webpackChunkName: 'Events' */ 'components/EventsListingItem'),
    },
    computed: {
      ...mapState(['events']),
    },
    methods: {
      ...mapActions({refresh: 'getEvents'}),
    },
    beforeCreate: function () {
      this.$store.dispatch('getEvents')
    }
  }
</script>
