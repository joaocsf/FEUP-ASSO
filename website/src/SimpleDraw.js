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
    visitor.visit(this)
  }
}

class Rectangle extends Shape {
  constructor(name, x, y, height, width) {
    super(name, x, y);
    this.height = height || 1;
    this.width = width || 1;
  }

  /*Step 4 Visitor*/
  accept(visitor){
    visitor.visitRectangle(this)
  }
}

class Circle extends Shape {
  constructor(name, x, y, radius) {
    super(name, x, y);
    this.radius = radius || 1;
  }

  /*Step 4 Visitor*/
  accept(visitor){
    visitor.visitCircle(this)
  }
}

class ShapeFactory {
  createCircle(name, x, y, radius) {
    return new Circle(name, x, y, radius)
  }

  createRectangle(name, x, y, height, width) {
    return new Rectangle(name, x, y, height, width)
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
    visitor.visitGroup(this)
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

class ConsoleCommand {
  constructor(){
    this.commands = []
    this.addCommand('help', 'Lists all the commands', this.listCommands)
    this.addCommand('?', 'Lists all the commands', this.listCommands)
  }

  listCommands(strs){
    let res = ""
    for(let cmd in this.commands)
      res += cmd + "\t" + this.commands[cmd]
    return res
  }

  addCommand(name, description, callback){
    this.commands[name] = {
      description: description,
      callback: callback
    }
  }

  executeCommand(line){
    let cmds = line.split("")
    if(cmds.length == 0) return
    let command = this.commands[cmds[0]]
    let res = command.callback() 
    if(!res)
      return "Usage:" + cmds[0] + "\t" + command.description

    return res
  }
}
export {ShapeFactory, Document, ConsoleCommand, GraphicVisualizer, TextVisualizer, GraphicVisualizerExtended, MoveCommand}