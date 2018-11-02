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
  <section class="nav-jimmy flex flex-column flex-shrink-0">
    <nav class="flex flex-column flex-grow-1 justify-start items-start">
      <router-link class="nav-item logo-item" tag="div" to="/">
        <a>
          <font-awesome-icon icon="home" size="lg"/>
        </a>
      </router-link>
      <router-link class="nav-item" tag="div" :to="{name: 'eventsListing'}">
        <a>
          <div class="nav-icon-container">
            <font-awesome-layers>
              <font-awesome-icon icon="calendar-alt"/>
              <font-awesome-layers-text value="Events" transform="right-45"/>
            </font-awesome-layers>
          </div>
        </a>
      </router-link>
    </nav>
    <nav class="flex flex-column justify-start items-start">
      <router-link class="nav-item" tag="div" :to="{name: 'userProfile'}">
        <a>
          <div class="nav-icon-container">
            <font-awesome-layers>
              <font-awesome-icon icon="user-circle"/>
              <font-awesome-layers-text value="Profile" transform="right-45"/>
            </font-awesome-layers>
          </div>
        </a>
      </router-link>
    </nav>
  </section>
</template>

<script>
  export default {
    name: 'AppMenu',
  }
</script>
