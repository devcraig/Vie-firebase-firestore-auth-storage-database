<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <h3>Home Page</h3>
        <p>Current User is: <strong>{{ this.user }}</strong></p>
        <p>Current Level is: <strong>{{ this.userLevel }}</strong></p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      user: 'Devin',
      userLevel: 'Owner'
    })
  }
</script>

<style>

</style>
