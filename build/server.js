var colors = require('colors');
var moment = require("moment");
var config = require("../config.json")
var sketch = require("../src/sketch");
var loop = require('raf-loop');
var env = require("./server/env")

var engine = loop(function(dt) { 
  sketch.draw() 
}).start()

var serverEnv = env(engine);
var ctx = serverEnv.createContext();
var scale = ctx.canvas.width / config.thumbnail_size;
sketch.setup(ctx, serverEnv, scale);

console.log("– Artwork started at ".yellow + moment().format("HH:mm:ss").green)
