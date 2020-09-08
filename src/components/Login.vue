<template>
<div>
 <v-card width="420px" class="mx-auto my-auto mt-5">
    <v-card-title>
    <h1 class="mx-auto">login</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="email" label="userName" prepend-icon="mdi-account-circle"/> 
        <v-text-field v-model="Password"
        @click:append="showPassword = !showPassword" 
        label="password" 
        :type="showPassword ? 'text': 'password'" 
        prepend-icon="mdi-lock" 
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"/>
        </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success">register</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="info" @click.prevent="login">login</v-btn>
    </v-card-actions>
    </v-card>  
    </div>
</template>

<script>
import firebase from 'firebase'
import {mapActions} from 'vuex'

export default {
  data: () => ({
    showPassword: false,
    email: '',
    Password:'',

  }),
  methods: {
    ...mapActions([ 'setUser']),
     login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.Password)
      .then (() => {
        this.setUser(this.email)
        this.$router.push("/toys") // $ es para acceder a los plugins en this.
      }).catch(() => {
        alert('No no NO')
      })
    }
  }
}
</script>

<style>

</style>