/**
 * typo outline displayed as dots
 *
 * KEYS
 * a-z                  : text input (keyboard)
 * backspace            : delete last typed letter
 * ctrl                 : save png
 */

var textTyped = "breakme";
var font;
var lineDensity = 20;
var lineDistance = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  opentype.load('data/FreeSans.otf', function(err, f) {
    if (err) {
      console.log(err);
    } else {
      font = f;
      loop();
    }
  });
}

function draw() {
  if (!font) return;

  background(255);
  // margin border
  translate(20, 540);

  if (textTyped.length > 0) {
    // get a path from OpenType.js
    lineDensity = map(mouseX,0,width,15,5);
    lineDistance = Math.floor(map(mouseY,0,height,5,30));
    //console.log(lineDistance);
    
    var fontPath = font.getPath(textTyped, 0, 0, 300);
    // convert it to a g.Path object
     
    var path = new g.Path(fontPath.commands);
    //console.log(path)
    
    path = g.resampleByLength(path, lineDensity);
    var subpaths = breakPath(path);
   // console.log(subpaths);
      
        
    //Draw circles
    var diameter = 6;
        
          
//        for (var i = 0; i < path.commands.length; i++) {
//          var pnt = path.commands[i];
//            noFill();
//            stroke(255,5,5);
//            strokeWeight(1);
//            ellipse(pnt.x, pnt.y, diameter, diameter);
//        }
//
//       
        
       // draw connecting lines
      var c=0;
          for(var iii = 0; iii < subpaths.length; iii++){
           // beginShape(QUAD_STRIP);
              
              for (var ii = 0; ii < subpaths[iii].length; ii++) {
                
                fill(255,0,0);
                stroke(50);
                strokeWeight(1);
                var numOfPoints = subpaths[iii].length;
                //console.log(subpaths[iii][ii]);
                var pnt1 = subpaths[iii][ii];
//                console.log(pnt1);
                var pnt2 = subpaths[iii][(ii+lineDistance) % numOfPoints];

                //vertex(pnt1.x, pnt1.y);
                //vertex(pnt2.x, pnt2.y);
                  line(pnt1.x, pnt1.y, pnt2.x, pnt2.y);
                   
            }
             // endShape();
          }

       
      }
//   noLoop();  
}





function breakPath(path) {
    var subpaths = [];
    var subpath = [];
    for (var ii = 0; ii < path.commands.length; ii++) {
        
        var type = path.commands[ii].type;
        if (type == "Z") {
            subpaths.push(subpath);
            subpath = [];
        } else {
            subpath.push(path.commands[ii]);
        }
    }
    //console.log(subpaths);
    return subpaths;
}

function keyReleased() {
  // export png
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
}

function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
    }
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
  }
}
