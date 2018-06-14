let ID = 0
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

  getName(){
    return this.id + ": "  + this.name
  }

  /*Step 4 Visitor*/
  accept(visitor){
    return visitor.visit(this)
  }
}

class Rectangle extends Shape {
  constructor(name, x, y, width, height) {
    super(name, x, y);
    this.width = width || 1;
    this.height = height || 1;
  }

  /*Step 4 Visitor*/
  accept(visitor){
    return visitor.visitRectangle(this)
  }
}

class Circle extends Shape {
  constructor(name, x, y, radius) {
    super(name, x, y);
    this.radius = radius || 1;
  }

  /*Step 4 Visitor*/
  accept(visitor){
    return visitor.visitCircle(this)
  }
}

class ShapeFactory {
  createCircle(name, x, y, radius) {
    return new Circle(name, x, y, radius)
  }

  createRectangle(name, x, y, width, height) {
    return new Rectangle(name, x, y, width, height)
  }

  createGroup(name, x, y) {
    return new Group(name, x, y)
  }
}

class Group extends Shape {
  
  constructor(name, x,y) {
    super(name, x,y);
    this.shapes = [];
  }

  append(shape) {
    this.shapes.push(shape);
  }
  
  remove (shape) {
    let index = this.shapes.indexOf(shape)

    if(index != -1)
      this.shapes.splice(index, 1)
  }

  translate(x, y) {
    this.foreach(shape => {if(shape !== this) shape.translate(x,y)})
  }

  foreach(action) {
    action(this)
    for(let shape of this.shapes){
      if(shape instanceof Group)
        shape.foreach(action)
      else
        action(shape)
    }
  }
  
  /*Step 4 Visitor*/
  accept(visitor){
    return visitor.visitGroup(this)
  }
}

class Document {
  constructor(){
    this.root = new Group('Root')

    /* Step 5 Observer */
    this.listeners = []

    /* Step 6 Command */
    this.commands = []
  }

  attach(observer){
    this.listeners.push(observer)
    observer.update()
  }

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

  notify(){
    for(let listener of this.listeners)
      listener.update()
  }

  addShape(shape, group) {
    group = group || this.root
    this.addCommand(new AddCommand(shape, group))
  }

  setRoot(root){
    this.root = root
    this.notify()
  }

}

/* Start of step 3 */
class Visualizer {

  constructor() {}

  /*Step 5 Observer */
  update(){
    this.draw()
  }

  draw() {
    console.error('Abstract Class')
  }
}

class TextVisualizer extends Visualizer {
  constructor(anchor, document) {
    super()
    this.document = document
    this.anchor = anchor
  }

  representation(group) {
    group = group || this.document.root
    let res = `<div> ${group.getName()} (${group.x | 0}, ${group.y | 0}) </div>`
    let content = ''
    for(let shape of group.shapes){
      let isGroup = shape instanceof Group
      let subcontent = isGroup ? this.representation(shape) : ` ${shape.getName()} (${shape.x | 0}, ${shape.y | 0})`
      content += `<li class="${isGroup?'group':' '}" > ${subcontent} </li>`
    }
    if(content.length > 0)
      res += `<ul> ${content} </ul>`
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

/* End of step 3 */

/* Start of step 4 */

class GraphicVisualizerExtended extends Visualizer {
  constructor(context, document) {
    super()
    this.context = context
    this.document = document
  }

  draw(){
    this.context.fillStyle="#000000"
    this.context.fillRect(0,0,2000,2000)
    if(this.context == null) return
    this.document.root.foreach(
      (shape) => {
        shape.accept(this)
      }
    )
  }

  visitRectangle(shape){
    this.context.fillStyle="#"+((1<<24)*Math.random()|0).toString(16)
    this.context.fillRect(shape.x,shape.y,shape.width, shape.height)
  }

  visitCircle(shape){
    this.context.fillStyle="#"+((1<<24)*Math.random()|0).toString(16)
    this.context.beginPath()
    this.context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI, false);
    this.context.fill()
  }

  visitGroup(shape){
  }
}

/*Step 6*/

class Command {
  execute(){
    console.error('Abstract Class')
  }
  unexecute(){
    console.error('Abstract Class')
  }
}

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



/*End of Step 6*/


/* Create step 7*/

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

class SimpleExporter extends Exporter {
    constructor(document){
      super(document)
    }

    visitGroup(shape){
      let content= '';
      for(let s of shape.shapes) {
        content += ` ${s.accept(this)} `
      }

      let result = `G ${shape.id} ${shape.name} ${shape.x | 0} ${shape.y | 0} [${content}]` 

      return result
    }

