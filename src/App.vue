<template>
  <v-app>
    <v-content>
      <v-layout fluid fill-height>
        <router-view />
      </v-layout>
    </v-content>
    <v-footer app class="pa-3">
      <v-flex text-xs-center xs12>
        <span class="grey--text caption">
          &copy;2019 &mdash; v{{ appVersion }}
        </span>
      </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState(['appVersion']),
  },
};
</script>
