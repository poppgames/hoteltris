https://stackoverflow.com/questions/322378/javascript-check-if-mouse-button-down
var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}

function isMouseDown() {
  return mouseDown > 0;
}


var mouseX = 0;
var mouseY = 0;
// event handler function
function mousePositionHandler(e) {
  e = e || window.event;

  //TODO mabey something with canvas too possibly
  var pageX = e.pageX;
  var pageY = e.pageY;

  // IE 8
  if (pageX === undefined) {
      pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  //console.log(pageX, pageY);
  mouseX = pageX;
  mouseY = pageY;
}



//TODO where do we put this code???

// attach handler to the click event of the document
if (document.attachEvent) document.attachEvent('onclick', mousePositionHandler);
else document.addEventListener('click', mousePositionHandler);
