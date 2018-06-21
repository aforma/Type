var alphabet = require('./alphabet')
var Letter = require('./letter');

var ctx = undefined;
var env = undefined;
var scale = undefined;
var COL_WIDTH = 0;
var COL_HEIGHT = 0;

var START_X = 0;
var START_Y = 0;

var letter = undefined;

var time = undefined;
var current = undefined;

var USED_LETTER = alphabet.C;
var saved = false;

exports.setup = function(_ctx, _env, _scale){
  ctx = _ctx;
  env = _env;
  scale = _scale;

  time = Date.now()

  START_X = (ctx.canvas.width / 2);
  START_Y = (ctx.canvas.height - (60 * scale ))
  letter = new Letter(START_X, START_Y, USED_LETTER, ctx, scale);

  if(env.server) {
    setTimeout(()=>{
      env.done()
    }, 60000);
  }
}

exports.draw = function() {
  current = Date.now()
  if(current > time + 1000) {
  }
  if(current > time) {
    time = current
    if(letter.evolve()) {
      background("rgba(255,255,255,0.1)");
      letter.draw()
    } else {
      if (!saved) {
        // env.done()
        saved = true;
      }
    }
  }
}

function drawLetter() {
  var total = USED_LETTER.length;
  ctx.beginPath();
  for(var i = 0; i < total; i+= 2) {
    ctx.lineTo(START_X + parseFloat(USED_LETTER[i] * scale), START_Y + parseFloat(USED_LETTER[i + 1] * scale));
  }
  ctx.stroke();
}

function background(color){
  ctx.fillStyle = color;
  ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
}
