let ID = 0
class Shape {
  constructor(name, x, y) {
    this.position_x = x || 0;
    this.position_y = y || 0;
    this.name = name;
    this.id = ID++
  }

  translate(x, y) {
    this.position_x += x || 0;
    this.position_y += y || 0;
  }

  getName(){
    return this.id + ": "  + this.name
  }

  draw(context) {

  }
}

class Rectangle extends Shape {
  constructor(name, x, y, height, width) {
    super(name, x, y);
    this.height = height || 1;
    this.width = width || 1;
  }

  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Circle extends Shape {
  constructor(name, x, y, radius) {
    super(name, x, y);
    this.radius = radius || 1;
  }

  draw(context) {

    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    context.stroke();
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
}

class TextVisualizer extends Visualizer {
  constructor() {
    super()
  }

  representation(group) {
    group = group || this.root
    console.log(group)
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
}

class GraphicVisualizer extends Visualizer {
  constructor() {
    super()
  }

  representation(group) {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    group.draw(context);
    return canvas;
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