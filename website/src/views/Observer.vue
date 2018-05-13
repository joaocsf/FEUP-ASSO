<template>
  <page title="Observer" :description="description">
    <v-card flat> 
      <v-card-title class="headline">
        Input Reactivity
      </v-card-title>
      <v-card-text class="text-xs-left">
        <span> One usecase for this pattern is the update of the user input on the fly </span>
      </v-card-text>
    </v-card>
  </page>
</template>

<script>
import Page from '@/components/utils/Page'
export default {
  components: {Page},
  data() {
    return {
      description: 'The Observer Pattern is used when there is one-to-many relationship between objects such as if one object is modified, its dependent objects are to be notified automatically. Observer pattern falls under behavioral pattern category',
      demo1: 'Text'

    }
  }

}
</script>

<style>

</style>
