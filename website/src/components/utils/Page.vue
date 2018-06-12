<template>
  <v-layout warp row>
    <v-flex xs12 sm12 md12 offset-lg1 lg10> 
      <v-card color="">
        <v-card-title>
        <h1>{{title}}</h1>
        </v-card-title>
        <v-card-text>
          <div class="ml-3 text-xs-left headline"> {{description}} </div>
          <div class="mt-3">
          <v-layout row wrap>
            <v-flex xs12 md6>
              <slot name="description"></slot>
            </v-flex>
            <v-flex xs12 md6 class="grey lighten-3">
              <slot name="canvas"></slot>
            </v-flex>
          </v-layout>
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
