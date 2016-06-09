const assert = require('chai').assert;

const es = require('event-stream');
const ReadStream = require('./helpers/read-stream');
const ImageDataPixels = require('../image-data-pixels');
const Pixel = require('../pixel');

describe('ImageDataPixels', function () {
  it('transform image data to array of pixel objects', function (done) {
    const imagePixels = new ImageDataPixels();
    new ReadStream([
      125, 125, 125, 255,
      125, 125, 125, 255,
      125, 125, 125, 255,
      125, 125, 125, 255
    ]).pipe(imagePixels)
      .pipe(es.through(data => {
        assert.isArray(data);
        assert.lengthOf(data, 4);
        assert.instanceOf(data[0], Pixel);
      }, done));
  });
  it('emits error when image data not a multiple of 4', function (done) {
    const imagePixels = new ImageDataPixels();
    new ReadStream([
      125, 125, 125
    ]).pipe(imagePixels)
      .on('error', err => {
        assert.isNotNull(err);
        done();
      });
  });
});
