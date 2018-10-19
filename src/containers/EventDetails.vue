<template>
  <div v-if="!!event">
    <page-header class="justify-between">
      <h1>
        <router-link :to="{name: 'eventsListing'}">Events</router-link>
        <span class="breadcrumb"><font-awesome-icon icon="chevron-right"/></span>
        {{ event.name }}
      </h1>
    </page-header>
    <page-content>
    </page-content>
  </div>
</template>

<script>
  import store from 'store'

  export default {
    name: 'EventDetails',
    data: () => ({event: null}),
    beforeRouteEnter(to, from, next) {
      store.dispatch('getEvent', to.params.id)
        .then(event => next(vm => vm.setEvent(event)))
        .catch(next)
    },
    beforeRouteUpdate(to, from, next) {
      this.event = null
      console.log(arguments)
      this.$store.dispatch('getEvent', to.params.id)
        .then(event => {
          this.setEvent(event)
          next()
        })
        .catch(next)
    },
    methods: {
      setEvent: function (event) {
        this.event = event
      },
    },
  }
</script>
