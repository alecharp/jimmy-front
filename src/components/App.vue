<template>
  <div>
    <h1>Hello {{ displayName }}!!</h1>
    <EventsListing />
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'App',
    components: {
      EventsListing: () => import(/* webpackChunkName: 'Events' */ 'containers/EventsListing'),
    },
    computed: {
      ...mapGetters({
        displayName: 'getDisplayName',
      })
    }
  }
</script>
