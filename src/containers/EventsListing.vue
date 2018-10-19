<template>
  <div>
    <page-header class="justify-between" title="Events">
      <router-link class="btn" :to="{name: 'eventCreation'}">Create</router-link>
    </page-header>
    <page-content>
      <div v-if="!!events && events.length !== 0">
        <div>
          <input type="search" v-model.trim="filter" placeholder="Filter events by name"/>
        </div>
        <content-table class="top-2"
                       :items="filteredEvents(this.filter)"
                       :headers="['name', 'date']"
                       :action="goto">
        </content-table>
      </div>
      <p v-else>You will see the list of events you are registered to here.</p>
    </page-content>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'EventsListing',
    data: () => ({filter: null}),
    computed: {
      ...mapState(['events']),
    },
    methods: {
      filteredEvents: function (filter) {
        return !!filter && filter !== '' ?
          this.events.filter(e => e.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) : this.events
      },
      goto: function (event) {
        this.$router.push({name: 'eventDetails', params: {id: event.id}})
      },
    },
  }
</script>
