<template>
  <div>
    <v-navigation-drawer :clipped="clipped" v-model="enable" enable-resize-watcher app>
      <v-toolbar flat> 
        <v-list> 
          <v-list-tile>
            <v-list-tile-title class="title">
              Design Patterns
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense class="pt-0">
        <v-list-tile v-for="page in pages" :key="page.title" @click="loadPage(page.route)">
          <v-list-tile-action>
            <v-icon> {{page.icon}} </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title> {{page.title}} </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="enable = !enable"></v-toolbar-side-icon>
      <v-toolbar-title> Design Patterns </v-toolbar-title>
      <v-spacer> </v-spacer>
    </v-toolbar>  
  </div>
</template>

<script>
export default {
  data () {
    return {
      enable: true,
      clipped: false,
      pages: [
        {title: 'Observer', icon: 'delete', route: 'home'},
        {title: 'Observer2', icon: 'delete', route: 'about'}
      ]
    }
  },
  methods: {
    loadPage (page) {
      this.$router.push(page)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
