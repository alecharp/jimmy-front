<template>
  <div>
    <v-toolbar fixed app light flat>
      <v-toolbar-title>
        <v-btn flat to="/">Jimmy</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon :to="{ name: 'about' }">
          <v-icon small>fas fa-question-circle</v-icon>
        </v-btn>
        <v-btn icon @click="logout" v-if="isAuthenticated()">
          <v-icon small>fas fa-sign-out-alt</v-icon>
        </v-btn>
        <v-btn icon :to="{ name: 'login' }" v-if="!isAuthenticated()">
          <v-icon small>fas fa-sign-in-alt</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view/>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'isAuthenticated',
    ]),
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('login'));
    },
  },
};
</script>