    visitCircle(shape){
      return `C ${shape.id} ${shape.name} ${shape.x | 0} ${shape.y | 0} ${shape.radius | 0}`
    }

    visitRectangle(shape){
      return `R ${shape.id} ${shape.name} ${shape.x | 0} ${shape.y | 0} ${shape.width | 0} ${shape.height | 0}`
    }
}

class XMLExporter extends Exporter {
    constructor(document){
      super(document)

      this.file = '<?xml version="1.0" encoding="iso-8859-1"?>'
    }

    visitGroup(shape){
      let content = ''

      for(let s of shape.shapes) {
        content += ` ${s.accept(this)} `
      }

      return `<group id=${shape.id} name=${shape.name} x=${shape.x | 0} y=${shape.y | 0}> ${content} </group>`
    }

    visitCircle(shape){
      return `<circle id=${shape.id} name=${shape.name} x=${shape.x | 0} y=${shape.y | 0} radius=${shape.radius | 0}>  </circle>`
    }

    visitRectangle(shape){
      return `<rectangle id=${shape.id} name=${shape.name} x=${shape.x | 0} y=${shape.y | 0} width=${shape.width | 0} height=${shape.height | 0}> ${shape.name} </rectangle>`
    }
}

/*End step 7*/ 


/* Step 8*/ 
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


class Expression {
  constructor(file, factory, document){
    this.file = file
    this.factory = factory
    this.document = document
    this.tokenizer = new Tokenizer(file)
  }

  interpret(){
    console.error('Abstract class')
  }
}

class SimpleInterpreter extends Expression{
  constructor(file, factory, document){
    super(file, factory, document)

    this.groups = []
  }

  appendShape(shape){
    if(this.groups.length == 0)
      return
    else {
      this.groups[this.groups.length - 1].append(shape)
    }
  }


  parse(){
    if(this.g())
      this.document.setRoot(this.groups.pop())
    else
      return false
  
    return true
  }

  g(){
    if(this.tokenizer.hasNext()){
      if(this.tokenizer.peek() == 'G'){
        this.tokenizer.pop()

        let id = this.tokenizer.pop() | 0
        let name = this.tokenizer.pop()
        let x = this.tokenizer.pop() | 0
        let y = this.tokenizer.pop() | 0


        let group = this.factory.createGroup(name, x, y)
        group.id = id
        this.appendShape(group)
        this.groups.push(group)
      
        if(this.tokenizer.pop() == '['){
          if(this.f())
            if(this.tokenizer.pop() == ']'){
              if(this.groups.length > 1)
                this.groups.pop()
              
                return true
            }
        }
        
        return false
      }
    }else{
      return true
    }
  }

  c(){    
    if(this.tokenizer.hasNext() && this.tokenizer.peek() == 'C'){
      this.tokenizer.pop()

      let id = this.tokenizer.pop() | 0
      let name = this.tokenizer.pop()
      let x = this.tokenizer.pop() | 0
      let y = this.tokenizer.pop() | 0
      let radius = this.tokenizer.pop() | 0
      
      let circle = this.factory.createCircle(name, x, y, radius)
      circle.id = id
      this.appendShape(circle)

      return true
    }    
    return false
  }

  r(){    
    if(this.tokenizer.hasNext() && this.tokenizer.peek() == 'R'){
      this.tokenizer.pop()

      let id = this.tokenizer.pop() | 0
      let name = this.tokenizer.pop()
      let x = this.tokenizer.pop() | 0
      let y = this.tokenizer.pop() | 0
      let width = this.tokenizer.pop() | 0
      let height = this.tokenizer.pop() | 0
      
      let rectangle = this.factory.createRectangle(name, x, y, width, height)
      rectangle.id = id
      this.appendShape(rectangle)

      return true
    }    
    return false
  }


  f(){
    while(this.tokenizer.hasNext() && this.tokenizer.peek() !== ']'){      
      if(!(this.c() || this.r() || this.g()))
        return false    
    }

    return true
  }

}
/* CFG 
G 0 Root 0 0 [ 
  C 1 Circle 22 143 28  
  R 2 Rectangle 196 91 97 106  
  G 3 Group0 0 0 [ R 4 Rectangle 201 125 52 54  C 5 Circle 281 149 186 ] ]

S -> G 
F -> C| R | S | 0
C -> "C" id nome x y r
R -> "R" id nome x y w h
G -> "G" id nome x y [F]
*/

/*End step 8*/



export {
  ShapeFactory,
  Document,
  ConsoleCommand,
  GraphicVisualizer,
  TextVisualizer,
  GraphicVisualizerExtended,
  MoveCommand,
  SimpleExporter,
  XMLExporter,
  SimpleInterpreter
}