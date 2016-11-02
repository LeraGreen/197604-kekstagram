'use strict';

define(function() {
  function createCallBack(url, callback) {
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);

    window.JSONPCallback = function(data) {
      callback(data);
    };
  }
  return createCallBack;
});
