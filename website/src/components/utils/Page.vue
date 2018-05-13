<template>
  <v-layout warp row>
    <v-flex xs12 sm12 offset-md3 md6> 
      <v-card color="blue lighten-3">
        <v-card-title>
        <h1>{{title}}</h1>
        </v-card-title>
        <v-card-text>
        <div> {{description}} </div>
        <div class="mt-3">
        <slot></slot>
        </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout> 
</template>

<script>
export default {
  props: ['title', 'description']
}
</script>

<style>

</style>
