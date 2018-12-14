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
  <form class="center">
    <button class="btn btn-danger" @click.prevent="removeEvent(event.id)">
      Remove event
    </button>
  </form>
</template>

<script>
  import store from 'store'

  export default {
    name: 'EventConfigurationDeletion',
    data: () => ({}),
    beforeRouteEnter: async (to, from, next) => {
      try {
        const event = await store.dispatch('getEvent', to.params.id)
        next(vm => vm.setEvent(event))
      } catch (e) {
        next(e)
      }
    },
    methods: {
      setEvent: function (event) {
        this.event = {...event}
      },
      removeEvent: function () {
        this.$store.dispatch('removeEvent', this.event.id)
          .then(this.$router.push({name: 'eventsListing'}))
      },
    }
  }
</script>

