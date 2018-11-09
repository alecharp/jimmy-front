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
  import store from 'store'

  export default {
    name: 'EventDetails',
    data: () => ({event: null, canEdit: false}),
    beforeRouteEnter(to, from, next) {
      store.dispatch('getEvent', to.params.id)
        .then(event => {
          next(async vm => {
            vm.setEvent(event)
            vm.setCanEdit(event.owners.includes(store.state.profile.id))
          })
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
