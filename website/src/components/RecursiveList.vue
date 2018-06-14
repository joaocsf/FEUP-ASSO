<template>
  <div class="root elevation-2 white">
    <v-layout>
    <v-btn outline small icon @click="()=> expanded = !expanded">
      <v-icon> {{expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}} </v-icon>
    </v-btn>
    <v-btn outline small @click="clicked">
    {{group.name}}
    </v-btn>
    <v-btn v-if="action" @click="() => {action(group)}" > > </v-btn> 
    </v-layout>
    <v-layout v-if="expanded">
      <v-flex class="ml-5 mr-1 mb-2">
        <template v-for="(shape, index) in group.shapes">
          <div v-if="shape.constructor.name != 'Group'" :key="index"> 
            {{shape.name}} 
            <v-btn v-if="action && shape" @click="() => {action(shape)}" > > </v-btn>
          </div>
          <recursive-list v-else :action="action" :group="shape" @objselected="objselected" :key="index"/> 
        </template>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ['group', 'action'],
  name: 'RecursiveList',
  data() {
    return {
      expanded: true
    }
  },
  methods: {
    clicked(){
      this.$emit('objselected', this.group)
    },
    objselected(value) {
      this.$emit('objselected', value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.root {
  text-align: left;
}
.root * {
  text-align: left;
}
</style>
