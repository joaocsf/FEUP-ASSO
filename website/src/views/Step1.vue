<template>
  <step title="Step 1" description="Factory">
    <template slot="description">
      <vue-markdown class="text-xs-left" :source="script"> {{script}} </vue-markdown>
      <v-btn outline color="blue" to="/step2"> Continue to step 2 </v-btn>
    </template>
    <template slot="canvas">
      <v-layout row>
        <v-flex xs6>
        <v-btn @click="createCircle" small> Circle </v-btn>
        </v-flex>
        <v-flex xs6>
        <v-btn @click="createRectangle" small> Rectangle</v-btn>
        </v-flex>
      </v-layout>
      <v-list class="ma-2">
        <template v-for="(shape,index) in shapes">
          <v-list-tile :key="index">
            <v-list-tile-title>
              {{shape.constructor.name}}
            </v-list-tile-title>
          </v-list-tile>
        </template>
      </v-list>
    </template>
  </step>
  
</template>

<script>
import Step from '@/components/utils/Step.vue'
import steps from '@/config/steps.js'
import {ShapeFactory} from '@/SimpleDraw.js'
export default {
  components: {
    Step
  },
  data() {
    return {
      shapes: [],
      script: steps.script.step1,
      shapeFactory: null,
      circleId: 1,
      rectId: 1
    }
  },
  mounted () {
    this.shapeFactory = new ShapeFactory()
  },
  methods: {
    createRectangle () {
      this.shapes.push(this.shapeFactory.createRectangle('R' + this.rectId++))
    },
    createCircle () {
      this.shapes.push(this.shapeFactory.createCircle('C' + this.circleId++))
    }
  }
}
</script>

<style>

 
</style>

