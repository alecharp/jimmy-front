<template>
  <div>
    <page-header title="Create new event"/>
    <page-content>
      <form @submit.prevent="createEvent()" class="center">
        <div class="flex flex-column flex-grow">
          <label for="event-name">Name</label>
          <input id="event-name" placeholder="Event name" type="text" @change="updateName"/>
        </div>
        <div class="controls">
          <button type="submit" :disabled="invalid" class="btn">Create new event</button>
          <button class="btn btn-danger" @click.prevent="cancel()">Cancel</button>
        </div>
      </form>
    </page-content>
  </div>
</template>

<script>

  export default {
    name: 'EventCreation',
    data: () => ({invalid: true, name: null}),
    methods: {
      updateName: function ({target}) {
        this.name = target.value.trim()
        this.invalid = this.name === null || this.name === ''
      },
      createEvent: function () {
        const {name} = this,
          event = {name}
        this.$store.dispatch('addEvent', event)
          .then(event => this.$router.push({name: 'eventsListing'}))
      },
      cancel: function () {
        this.$router.go(-1)
      },
    },
  }
</script>
