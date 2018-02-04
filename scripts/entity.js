function canMerge(x, y) {
    //loop through each property
    return true; //TODO
}

const DECOR_LEVELS = 3;
const DECOR_KINDS = 5;


var DNFlags = [1,2,4,8,16];

function hasFlag(value, flag) {
    return (flag & value) == value
}
var DN = new Enum('WALL', 'DOOR', 'FENCE', 'WINDOW', 'PLANT');
var DNIndex = [DN.WALL, DN.DOOR, DN.FENCE, DN.WINDOW, DN.PLANT];
var DC = new Enum('LEVEL')

var decor = new Object();
var decorPaths = new Object();


function addDecorCell()
{
    //kind, level
    var cell = createArray(DECOR_KINDS);
    for(var i = 0; i < DECOR_KINDS; i++) {
        cell[i] = {};
        cell[i][DC.LEVEL] = 0;
    }
    
    return cell;
}

//returns a bit flag of all the ones which are the same
function cellSameOnAnyLevel(cell, leftCell, rightCell) {

    var result = 0;
    for(var i = 0; i < DECOR_KINDS; i++) {
        if(cell[i][DC.LEVEL] === leftCell[i][DC.LEVEL] &&
            cell[i][DC.LEVEL] === rightCell[i][DC.LEVEL]) {
            result += DNFlags[i];
        }
    }
    return result;
};

 function cellMerge(cell, leftCell, rightCell, flag) {
    var result = 0;
    for(var i = 0; i < DECOR_KINDS; i++) {
        if(hasFlag(i, flag)) {
            cell[i][DC.LEVEL]++;
        }
    }
    leftCell = undefined;
    rightCell = undefined;
};


function getDecorImagePath(name, level)
{
    return "pic/" + name + "/" + level + ".png";
}




var decorIndex = 0;

function initDecor(){
    addDecor(DN.WALL);
    addDecor(DN.DOOR);
    addDecor(DN.FENCE);
    addDecor(DN.WINDOW);
    addDecor(DN.PLANT);

}

function addDecor(dn) {
    decor[dn] = decorIndex;

    //setup book for easy loopups
    decorPaths[decorIndex] = {};

    //setup strings for image paths
    for(var i = 0; i < DECOR_LEVELS; i++) {
        decorPaths[decorIndex][i] = getDecorImagePath(name, i);
    }
    decorIndex++;
}
