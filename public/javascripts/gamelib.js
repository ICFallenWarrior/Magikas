const width = 1000;
const height = 400;

var boardMan;

function preload() {
    BoardManager.preloadImages();
    BoardManager.preloadOpImages();

    boardMan = new BoardManager(width,height,0,0,room);
    boardMan.initBoard();
}

function setup() {
    var canvas = createCanvas(width, height);
    canvas.parent('game');
}
function draw() {
    background(220);
    boardMan.draw();
}

function opdraw(){
    background(220);
    boardMan.opdraw();
}


function mouseClicked() {
    boardMan.click(mouseX,mouseY);     
}