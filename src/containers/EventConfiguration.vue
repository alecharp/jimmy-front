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
      <form @submit.prevent="updateEvent()" class="center">
        <div class="flex flex-column flex-grow-1">
          <label for="event-name">Name</label>
          <input id="event-name" placeholder="Event name" type="text" autofocus="autofocus"
                 v-model.lazy.trim="event.name"/>
        </div>
        <div class="flex flex-column flex-grow-1 top-1">
          <label for="event-date">Date</label>
          <input id="event-date" placeholder="Event Date" type="date"
                 v-model.lazy.trim="event.date"/>
        </div>
        <div class="controls">
          <button type="submit" :disabled="invalid" class="btn">Save</button>
          <button class="btn btn-danger" @click.prevent="cancel()">Cancel</button>
        </div>
        <div v-if="updateErr" class="flex danger flex-row flex-grow-1">
          {{ updateErr }}
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
      updateErr: null,
    }),
    beforeRouteEnter(to, from, next) {
      store.dispatch('getEvent', to.params.id)
        .then(event => {
          event.owners.includes(store.state.profile.email) ?
            next(vm => vm.setEvent(event)) : next(false)
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
        this.event = {...event}
        this.ref = {...event}
      },
      updateEvent: function () {
        const {id, name, date} = this.event;
        const event = {id, name, date}
        this.$store.dispatch('updateEvent', event)
          .then(event => this.$router.push({name: 'eventDetails', params:{id: event.id}}))
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
