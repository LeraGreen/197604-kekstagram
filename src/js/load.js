'use strict';

define(function() {

  function getSearchSrting(params) {
    return Object.keys(params).map(function(param) {
      return [param, params[param]].join('=');
    }).join('&');
  }

  function createCallBack (url, params, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function(evt) {
      var data = JSON.parse(evt.target.response);
      callback(data);
    };
    xhr.open('GET', url + '?' + getSearchSrting(params));
    xhr.send();
  };

  return createCallBack;

  //function createCallBack(url, callback) {
    //var script = document.createElement('script');
    //script.src = url;
    //document.body.appendChild(script);

    //window.JSONPCallback = function(data) {
    //  callback(data);
    //};
  //}
  //return createCallBack;
});
