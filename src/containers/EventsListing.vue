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
  <div>
    <page-header class="justify-between" title="Events">
      <router-link v-if="canCreate()" class="btn" :to="{name: 'eventCreation'}">Create</router-link>
    </page-header>
    <page-content>
      <div v-if="!!events && events.length !== 0">
        <div class="actions flex flex-row flex-grow-1 justify-between">
          <input type="search" v-model.trim="filter" placeholder="Filter events by name"/>
          <button class="btn" @click.prevent="getEvents()">
            <font-awesome-icon icon="sync"/>
          </button>
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
  import {mapState, mapActions} from 'vuex'
  import store from 'store'

  export default {
    name: 'EventsListing',
    data: () => ({filter: null}),
    beforeRouteEnter: (to, from, next) => {
      store.dispatch('getEvents')
        .then(next)
        .catch(() => next(false))
    },
    computed: {
      ...mapState(['events']),
    },
    methods: {
      ...mapActions(['getEvents']),
      filteredEvents: function (filter) {
        return !!filter && filter !== '' ?
          this.events.filter(e => e.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) : this.events
      },
      goto: function (event) {
        this.$router.push({name: 'eventDetails', params: {id: event.id}})
      },
      canCreate: function() {
        return this.$keycloak.hasRealmRole('ROLE_EVENT_PLANNER')
      }
    },
  }
</script>
