<template>
  <v-app>
    <v-toolbar app class="primary">
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-bold" style="color:white;">Concord</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        v-show="!user" 
        :to="{name: 'prehome'}"
      >
        <span class="mr-2" style="color:white;">Home</span>
      </v-btn>
      <v-btn
        flat
        v-show="!user" 
        :to="{name: 'signin'}"
      >
        <span class="mr-2" style="color:white;">Login</span>
      </v-btn>
      <v-btn
        flat
        v-show="!user" 
        :to="{name: 'signup'}"
      >
        <span class="mr-2" style="color:white;">Sign Up</span>
      </v-btn>
      <v-btn
        flat
        v-show="!!user" 
        :to="{name: 'home'}"
      >
        <span class="mr-2" style="color:white;">Home</span>
      </v-btn>
      <v-btn
        flat
        v-show="!!user"
        :to="{name: 'profile'}"
      >
        <span class="mr-2" style="color:white;">Profile</span>
      </v-btn>
      <v-btn
        flat
        v-show="!!user" 
        :to="{name: 'signout'}"
      >
        <span class="mr-2" style="color:white;">Signout</span>
      </v-btn>
    </v-toolbar>

    <v-content class="px-0 bumpContent">   
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Amatic+SC');
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,400|Roboto+Condensed:300,400');
  @import 'assets/main.scss'
</style>
