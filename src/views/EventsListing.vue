<template>
  <v-layout fill-height column>
    <v-dialog :value="loading" width="300" persistent>
      <v-card dark color="info">
        <v-card-text class="text-xs-center">Loading...</v-card-text>
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card>
    </v-dialog>
    <pre v-if="events && events.length > 0">
      {{ events }}
    </pre>
    <pre v-if="error">
      {{ error }}
    </pre>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    loading: true,
    error: null,
  }),
  beforeRouteEnter(_, __, next) {
    next(vm => vm.fetchData());
  },
  computed: {
    ...mapState([
      'events',
    ]),
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.$store.dispatch('fetchEventsList')
        .catch((error) => {
          this.error = error;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
