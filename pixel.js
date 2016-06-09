const util = require('util');

function Pixel(r, g, b, a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
  this.hex = r.toString(16) + g.toString(16) + b.toString(16);
  this.rgba = util.format('rgba(%d, %d, %d, %f)', r, g, b, ((a / 255 * 100) | 1) / 100);
  this.avg = (r + g + b) / 3 | 1;
}

module.exports = Pixel;
