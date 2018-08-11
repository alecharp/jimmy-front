<template>
  <form @submit.prevent="onSubmit()">
    <div>
      <label for="name">Name</label>
      <input type="text" id="name" name="name" v-model.lazy="name"
             required/>
    </div>
    <div>
      <label for="date">Date</label>
      <input type="date" id="date" name="date" v-model.lazy="date"
             required min="2018-01-01" max="2020-01-019"/>
    </div>
    <div>
      <button type="submit">Create event</button>
    </div>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script>
  export default {
    name: 'EventForm',
    data: () => ({
      name: null,
      date: null,
      error: null,
    }),
    methods: {
      onSubmit: function() {
        const event = {name: this.name, date: this.date}
        this.$store.dispatch('createEvent', {event})
          .then(() => {
            this.$router.push('/')
          })
          .catch(err => {
            this.error = `Couldn't create the event. Got ${err} from the server.`
          })
      },
    }
  }
</script>
