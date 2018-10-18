<template>
  <div>
    <page-header class="justify-between" title="Events">
      <router-link class="btn" :to="{name: 'eventCreation'}">Create</router-link>
    </page-header>
    <page-content>
      This is the list of events you have access to.
    </page-content>
  </div>
</template>

<script>
  export default {
    name: 'EventsListing',
  }
</script>
