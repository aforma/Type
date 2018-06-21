var env = require("./browser/env");
var sketch = require("../src/sketch")
var loop = require('raf-loop');
var config = require("../config.json")

var engine = loop(function(dt) { sketch.draw() }).start()
var browserEnv = env(engine);
var ctx = browserEnv.createContext(true);
sketch.setup(ctx, browserEnv, 1);
