'use strict';

define(['./load.js', './gallery.js'],
  function(load, gallery) {

    function hideFilters() {
      document.querySelector('.filters').classList.add('hidden');
    }

    function addPictureBlock(arr, callback) {
      hideFilters();
      gallery.setPictures(arr);

      if (typeof callback === 'function') {
        callback();
      }
    }

    var pageNumber = 0;
    var pageSize = 4;
    var activeFilter = 'filter-popular';
    var footer = document.querySelector('footer');
    var throttleTimeOut = 100;

    function changeFilter(filterID) {
      document.querySelector('.pictures').innerHTML = '';
      pageNumber = 0;
      setScroll();
      gallery.pictures = [];
      loadPhotos(filterID, pageNumber);
    }

    function calcBottomIndent() {
      var pictureArr = document.querySelectorAll('.picture');
      var lastPicture = pictureArr[pictureArr.length - 1];
      if (lastPicture != undefined) {
        var lastPictureTop = lastPicture.getBoundingClientRect().top;
        var lastPictureBottom = lastPicture.getBoundingClientRect().bottom;
        var lastPictureHight = lastPictureBottom - lastPictureTop;
        return lastPictureHight;
      } else {
        return 100;
      }
    }

    function setScroll() {
      window.addEventListener('scroll', checkThrottle);
    }

    function checkThrottle() {
      if (Date.now() - lastCall >= throttleTimeOut) {
        checkNextPage();
      }
    }

    function checkNextPage() {
      if (footer.getBoundingClientRect().top - window.innerHeight <= calcBottomIndent()) {
        loadPhotos(activeFilter, ++pageNumber);
      }
      lastCall = Date.now();
    }

    var lastCall = Date.now();

    function checkFilter() {
      document.querySelector('.filters').addEventListener('change', function(evt) {
        if (evt.target.classList.contains('filters-radio')) {
          changeFilter(evt.target.id);
        }
      });
    }

    function checkEndList(data, from, to) {
      if (data.length < to - from) {
        window.removeEventListener('scroll', checkThrottle);
      } else {
        checkNextPage();
      }
    }

    function loadPhotos(filter, currentPage) {
      var from = currentPage * pageSize;
      var to = (currentPage * pageSize) + pageSize;
      load('/api/pictures', {
        from: from,
        to: to,
        filter: filter
      },
      function(data) {
        var pictures = data;
        addPictureBlock(pictures, function() {
          document.querySelector('.filters').classList.remove('hidden');
          checkEndList(data, from, to);
        });
      });
    }

    changeFilter(activeFilter);
    setScroll();
    checkFilter();
  });










