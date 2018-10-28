<template>
  <div v-if="!!event">
    <page-header class="justify-between">
      <h1>
        <router-link :to="{name: 'eventsListing'}">Events</router-link>
        <span class="breadcrumb"><font-awesome-icon icon="chevron-right"/></span>
        <router-link :to="{name: 'eventDetails', params:{id: ref.id}}">{{ ref.name }}</router-link>
        <span class="breadcrumb"><font-awesome-icon icon="chevron-right"/></span>
        Configuration
      </h1>
    </page-header>
    <page-content>
      <form @submit.once.prevent="updateEvent()" class="center">
        <div class="flex flex-column flex-grow">
          <label for="event-name">Name</label>
          <input id="event-name" placeholder="Event name" type="text" autofocus="autofocus"
                 v-model.lazy.trim="event.name"/>
        </div>
        <div class="flex flex-column flex-grow top-1">
          <label for="event-date">Date</label>
          <input id="event-date" placeholder="Event Date" type="date"
                 v-model.lazy.trim="event.date"/>
        </div>
        <div class="controls">
          <button type="submit" :disabled="invalid" class="btn">Save</button>
          <button class="btn btn-danger" @click.prevent="cancel()">Cancel</button>
        </div>
      </form>
    </page-content>
  </div>
</template>

<script>
  import store from 'store'

  export default {
    name: 'EventConfiguration',
    data: () => ({
      event: null,
      ref: null,
      invalid: true,
      err: null,
    }),
    beforeRouteEnter(to, from, next) {
      store.dispatch('getEvent', to.params.id)
        .then(event => next(vm => vm.setEvent(event)))
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
        this.event = {...event}
        this.ref = {...event}
      },
      updateEvent: function () {
        this.$store.dispatch('updateEvent', this.event)
          .then(event => this.$router.push({name: 'eventDetails', params:{id: event.id}}))
          .catch(err => this.err = err)
      },
      cancel: function () {
        this.$router.go(-1)
      }
    },
    watch: {
      event: {
        handler: function (newEvent) {
          this.invalid = newEvent.name === '' || !newEvent.date || newEvent.date === ''
        },
        deep: true,
      },
    },
  }
</script>
