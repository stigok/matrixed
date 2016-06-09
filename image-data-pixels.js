const util = require('util');
const Transform = require('stream').Transform;
const Pixel = require('./pixel');

util.inherits(ImageDataPixels, Transform);

function ImageDataPixels() {
  Transform.call(this, {objectMode: true});
}

ImageDataPixels.prototype._transform = function (data, encoding, done) {
  if (data.length % 4 !== 0) {
    this.emit('error', 'Chunk not divisable by 4 [RGBA], got ' + data.length);
    return;
  }
  const pixels = [];
  for (let x = 0; x < data.length; x += 4) {
    pixels.push(new Pixel(...data.slice(x, x + 3)));
  }
  this.push(pixels);
  done();
};

module.exports = ImageDataPixels;
