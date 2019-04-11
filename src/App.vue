<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
    <v-footer app class="pa-3">
      <v-flex text-xs-center xs12>
        <span class="grey--text">
          &copy;2019 -- v{{ appVersion }}
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
