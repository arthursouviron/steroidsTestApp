(function() {
  describe("_.differenceObjects", function() {
    beforeEach(function() {
      return this.objArray = [
        {
          a: 1,
          b: 1
        }, {
          a: 2,
          b: 2
        }, {
          a: 3,
          b: 3
        }
      ];
    });
    return describe("Comparing Arrays of Objects", function() {
      describe("difference", function() {
        describe("0 length", function() {
          return it("when two arrays are identical - same reference", function() {
            var interArray;
            interArray = _.difference(this.objArray, this.objArray);
            return expect(interArray.length).toEqual(0);
          });
        });
        return describe("different length - not identical", function() {
          it("diff reference, diff values", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 2
              }, {
                a: 2,
                b: 3
              }, {
                a: 3,
                b: 4
              }
            ];
            interArray = _.difference(this.objArray, difArray);
            return expect(interArray.length).toEqual(3);
          });
          it("diff reference, 1 val identical", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }
            ];
            interArray = _.difference(this.objArray, difArray);
            return expect(interArray.length).toEqual(3);
          });
          return it("diff reference, same values", function() {
            var difArray, diffArray, index, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }, {
                a: 2,
                b: 2
              }, {
                a: 3,
                b: 3
              }
            ];
            diffArray = this.objArray;
            index = this.objArray.indexOf({
              a: 1,
              b: 1
            });
            expect(index).toBe(-1);
            interArray = _.difference(this.objArray, difArray);
            return expect(interArray.length).toEqual(3);
          });
        });
      });
      return describe("_.differenceObjects - extension", function() {
        describe("same length", function() {
          it("when two arrays are identical - same reference", function() {
            var interArray;
            interArray = _.differenceObjects(this.objArray, this.objArray);
            return expect(interArray.length).toEqual(0);
          });
          it("diff reference, same values", function() {
            var difArray, diffArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }, {
                a: 2,
                b: 2
              }, {
                a: 3,
                b: 3
              }
            ];
            diffArray = this.objArray;
            interArray = _.differenceObjects(difArray, this.objArray);
            return expect(interArray.length).toEqual(0);
          });
          return it("diff reference one added (new), same values (intersected)", function() {
            var difArray, diffArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }, {
                a: 2,
                b: 2
              }, {
                a: 3,
                b: 3
              }, {
                a: 4,
                b: 4
              }
            ];
            diffArray = this.objArray;
            interArray = _.differenceObjects(difArray, this.objArray);
            return expect(interArray.length).toEqual(1);
          });
        });
        describe("different length - not identical", function() {
          it("diff reference, diff values", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 2
              }, {
                a: 2,
                b: 3
              }, {
                a: 3,
                b: 4
              }
            ];
            interArray = _.differenceObjects(difArray, this.objArray);
            return expect(interArray.length).toEqual(3);
          });
          return it("diff reference, 1 val identical", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }
            ];
            interArray = _.differenceObjects(difArray, this.objArray);
            return expect(interArray.length).toEqual(0);
          });
        });
        return describe("removal", function() {
          return it("diff reference, 1 val identical", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }
            ];
            interArray = _.withoutObjects(this.objArray, difArray);
            return expect(interArray.length).toEqual(2);
          });
        });
      });
    });
  });

}).call(this);

(function() {
  describe("_.indexOfObject", function() {
    beforeEach(function() {
      return this.objArray = [
        {
          a: 1,
          b: 1
        }, {
          a: 2,
          b: 2
        }, {
          a: 5,
          b: 3
        }, {
          a: 3,
          b: 3
        }
      ];
    });
    it("finds first element", function() {
      var i;
      i = _.indexOfObject(this.objArray, {
        a: 1,
        b: 1
      });
      return expect(i).toEqual(0);
    });
    it("finds element beginning", function() {
      var i;
      i = _.indexOfObject(this.objArray, {
        a: 2,
        b: 2
      });
      return expect(i).toEqual(1);
    });
    it("finds last element", function() {
      var i;
      i = _.indexOfObject(this.objArray, {
        a: 5,
        b: 3
      });
      return expect(i).toEqual(2);
    });
    it("finds last element", function() {
      var i;
      i = _.indexOfObject(this.objArray, {
        a: 3,
        b: 3
      });
      return expect(i).toEqual(3);
    });
    return it("find no element", function() {
      var i;
      i = _.indexOfObject(this.objArray, {
        a: 4,
        b: 3
      });
      return expect(i).toEqual(-1);
    });
  });

}).call(this);

