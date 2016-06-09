const assert = require('chai').assert;

const Pixel = require('../pixel');

describe('Pixel', function () {
  it('constructs with pixel value arguments', function () {
    const p = new Pixel(1, 2, 3, 4);
    assert.equal(p.r, 1);
    assert.equal(p.g, 2);
    assert.equal(p.b, 3);
    assert.equal(p.a, 4);
    assert.isNotOk(p.children);
  });
  it('constructs with array of Pixel objects and push to this.children', function () {
    const arr = [
      new Pixel(1, 2, 3, 4),
      new Pixel(1, 2, 3, 4),
      new Pixel(1, 2, 3, 4),
      new Pixel(1, 2, 3, 4)
    ];
    const p = new Pixel(arr);
    assert.isArray(p.children);
    assert.isNotOk(p.r);
    assert.isNotOk(p.g);
    assert.isNotOk(p.b);
    assert.isNotOk(p.a);
  });
  it('#average() gets average pixel of children', function () {
    const p = new Pixel([
      new Pixel(1, 2, 3, 4),
      new Pixel(1, 2, 3, 4),
      new Pixel(1, 2, 3, 4),
      new Pixel(1, 2, 3, 4)
    ]);
    const avg = p.average();
    assert.equal(avg.r, 1);
    assert.equal(avg.g, 2);
    assert.equal(avg.b, 3);
    assert.equal(avg.a, 4);
  });
});
