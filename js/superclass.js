'use strict';

define(function() {

  var SuperClass = function(data) {
    this.element = data;
  };

  SuperClass.prototype.show = function(parent, element) {
    parent.appendChild(element);
  };

  SuperClass.prototype.remove = function(element) {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
    return;
  };

  return SuperClass;
});
