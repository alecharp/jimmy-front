<!--
  - Copyright 2018 Jimmy, Adrien Lecharpentier and others
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->

<template>
  <form @submit.prevent="updateEvent()" class="center" v-if="!!event">
    <div class="flex flex-column flex-grow-1">
      <label for="event-name">Name</label>
      <input id="event-name" placeholder="Event name" type="text" autofocus="autofocus" required="required"
             v-model.lazy.trim="event.name"/>
    </div>
    <div class="flex flex-column flex-grow-1 top-1">
      <label for="event-date">Date</label>
      <input id="event-date" placeholder="Event Date" type="date" required="required"
             v-model.lazy.trim="event.date"/>
    </div>
    <div class="controls">
      <button type="submit" :disabled="invalid" class="btn">Save</button>
      <button class="btn btn-danger" @click.prevent="cancel()">Cancel</button>
    </div>
    <div v-if="updateErr" class="flex danger flex-row flex-grow-1 top-1">
      {{ updateErr }}
    </div>
  </form>
</template>

<script>
  import store from 'store'

  export default {
    name: 'EventConfigurationDetails',
    data: () => ({
      event: null,
      updateErr: null,
      invalid: true,
    }),
    beforeRouteEnter: async (to, from, next) => {
      try {
        const event = await store.dispatch('getEvent', to.params.id)
        event.owners.includes(store.state.profile.id) ?
          next(vm => vm.setEvent(event)) : next(false)
      } catch (e) {
        next(e)
      }
    },
    methods: {
      setEvent: function (event) {
        this.event = {...event}
      },
      updateEvent: function () {
        const {id, name, date} = this.event
        const event = {id, name, date}
        this.$store.dispatch('updateEvent', event)
          .then(event => this.$router.push({name: 'eventDetails', params: {id: event.id}}))
          .catch(err => this.updateErr = err)
      },
      cancel: function () {
        this.$router.go(-1)
      },
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
