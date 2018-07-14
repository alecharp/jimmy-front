<template>
  <div>
    <nav>
      <div>
        <router-link to="/">Events</router-link>
        <router-link to="/new">New</router-link>
      </div>
      <div class="user">
        <span>{{ displayName }}</span>
        <span>
          <button @click.prevent.once="logout">Logout</button>
        </span>
      </div>
    </nav>
    <hr/>
    <router-view/>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions,
  } from 'vuex'

  export default {
    name: 'App',
    computed: {
      ...mapGetters({
        displayName: 'getDisplayName',
      })
    },
    methods: {
      ...mapActions({
        logout: 'security/logout',
      })
    },
  }
</script>
