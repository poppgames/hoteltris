
//note top = bottom of shape
function getShape()
{
    var chance = 0.7;
    for(var i = 0; i < SHAPE_COUNT - 1; i++){
        if(Math.random() < chance) {
            console.log("SHAPE = " + i);
            return SHAPES[i];
        }
        chance *= 0.9;
    }
    console.log("SHAPE = 8");
    return SHAPES[SHAPE_COUNT - 1];
}
const SHAPE_COUNT = 8;
const SHAPES = [
    [
        [1,0,0],
        [0,0,0],
        [0,0,0],
    ],
    [
        [1,1,0],
        [0,0,0],
        [0,0,0],
    ],
    [
        [1,0,0],
        [1,0,0],
        [0,0,0],
    ],
    [
        [1,1,1],
        [0,0,0],
        [0,0,0],
    ],
    [
        [1,0,0],
        [1,0,0],
        [1,0,0],
    ],
    [
        [1,1,0],
        [1,1,0],
        [0,0,0],
    ],
    [
        [1,1,1],
        [1,0,0],
        [0,0,0],
    ],
    [
        [1,1,1],
        [0,1,0],
        [0,0,0],
    ]
];