class gameOfLife {
 constructor(widthUnit, heightUnit) {
  this.canvas = new Canvas();
  this.canvas.canvas.addEventListener("click", (event) =>
   this.handlerClick(event)
  );
  this.widthtSize = this.canvas.width / widthUnit;
  this.heightSize = this.canvas.height / heightUnit;
  this.lastRender = Date.now();
  this.Cells = [];
  this.cellSize = {
   width: widthUnit,
   height: heightUnit,
  };
  this.init();
  this.render();
  this.setNeighbors();
 }

 getRandomNumer(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
 }

 init() {
  for (let y = 0; y < this.heightSize; y++) {
   let line = [];
   this.Cells.push(line);
   for (let x = 0; x < this.widthtSize; x++) {
    let randomLife = this.getRandomNumer(0, 1);

    let cell = {
     alive: randomLife,
     x: x * this.cellSize.width,
     y: y * this.cellSize.height,
     nextStatus: 0,
    };

    line.push(cell);
   }
  }
 }

 render() {
  this.Cells.forEach((line) => {
   line.forEach((cell) => {
    this.renderCell(cell);
   });
  });
 }

 renderCell(cell) {
  cell.alive
   ? this.canvas.rectangle(
      cell.x,
      cell.y,
      this.cellSize.width,
      this.cellSize.height,
      "#8257e5"
     )
   : this.canvas.rectangle(
      cell.x,
      cell.y,
      this.cellSize.width,
      this.cellSize.height,
      "white"
     );
 }
 handlerClick(event) {
  let posX = event.offsetX;
  let posY = event.offsetY;
  let x = Math.trunc(posX / this.cellSize.width);
  let y = Math.trunc(posY / this.cellSize.height);
  let cell = this.Cells[y][x];
  cell.alive = +!cell.alive;
  this.renderCell(cell);
 }

 setNeighbors() {
  this.Cells.forEach((line, y) => {
   line.forEach((cell, x) => {
    cell.neighbors = [];
    for (let dy = -1; dy <= 1; dy++) {
     for (let dx = -1; dx <= 1; dx++) {
      if (dx !== 0 || dy !== 0) {
       let nx = x + dx;
       let ny = y + dy;
       if (nx >= 0 && nx < this.widthtSize && ny >= 0 && ny < this.heightSize) {
        let ncell = this.Cells[ny][nx];
        cell.neighbors.push(ncell);
       }
      }
     }
    }
   });
  });
 }

 clearCells() {
  this.Cells.forEach((line) => {
   line.forEach((cell) => {
    cell.alive = 0;
   });
  });
 }

 calcNeighbors() {
  this.Cells.forEach((line) => {
   line.forEach((cell) => {
    let neighbors = 0;
    cell.neighbors.forEach((ncell) => {
     neighbors += ncell.alive;
    });
    if (!!cell.alive) {
     cell.nextStatus = +(neighbors >= 2 && neighbors <= 3);
    } else {
     cell.nextStatus = +(neighbors == 3);
    }
   });
  });
 }

 update() {
  this.Cells.forEach((line) => {
   line.forEach((cell) => {
    cell.alive = cell.nextStatus;
   });
  });
 }

 run() {
  let time = Date.now() - this.lastRender;
  if (time >= 150) {
   this.lastRender = Date.now();
   this.calcNeighbors();
   this.update();
   this.render();
  }
 }
}

var game = new gameOfLife(50, 50);
var idAnimation;

function loop() {
 game.run();
 idAnimation = requestAnimationFrame(loop);
}

//buttons

const btStart = document.querySelector("#start");
const btStop = document.querySelector("#stop");
const btClear = document.querySelector("#clear");

btStart.onclick = () => {
 if (!idAnimation) {
  btStop.style.backgroundColor = "white";
  btStart.style.backgroundColor = "blue";
  idAnimation = requestAnimationFrame(loop);
 }
};

btStop.onclick = () => {
 if (idAnimation) {
  btStart.style.backgroundColor = "white";
  btStop.style.backgroundColor = "blue";
  cancelAnimationFrame(idAnimation);
  idAnimation = 0;
 }
};
btClear.onclick = () => {
 if (idAnimation) cancelAnimationFrame(idAnimation);
 btStart.style.backgroundColor = "white";
 btStop.style.backgroundColor = "white";
 idAnimation = 0;
 game.clearCells();
 game.render();
};
