const util = require('util');
const Transform = require('stream').Transform;
const Pixel = require('./pixel');

util.inherits(PixelAverage, Transform);

function PixelAverage() {
  Transform.call(this, {objectMode: true});
}

PixelAverage.prototype._transform = function (pixel, encoding, done) {
  if (!(pixel instanceof Pixel)) {
    this.emit('error', 'Data is not a Pixel object, got a ' + typeof pixel);
    return;
  }
  this.push(pixel.average());
  done();
};

module.exports = PixelAverage;
