<template>
  <div>
    <v-toolbar fixed app light flat>
      <v-toolbar-title>
        <v-btn flat to="/">Jimmy</v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon :to="{ name: 'about' }">
        <v-icon small>fas fa-question-circle</v-icon>
      </v-btn>
      <div class="hidden-xs-only" v-if="isAuthenticated()">
        <v-btn icon @click="logout">
          <v-icon small>fas fa-sign-out-alt</v-icon>
        </v-btn>
        <v-btn icon :to="{ name: 'user' }" depressed>
          <v-avatar size="36px">
            <v-img v-if="user && user.picture" :src="user.picture"></v-img>
            <v-icon v-else>fas fa-user</v-icon>
          </v-avatar>
        </v-btn>
      </div>
      <div v-else>
        <v-btn icon :to="{ name: 'login' }">
          <v-icon small>fas fa-sign-in-alt</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-flex xs12 sm8 offset-sm2>
          <router-view/>
        </v-flex>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import {
  mapGetters,
  mapState,
} from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'isAuthenticated',
    ]),
    ...mapState([
      'user',
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
