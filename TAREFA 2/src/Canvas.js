class Canvas{
  constructor(){
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.width = this.context.canvas.clientWidth;
    this.height = this.context.canvas.clientHeight;

  }

  rectangle(x, y, width, height, color){
    this.context.fillStyle = color;
    this.context.stokeStyle = "black"
    this.context.fillRect(x, y, width, height)
    this.context.strokeRect(x, y, width, height)
    
  }
}