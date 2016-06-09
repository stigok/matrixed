const assert = require('chai').assert;
const sinon = require('sinon');

const es = require('event-stream');
const ReadStream = require('./helpers/read-stream');
const PixelAverage = require('../pixel-average');
const Pixel = require('../pixel');

describe('ImageDataPixels', function () {
  it('transform image data to array of pixel objects', function (done) {
    const avg = new PixelAverage();
    const pixel = new Pixel([
      new Pixel(125, 125, 125, 255),
      new Pixel(125, 125, 125, 255),
      new Pixel(125, 125, 125, 255),
      new Pixel(125, 125, 125, 255)
    ]);
    new ReadStream(pixel)
      .pipe(avg)
      .pipe(es.through(data => {
        assert.instanceOf(data, Pixel);
        assert.deepEqual(data, pixel.average());
      }, done));
  });
  it('calls on Pixel.prototype.average()', function () {
    const avg = new PixelAverage();
    const pixel = new Pixel(1, 2, 3, 4);
    pixel.average = sinon.spy();
    new ReadStream(pixel)
      .pipe(avg)
      .pipe(es.through(() => {
        assert.isTrue(pixel.prototype.average.calledOnce);
      }));
  });
  it('emits error when data is not an array of pixels', function (done) {
    const avg = new PixelAverage();
    new ReadStream([
      125, 125, 125
    ]).pipe(avg)
      .on('error', err => {
        assert.isNotNull(err);
        done();
      });
  });
});
