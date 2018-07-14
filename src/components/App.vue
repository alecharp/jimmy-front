<template>
  <div>
    <h1>Hello {{ displayName }}!!</h1>
    <button @click="logout">Logout</button>
    <hr/>
    <EventForm />
    <hr/>
    <EventsListing />
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions,
  } from 'vuex'
  export default {
    name: 'App',
    components: {
      EventsListing: () => import(/* webpackChunkName: 'Events' */ 'containers/EventsListing'),
      EventForm: () => import(/* webpackChunkName: 'Events' */ 'components/EventForm')
    },
    computed: {
      ...mapGetters({
        displayName: 'getDisplayName',
      })
    },
    methods: {
      ...mapActions({
        logout: 'security/logout',
      })
    },
    beforeCreate: function() {
      this.$store.dispatch('security/auth')
        .catch(() => {
          console.error("Cannot connect to authentication service.")
        })
        .then(() => this.$store.dispatch('getUser'))
    },
  }
</script>
