const util = require('util');

function Pixel(r, g, b, a) {
  this.children = [];

  if (Array.isArray(r)) {
    // Append array items to children
    this.children.splice(0, 0, ...r);
  } else {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.hex = r.toString(16) + g.toString(16) + b.toString(16);
    this.rgba = util.format('rgba(%d, %d, %d, %f)', r, g, b, ((a / 255 * 100) | 1) / 100);
    this.children = null;
  }
}

Pixel.prototype.average = function () {
  if (!this.children) {
    return this;
  }
  const total = {
    r: 0,
    g: 0,
    b: 0,
    a: 0
  };
  this.children.forEach(p => {
    total.r += p.r;
    total.g += p.g;
    total.b += p.b;
    total.a += p.a;
  });
  for (let key in total) {
    if (total.hasOwnProperty(key)) {
      total[key] = Math.floor(total[key] / this.children.length);
    }
  }
  return new Pixel(total.r, total.g, total.b, total.a);
};

module.exports = Pixel;
