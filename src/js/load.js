'use strict';

define(function() {

  function getSearchSrting(params) {
    return Object.keys(params).map(function(param) {
      return [param, params[param]].join('=');
    }).join('&');
  }

  function createCallBack(url, params, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url + '?' + getSearchSrting(params));
    xhr.onload = function(evt) {
      var data = JSON.parse(evt.target.response);
      callback(data);
    };
    xhr.send();
  }

  return createCallBack;
});
