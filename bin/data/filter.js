'use strict';

module.exports = function(list, filterID) {
  var newList = [];
  list.forEach(function(item, i) {
    newList.push(item);
  });
  switch(filterID) {
    case 'filter-popular':
      return list;
      break;
    case 'filter-new':
      return newList.sort(function(a, b) {
        return b.created - a.created;
      });
      break;
    case 'filter-discussed':
      return newList.sort(function(a, b){
        return b.comments - a.comments;
      });
      break;
  }
};
