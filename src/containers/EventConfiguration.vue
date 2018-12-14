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
        <router-link :to="{name: 'eventDetails', params:{id: event.id}}">{{ event.name }}</router-link>
        <span class="breadcrumb"><font-awesome-icon icon="chevron-right"/></span>
        Configuration
      </h1>
    </page-header>
    <page-content class="flex flex-row flex-grow-1">
      <div class="settings-menu">
        <router-link :to="{name: 'eventConfig', params: {id: event.id}}">Details</router-link>
        <router-link :to="{name: 'eventDeletion', params: {id: event.id}}">Remove</router-link>
      </div>
      <div class="flex-grow-1">
        <router-view></router-view>
      </div>
    </page-content>
  </div>
</template>

<script>
  import store from 'store'

  export default {
    name: 'EventConfiguration',
    data: () => ({
      event: null,
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
    },
  }
</script>
