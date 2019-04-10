<template>
  <v-layout row wrap align-center>
    <v-flex x12 sm6 offset-sm3 md4 offset-md4>
      <v-card>
        <v-img>
          <!-- TODO -->
        </v-img>
        <v-card-title>
          <div>
            <span class="headline grey--text">Jimmy</span><br/>
            <p>Welcome to Jimmy.</p>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="google">
            <v-icon>fab fa-google</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon absolute right color="grey--text" @click="help = !help">
            <v-icon small>fas fa-{{ help ? 'chevron-up' : 'question-circle' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="help">
            Choose the authentication provider you prefer to access the service. <br/>
            If you want to know more about Jimmy,
            please see the <router-link to="about">About</router-link> page.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data: () => ({
    help: false,
  }),
  methods: {
    google() {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.login(provider);
    },
    login: (provider) => {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => firebase.auth().signInWithRedirect(provider));
    },
  },
};
</script>
