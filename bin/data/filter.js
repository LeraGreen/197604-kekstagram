'use strict';

module.exports = function(list, filterID) {
  var filteredList = list.slice(0);
  switch(filterID) {
    case 'filter-popular':
      return list;
      break;
    case 'filter-new':
      return filteredList.sort(function(a, b) {
        return b.created - a.created;
      });
      break;
    case 'filter-discussed':
      return filteredList.sort(function(a, b){
        return b.comments - a.comments;
      });
      break;
  }
};
