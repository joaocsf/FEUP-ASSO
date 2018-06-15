<template>
  <v-layout wrap row>
    <v-flex xs12 offset-lg1 lg10>
      <v-card>
        <v-card-title primary-title>
          <v-layout wrap row>
            <v-flex xs12>
              <div class="display-2"> Simple Draw - Graphical Editor</div>
            </v-flex>
            <v-flex xs12>
              <div class="title"> Arquitectura de Sistemas de Software </div>
            </v-flex>
            <v-flex xs12>
              <div class="subheading"> Mestrado Integrado em Engenharia Informática e Computação </div>
            </v-flex>

            <v-divider></v-divider>

            <v-layout mt-4 pt-2 pb-2 class="grey lighten-3 elevation-2" wrap row>
              <v-flex xs12>
                <div class="headline"> Authors </div>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <div class="subheading"> David Azevedo </div>
                <a href="mailto:up201405846@fe.up.pt" class="caption"> up201405846@fe.up.pt </a>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <div class="subheading"> João Ferreira </div>
                <a href="mailto:up201404332@fe.up.pt" class="caption"> up201404332@fe.up.pt </a>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <div class="subheading"> João Costa </div>
                <a href="mailto:up201403967@fe.up.pt" class="caption"> up201403967@fe.up.pt </a>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <div class="subheading"> José Martins </div>
                <a href="mailto:up201404189@fe.up.pt" class="caption"> up201404189@fe.up.pt </a>
              </v-flex>
            </v-layout>
          </v-layout>

        </v-card-title>
        <v-card-text>
          <!-- To Remove -->

          <div class="elevation-2 mt-4"> 
            <div class="headline"> 
              Useful links
            </div>

            <v-layout mt-2 row wrap justify-center>
            <v-flex xs6 md2 v-for="(link,i) in links" :complete="complete" :key="i">        
              
                <v-btn flat small color="blue darken-2" class="text-xs-left ma-0 pa-0 " :href="link.url"> 
                  <v-icon> {{link.icon}} </v-icon>
                  <span class="subheading ml-2"> {{link.desc}} </span>
                </v-btn>             
                
              
            </v-flex>
            </v-layout>
          </div>
          

          <div class="elevation-2 mt-4"> 
            <div class="headline"> Goals </div>
          
            <v-layout column wrap class="text-xs-left">
              <v-flex v-for="(goal,i) in goals" :complete="complete" :key="i">
                <div class="ma-2">
                <v-icon color="blue darken-2"> check_circle </v-icon> <span class="subheading"> {{goal}} </span>
                <v-divider class="mt-1 mb-1"></v-divider>
                </div>
              </v-flex>
            </v-layout>

          </div>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn outline color="blue" to="/step1"> Explore </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>

export default {
  data() {
    return {
      complete: true,
      goals: [
        "To develop a very simple graphical editor to draw basic graphical objects, initially rectangles and circles.",
        "SimpleDraw must support the notion of document, in order to aggregate graphical objects.",
        "A document must be viewed in different ways.",
        "It must be possible to open the same document in different views.",
        "SimpleDraw must be able to read and write the document using different formats (text, xml, binary, etc).",
        "SimpleDraw must be easy to extend with new kinds of objects (squares, triangles, etc).",
        "SimpleDraw must be easy to extend with new tools (move, paint, etc) dynamically and new operations.",
        "SimpleDraw must support Undo/ReDo of operations to the objects.",
        "The editor must be able to be configured dynamically in all aspects above mentioned.",
      ],
      links: [
        {
          "url": "https://docs.google.com/document/d/1A23aWTPzVetgrGntj60HbE1v5BSaAmNCQ6nwFnNIlB0/edit#heading=h.5uvpke651xe0",
          "desc":"Report",
          "icon":"book"
        },
        {
          "url": "https://github.com/joaocsf/FEUP-ASSO",
          "desc":"github",
          "icon":"fab fa-github",
        }
      ]
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }

</style>
