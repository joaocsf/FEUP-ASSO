<template>
  <step title="Step 2" description="Composite">
    <template slot="description">
      <vue-markdown class="text-xs-left" :source="script"> {{script}} </vue-markdown>
      <v-btn outline color="blue" to="/step3"> Continue to step 3 </v-btn>
    </template>
    <template slot="canvas">
      
      <v-layout row >
        <v-flex xs4>
        <v-btn @click="createCircle" small> Circle </v-btn>
        </v-flex>
        <v-flex xs4>
        <v-btn @click="createRectangle" small> Rectangle</v-btn>
        </v-flex>
        <v-flex xs4>
        <v-btn @click="createGroup" small> Group</v-btn>
        </v-flex>
      </v-layout>
      <recursive-list class="ma-2" v-if="document != null" :group="document.root" @objselected="(value) => selectedGroup = value"/>
    </template>
  </step>
</template>

<script>
import Step from '@/components/utils/Step.vue'
import steps from '@/config/steps.js'
import {ShapeFactory, Document, ConsoleCommand} from '@/SimpleDraw.js'
import RecursiveList from '@/components/RecursiveList.vue'
export default {
  components: {
    Step, RecursiveList
  },
  data() {
    return {
      document: null,
      console: null,
      script: steps.script.step2,
      shapeFactory: null,
      selectedGroup: null,
      groupId: 0
    }
  },
  mounted () {
    this.shapeFactory = new ShapeFactory()
    this.document = new Document()
  },
  methods: {
    addShapeToDocument(shape, parent) {
      this.document.addShape(shape, parent)
    },
    createRectangle () {
      let shape  = this.shapeFactory.createRectangle('Rectangle')
      this.document.addShape(shape, this.selectedGroup)
    },
    createCircle () {
      let shape  = this.shapeFactory.createCircle('Circle')
      this.document.addShape(shape, this.selectedGroup)
    },
    createGroup () {
      let shape  = this.shapeFactory.createGroup('Group' + this.groupId++)
      this.document.addShape(shape, this.selectedGroup)
    }
  }
}
</script>

<style>


</style>

