


const SHAPE_LENGTH = 3;
const BOARD_WIDTH = 5;
const BOARD_HEIGHT = 10;

var board = createArray(BOARD_WIDTH, BOARD_WIDTH);

function cellBelow(x,y) {
    return board[x][y - 1];
}

function cellRight(x, y) {
    return board[x + 1][y];
}
function cellLeft(x, y) {
    return board[x - 1][y];
}
function cellAt(x,y){
    return board[x][y];
}

function resetBoard() {

    for(let i = 0; i < BOARD_WIDTH; i++){
        for(let j = 0; j < BOARD_HEIGHT; j++) {
            board[i][j] = undefined;
        }
    }
}

function moveCell(x, y, newX, newY) {
    console.log("moving cell from y " + y + " to " + newY + " | x " + x + " to " + newX);
    board[newX][newY] = cellAt(x,y); //might cause memroty issues, due to setting and stuff
    board[x][y] = undefined;
}
function isEmptyCell(cell) {
    return cell == undefined;
}

function isInBoard(x, y) {
    return (x >= 0 && x < BOARD_WIDTH && y >= 0 && y < BOARD_HEIGHT);
}
function isEdgeCell(x){
    return (x < 1 || x >= BOARD_WIDTH - 1);
}

function isBottomCell(y) {
    return y == 0;
}

function isColliding(x, y, shape){
    console.log("Shape: " + shape);
    for(let i = 0; i < SHAPE_LENGTH; i++){
        for(let j = 0; j < SHAPE_LENGTH; j++){
    
            if(shape[i][j] > 0) {
                if(isInBoard(x + i, y + j)) {
                    //check if 
                    if(isBottomCell(y)) {
                        return true;
                    }
                    if(!isEmptyCell(cellBelow(x + i, y + j))) {
                        return true;
                    }
                }
            }
        }
    }
}

//assumes that we already verified that this shape is in the board
function placeShape(x, y, shape){
    for(let i = 0; i < SHAPE_LENGTH; i++){
        for(let j = 0; j < SHAPE_LENGTH; j++){
            if(shape[i][j] > 0) {
                var newCell = addDecorCell();
                board[x + i][y + j] = newCell;
            }
        }
    }
}
function applyGravityToBoard() {
    //Make blocks on bottom fall first
    for(let i = 0; i < BOARD_WIDTH; i++){
        for(let j = 0; j < BOARD_HEIGHT; j++) {
            applyGravity(i, j);
        }
    }
}
//assumes that we already verified that this shape is in the board
function applyGravityToPlacedShape(x, y){
    //bottom up
    for(let i = 0; i < SHAPE_LENGTH; i++){
        for(let j = 0; j < SHAPE_LENGTH; j++){
            if(isInBoard(x + i, y + j)) {
                if(currentShape[i][j] > 0) {
                    applyGravity(x + i, y + j);
                }
            }
        }
    }
}

function applyGravity(x, y){
    var cell = cellAt(x, y);
    var startY = y;
    var gravY = startY - 1;
    console.log("grav j" + gravY);
    while(gravY >= 0 && isEmptyCell(cellAt(x, gravY))) {
        gravY--;
    }
    gravY++; //place cell above cell that exists on board

    if(gravY != startY) {
        moveCell(x , startY, x, gravY);
    }
}

function upgradeCellsOnBoard(){
    for(let i = 0; i < BOARD_WIDTH; i++){
        for(let j = 0; j < BOARD_HEIGHT; j++) {
            tryToUpgrade(i, j);
        }
    }
}

function mergeCellsOnBoard(){
    for(let i = 0; i < BOARD_WIDTH; i++){
        for(let j = 0; j < BOARD_HEIGHT; j++) {
            var cell = cellAt(i,j);
            var flags = canMerge(i,j);
            if(flags > 0) {
                console.log("Merging Cell with flags " + flags)
                mergeCell(i, j, flags); //might be a bit awkward, since it is a greedy approach
            }
        }
    }
}

function tryToUpgrade(x, y){
    
    var cell = cellAt(x,y);
    if(isEmptyCell(cell)) {
        return;
    }


    var rightCell; 
    var leftCell;
    

    //wrap around
    if(isEdgeCell(x + 1)) {
        rightCell = cellAt(0, y);
    } else {
        rightCell = cellRight(x,y);
    }
    if(isEdgeCell(x - 1)) {
        leftCell = cellAt(BOARD_WIDTH - 1, y);
    } else {
        leftCell = cellLeft(x,y);
    }
    
    if(isEmptyCell(rightCell)) {
        return;
    }
    if(isEmptyCell(leftCell)) {
        return;
    } 

    cellUpgrade(cell, leftCell, rightCell);
}

//int, int, DecorName
function canMerge(x, y)
{
    if(isEdgeCell(x))
    {
        return false;
    }

    var cell = cellAt(x,y);

    if(isEmptyCell(cell)) {
        return 0;
    }

    var rightCell = cellRight(x,y);
    var leftCell = cellLeft(x,y);

    console.log("right " + rightCell);
    if(isEmptyCell(rightCell)){
        return 0;
    }

    console.log("left " + leftCell);
    if(isEmptyCell(leftCell)){
        return 0;
    }
    console.log("checking cells for same: " + cell + ", " + rightCell + ", " + leftCell);

    //a bit flag of all the ones which are the same
    return cellSameOnAnyLevel(cell, rightCell, leftCell);
}


//Assumes that we already checked for it
function mergeCell(x, y, flags){

    if(flags == 0) {
        return;
    }

    var cell = cellAt(x,y);
    cellMerge(cell, cellLeft(x,y), cellRight(x,y), flags);
    board[x - 1][y] = undefined;
    board[x + 1][y] = undefined;
}

