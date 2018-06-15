<template>
  <div class="root elevation-2 white">
    <v-layout>
      <v-btn outline small icon @click="()=> expanded = !expanded">
        <v-icon> {{!expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}} </v-icon>
      </v-btn>

      <v-btn v-if="selectedGroup === group || selectedShape === group" outline small color="primary" @click="objselected(group, group)"> {{group.name}}</v-btn>
      <v-btn v-else outline small  @click="objselected(group, group)"> {{group.name}}</v-btn>

    </v-layout>
    <v-layout v-if="expanded">
      <v-flex class="ml-5 mr-1 mb-2">
        <template v-for="(shape, index) in group.shapes">
          <div v-if="shape.constructor.name != 'Group'" :key="index">
            <v-btn v-if="selectedShape === shape" small color="primary" @click="objselected(group,shape)"> {{shape.name}}</v-btn>
            <v-btn v-else small  @click="objselected(group, shape)"> {{shape.name}}</v-btn>
          </div>
          <recursive-list v-else 
            :group="shape" 
            :selectedGroup="selectedGroup" 
            :selectedShape="selectedShape" 
            @objselected="objselected" 
            :key="index"
          />
        </template>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ['group', 'action', 'selectedGroup','selectedShape'],
  name: 'RecursiveList',
  data() {
    return {
      expanded: true,
    }
  },
  methods: {
    objselected(group, shape){
      if(group === shape && this.group.shapes.indexOf(shape) != -1)
        group = this.group

      this.$emit('objselected', group, shape)
    },
  },
}
</script>


<style scoped lang="scss">
.root {
  text-align: left;
}
.root * {
  text-align: left;
}
</style>
