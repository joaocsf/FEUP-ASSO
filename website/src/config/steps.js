export default {
  steps: [
    {title: 'Step 1', icon: 'label_important', route: 'step1'},
    {title: 'Step 2', icon: 'label_important', route: 'step2'},
    {title: 'Step 3', icon: 'label_important', route: 'step3'},
    {title: 'Step 4', icon: 'label_important', route: 'step4'},
    {title: 'Step 5', icon: 'label_important', route: 'step5'},
    {title: 'Step 6', icon: 'label_important', route: 'step6'},
    {title: 'Step 7', icon: 'label_important', route: 'step7'},
    {title: 'Step 8', icon: 'label_important', route: 'step8'},
  ],

  script: {
    step1: 
`
### Problem

<br\>

* To develop a very simple graphical editor to draw basic graphical objects, initially rectangles and circles.

<br\>

### Solution

<br\>

The first step was to specify what a shape is, in order to achive this a class Shape was created. All future shape types will be derived from this base class. A shape has a name and a (x,y) position as well as an ID (globally incremental).

<br\>

\`\`\`javascript
class Shape {
  constructor(name, x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.name = name;
    this.id = ID++
  }
  translate(x, y) {
    this.x += x || 0;
    this.y += y || 0;
  }
}
\`\`\`

<br\>

For this example we specified 2 differente shapes, Circle and Rectangle.

<br\>

\`\`\`javascript
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
\`\`\`

<br\>

To create the shapes, a Factory pattern is used for its ease of use. The creation of shapes in a centralized way allows for an easy future extensibility. For example, with the notation of a document, the factory would be contained within the document. With this added shapes would emerge directly within the document avoiding the need to add shapes to documents every time we declare a new object.

<br\>

\`\`\`javascript
class ShapeFactory {
  createCircle(name, x, y, radius) {
    return new Circle(name, x, y, radius)
  }

  createRectangle(name, x, y, height, width) {
    return new Rectangle(name, x, y, height, width)
  }
}
\`\`\`

<br\>

### Test Demo

<br\>

* Click on one of the buttons 'Circle' or 'Rectangle' to add new shapes.
`,
    step2:
`
### Problem

<br\>

*  SimpleDraw must aggregate graphical objects.

<br\>

### Solution

<br\>

The Composite Design Pattern is very useful when there is a need to compose similar objects in a hierarchy. In our context we used this pattern to define groups of shapes.

First, a class Group that extends Shape is created and encapsulates objects of type shape, including other groups.

<br\>

\`\`\`javascript
class Group extends Shape {
  
  constructor(name, x,y) {
    super(name, x,y);
    this.shapes = [];
  }

  append(shape) {
    this.shapes.push(shape);
  }
}
\`\`\`

<br\>

With this pattern we can associate shapes with other shapes. For now this isn't really useful, but later on when we implement translation it will be really useful to move multiple shapes at once.

<br\>

### Test Demo

<br\>

* Click on the 'Circle', 'Rectangle' and 'Group' buttons to add a new shape.
* Click on a group name to select it. Afterwards all shapes you add will be added to the selected group.

`,
    step3:
`
### Problem

<br/>

* A document must be viewed in different ways.

<br/>

### Solution

<br/>

To solve this we chose to implement a Strategy Pattern. With this pattern we are able to define a set or family algorithms which are interchangeable. Afterwards we implement different types and are able to switch between them in runtime without much trouble.

\`\`\`javascript
class Visualizer {

  constructor() {}

  draw() {
    console.error('Abstract Class')
  }
}
\`\`\`

<br/>

With this in mind, a Visualizer abstract class was created. This class has a method draw which is responsabible for setting the visualization in the correct place.

<br/>

\`\`\`javascript
class TextVisualizer extends Visualizer {
  constructor(anchor, document) {
    super()
    this.document = document
    this.anchor = anchor
  }

  representation(group) {
    group = group || this.document.root
    let res = \`<div> \${group.getName()} (\${group.x | 0}, \${group.y | 0}) </div>\`
    let content = ''
    for(let shape of group.shapes){
      let isGroup = shape instanceof Group
      let subcontent = isGroup ? this.representation(shape) : \` \${shape.getName()} (\${shape.x | 0}, \${shape.y | 0})\`
      content += \`<li class="\${isGroup?'group':' '}" > \${subcontent} </li>\`
    }
    if(content.length > 0)
      res += \`<ul> \${content} </ul>\`
    return res
  }

  draw() {
    this.anchor.innerHTML = this.representation()
  }
}

class GraphicVisualizer extends Visualizer {
  constructor(context, document) {
    super()
    this.context = context
    this.document = document
  }

  draw(){
    if(this.context == null) return
    this.document.root.foreach(
      (shape) => {
        if(shape instanceof Group) return
        this.context.fillStyle = "#FF0000"
        this.context.fillRect(shape.x, shape.y, 10, 10)
      }
    )
  }
}
\`\`\`

<br/>

To exemplify this approach we created two different types of visualizers, a graphical visualizer which takes an HTML canvas context and draws our document onto it and a TextVisualizer which describes the structure of a document with text.

<br/>

### Test Demo

* Add new shapes with the appropriate buttons like in the previous steps.
* Press 'Switch Views' to switch between Graphic and Text views.
* Click on 'Update Views' after adding new shapes to update the view.
`,
    step4:
`
### Problem

<br/>

* A document must be viewed in different ways.

<br/>

### Solution

<br/>

In the previous step we could represent different ways of visualizing the document, it worked great for the text representation because each shape has a name associated to it, but not so well in the graphic representation, since we don't know which shape is, we guessed everything was a square.

The Visitor Design Pattern can help us deal with that, with this design pattern we can make each shape visit a method, crafted specifically to handle each shape type. 

The Visitor Design Pattern, when applied to this specific use and language, can be specified in the following way.

Each shape must accept a visitor and call the appropriate method. So a new method is added to the base class

<br/>

\`\`\`javascript
class Shape {
  (...)
  accept(visitor){
    visitor.visit(this)
  }
}
\`\`\`

<br/>

And each subclass must overwrite the method and call the appropriate Visitor's method.

<br/>

\`\`\`javascript
class Rectangle extends Shape {
  (...)
  accept(visitor){
    visitor.visitRectangle(this)
  }
}
class Circle extends Shape {
  (...)
  accept(visitor){
    visitor.visitCircle(this)
  }
}
class Group extends Shape {
  (...)
  accept(visitor){
    visitor.visitGroup(this)
  }
}
\`\`\`

<br/>

The Visitor interface is responsible to receive all the calls from the shapes, in order to handle that in javascript each method needs to be named differently.

<br/>

\`\`\`javascript
class GraphicVisualizerExtended extends Visualizer {
  (...)

  draw(){
    if(this.context == null) return
    this.document.root.foreach(
      (shape) => {
        shape.accept(this)
      }
    )
  }

  visitRectangle(shape){
    this.context.fillStyle="#FF0000"
    this.context.fillRect(
      shape.x,shape.y,shape.width, shape.height)
  }

  visitCircle(shape){
    this.context.fillStyle="#FF0000"
    this.context.beginPath()
    this.context.arc(
      shape.x, shape.y, shape.radius, 
      0, 2 * Math.PI, false);
    this.context.fill()
  }

  visitGroup(shape){
  }
}
\`\`\`

<br/>

Each \`visit{ShapeName}\` Method is responsible to handle each shape. The draw method now simply calls the accept method of each shape to call the appropriate Visitor's method.

<br/>

### Test Demo

<br/>

* Add Circles and Rectangles
* When you press the switch view and then the Button Update Views the shapes should appear correctly!


`,
    step5:
`
### Problem

<br/>

* A document must be viewed in different ways.

<br/>

### Solution

<br/>

Up until now the additions of the shapes weren't updating automatically, this is important to improve the user experience and handle more complex behaviours so let's remove that annoying button and implement a new pattern!

The Observer Design pattern informs its observers of a change in the state, there are various ways of implementing this pattern but in this case, we keep it simple and since each visualizer contains the current document we don't need to pass it in the update method.

To implement this pattern we need to think about where the changes occur and what we should update, in this case when the Document(Notifier) changes its internal state it should notify the visualizers(Observers) to draw accordingly.

The document must handle all the listeners interested in receiving updates and latter notify them.

<br/>

\`\`\`javascript
class Document {
  (...)
  attach(observer){
    this.listeners.push(observer)
  }

  addShape(shape, group) {
    (...)
	//Notify Changes!
    this.notify()
  }

  notify(){
    for(let listener of this.listeners)
      listener.update()
  }
}
\`\`\`

<br/>

Then in the base class Visualizer, we add the update method which is called to notify the observer, in this context the only update we need to do is to draw according to the current state of the document.

<br/>

\`\`\`javascript
class Visualizer {

  update(){
    this.draw()
  }

  draw() {
    console.error('Abstract Class')
  }
}
\`\`\`

<br/>

Finally in our code, we just need to associate the visualizers as observers of the document.

<br/>

\`\`\`javascript
let document = new Document()
(...)
let visualizer = new GraphicVisualizerExtended(context, document)
let visualizer2= new TextVisualizer(text, document)
document.attach(visualizer)
document.attach(visualizer2)
\`\`\`

<br/>

### Test Demo

<br/>

* Now when creating new objects the visualizers should update accordingly.

`,
    step6:
`
### Problem

<br/>

* SimpleDraw must support Undo/ReDo of operations to the objects.

<br/>

### Solution
<br/> 

In the preceding steps, we had a limited choice of operations that were possible to execute in simpleDraw.

It was possible to create circles, rectangles, and groups as well as switch views.
But after the addition of one of this shapes, we couldn't do anything with them.
Wouldn't it be nice if we could also move the shapes and delete them after their creation?

Well, don't worry, that's what this step is all about!

To achieve these behaviours we will use the **command pattern**!
This pattern allows us to wrap a request under an object as a command and pass it to an invoker object. Then the Invoker object looks for the appropriate object which can handle this command and passes the command to the corresponding object which executes the command.

So we will have three roles, the *requester*, the *command* and the *invoker*.
let's dig into every one of them.

Starting with the *request* class, the *Shape* will be the one acting as a request class since every command will affect and mutate shapes. 

Moving one to the *command*, this is represented by an abstract class, as shown below.
This class as two, self-explanatory, methods one for the execution of the command related and one for the 'unexecution', that will that complete the Do/Undo behaviour. 

\`\`\`javascript

class Command {
  execute(){
    console.error('Abstract Class')
  }
  unexecute(){
    console.error('Abstract Class')
  }
}
\`\`\`

This class is then extended and implemented by each type of command.
We have developed two concrete commands:

#### Movement command

This concrete command is responsible for the translation of a shape.

\`\`\`javascript
class MoveCommand extends Command {
  constructor(shape, x, y){
    super()
    this.shape = shape
    this.x = x
    this.y = y
  }

  execute(){
    this.shape.translate(this.x,this.y)
  }
  unexecute(){
    this.shape.translate(-this.x,-this.y)
  }
}
\`\`\`
#### Add command

This concrete command is responsible for the creation and deletion of every shape.

\`\`\`javascript
class AddCommand extends Command {
  constructor(shape, group){
    super()
    this.shape = shape
    this.group = group
  }

  execute(){
    this.group.append(this.shape)
  }
  unexecute(){
    this.group.remove(this.shape)
  }
}
\`\`\`

Finally the *invoker* class, this will be the *Document*, this class receives the commands and it's responsible for their execution.
Every command is stored on a structure, to be able to achieve the undo operation. 

\`\`\`javascript
class Document {
  constructor(){
    (...)
    this.commands = []
  }

  (...)

  addCommand(command){
    command.execute()
    this.commands.push(command)
    this.notify()
  }

  undoCommand(){
    if(this.commands.length == 0) return;
    this.commands.pop().unexecute()
    this.notify()
  }

  (...)
}
\`\`\`

### Test Demo
<br/>

* The buttons related to the creation of objects are now using the command pattern stated above, so after the creation of objects, the user can press the undo button to remove the object;
* Buttons for the movement of the shapes were also added, the user can select a shape in the tree (that will become highlighted in blue) and then press the arrow buttons since this is also a command, every movement can also be undone by pressing the undo button.


<br/>
`,
  step7:
  `
  ### Problem

<br/>

* SimpleDraw must be able to read and write the document using different formats (text, xml, binary, etc).

<br/>

### Solution

We can already create some amazing documents, but all the work is lost as soon as we refresh the page.

In this step, we will address how we can export our documents in different formats.

In order to achieve this, the visitor pattern will be used again, the shapes will continue to play the visitable role, as shown below.

\`\`\`javascript 
class Shape {
  (...)
  accept(visitor){
    return visitor.visit(this)
  }
}

\`\`\`

But the visitor will now be an exporter class that receives the document that will be exported.

\`\`\`javascript
class Exporter {
  constructor(document){
    this.document = document
    this.file = ''

  }

  export(){
    return this.document.root.accept(this);
  }

  visitGroup(shape){
    console.error('Abstract Class')
  }

  visitCircle(shape){
    console.error('Abstract Class')
  }

  visitRectangle(shape){
    console.error('Abstract Class')
  }
}
\`\`\`
This class can then be extended in order to implement many different types of export formats.
In this tutorial we implemented two types of exporters a *SimpleExporter* and an *XMLExporter*, we will go through each one of them now.

#### SimpleExporter

Starting with the *SimpleExporter*, this exporter, creates a file in a specific format developed by us. It consists of a very simplistic format, containing the necessary information in a minimalistic way to store all the document information.

Below you can find the implementation of the exporter as well as an example of the exported file.

\`\`\`javascript

class SimpleExporter extends Exporter {
    constructor(document){
      super(document)
    }

    visitGroup(shape){
      let content= '';
      for(let s of shape.shapes) {
        content += \` \${s.accept(this)} \`
      }

      let result = \`G \${shape.id} \${shape.name} \${shape.x | 0} \${shape.y | 0} [\${content}]\` 

      return result
    }

    visitCircle(shape){
      return \`C \${shape.id} \${shape.name} \${shape.x | 0} \${shape.y | 0} \${shape.radius | 0}\`
    }

    visitRectangle(shape){
      return \`R \${shape.id} \${shape.name} \${shape.x | 0} \${shape.y | 0} \${shape.width | 0} \${shape.height | 0}\`
    }
}
\`\`\`
Exported file example:
\`\`\`javascript
G 23 Root 0 0 [ 
  C 24 Circle 121 74 97  
  G 25 Group0 0 0 [ 
    C 26 Circle 65 59 88 
  ]  
  C 27 Circle 67 115 195  
  R 28 Rectangle 96 174 34 92 
]
\`\`\`
#### XMLExporter

Now addressing the *XMLExporter*, as you probably already guessed, this exporter creates files in the XML format that we all know.
You can find the implementation below (it is rather similar to the simpleExporter implementation).

\`\`\`javascript
class XMLExporter extends Exporter {
    constructor(document){
      super(document)

      this.file = '<?xml version="1.0" encoding="iso-8859-1"?>'
    }

    visitGroup(shape){
      let content = ''

      for(let s of shape.shapes) {
        content += \` \${s.accept(this)} \`
      }

      return \`<group id='\${shape.id}' name='\${shape.name}' x='\${shape.x | 0}' y='\${shape.y | 0}'> \${content} </group>\`
    }

    visitCircle(shape){
      return \`<circle id='\${shape.id}' name='\${shape.name}' x='\${shape.x | 0}' y='\${shape.y | 0}' radius='\${shape.radius | 0}'>  </circle>\`
    }

    visitRectangle(shape){
      return \`<rectangle id='\${shape.id}' name='\${shape.name}' x='\${shape.x | 0}' y='\${shape.y | 0}' width='\${shape.width | 0}' height='\${shape.height | 0}'>  </rectangle>\`
    }
}
\`\`\`
Exported file example:
\`\`\`xml
<group id='23' name='Root' x='0' y='0'>  
  <circle id='24' name='Circle' x='121' y='74' radius='97'></circle>  
  <group id='25' name='Group0' x='0' y='0'>  
    <circle id='26' name='Circle' x='65' y='59' radius='88'></circle>  
  </group>  
  <circle id='27' name='Circle' x='67' y='115' radius='195'></circle>  
  <rectangle id='28' name='Rectangle' x='96' y='174' width='34' height='92'></rectangle>  
</group>
\`\`\`


### Test Demo
<br/>

* In order to export the document, the user must press one of the export buttons, *Export Simple*(export the file in the simple format) or *Export XML*(export the file in the XML format);
* This will open a dialog with the exported result that contains a handy button to copy the document to the clipboard.

<br/>
`,
  step8:
`
### Problem

<br/>

* SimpleDraw must be able to read and write the document using different formats (text, xml, binary, etc).

<br/>

### Solution

In the previous step we added the functionality to successfully export our documents, but what about importing the documents?

This will be covered in this step!

In order to interpret the previously exported files, we will use the interpreter design pattern with some modifications to the one addressed by the gang-of-four.

First of all, we need to create our base expression class. 
This will then be implemented by concrete classes that will interpret the provided expressions in the right way. 
The expression receives the file to be interpreted, the factory to instantiate all the shapes and lastly the document to which the shapes will be attached. 

\`\`\`javascript
class Expression {
  constructor(file, factory, document){
    this.file = file
    this.factory = factory
    this.document = document
  }

  interpret(){
    console.error('Abstract class')
  }
}
\`\`\`

We developed two interpreters (one for each format stated in the step 7).

Starting with the simple interpreter, this class is rather extense due to the necessity to validate all the expression interpretation steps.
But the followed process can be briefly understood, just by looking to the following context-free grammar(CFG).

\`\`\` 
  I -> G 
  F -> C| R | I | 0
  C -> "C" id nome x y r
  R -> "R" id nome x y w h
  G -> "G" id nome x y [F]
\`\`\`

A tokenizer class was also developed in order to split the file in tokens and provide the necessary methods to handle this tokens in the interpreter class.

\`\`\`javascript
class Tokenizer{
  constructor(string){
    this.tokens = string.replace(/\s+/g,' ').split(' ')
    this.index = 0;
  }

  peek(){
    if(this.index < this.tokens.length)
      return this.tokens[this.index]
    else
      return null
  }

  hasNext(){
    return (this.index < this.tokens.length)
  }

  pop(){
    if(this.index < this.tokens.length)
      return this.tokens[this.index++]
    else
      return null
  }
}
\`\`\`
A simplified version of the SimpleInterpreter class can be seen below, this version only contains the schema of the class with a brief explanation.
For further understanding, a link to the source code with the full implementation is provided on the homepage of this tutorial.

\`\`\`javascript
class SimpleInterpreter extends Expression{
  constructor(file, factory, document){
    super(file, factory, document)
    this.tokenizer = new Tokenizer(file)
    this.groups = []
  }
  
  appendShape(shape){
    /*
      Appends the shape to it's parent when it is created
    */
  }

  // Represents the 'I' in the CFG
  interpret(){
    /*
      Start point of the interpretation process, calls g()
    */
  }

  // Represents the 'G' in the CFG
  g(){
    /* 
      Parses, instantiates and appends the group shape to its parent 
      using the shape factory and the appendShape() function. 
      Then calls f() in order to parse all the children.
    */
  }

  // Represents the 'C' in the CFG
  c(){
    /*    
      Parses and instantiates and appends the circle shape using the shape factory 
      and the appendShape() function.
    */
  }

  // Represents the 'R' in the CFG
  r(){
    /*    
      Parses and instantiates and appends the rectangle shape using the shape factory 
      and the appendShape() function.
    */
  }

  // Represents the 'F' in the CFG
  f(){
    /*
      Calls g(), c(), r(), in order to continue the parsing of the nested structures
    */
  }
}
\`\`\`

Now we have the XMLInterpreter, the schema followed by this interpreter is very similar to the shown above.
The difference of this interpreter lies in the fact that the tokenizer is not used anymore and the XML tags are handled by the *DOMParser*.

Below is available the basic schema of the class without the explanation of each function, since that is identical to the stated above.

\`\`\`javascript
class XMLInterpreter extends Expression{
  constructor(file, factory, document){
    super(file, factory, document)
    this.groups = []
    this.xmlDoc = new DOMParser().parseFromString(this.file,"text/xml");
  }

  // Indentical to the SimpleExporter schema
  
  appendShape(shape){
  }

  interpret(){
  }

  g(root){
  }

  c(root){    
  }

  r(root){   
  }


  f(nodes){
  }

}
\`\`\`

### Test Demo
<br/>

* In order to test this feature, the user should click in import button for the right format and then past the previously exported text;
* Then the user just has to submit and the changes will automagically be applied to the document.

<br/>
`,
  }
}