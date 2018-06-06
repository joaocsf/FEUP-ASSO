<template>
  <page title="Step2" description="Description">
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
      
      <v-layout row >
        <v-flex xs4>
        <v-btn @click="createCircle"> Create Circle </v-btn>
        </v-flex>
        <v-flex xs4>
        <v-btn @click="createRectangle"> Create Rectangle</v-btn>
        </v-flex>
        <v-flex xs4>
        <v-btn @click="createGroup"> Create Group</v-btn>
        </v-flex>
      </v-layout>
      <recursive-list class="ma-2" v-if="document != null" :group="document.root" @objselected="(value) => selectedGroup = value"/>
    </template>
  </page>
</template>

<script>
// @ is an alias to /src
import Page from '@/components/utils/Page.vue'
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
      shapeFactory: null,
      selectedGroup: null,
      html: null,
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
      this.html = this.document.getHtml()
    },
    createRectangle () {
      let shape  = this.shapeFactory.createRectangle('Rectangle')
      this.document.addShape(shape, this.selectedGroup)
      this.html = this.document.getHtml()
    },
    createCircle () {
      let shape  = this.shapeFactory.createCircle('Circle')
      this.document.addShape(shape, this.selectedGroup)
      this.html = this.document.getHtml()
    },
    createGroup () {
      let shape  = this.shapeFactory.createGroup('Group' + this.groupId++)
      this.document.addShape(shape, this.selectedGroup)
      this.html = this.document.getHtml()
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
</style>

