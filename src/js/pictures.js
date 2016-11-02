'use strict';

define(['./hide-block.js', './load.js', './review.js'],
  function(hideBlock, load, review) {
    function addPictureBlock(arr, callback) {
      hideBlock();
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










