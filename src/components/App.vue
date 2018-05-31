<template>
  <div>
    <h1>Hello World!!</h1>
    <EventsListing/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
      EventsListing: () => import(/* webpackChunkName: 'Events' */ 'containers/EventsListing'),
    },
  }
</script>
