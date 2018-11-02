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
    <page-header title="Profile"/>
    <page-content>
      <h4>Your user profile</h4>
      <p class="top-2">You can find here your user profile. </p>
      <div class="flex flex-row top-2" v-if="!!profile">
        <p>Name: <b>{{ profile.firstName }} {{profile.lastName }}</b></p>
        <p class="left-2">Username: <b>{{ profile.username }}</b></p>
        <p class="left-2">Email: <b>{{ profile.email }}</b></p>
      </div>
      <p class="top-2 flex flex-column">
        <a :href="accountUrl()" target="_blank">
          Redirect to account management
          <font-awesome-icon icon="chevron-right" style="height: 0.8em"/>
        </a>
      </p>
    </page-content>
  </div>
</template>

<script>
  import store from 'store'

  export default {
    name: 'UserProfile',
    data: () => ({profile: null}),
    beforeRouteEnter(to, from, next) {
      store.dispatch('getProfile')
        .then(profile => next(vm => vm.setProfile(profile)))
        .catch(next)
    },
    beforeRouteUpdate(to, from, next) {
      this.event = null
      this.$store.dispatch('getProfile')
        .then(profile => {
          this.setProfile(profile)
          next()
        })
        .catch(next)
    },
    methods: {
      setProfile(profile) {
        this.profile = profile
      },
      accountUrl() {
        return this.$keycloak.createAccountUrl()
      },
    },
  }
</script>
