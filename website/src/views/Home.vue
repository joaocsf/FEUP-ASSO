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

            <v-flex mt-4 xs12>
              <div class="headline"> Authors </div>
            </v-flex>
            <v-flex xs12>
              <div class="title"> David Azevedo </div>
            </v-flex>
            <v-flex xs12>
              <div class="title"> João Ferreira </div>
            </v-flex>
            <v-flex xs12>
              <div class="title"> João 20 </div>
            </v-flex>
            <v-flex xs12>
              <div class="title"> José Martins </div>
            </v-flex>

          </v-layout>

        </v-card-title>
        <v-card-text>
          <!-- To Remove -->
          <div class="headline"> 
            Useful links - (To Remove in final version)
          </div>

           <v-stepper vertical>
            <v-stepper-step v-for="link in links" :complete="complete">        
              <v-btn flat color="blue" :href="link.url"> {{link.desc}} </v-btn>             
            </v-stepper-step>
          </v-stepper>
          

          <div class="headline"> 
            Goals
          </div>
          
          <v-stepper vertical>
            <v-stepper-step v-for="goal in goals" :complete="complete">
              <div class="title"> {{goal}} </div>
            </v-stepper-step>
          </v-stepper>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn flat color="blue" to="/step1"> Explore </v-btn>
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
          "desc":"Report"
        },
        {
          "url": "https://docs.google.com/document/d/1PqWf2hrORPL_7wxuJ_LPuW8MqBz7dDrP5Ji9auY2Epo/edit#heading=h.5uvpke651xe0",
          "desc":"Report template"
        },
        {
          "url": "https://github.com/joaocsf/FEUP-ASSO",
          "desc":"github"
        },
        {
          "url": "https://drive.google.com/drive/folders/1guzoCxYC20f0u4XQ_r5TjDvrZK0_huBb",
          "desc":"Drive"
        },
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
