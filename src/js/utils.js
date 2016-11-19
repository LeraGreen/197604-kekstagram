'use strict';

define(function() {

  var utils = {};

  utils.inherit = function(Parent, Child) {
    var emptyConstructor = function() {};
    emptyConstructor.prototype = Parent.prototype;
    Child.prototype = new emptyConstructor();
  };

  return utils;
});
