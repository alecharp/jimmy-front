<template>
  <div>
    <button @click="refresh">Refresh</button>
    <div class="table" v-if="events && events.length !== 0">
      <div class="row header">
        <div class="cell">Name</div>
        <div class="cell">Date</div>
      </div>
      <EventsListingItem v-for="event in events" :key="event.id" :event="event" class="row"/>
    </div>
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
