<template>
  <div>
    <div class="cell">{{ event.name }}</div>
    <div class="cell">{{ event.date }}</div>
    <div class="cell">
      <button @click.once.prevent="deleteEvent(event.id)">x</button>
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
      ...mapActions(['deleteEvent'])
    },
  }
</script>
