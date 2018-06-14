export default {
  steps: [
    {title: 'Step1', icon: 'label_important', route: 'step1'},
    {title: 'Step2', icon: 'label_important', route: 'step2'},
    {title: 'Step3', icon: 'label_important', route: 'step3'},
    {title: 'Step4', icon: 'label_important', route: 'step4'},
    {title: 'Step5', icon: 'label_important', route: 'step5'},
    {title: 'Step6', icon: 'label_important', route: 'step6'},
    {title: 'Step7', icon: 'label_important', route: 'step7'},
    {title: 'Step8', icon: 'label_important', route: 'step8'},
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

# TO-DO STEP 3

### Problem

<br/>

* A document must be viewed in different ways.

<br/>

### Solution

<br/>

<br/>

### Test Demo


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
# TO-DO STEP 6
### Problem

<br/>

* SimpleDraw must support Undo/ReDo of operations to the objects.

<br/>

### Solution


### Test Demo
<br/>

* Topic

<br/>
`,
  step7:
  `
# TO-DO STEP 7
visitor to export document
### Problem

<br/>

* SimpleDraw must be able to write the document using different formats (text, xml, binary, etc).

<br/>

### Solution


### Test Demo
<br/>

* Topic

<br/>
`,
  step8:
`
# TO-DO STEP 8
interpretor to import document
### Problem

<br/>

* SimpleDraw must be able to read the document using different formats (text, xml, binary, etc).

<br/>

### Solution


### Test Demo
<br/>

* Topic

<br/>
`,
  }
}