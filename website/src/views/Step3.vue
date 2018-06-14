<template>
  <step title="Step3" description="Strategy">
    <template slot="description">
      <vue-markdown class="text-xs-left" :source="script"> {{script}} </vue-markdown>
      <v-btn outline color="blue" to="/step4"> Continue to step 4 </v-btn>
    </template>
    <template slot="canvas">
      
      <v-layout row wrap>
        <v-flex xs4>
        <v-btn @click="createCircle" small> Circle </v-btn>
        </v-flex>
        <v-flex xs4>
        <v-btn @click="createRectangle" small> Rectangle</v-btn>
        </v-flex>
        <v-flex xs4>
        <v-btn @click="createGroup" small> Group</v-btn>
        </v-flex>
        <v-flex>
          <v-btn @click="() => {switchViews=!switchViews, canvas.onResize()}" small> Switch Views </v-btn>
        </v-flex>
        <v-flex>
          <v-btn @click="() => {updateViews()}" small> Update Views </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <recursive-list 
            class="ma-2 limit-list"
            v-if="document != null"
            :group="document.root"
            :selectedGroup="selectedGroup"
            :selectedShape="selectedShape"
            @objselected="(group, shape) => {
              selectedGroup = group
              selectedShape = shape
            }" 
          />
        </v-flex>
        <v-flex xs12>
          <v-layout column>
            <v-flex :class="{hidden: switchViews}">
              <new-canvas :action="() => {if(visualizer != null) visualizer.draw()}" class="limit-canvas" ref="canvas"/>
            </v-flex>
            <v-flex :class="{hidden: !switchViews}">
              <div ref="text" class="limit-canvas text-xs-left"> </div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </template>
  </step>
</template>

<script>
import Step from '@/components/utils/Step.vue'
import steps from '@/config/steps.js'
import {ShapeFactory, Document, ConsoleCommand, GraphicVisualizer, TextVisualizer } from '@/SimpleDraw.js'
import RecursiveList from '@/components/RecursiveList.vue'
import NewCanvas from '@/components/utils/NewCanvas.vue'
export default {
  components: {
    Step, RecursiveList, NewCanvas
  },
  data() {
    return {
      switchViews: false,
      script: steps.script.step3,
      document: null,
      console: null,
      shapeFactory: null,
      selectedGroup: null,
      selectedShape: null,
      html: null,
      groupId: 0,
      visualizer: null,
      canvas: null
    }
  },
  mounted () {
    this.shapeFactory = new ShapeFactory()
    this.document = new Document()

    this.canvas = this.$refs.canvas
    let context = this.canvas.getContext()
    let text = this.$refs.text

    this.selectedGroup = this.document.root
    this.selectedShape = this.document.root
    this.visualizer = new GraphicVisualizer(context, this.document)
    this.visualizer2= new TextVisualizer(text, this.document)
  },
  methods: {
    getGroup(){
      return (this.selectedShape != null && this.selectedShape.constructor.name == 'Group') ? this.selectedShape : this.selectedGroup;
    },
    rnd(){
      return Math.random() * 200;
    },
    addShapeToDocument(shape, parent) {
      this.document.addShape(shape, parent)
    },
    createRectangle () {
      let shape  = this.shapeFactory.createRectangle('Rectangle', this.rnd(), this.rnd())
      this.document.addShape(shape, this.getGroup())
    },
    createCircle () {
      let shape  = this.shapeFactory.createCircle('Circle', this.rnd(), this.rnd())
      this.document.addShape(shape, this.getGroup())
    },
    createGroup () {
      let shape  = this.shapeFactory.createGroup('Group' + this.groupId++)
      this.document.addShape(shape, this.getGroup())
    },
    updateViews(){
      this.visualizer.draw()
      this.visualizer2.draw()
    }
  }
}
</script>

<style>

  li {
    margin-left: 2em;
  }



  .hidden {
    visibility: hidden;
    position: absolute;
  }
</style>

