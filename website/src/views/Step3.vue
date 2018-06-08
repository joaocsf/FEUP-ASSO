<template>
  <page title="Step1" description="Description">
    <template slot="description">
      <div class="text-xs-left">
        The first step to specify a shape, 
        in order to achive this a class shape 
        will be created, where all the future
        shapes will be derived from.
      </div>
    </template>
    <template slot="canvas">
    </template>
  </page> 
</template>

<script>
// @ is an alias to /src
import Page from '@/components/utils/Page.vue'
import {ShapeFactory} from '@/SimpleDraw.js'
export default {
  name: 'home',
  components: {
    Page
  },
  data() {
    return {
    }
  },
  mounted () {
    console.log(ShapeFactory)
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
  page {
    text-align: left;
  }

  code {
    display: block;
    padding: 0em;
    min-width: 50%;
    margin: auto;
    padding-top: 0em;
    padding-bottom: 0em;
    text-align:left;
  }
</style>

