


const SHAPE_LENGTH = 3;
const BOARD_WIDTH = 10;
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

    for(var i = 0; i < BOARD_WIDTH; i++){
        for(var j = 0; j < BOARD_HEIGHT; j++) {
            board[i][j] = undefined;
        }
    }
}

function moveCell(x, y, newX, newY) {
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
    for(var i = 0; i < SHAPE_LENGTH; i++){
        for(var j = 0; j < SHAPE_LENGTH; j++){
    
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
    for(var i = 0; i < SHAPE_LENGTH; i++){
        for(var j = 0; j < SHAPE_LENGTH; j++){
            if(shape[i][j] > 0) {
                var newCell = addDecorCell();
                board[x + i][y + j] = newCell;
            }
        }
    }
}
//assumes that we already verified that this shape is in the board
function applyGravityToPlacedShape(x, y){
    //bottom up
    for(var i = 0; i < SHAPE_LENGTH; i++){
        for(var j = 0; j < SHAPE_LENGTH; j++){
            var cell = cellAt(x + i, y + j);
            var gravJ = j - 1;
            while(gravJ >= 0 && isEmptyCell(cellAt(x + i, gravJ))) {
                gravJ--;
            }
            gravJ++; //place cell above cell that exists on board

            if(gravJ != j) {
                moveCell(x + i , y + j, x + i, y + gravJ);
            }
        }
    }
}

function mergeCellsOnBoard(){
    for(var i = 0; i < BOARD_WIDTH; i++){
        for(var j = 0; j < BOARD_HEIGHT; j++) {
            var cell = cellAt(i,j);
            var flags = canMerge(i,j);
            mergeCell(i, j, flags); //might be a bit awkward, since it is a greedy approach
        }
    }
}

//int, int, DecorName
function canMerge(x, y, decorName)
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
}

