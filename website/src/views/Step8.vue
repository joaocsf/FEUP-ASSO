<template>
  <step title="Step 8" description="Interpreter">
    <template slot="description">
      <vue-markdown class="text-xs-left" :source="script"> {{script}} </vue-markdown>
      <v-btn outline color="blue" to="/"> Go back to home </v-btn>
    </template>
    <template slot="canvas">

    <!-- export dialog -->
    <v-dialog v-model="toggleDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">
            {{ isImportMode ? 'Imported' : 'Exported'}} Document
            <v-spacer> </v-spacer>
            <v-btn v-if="!isImportMode" flat fab @click="copyToClipboard" > <v-icon> file_copy </v-icon> </v-btn>
          </v-card-title>
          <v-card-text v-if="isImportMode" class="grey lighten-3">
            <v-text-field
              multiLine
              autofocus
              clearable
              hint="Please insert here your text"
              label="Document file"
              required
              solo
              v-model="importedDocument"
            />       
          </v-card-text>
          <v-card-text v-else class="grey lighten-3">
            {{exportedText}}          
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click.stop="toggleDialog=false"> Close </v-btn>
            <v-btn v-if="isImportMode" color="primary" flat @click.stop="() => {toggleDialog=false, submitDialogAction()}"> Submit </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar
        :timeout="1000"
        :top="true"
        :color="snackbarColor"
        v-model="snackbar"
      >
        {{snackbarMessage}}
        <v-btn flat color="white" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
      
      <div class="display-1"> Commands </div>

      <div class="title mt-3"> Creation </div>
      <v-layout mt-3 row wrap>
        <v-flex xs4>
          <v-btn @click="createCircle" small> Circle </v-btn>
        </v-flex>
        <v-flex xs4>
          <v-btn @click="createRectangle" small> Rectangle</v-btn>
        </v-flex>
        <v-flex xs4>
          <v-btn @click="createGroup" small> Group</v-btn>
        </v-flex>
      </v-layout>

      
      <div class="title mt-3"> Movements </div>

      <v-layout row justify-center>
        <v-flex xs2 sm1>
          <v-btn small fab @click="() => moveShape(0,-1)">
            <v-icon> keyboard_arrow_up </v-icon>
          </v-btn>
        </v-flex>
      </v-layout>

      <v-layout row justify-center>
        <v-flex xs2 sm1>
          <v-btn small fab @click="() => moveShape(-10,0)">
            <v-icon> keyboard_arrow_left </v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 sm1>
          <v-btn small fab @click="() => moveShape(0,10)">
            <v-icon> keyboard_arrow_down </v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 sm1>
          <v-btn small fab @click="() => moveShape(10,0)">
            <v-icon> keyboard_arrow_right </v-icon>
          </v-btn>
        </v-flex>
      </v-layout>

      <v-layout mt-3>
        <v-flex>
          <v-btn @click="undoCommand" small> Undo </v-btn>
        </v-flex>
      </v-layout> 

      
      <v-divider class="mt-3"></v-divider>
      <div class="display-1 mt-3"> Exporter/Importer </div>
      

      <div class="title mt-3"> Exporter </div>
    
      <v-layout mt-3 row justify-center> 
        <v-flex xs6>
          <v-btn @click="exportSimple" small> Export Simple </v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn @click="exportXML" small> Export XML </v-btn>
        </v-flex>
      </v-layout> 

      
      <div class="title mt-3"> Importer </div>

    
      <v-layout mt-3 row justify-center> 
        <v-flex xs6>
          <v-btn @click="() => {submitDialogAction = importSimple, toggleDialog=true, this.isImportMode = true}" small> Import Simple </v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn @click="() => {submitDialogAction = importXML, toggleDialog=true, this.isImportMode = true}" small> Import XML </v-btn>
        </v-flex>
      </v-layout> 
   
   

      <v-layout row wrap>
        <v-flex xs12>
          <recursive-list class="ma-2 limit-list" v-if="document != null" :group="document.root" :selectedGroup="selectedGroup" :selectedShape="selectedShape"
            @objselected="(group, shape) => {
              selectedGroup = group
              selectedShape = shape
            }" />
        </v-flex>

        <v-flex xs12 >
          <v-btn @click="onSwitchViews"> Switch Views </v-btn>
        </v-flex>

        <v-flex xs12>
          <v-layout column>
            <v-flex :class="{hidden: switchViews}">
              <new-canvas :action="() => {if(visualizer != null) visualizer.draw()}" class="limit-canvas" ref="canvas" />
            </v-flex>
            <v-flex :class="{hidden: !switchViews}">
              <div ref="text" class="limit-canvas text-xs-left"> </div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </template>
  </step>
