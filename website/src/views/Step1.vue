<template>
  <page title="Step1" description="Description">
    <template slot="description">
      <div class="text-xs-left">
        The first step to specify a shape, 
        in order to achive this a class shape 
        will be created, where all the future
        shapes will be derived from.
      </div>
      <code class="text-xs-left">
class Shape {
  constructor(name, x, y) {
    this.position_x = x || 0;
    this.position_y = y || 0;
    this.name = name;
    this.id = ID++
  }
  translate(x, y) {
    this.position_x += x || 0;
    this.position_y += y || 0;
  }
}
      </code>
      <div class="text-xs-left">
        In this case The two main examples will be Rectangle and Circle.
      </div>
      <code>
class Rectangle extends Shape {
  constructor(name, x, y, height, width) {
    super(name, x, y);
    this.height = height || 1;
    this.width = width || 1;
  }
}

class Circle extends Shape {
  constructor(name, x, y, radius) {
    super(name, x, y);
    this.radius = radius || 1;
  }
}
      </code>
      <div class="text-xs-left">
        To Create the Shapes a Factory is used for its ease of use.
      </div>
      <code>
class ShapeFactory {
  createCircle(name, x, y, radius) {
    return new Circle(name, x, y, radius)
  }

  createRectangle(name, x, y, height, width) {
    return new Rectangle(name, x, y, height, width)
  }
}
      </code>
    </template>
    <template slot="canvas">
      <v-layout row>
        <v-flex xs6>
        <v-btn @click="createCircle"> Create Circle </v-btn>
        </v-flex>
        <v-flex xs6>
        <v-btn @click="createRectangle"> Create Rectangle</v-btn>
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
      shapes: [],
      shapeFactory: null,
      circleId: 1,
      rectId: 1
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

