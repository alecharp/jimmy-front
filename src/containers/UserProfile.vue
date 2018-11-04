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
  import {mapState} from 'vuex'

  export default {
    name: 'UserProfile',
    computed: {
      ...mapState(['profile'])
    },
    methods: {
      accountUrl() {
        return this.$keycloak.createAccountUrl()
      },
    },
  }
</script>
