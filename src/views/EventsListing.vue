<template>
  <v-layout column fill-height>
    <v-toolbar flat>
      <v-toolbar-title>Events</v-toolbar-title>
    </v-toolbar>
    <v-container>
        <v-flex xs12>
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
        </v-flex>
    </v-container>
  </v-layout>
</template>

<script>
import {
  mapState,
} from 'vuex';

export default {
  data: () => ({
    headers: [
      {
        text: 'Title', align: 'left', sortable: false, value: 'title',
      },
      {
        text: 'Date', align: 'right', sortable: false, value: 'date',
      },
    ],
  }),
  beforeRouteEnter(_, __, next) {
    next(vm => vm.load());
  },
  beforeRouteUpdate(_, __, next) {
    this.load();
    next();
  },
  computed: {
    ...mapState([
      'events',
    ]),
  },
  methods: {
    load() {
      this.$store.dispatch('fetchEvents');
    },
  },
};
</script>
