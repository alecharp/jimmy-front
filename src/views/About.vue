<template>
  <v-layout column fill-height>
    <v-toolbar flat>
      <v-toolbar-title>About Jimmy</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-layout align-center justify-center column fill-height>
        <v-flex xs12 sm8 offset-sm-2 lg6 offset-lg-3>
          <v-card>
            <v-card-text>
              <p>
                Jimmy is an open-source web application.
                This means that all the source code of the application is accessible for anyone
                to read.
              </p>
              <p>
                The purpose of Jimmy is to provide an easy way to share pictures among events'
                attendees, outside of the public domain.
                This means that the pictures shared here won't be accessible by anyone.
              </p>
              <p>
                Also, it means that the event's organizers will be able to gather all the
                pictures taken during the event easily, as anyone attending the event.
                So that your memories won't fall into a rabit hole.
              </p>
              <p>
                None of the data we have about you will ever be shared to a third party.
                Even for a lot of money.
                Pictures will stay yours, you can delete them any time, there is no backup on
                our side, so any deletion is permanent.
              </p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
export default {
};
</script>
