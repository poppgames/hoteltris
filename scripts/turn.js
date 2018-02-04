//Takes one turn

var posX = 0;
var posY = 0;
var currentShape;

var isGameOver = false;

function getCellWidth() {
    return canvasWidth() / BOARD_WIDTH;
}
function getCellHeight() {
    return canvasHeight() / BOARD_HEIGHT;
}
function getCellX() {
    return Math.floor((posX / canvasWidth()) * BOARD_WIDTH);
}
function getCellY() {
    return Math.floor((posY / canvasHeight()) * BOARD_HEIGHT);
}

var speed_x = 1;
var speed_y = 1;
function canvasWidth() {
    return 300; //TODO, based pixel or soemthing
}
function canvasHeight() {
    return 300; //TODO, based pixel or soemthing
}

function turnStart()
{
    currentShape = getShape();
    posX = 0;
    posY = canvasHeight(); //TODO, is 0 at top of screen or bottom?

    //check for game over
    for(var x = 0; x < BOARD_HEIGHT; x++) {
        if(isColliding(x, BOARD_HEIGHT - 1, currentShape)) {
            isGameOver = true;
        }
    }
}


var checkEvery = 0;
function turnUpdate()
{
    if(isGameOver) {
        return;
    }
    if(isMouseDown()) {
        if(mouseX < posX) {
            moveLeft();
        } else {
            moveRight();
        }
    }
    moveDown();


    //Implement the clock feature in 3JS
    checkEvery--;
    if(checkEvery < 0) {
        checkEvery = 10;
        turnTileUpdate();
    }


}

function turnTileUpdate() {
    var x = getCellX();
    var y = getCellY();

    if(isColliding(x,y, currentShape)) {
        placeShape(x,y, currentShape);
        applyGravityToPlacedShape(x,y);
        mergeCellsOnBoard();

        //end turn
        turnStart();
    }
    updateCubePositions(currentShape);
}

function moveLeft(){
    posX -= speed_x;
    if(posX < 0) {
        posX = 0;
    }
    //TODO check for cell collisions
}

function moveRight(){
    posX += speed_x;
    if(posX > canvasWidth()) {
        posX = canvasWidth();
    }
    //TOOD check for cell collisions
}
function moveDown(){
    posY -= speed_y; //TODO, is 0 at top of screen or bottom?
    if(posY < 0) {
        posY = 10;
    }
}