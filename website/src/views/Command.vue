<template>
  <page title="Command" :description="description">
    
    <example class="mt-1" title="Do And Undo Operations">
      <span> In this small example the user can do and undo operations to the text below </span>
      <v-layout>
        <v-flex class="text-xs-center">
          <div class="pa-2 headline white--text" :class="[color? color : 'red']" > {{value}}</div>
        </v-flex>
      </v-layout>
      <b>
        Actions
      </b>
      <v-layout row wrap>
        <v-flex>
          <v-btn class="red" dark @click="addAction({color: 'red'})" > Color Red </v-btn>
          <v-btn class="blue" dark @click="addAction({color: 'blue'})"> Color Blue </v-btn>
          <v-btn class="green darken-1" dark @click="addAction({name: 'increase', counter: 1, color: 'green darken-1' })"> Increase Counter </v-btn>
          <v-btn class="green darken-4" dark @click="addAction({name: 'decrease', counter: -1, color: 'green darken-4'})"> Decrease Counter </v-btn> 
          <v-btn class="grey darken-2" dark @click="undoAction()"> Undo </v-btn>
        </v-flex>
      </v-layout>
      <div>
        <b> Queue of Actions </b>
        
      </div>
      <div>
        <v-layout wrap row>
        <v-flex class="pa-1 ma-1 white--text" :class="[action.color? action.color: 'green darken-2']" v-for="(action) in actions" :key="action.id"> {{action.name}}</v-flex> 
        </v-layout>
      </div>
    </example>

    <example class="mt-2" title="Notifications">
    
    </example>
 </page>
</template>

<script>
import Page from '@/components/utils/Page'
import Box from '@/components/utils/Box'
import Example from '@/components/utils/Example'
export default {
  components: {Page, Box, Example},
  data() {
    return {
      description: 'The Command Pattern is a data driven design pattern and falls under behavioral pattern category. A request is wraped under an object as command and passed to invoker object. Invoker object looks for the appropriate object which can handle this command and passes the command to the corresponding object which executes the command',
      actions: [],
      color: 'red',
      value: 0
    }
  },
  methods: {
    addAction(action){
      action.id = this.actions.length
      action.name = action.name || action.color
      this.actions.push(action);
      this.executeAction(action)
    },
    undoAction(){
      if(this.actions.length > 0)
      this.removeAction(this.actions.pop())
    },
    executeAction(action){
      if(action.color){
        action.lastColor = this.color
        this.color = action.color
        console.log(action.lastColor)
      } 
      if(action.counter) this.value += action.counter
    },
    removeAction(action){
      if(action.counter) this.value -= action.counter
      if(action.lastColor) this.color = action.lastColor
      console.log(action.lastColor)
    }
  }

}
</script>

<style>

</style>
