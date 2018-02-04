//Takes one turn

var posX = 0;
var posY = 0;
var currentShape;
var leftMostXShapeIndex;
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
function getCellXOffset() {
   return posX - (getCellX() * getCellWidth());
}
function getCellYOffset() {
    var yOffset = posY - (getCellY() * getCellHeight())
    console.log(yOffset);
    return yOffset;
}
function isAtRightEdge() {
    var x =  getCellX() + leftMostXShapeIndex;
    console.log("Right Edge: " + x);
    return x >= BOARD_WIDTH;
}
function isCollidingAtCurrentCell() {
    var x = getCellX();
    var y = getCellY();
    return isColliding(x, y, currentShape);
}

var speed_x = 2;
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
    leftMostXShapeIndex = 0;
    for(var i = 0; i < SHAPE_LENGTH; i++){
        for(var j = 0; j < SHAPE_LENGTH; j++){
            if(currentShape[i][j] > 0) {
                if(leftMostXShapeIndex < i) {
                    leftMostXShapeIndex = i;
                }
            }
        }
        console.log("shape i" + leftMostXShapeIndex);
    }

    posX = 0;
    posY = canvasHeight(); //TODO, is 0 at top of screen or bottom?

    //check for game over
    for(var x = 0; x < BOARD_HEIGHT; x++) {
        if(isColliding(x, BOARD_HEIGHT - 1, currentShape)) {
            isGameOver = true;
            console.log("GAME OVER");
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
    var oldX = getCellX();
    if(posX < 0) {
        posX = 0;
    }
    else if(getCellX() != oldX && isCollidingAtCurrentCell()) {
        console.log("not empty cell");
        posX += speed_x;
    }
}

function moveRight(){
    posX += speed_x;
    if(isAtRightEdge()) {
        posX -= speed_x;
    }
    else if(isCollidingAtCurrentCell()) {
        console.log("not empty cell");
        posX -= speed_x;
    }
}
function moveDown(){
    posY -= speed_y; //TODO, is 0 at top of screen or bottom?
    if(posY < 0) {
        posY = 0;
    }
}