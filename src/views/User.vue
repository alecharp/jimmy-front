<template>
  <v-layout row wrap align-center>
    <v-flex x12 sm10 offset-sm1 md6 offset-md3>
      <v-card>
        <v-img>
          <v-img :aspect-ratio="16/10" :src="user.picture"></v-img>
        </v-img>
        <v-card-title>
          <div>
            <p class="headline grey--text">{{ user.displayName }}</p>
            <p>Welcome to Jimmy.</p>
            <p>You logged in using the email <span class="font-italic">{{ user.email }}</span></p>
            <p>
              This is not you?
              <v-btn small flat @click="logout">
                <v-icon small left>fas fa-sign-out-alt</v-icon>
                Log out
                </v-btn>
              </p>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
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
