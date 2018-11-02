<template>
  <div v-if="!!event">
    <page-header class="justify-between">
      <h1>
        <router-link :to="{name: 'eventsListing'}">Events</router-link>
        <span class="breadcrumb"><font-awesome-icon icon="chevron-right"/></span>
        {{ event.name }}
      </h1>
      <router-link v-if="canEdit" class="btn" :to="{name: 'eventConfig', params: {id: event.id}}">
        <font-awesome-icon icon="cog"/>
      </router-link>
    </page-header>
    <page-content>
      <div class="actions flex flex-row justify-between">
        <div class="flex flex-row flex-grow-1 justify-between">
        </div>
        <div class="flex flex-row justify-between">
          <h4 v-if="event.date">
            <font-awesome-icon icon="calendar-alt"/>
            {{ event.date }}
          </h4>
        </div>
      </div>
    </page-content>
  </div>
</template>

<script>
  import Vue from 'vue'
  import store from 'store'

  export default {
    name: 'EventDetails',
    data: () => ({event: null, canEdit: false}),
    beforeRouteEnter(to, from, next) {
      store.dispatch('getEvent', to.params.id)
        .then(event => {
          next(async vm => {
            vm.setEvent(event)
            vm.setCanEdit(event.owners.includes((await Vue.prototype.$keycloak.loadUserProfile()).email))
          })
        })
        .catch(next)
    },
    beforeRouteUpdate(to, from, next) {
      this.event = null
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
      setCanEdit: function(canEdit) {
        this.canEdit = canEdit
      },
    },
  }
</script>
