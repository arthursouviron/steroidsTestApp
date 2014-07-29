(function() {
  describe("_async", function() {
    beforeEach(function() {
      return this.subject = _async;
    });
    it("handle callback passes an index", function(done) {
      return _async.each([1], function(thing, index) {
        expect(thing).toEqual(1);
        expect(index).toEqual(0);
        return done();
      });
    });
    it("handle array of 101 outputs 101 elements equal to the original, with 1 pauses", function(done) {
      var known, pauses, test;
      known = _.range(101);
      test = [];
      pauses = 1;
      return this.subject.each(known, (function(num) {
        return test.push(num);
      }), function() {
        done();
        expect(pauses).toEqual(2);
        expect(test.length).toEqual(known.length);
        return expect(test).toEqual(known);
      }, (function() {
        return pauses++;
      }), 100);
    });
    it("handle array of 200 outputs 200 elements equal to the original, with 2 pauses", function(done) {
      var known, pauses, running, test;
      known = _.range(200);
      test = [];
      pauses = 1;
      running = true;
      return this.subject.each(known, (function(num) {
        return test.push(num);
      }), function() {
        done();
        expect(pauses).toEqual(2);
        expect(test.length).toEqual(known.length);
        return expect(test).toEqual(known);
      }, (function() {
        return pauses++;
      }), 100);
    });
    it("handle array of 1000 outputs 1000 elements equal to the original, with 10 pauses", function(done) {
      var known, pauses, test;
      known = _.range(1000);
      test = [];
      pauses = 1;
      return this.subject.each(known, (function(num) {
        return test.push(num);
      }), function() {
        done();
        expect(pauses).toEqual(10);
        expect(test.length).toEqual(known.length);
        return expect(test).toEqual(known);
      }, (function() {
        return pauses++;
      }), 100);
    });
    return it("handle map of 1000 outputs 1000 elements equal to the original, with 10 pauses", function(done) {
      var known, pauses, running, test;
      known = _.range(1000);
      test = [];
      pauses = 1;
      running = true;
      return this.subject.map(known, (function(num) {
        num += 1;
        return "$" + (num.toString());
      }), function(mapped) {
        test = mapped;
        done();
        expect(pauses).toEqual(10);
        expect(test[999]).toEqual("$1000");
        expect(test.length).toEqual(known.length);
        return expect(test).toEqual(_.map(known, (function(n) {
          n += 1;
          return "$" + (n.toString());
        })));
      }, (function() {
        return pauses++;
      }), 100);
    });
  });

}).call(this);
