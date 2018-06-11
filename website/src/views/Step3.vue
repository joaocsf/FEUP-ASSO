<template>
  <page title="Step3" description="Description">
    <template slot="description">
        <code>
          var person = {
            firstName : "John",
            lastName  : "Doe",
            age       : 50,
            eyeColor  : "blue"
          };

          document.getElementById("demo").innerHTML =
          person.firstName + " is " + person.age + " years old, oh so old.";
        </code>
      
    </template>
    <template slot="canvas">
      
      <v-layout row wrap>
        <v-flex xs4>
        <v-btn @click="createCircle"> Circle </v-btn>
        </v-flex>
        <v-flex xs4>
        <v-btn @click="createRectangle"> Rectangle</v-btn>
        </v-flex>
        <v-flex xs4>
        <v-btn @click="createGroup"> Group</v-btn>
        </v-flex>
        <v-flex>
          <v-btn @click="() => {switchViews=!switchViews, canvas.onResize()}"> Switch Views </v-btn>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs6>
          <recursive-list class="ma-2 limit-list" v-if="document != null" :group="document.root" @objselected="(value) => selectedGroup = value"/>
        </v-flex>
        <v-flex xs6>
          <v-layout column>
            <v-flex :class="{hidden: switchViews}">
              <new-canvas class="limit-canvas" ref="canvas"/>
            </v-flex>
            <v-flex :class="{hidden: !switchViews}">
              <div ref="text" class="limit-list text-xs-left"> </div>
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
import {ShapeFactory, Document, ConsoleCommand, GraphicVisualizer, TextVisualizer } from '@/SimpleDraw.js'
import RecursiveList from '@/components/RecursiveList.vue'
import NewCanvas from '@/components/utils/NewCanvas.vue'
export default {
  name: 'home',
  components: {
    Page, RecursiveList, NewCanvas
  },
  data() {
    return {
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

    this.visualizer = new GraphicVisualizer(context, this.document)
    this.visualizer2= new TextVisualizer(text, this.document)
    // this.document.setVisualizer(new GraphicVisualizer(context, this.document))
  },
  methods: {
    rnd(){
      return Math.random() * 200;
    },
    addShapeToDocument(shape, parent) {
      this.document.addShape(shape, parent)
      this.html = this.document.getRepresentation()
      this.visualizer.draw()
      this.visualizer2.draw()
    },
    createRectangle () {
      let shape  = this.shapeFactory.createRectangle('Rectangle', this.rnd(), this.rnd())
      this.document.addShape(shape, this.selectedGroup)
      this.html = this.document.getRepresentation()
      this.visualizer.draw()
      this.visualizer2.draw()
    },
    createCircle () {
      let shape  = this.shapeFactory.createCircle('Circle', this.rnd(), this.rnd())
      this.document.addShape(shape, this.selectedGroup)
      this.html = this.document.getRepresentation();
      this.visualizer.draw()
      this.visualizer2.draw()
    },
    createGroup () {
      let shape  = this.shapeFactory.createGroup('Group' + this.groupId++)
      this.document.addShape(shape, this.selectedGroup)
      this.html = this.document.getRepresentation()
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

  code {
    display: block;
  }

  .limit-canvas {
    width: 100%;
    min-height: 300px;
    max-height: 300px;
  }

  li {
    margin-left: 2em;
  }

  .limit-list {
    max-height: 300px;
    overflow: scroll;
  }

  .hidden {
    visibility: hidden;
    position: absolute;
  }
</style>

