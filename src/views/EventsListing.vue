<template>
  <v-layout fill-height column>
    <v-dialog :value="isLoading()" width="300" persistent>
      <v-card dark color="info">
        <v-card-text class="text-xs-center">Loading...</v-card-text>
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card>
    </v-dialog>
    <v-dialog :value="hasError()" v-if="hasError()" width="300" persistent>
      <v-card dark color="error">
        <v-card-title>
          {{ error.message }}
        </v-card-title>
        <v-card-text>
          {{ error.code }}
        </v-card-text>
      </v-card>
    </v-dialog>
    <div>
      <v-data-table hide-actions
        :headers="headers"
        :items="events"
        item-key="id">
        <template v-slot:no-data>
          <v-alert :value="true" dark color="info" icon="far fa-question-circle">
            There is no events.
          </v-alert>
        </template>
        <template v-slot:items="props">
          <td>
            {{ props.item.title }}
          </td>
          <td class="text-xs-right">
            {{ props.item.date | asDate }}
          </td>
        </template>
      </v-data-table>
    </div>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    loading: true,
    error: null,
    headers: [
      {
        text: 'Title', align: 'left', sortable: true, value: 'title',
      },
      {
        text: 'Date', align: 'right', sortable: true, value: 'date',
      },
    ],
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
      this.$store.dispatch('fetchEvents')
        .catch((error) => {
          this.loading = false;
          this.error = error;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    isLoading() {
      return this.loading && !!this.error && this.events.length > 0;
    },
    hasError() {
      return this.error !== null && this.error !== {};
    },
  },
};
</script>
