<template>
  <page title="Step4" description="Visitor">
    <template slot="description">
      <vue-markdown class="text-xs-left" :source="script"> {{script}} </vue-markdown>
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
          <recursive-list class="ma-2 limit-list" v-if="document != null" :group="document.root" @objselected="(value) => selectedGroup = value"/>
        </v-flex>
        <v-flex xs12>
          <v-layout column>
            <v-flex :class="{hidden: switchViews}">
              <new-canvas class="limit-canvas" ref="canvas"/>
            </v-flex>
            <v-flex :class="{hidden: !switchViews}">
              <div ref="text" class="limit-canvas text-xs-left"> </div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </template>
  </page>
</template>

<script>
// @ is an alias to /src
import Page from '@/components/utils/Page.vue'
import pages from '@/config/pages.js'
import {ShapeFactory, 
        Document, 
        ConsoleCommand, 
        GraphicVisualizer, 
        TextVisualizer, 
        GraphicVisualizerExtended} from '@/SimpleDraw.js'
import RecursiveList from '@/components/RecursiveList.vue'
import NewCanvas from '@/components/utils/NewCanvas.vue'
export default {
  name: 'home',
  components: {
    Page, RecursiveList, NewCanvas
  },
  data() {
    return {
      script: pages.script.step4,
      switchViews: true,
      document: null,
      console: null,
      shapeFactory: null,
      selectedGroup: null,
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

    this.visualizer = new GraphicVisualizerExtended(context, this.document)
    this.visualizer2= new TextVisualizer(text, this.document)
  },
  methods: {
    rnd(){
      return Math.random() * 200;
    },
    addShapeToDocument(shape, parent) {
      this.document.addShape(shape, parent)
    },
    createRectangle () {
      let shape  = this.shapeFactory.createRectangle('Rectangle', this.rnd(), this.rnd(), this.rnd(), this.rnd())
      this.document.addShape(shape, this.selectedGroup)
    },
    createCircle () {
      let shape  = this.shapeFactory.createCircle('Circle', this.rnd(), this.rnd(), this.rnd())
      this.document.addShape(shape, this.selectedGroup)
    },
    createGroup () {
      let shape  = this.shapeFactory.createGroup('Group' + this.groupId++)
      this.document.addShape(shape, this.selectedGroup)
    },
    updateViews(){
      this.visualizer.draw()
      this.visualizer2.draw()
    }
  }
}
</script>

<style>
  page {
    text-align: left;
  }

  li {
    margin-left: 2em;
  }

  .hidden {
    visibility: hidden;
    position: absolute;
  }
</style>

