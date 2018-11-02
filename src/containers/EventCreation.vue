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
    <page-header title="Create new event"/>
    <page-content>
      <form @submit.prevent="createEvent()" class="center">
        <div class="flex flex-column flex-grow">
          <label for="event-name">Name</label>
          <input id="event-name" placeholder="Event name" type="text" autofocus="autofocus"
                 v-model.trim="name"/>
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
      createEvent: function () {
        const {name} = this,
          event = {name}
        this.$store.dispatch('addEvent', event)
          .then(event => this.$router.push({name: 'eventConfig', params: {id: event.id}}))
      },
      cancel: function () {
        this.$router.go(-1)
      },
    },
    watch: {
      name: function(newName) {
        this.invalid = newName === ''
      },
    },
  }
</script>
