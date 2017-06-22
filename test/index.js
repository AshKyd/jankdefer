/* global describe, it, beforeEach */
const assert = require('assert');
const jankDefer = require('../');

function killTime(milliseconds) {
  const start = Date.now();
  while (Date.now() - start < milliseconds) {
    // twiddle thumbs
  }
}

describe('jankdefer', () => {
  describe('with no thrashing', () => {
    let count = 0;
    beforeEach(() => {
      count = 0;
      global.requestAnimationFrame = (callback) => {
        count += 1;
        callback();
      };
    });
    it('should call back with no options', (done) => {
      jankDefer(() => {
        assert.deepEqual(count, 6, 'should have use a default threshold of 5 (6 runs)');
        done();
      });
    });
    it('should call back with a threshold of 10', (done) => {
      jankDefer(() => {
        assert.deepEqual(count, 11, 'should have use a threshold of 10 (11 runs)');
        done();
      }, { threshold: 10 });
    });
  });

  describe('with constant thrashing', () => {
    beforeEach(() => {
      global.requestAnimationFrame = (callback) => {
        setTimeout(callback, 501);
      };
    });
    it('should call back with timeout of 1000', (done) => {
      const start = Date.now();
      jankDefer(() => {
        const end = Date.now();
        assert(end - start > 1000, 'should have taken at least 1000ms');
        done();
      }, { timeout: 1000 });
    });
  });

  describe('with framerateTarget', () => {
    let count = 0;
    beforeEach(() => {
      count = 0;
      global.requestAnimationFrame = (callback) => {
        count += 1;
        killTime(100 / count);
        callback();
      };
    });
    it('should call back with target framerate of 10', (done) => {
      jankDefer(() => {
        assert.deepEqual(count, 12, 'should have run 10 times (11 runs)');
        done();
      }, { framerateTarget: 10 });
    });
  });
});
