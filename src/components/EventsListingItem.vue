<template>
  <div>{{ event.name }}</div>
</template>

<script>
  export default {
    name: "EventsListingItem",
    props: {
      event: {type: Object, required: true},
    },
  }
</script>
