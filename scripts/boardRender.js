

const CUBES_HEIGHT =BOARD_HEIGHT + SHAPE_LENGTH;

var cubes = createArray(BOARD_WIDTH, CUBES_HEIGHT);

function isInCube(x, y) {
    return (x >= 0 && x < BOARD_WIDTH && y >= 0 && y < CUBES_HEIGHT);
}

function getCube(x, y) {
    //console.log("Getting cube: " + cubes[x][y] + " at x: " + x + " y: " + y);
    return cubes[x][y];
}
function createBoard() {

    for(var i = 0; i < BOARD_WIDTH; i++) {
        for(var j = 0; j < CUBES_HEIGHT; j++) {

            var geometry = new THREE.BoxGeometry(getCellWidth(), getCellHeight(), 10 );

            for ( var f = 0; f < geometry.faces.length; f += 2 ) {

                var hex = Math.random() * 0xffffff;
                geometry.faces[ f ].color.setHex( hex );
                geometry.faces[ f + 1 ].color.setHex( hex );

            }

            var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );

            var cube = new THREE.Mesh( geometry, material );
            cube.position.x = getCellWidth() * i;
            cube.position.y = getCellHeight() * j;
            cube.position.z = -1000;//i * 10 + j * 10;
            scene.add( cube );

            cubes[i][j] = cube;
        }
    }
}

function updateCubePositions(shape) {

    //Set position of cubes
    for(var i = 0; i < BOARD_WIDTH; i++){
        for(var j = 0; j < CUBES_HEIGHT; j++) {
            var cube = getCube(i, j);
            if(!isInBoard(i, j) || isEmptyCell(cellAt(i,j))) {
                cube.position.z = -1000;
            }
            else {
                cube.position.z = 0;
            }
            
        }
    }

    var x = getCellX();
    var y = getCellY();
    for(var i = 0; i < SHAPE_LENGTH; i++){
        for(var j = 0; j < SHAPE_LENGTH; j++){
            if(isInBoard(x + i, y + j)) {
                if(shape[i][j] > 0) {
                    if(isInCube(x + i, y + j)) {
                        var cube = getCube(x + i, y + j);
                        cube.position.z = 50;
                    }
                }
            }
        }
    }
}