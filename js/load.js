'use strict';

define(function() {

  function getSearchString(params) {
    return Object.keys(params).map(function(param) {
      return [param, params[param]].join('=');
    }).join('&');
  }

  function createCallBack(url, params, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url + '?' + getSearchString(params));
    xhr.onload = function(evt) {
      var data = JSON.parse(evt.target.response);
      callback(data);
    };
    xhr.send();
  }

  return createCallBack;
});
