'use strict';

define(['./load.js', './gallery.js'],
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

    var pageNumber = 0;
    var pageSize = 12;
    var activeFilter = 'filter-popular';
    var footer = document.querySelector('footer');

    function changeFilter(filterID) {
      document.querySelector('.pictures').innerHtml = '';
      activeFilter = filterID;
      pageNumber = 0;
      loadPhotos(filterID, pageNumber);
    }

    var lastCall = new Date();

    window.addEventListener('scroll', function() {
      if (footer.getBoundingClientRect().bottom - window.innerHeight <= 100) {
        loadPhotos(activeFilter, ++pageNumber);
      }
    });

    document.querySelector('.filters').addEventListener('change', function(evt){
      if (evt.target.classList.contains('filters-radio')) {
        changeFilter(evt.target.id);
      }
    });

    function loadPhotos(filter, currentPage) {
      load('/api/pictures',{
        from: currentPage * pageSize,
        to: (currentPage * pageSize) + pageSize
        //filter: filter
      },
      function(data) {
      var pictures = data;
      addPictureBlock(pictures, function() {
        document.querySelector('.filters').classList.remove('hidden');
      });
    });
    }

    changeFilter(activeFilter);
  });










