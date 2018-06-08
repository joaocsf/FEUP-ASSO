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
}

class Document {
  constructor(){
    this.root = new Group('Root')
    this.map = {}
    this.map[this.root.id] = this.root
  }

  setVisualizer(visualizer) {
    this.visualizer = visualizer;
  }

  addShape(shape, group) {
    this.map[shape.id] = shape
    group = group || this.root;
    group.append(shape);
  }

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
}

/* Start of step 3 */

class Visualizer {

  constructor() {}
  representation(group) {
    return 'No visualizer found';
  }
}

class TextVisualizer extends Visualizer {
  constructor() {
    super()
  }

  representation(group) {
    // TODO: implement text representation
  }
}

class GraphicVisualizer extends Visualizer {
  constructor() {
    super()
  }

  representation(group) {
    // TODO: implement graphical representation
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
export {ShapeFactory, Document, ConsoleCommand}