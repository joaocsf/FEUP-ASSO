<template>
  <page title="Step2" description="Composite">
    <template slot="description">
      <vue-markdown class="text-xs-left" :source="script"> {{script}} </vue-markdown>
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
  </page>
</template>

<script>
// @ is an alias to /src
import Page from '@/components/utils/Page.vue'
import pages from '@/config/pages.js'
import {ShapeFactory, Document, ConsoleCommand} from '@/SimpleDraw.js'
import RecursiveList from '@/components/RecursiveList.vue'
export default {
  name: 'home',
  components: {
    Page, RecursiveList
  },
  data() {
    return {
      document: null,
      console: null,
      script: pages.script.step2,
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
  page {
    text-align: left;
  }

</style>

