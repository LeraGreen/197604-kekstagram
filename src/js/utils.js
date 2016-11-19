'use strict';

define(function() {

  var utils = {};

  utils.inherit = function(Parent, Child) {
    var EmptyConstructor = function() {};
    EmptyConstructor.prototype = Parent.prototype;
    Child.prototype = new EmptyConstructor();
  };

  return utils;
});
