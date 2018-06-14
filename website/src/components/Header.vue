<template>
  <div>
    <v-navigation-drawer :clipped="clipped" v-model="enable" enable-resize-watcher app>
      <v-toolbar flat> 
        <v-list> 
          <v-list-tile>
            <v-list-tile-title class="title">
              Steps
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense class="pt-0">
        <v-list-tile :color="step.color" v-for="step in steps" :key="step.title" @click="loadPage(step.route)">
          <v-list-tile-action>
            <v-icon> {{step.icon}} </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title > {{step.title}} </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="enable = !enable"></v-toolbar-side-icon>
      <v-toolbar-title> 
        <v-btn flat @click="loadPage('/')"> Simple Draw - Design Patterns </v-btn>
      </v-toolbar-title>
      <v-spacer> </v-spacer>
    </v-toolbar>  
  </div>
</template>

<script>
import stepsObj from '@/config/steps.js'

export default {
  data () {
    return {
      enable: true,
      clipped: false,
      stepAux: stepsObj,
    }
  },
  methods: {
    loadPage (route) {
      this.$router.push(route)
    }
  },
  computed: {
    steps: function () {
      let steps = this.stepAux.steps
      for(let step of steps) {
        step['color'] = (this.$route.name == step.route) ? 'blue' : 'black'
      }

      return steps
    }
  },
}
</script>


<style scoped>

</style>
