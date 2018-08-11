<template>
  <div>
    <h1>{{ event.name }}</h1>
    <h2>{{ event.date }}</h2>
    <hr/>
    <h3>Administrators</h3>
    <p>{{ event.admins.join(', ') }}</p>
    <h3>Attendees</h3>
    <p>{{ event.attendees.join(', ') }}</p>
  </div>
</template>

<script>
  export default {
    name: 'EventDetails',
    computed: {
      event: function() {
        return this.$store.getters.getEvent(this.$route.params.id)
      }
    },
  }
</script>

