'use strict';

define(function(){

  var SuperClass = function(data) {
    this.element = data;
  };

  SuperClass.prototype.show = function(element, parent) {
    parent.appendChild(element);
  };

  SuperClass.prototype.remove = function(element, parent) {
    parent.removeChild(element);
  };

  return SuperClass;

});
