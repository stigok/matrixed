const stream = require('stream');
const util = require('util');

util.inherits(ReadStream, stream.Readable);

function ReadStream(data) {
  stream.Readable.call(this, {objectMode: true});
  this.seedData = data;
}

ReadStream.prototype._read = function (n) {
  this.push(this.seedData);
  this.push(null);
};

module.exports = ReadStream;
