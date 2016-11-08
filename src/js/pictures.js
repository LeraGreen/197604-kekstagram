'use strict';

define(['./load.js', './gallery.js', './picture.js'],
  function(load, gallery) {

    function hideFilters() {
      document.querySelector('.filters').classList.add('hidden');
    }

    function addPictureBlock(arr, callback) {
      hideFilters();
      gallery.setPictures(arr);
      gallery.render();

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










