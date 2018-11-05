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
  <div class="flex">
    <section class="nav-space" :style="{ width: width(), minWidth: width() }"></section>
    <app-menu :style="{ width: width(), minWidth: width() }" :class="{expended: expended}"/>
    <div id="expansion" class="flex flex-column justify-center" @click="expend()">
      <font-awesome-icon icon="minus" :rotation="90" />
    </div>
    <div class="flex flex-grow-1 flex-column jimmy-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import store from 'store'

  export default {
    name: 'App',
    components: {
      AppMenu: () => import(/* webpackChunkName: 'App' */ 'components/AppMenu'),
    },
    data: () => ({expended: false}),
    beforeCreate: async () => {
      try {
        await store.dispatch('getCsrfToken')
        await store.dispatch('getProfile')
      } catch(ex) {}
    },
    methods: {
      expend: function() { this.expended = !this.expended },
      width: function() { return this.expended ? '280px' : '64px' },
    },
  }
</script>
