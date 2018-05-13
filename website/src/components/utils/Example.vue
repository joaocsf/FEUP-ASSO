<template>
  <v-card flat color="grey lighten-3"> 
      <v-card-title class="headline">
        {{title}} 
      </v-card-title>
      <v-card-text class="text-xs-left">
        <slot></slot>
      </v-card-text>
    </v-card>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style>

</style>
