<template>
  <v-layout row wrap align-center>
    <v-flex x12 sm6 offset-sm3 md4 offset-md4>
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
              For the moment, this is all we are offering in the application.
              Come back later for more.
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
};
</script>
