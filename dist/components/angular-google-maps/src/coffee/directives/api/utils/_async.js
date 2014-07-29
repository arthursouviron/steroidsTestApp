
/*
    Author: Nicholas McCready & jfriend00
    _async handles things asynchronous-like :), to allow the UI to be free'd to do other things
    Code taken from http://stackoverflow.com/questions/10344498/best-way-to-iterate-over-an-array-without-blocking-the-ui

    The design of any funcitonality of _async is to be like lodash/underscore and replicate it but call things
    asynchronously underneath. Each should be sufficient for most things to be derrived from.

    TODO: Handle Object iteration like underscore and lodash as well.. not that important right now
 */

(function() {
  var async;

  async = {
    each: function(array, callback, doneCallBack, pausedCallBack, chunk, index, pause) {
      var doChunk;
      if (chunk == null) {
        chunk = 20;
      }
      if (index == null) {
        index = 0;
      }
      if (pause == null) {
        pause = 1;
      }
      if (!pause) {
        throw "pause (delay) must be set from _async!";
        return;
      }
      if (array === void 0 || (array != null ? array.length : void 0) <= 0) {
        doneCallBack();
        return;
      }
      doChunk = function() {
        var cnt, i;
        cnt = chunk;
        i = index;
        while (cnt-- && i < (array ? array.length : i + 1)) {
          callback(array[i], i);
          ++i;
        }
        if (array) {
          if (i < array.length) {
            index = i;
            if (pausedCallBack != null) {
              pausedCallBack();
            }
            return setTimeout(doChunk, pause);
          } else {
            if (doneCallBack) {
              return doneCallBack();
            }
          }
        }
      };
      return doChunk();
    },
    map: function(objs, iterator, doneCallBack, pausedCallBack, chunk) {
      var results;
      results = [];
      if (objs == null) {
        return results;
      }
      return _async.each(objs, function(o) {
        return results.push(iterator(o));
      }, function() {
        return doneCallBack(results);
      }, pausedCallBack, chunk);
    }
  };

  window._async = async;

  angular.module("google-maps.directives.api.utils").factory("async", function() {
    return window._async;
  });

}).call(this);
