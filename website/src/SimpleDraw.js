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
}

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

  draw(context) {
    for(var shape of this.shapes) {
      shape.draw(context);
    }
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
}

class Document {
  constructor(){
    this.root = new Group('Root')
    this.map = {}
    this.map[this.root.id] = this.root
    this.visualizer = new TextVisualizer();
  }

  setVisualizer(visualizer) {
    this.visualizer = visualizer;
  }

  addShape(shape, group) {
    this.map[shape.id] = shape
    group = group || this.root;
    group.append(shape);
  }

  getRepresentation() {
    return this.visualizer.representation(this.root);
  }

  /* This is needed for Step2. DO NOT DELETE */
  getHtml(group){
    group = group || this.root
    console.log(group)
    let res = `<div> ${group.getName()} </div>`
    let content = ''
    for(let shape of group.shapes){
      let isGroup = shape instanceof Group
      let subcontent = isGroup ? this.getHtml(shape) : shape.getName()
      content += `<li class="${isGroup?'group':''}" > ${subcontent} </li>`
    }
    if(content.length > 0)
      res += `<ul> ${content} </ul>`
    return res
  }
  /* Need for Step2 until here */
}

/* Start of step 3 */
class Visualizer {

  constructor() {}
  representation(group) {
    return '<div> No visualizer found </div>';
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
    let res = `<div> ${group.getName()} </div>`
    let content = ''
    for(let shape of group.shapes){
      let isGroup = shape instanceof Group
      let subcontent = isGroup ? this.representation(shape) : shape.getName()
      content += `<li class="${isGroup?'group':''}" > ${subcontent} </li>`
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

  representation(group) {
    if(this.context == null) return
    group.draw(this.context);
    return canvas;
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
export {ShapeFactory, Document, ConsoleCommand, GraphicVisualizer, TextVisualizer}