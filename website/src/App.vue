<template>
  <div id="app">
    <v-app>
      <custom-header/> 
      <v-content class="grey lighten-3">
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import CustomHeader from '@/components/Header'
export default {
  components: {CustomHeader},
  name: 'App'
}
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.limit-list {
  min-height: 200px;
  max-height: 200px;
  overflow: scroll;
}

.limit-canvas {
  width: 100%;
  min-height: 300px;
  max-height: 300px;
  overflow: scroll;
}

code{
  box-shadow: 0 0 0 0 !important;
  border-radius: 0 !important;
}
@import 'assets/prism.css';
</style>
