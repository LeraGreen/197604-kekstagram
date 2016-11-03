'use strict';

define(['./load.js', './review.js'],
  function(load, review) {

    function hideFilters() {
      document.querySelector('.filters').classList.add('hidden');
    }

    function addPictureBlock(arr, callback) {
      hideFilters();
      arr.forEach(function(item) {
        document.querySelector('.pictures').appendChild(review(item));
      });

      if (typeof callback === 'function') {
        callback();
      }
    }

    load('http://localhost:1507/api/pictures?callback=JSONPCallback', function(data) {
      var pictures = data;
      addPictureBlock(pictures, function() {
        document.querySelector('.filters').classList.remove('hidden');
      });
    });
  });