(function() {
  describe("_.intersectionObjects", function() {
    beforeEach(function() {
      return this.objArray = [
        {
          a: 1,
          b: 1
        }, {
          a: 2,
          b: 2
        }, {
          a: 3,
          b: 3
        }
      ];
    });
    return describe("Comparing Arrays of Objects", function() {
      describe("intersection", function() {
        describe("same length", function() {
          return it("when two arrays are identical - same reference", function() {
            var interArray;
            interArray = _.intersection(this.objArray, this.objArray);
            return expect(interArray.length).toEqual(this.objArray.length);
          });
        });
        return describe("different length - not identical", function() {
          it("diff reference, diff values", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 2
              }, {
                a: 2,
                b: 3
              }, {
                a: 3,
                b: 4
              }
            ];
            interArray = _.intersection(this.objArray, difArray);
            return expect(interArray.length).toEqual(0);
          });
          it("diff reference, 1 val identical", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }
            ];
            interArray = _.intersection(this.objArray, difArray);
            return expect(interArray.length).toEqual(0);
          });
          return it("diff reference, same values", function() {
            var difArray, diffArray, index, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }, {
                a: 2,
                b: 2
              }, {
                a: 3,
                b: 3
              }
            ];
            diffArray = this.objArray;
            index = this.objArray.indexOf({
              a: 1,
              b: 1
            });
            expect(index).toBe(-1);
            interArray = _.intersection(this.objArray, difArray);
            return expect(interArray.length).toEqual(0);
          });
        });
      });
      return describe("_.intersectionObjects - extension", function() {
        describe("same length", function() {
          it("when two arrays are identical - same reference", function() {
            var interArray;
            interArray = _.intersectionObjects(this.objArray, this.objArray);
            return expect(interArray.length).toEqual(this.objArray.length);
          });
          it("diff reference, same values", function() {
            var difArray, diffArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }, {
                a: 2,
                b: 2
              }, {
                a: 3,
                b: 3
              }
            ];
            diffArray = this.objArray;
            interArray = _.intersectionObjects(this.objArray, difArray);
            return expect(interArray.length).toEqual(this.objArray.length);
          });
          return it("diff reference one added (new), same values (intersected)", function() {
            var difArray, diffArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }, {
                a: 2,
                b: 2
              }, {
                a: 3,
                b: 3
              }, {
                a: 4,
                b: 4
              }
            ];
            diffArray = this.objArray;
            interArray = _.intersectionObjects(this.objArray, difArray);
            return expect(interArray.length).toEqual(this.objArray.length);
          });
        });
        return describe("different length - not identical", function() {
          it("diff reference, diff values", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 2
              }, {
                a: 2,
                b: 3
              }, {
                a: 3,
                b: 4
              }
            ];
            interArray = _.intersectionObjects(this.objArray, difArray);
            return expect(interArray.length).toEqual(0);
          });
          return it("diff reference, 1 val identical", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }
            ];
            interArray = _.intersectionObjects(this.objArray, difArray);
            expect(interArray.length).toEqual(1);
            return expect(interArray.length).not.toEqual(this.objArray.length);
          });
        });
      });
    });
  });

}).call(this);

(function() {
  describe("_.isEqual", function() {
    beforeEach(function() {
      return this.objArray = [
        {
          a: 1,
          b: 1
        }, {
          a: 2,
          b: 2
        }, {
          a: 3,
          b: 3
        }
      ];
    });
    return describe("Comparing Arrays of Objects", function() {
      return describe("isEqual", function() {
        describe("same length", function() {
          it("when two arrays are identical - same reference", function() {
            return expect(_.isEqual(this.objArray, this.objArray)).toBeTruthy;
          });
          it("diff reference, same values", function() {
            var difArray;
            difArray = [
              {
                a: 1,
                b: 1
              }, {
                a: 2,
                b: 2
              }, {
                a: 3,
                b: 3
              }
            ];
            return expect(_.isEqual(this.objArray, difArray)).toBeTruthy;
          });
          return it("diff reference one added (new), same values (intersected)", function() {
            var difArray;
            difArray = [
              {
                a: 1,
                b: 1
              }, {
                a: 2,
                b: 2
              }, {
                a: 3,
                b: 3
              }, {
                a: 4,
                b: 4
              }
            ];
            return expect(_.isEqual(this.objArray, difArray)).toBeFalsy;
          });
        });
        describe("different length - not identical", function() {
          it("diff reference, diff values", function() {
            var difArray;
            difArray = [
              {
                a: 1,
                b: 2
              }, {
                a: 2,
                b: 3
              }, {
                a: 3,
                b: 4
              }
            ];
            return expect(_.isEqual(this.objArray, difArray)).toBeFalsy;
          });
          return it("diff reference, 1 val identical", function() {
            var difArray;
            difArray = [
              {
                a: 1,
                b: 1
              }
            ];
            return expect(_.isEqual(this.objArray, difArray)).toBeFalsy;
          });
        });
        return describe("array of nested objects", function() {
          beforeEach(function() {
            return this.objArray = [
              {
                a: 1,
                b: {
                  n: 1,
                  m: 2,
                  o: "hi!"
                }
              }, {
                a: 2,
                b: {
                  n: 4,
                  m: 5,
                  o: "hi!"
                }
              }, {
                a: {
                  n: 2,
                  m: 3,
                  o: "hi!"
                },
                b: 3
              }
            ];
          });
          it("same - reference should be equal", function() {
            return expect(_.isEqual(this.objArray, this.objArray)).toBeTruthy;
          });
          it("same - dif reference same values should be ==", function() {
            var difArray;
            difArray = [
              {
                a: 1,
                b: {
                  n: 1,
                  m: 2,
                  o: "hi!"
                }
              }, {
                a: 2,
                b: {
                  n: 4,
                  m: 5,
                  o: "hi!"
                }
              }, {
                a: {
                  n: 2,
                  m: 3,
                  o: "hi!"
                },
                b: 3
              }
            ];
            return expect(_.isEqual(this.objArray, difArray)).toBeTruthy;
          });
          return it("dif reference diff values should be !=", function() {
            var difArray;
            difArray = [
              {
                a: 1,
                b: {
                  n: 1,
                  m: 2,
                  o: "hi!"
                }
              }, {
                a: 2,
                b: {
                  n: 4,
                  m: 5,
                  o: "hi!!"
                }
              }, {
                a: {
                  n: 2,
                  m: 3,
                  o: "hi!"
                },
                b: 3
              }
            ];
            return expect(_.isEqual(this.objArray, difArray)).toBeFalsy;
          });
        });
      });
    });
  });

}).call(this);
