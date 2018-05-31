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
    beforeMount: function () {
      this.events = [{name: 'Foo'},{name: 'Bar'}];
    }
  }
</script>
