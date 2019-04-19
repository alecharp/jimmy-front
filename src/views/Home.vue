<template>
  <v-layout align-center justify-start row fill-height>
    <v-navigation-drawer
        fixed app v-model="showMenu" :mini-variant="mini"
        style="display: flex; flex-direction: column;">
      <v-toolbar flat class="transparent">
        <v-list class="pt-0">
          <v-list-tile to="/">
            <v-list-tile-action>
              <v-icon small>fas fa-home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Jimmy</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list class="pt-0" v-if="isAuthenticated()">
        <v-list-tile :to="{ name: 'events' }">
          <v-list-tile-action>
            <v-icon small>far fa-calendar-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Events</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-spacer></v-spacer>

      <v-divider></v-divider>

      <v-list dense class="pt-0" style="flex-shrink: 1;">
        <v-list-tile avatar :to="{ name: 'user' }" v-if="isAuthenticated()">
          <v-list-tile-avatar>
            <img :src="user.picture" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ user.displayName }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{ name: 'about' }">
          <v-list-tile-action>
            <v-icon small>fas fa-question-circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-btn class="hidden-xs-only" small absolute depressed icon
        @click.stop="mini = !mini">
      <v-icon small>fas fa-chevron-{{ mini ? 'right' : 'left' }}</v-icon>
    </v-btn>

    <v-layout fill-height column>
      <v-toolbar color="primary" flat class="hidden-sm-and-up">
        <v-toolbar-side-icon @click.stop="showMenu = !showMenu">
          <v-icon small>fas fa-bars</v-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title>Jimmy</v-toolbar-title>
      </v-toolbar>
      <router-view></router-view>
    </v-layout>
  </v-layout>
</template>

<script>
import {
  mapGetters,
  mapState,
} from 'vuex';

export default {
  data: () => ({
    showMenu: null,
    mini: true,
  }),
  computed: {
    ...mapGetters([
      'isAuthenticated',
    ]),
    ...mapState([
      'user',
    ]),
  },
};
</script>
