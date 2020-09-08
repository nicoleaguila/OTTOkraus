<template>
  <v-app>
    <v-app-bar app color="red accent-1" dark>
      <v-toolbar-title>Otto Kraus</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>home</v-btn>
      <v-btn v-if="currentUser" to="/toys" text>juguetes</v-btn>
      <v-btn v-if="currentUser" @click.prevent="logout">Log out</v-btn>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
        <router-view></router-view>
</v-main>
<v-card height="150">
    <v-footer
      absolute
      class="font-weight-medium" color="indigo lighten-4">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer>
  </v-card>
  </v-app>
  
</template>

<script>
import firebase from 'firebase'
import {mapActions, mapState} from 'vuex'
export default {
  name: 'app',
  methods:{
    ...mapActions(['setUser']),
    logout() {
      firebase.auth().signOut().then( () => {
        this.$router.push('/')
        this.setUser(undefined)
      })
    }
  },
  computed:{
    ...mapState(['currentUser'])
  },
  
  components: {
  },

  data: () => ({
    //
  }),
};
</script>