</template>

<script>
import Step from '@/components/utils/Step.vue'
import steps from '@/config/steps.js'
import {ShapeFactory, 
        Document, 
        ConsoleCommand, 
        GraphicVisualizer, 
        TextVisualizer, 
        GraphicVisualizerExtended,
        MoveCommand,
        SimpleExporter,
        XMLExporter,
        SimpleInterpreter,
        XMLInterpreter
        } from '@/SimpleDraw.js'
import RecursiveList from '@/components/RecursiveList.vue'
import NewCanvas from '@/components/utils/NewCanvas.vue'
export default {
  components: {
    Step, RecursiveList, NewCanvas
  },
  data() {
    return {
      script: steps.script.step8,
      switchViews: false,
      document: null,
      console: null,
      shapeFactory: null,
      selectedGroup: null,
      selectedShape: null,
      html: null,
      groupId: 0,
      visualizer: null,
      visualizer2: null,
      canvas: null,
      toggleDialog: false,
      exportedText: '',
      importedDocument: '',
      isImportMode: false,
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: 'green',
      submitDialogAction: null
    }
  },
  mounted () {
    this.shapeFactory = new ShapeFactory()
    this.document = new Document()

    this.canvas = this.$refs.canvas
    let context = this.canvas.getContext()
    let text = this.$refs.text
  
    this.selectedGroup = this.document.root
    this.selectedShape = this.document.root
    this.visualizer = new GraphicVisualizerExtended(context, this.document)
    this.visualizer2= new TextVisualizer(text, this.document)
    this.document.attach(this.visualizer)
    this.document.attach(this.visualizer2)
  },
  methods: {
    getGroup(){
      return (this.selectedShape != null && this.selectedShape.constructor.name == 'Group') ? this.selectedShape : this.selectedGroup;
    },
    rnd(){
      return Math.random() * 200;
    },
    addShapeToDocument(shape, parent) {
      this.document.addShape(shape, parent)
    },
    createRectangle () {
      let shape  = this.shapeFactory.createRectangle('Rectangle', this.rnd(), this.rnd(), this.rnd(), this.rnd())
      this.document.addShape(shape, this.getGroup())
    },
    createCircle () {
      let shape  = this.shapeFactory.createCircle('Circle', this.rnd(), this.rnd(), this.rnd())
      this.document.addShape(shape, this.getGroup())
    },
    createGroup () {
      let shape  = this.shapeFactory.createGroup('Group' + this.groupId++)
      this.document.addShape(shape, this.getGroup())
    },
    onSwitchViews() {
      this.switchViews = !this.switchViews
      this.canvas.onResize()
      this.visualizer.draw()
    },
    moveShape(x,y){
      if(this.selectedShape != null) {
        let command = new MoveCommand(this.selectedShape, x, y)
        this.document.addCommand(command)
      }
    },
    undoCommand(){
      this.document.undoCommand()
    },
    exportSimple(){
      let file = new SimpleExporter(this.document).export()
      this.isImportMode = false
      this.exportedText = file
      this.toggleDialog = true
    },
    exportXML(){
      let file = new XMLExporter(this.document).export()
      this.isImportMode = false
      this.exportedText = file
      this.toggleDialog = true
    },
    importSimple(){
      new SimpleInterpreter(this.importedDocument, this.shapeFactory, this.document).interpret()
    },
    importXML(){
      new XMLInterpreter(this.importedDocument, this.shapeFactory, this.document).interpret()
    },
    copyToClipboard(){
      
      this.$copyText(this.exportedText).then( (e) => {
        this.snackbarMessage = 'Copied to clipboard';
        this.snackbarColor = 'green'
      }, (e) => {
        this.snackbarMessage = 'Error Copying to clipboard';
        this.snackbarColor = 'red'
      })

      this.snackbar = true
    }
  }
}
</script>

<style>

  li {
    margin-left: 2em;
  }

  .hidden {
    visibility: hidden;
    position: absolute;
  }
</style>

