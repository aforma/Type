var DNA = require('./dna')
var alphabet = require('./alphabet')
var Calc = require('@doublepi/calc');
var TweenMax = require('gsap');
var _ = require('underscore');

class Letter {
  constructor(x, y, form, ctx, scale) {
    this.x = x;
    this.y = y + (25 * scale);
    this.scale = scale;
    this.form = form;
    this.ctx = ctx;
    this.MAX_FITNESS = undefined;
    this.fitnessScore = undefined;
    this.done = false;
    this.MAX = ctx.canvas.width / 2
    this.numDone = 0;
    this.CENTER_X = this.ctx.canvas.width / 2;
    this.CENTER_Y = this.ctx.canvas.height / 2;

    this.done = false;
    this.dna = DNA.generate(this.form, ctx.canvas.width, ctx.canvas.height);
    this.points = this.dna;
    this.lines = [];
    this.MAX_FITNESS = Calc.dist(0,0,70 * this.scale,140 * this.scale) * 5;
    this.fitnessScore = 0
  }

  reset() {
    this.dna = DNA.generate()
    this.points = this.dna;
    this.lines = [];
    this.circles = [];
    this.MAX_FITNESS = Calc.dist(0,0,70 * this.scale,140 * this.scale) * 5;
    this.done = false;
  }

  draw() {
    var total = this.dna.length;
    this.ctx.lineWidth = this.scale * 2;
    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = 'rgba(0,,0,0.5)';
    this.ctx.beginPath();
    for (var i = 0; i < total; i++) {
      let x = this.x + parseFloat(this.dna[i].x * this.scale);
      let y = this.y + parseFloat(this.dna[i].y * this.scale);
      let r = this.dna[i].r;
      this.drawline(0, 0, x, y)
    }
    this.ctx.stroke();
  }

  drawline(fromX, fromY, x, y) {
    this.ctx.moveTo(fromX, fromY);
    this.ctx.lineTo(x,y);
  }

  evolve() {
    let dist = undefined;
    let count = 0;
    if (this.numDone > this.dna.length * 0.8) {
      return false;
    }
    this.numDone = 0
    
    this.dna = this.dna.map((item, i)=>{
      dist = Calc.dist(this.form[count], this.form[count + 1], item.x, item.y);
      if (dist > 2 * this.scale) {
        item.x = Math.min(this.MAX,parseFloat(item.x) + randomRange(dist))
        item.y = Math.min(this.MAX,parseFloat(item.y) + randomRange(dist))
        item.r = dist / 5
      } else {
        item.r = 50
        this.numDone++;
      }
      count = i * 2;
      return item;
    })
    return true;
  }
}

function randomRange(amount) {
  var num = Math.floor(Math.random() * amount) + 1; // this will get a number between 1 and 99;
  num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
  return num;
}

module.exports = Letter;
