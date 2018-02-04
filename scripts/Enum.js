//https://stackoverflow.com/questions/287903/what-is-the-preferred-syntax-for-defining-enums-in-javascript

function Enum() {
    var that = this;

    for (var i in arguments) {
        that[arguments[i]] = i;
    }
    this.name = function(value) {
        for (var key in that) {
            if (that[key] == value) {
                return key;
            }
        }
    };
    this.exist = function(value) {
        return (typeof that.name(value) !== "undefined");
    };
    if (Object.freeze) {
        Object.freeze( that);
    };
  }

/*
  var Color = new Enum('RED', 'GREEN', 'BLUE');
undefined
Color.name(Color.REDs)
undefined
Color.name(Color.RED)
"RED"
Color.exist(Color.REDs)
false
Color.exist(Color.RED)
true
*/