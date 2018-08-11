<template>
  <div>
    <div class="cell link" @click.capture="loadEvent(event.id)">{{ event.name }}</div>
    <div class="cell">{{ event.date }}</div>
    <div class="cell">
      <button @click.once="deleteEvent(event.id)">x</button>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "EventsListingItem",
    props: {
      event: {type: Object, required: true},
    },
    methods: {
      ...mapActions(['deleteEvent']),
      loadEvent: function(id) {
        this.$router.push({path: `/event/${id}`})
      }
    },
  }
</script>
