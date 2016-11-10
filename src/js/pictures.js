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

    var pageNumber = 0;
    var pageSize = 12;
    var activeFilter = 'filter-popular';
    var footer = document.querySelector('footer');
    var throttleTimeOut = 100;

    function changeFilter(filterID) {
      document.querySelector('.pictures').innerHTML = '';
      activeFilter = filterID;
      pageNumber = 0;
      loadPhotos(filterID, pageNumber);
    }

    function calcPointRightDif() {
      var picturesBlock = document.querySelector('.pictures');
      var picturesBlockRight = Math.floor(picturesBlock.getBoundingClientRect().right);
      var pictureArr = document.querySelectorAll('.picture');
      var lastPicture = pictureArr[pictureArr.length - 1];
      var lastPictureRigth = Math.floor(lastPicture.getBoundingClientRect().right);
      var lastPictureMargin = parseInt(getComputedStyle(lastPicture).marginRight, 10);
      return (picturesBlockRight - lastPictureRigth) > lastPictureMargin;
    }

    function calcBottomIndent() {
      var pictureArr = document.querySelectorAll('.picture');
      var lastPicture = pictureArr[pictureArr.length - 1];
      var lastPictureTop = lastPicture.getBoundingClientRect().top;
      var lastPictureBottom = lastPicture.getBoundingClientRect().bottom;
      var lastPictureHight = lastPictureBottom - lastPictureTop;
      return lastPictureHight;
    }

    function setScroll() {
      window.addEventListener('scroll', function() {
        if (Date.now() - lastCall >= throttleTimeOut) {
          if (footer.getBoundingClientRect().top - window.innerHeight <= calcBottomIndent() &&
            calcPointRightDif()) {
            loadPhotos(activeFilter, ++pageNumber);
          }
          lastCall = Date.now();
        }
      });
    }

    var lastCall = Date.now();

    function setThrottle() {
      document.querySelector('.filters').addEventListener('change', function(evt) {
        if (evt.target.classList.contains('filters-radio')) {
          changeFilter(evt.target.id);
        }
      });
    }

    function loadPhotos(filter, currentPage) {
      load('/api/pictures', {
        from: currentPage * pageSize,
        to: (currentPage * pageSize) + pageSize,
        filter: filter
      },
      function(data) {
        var pictures = data;
        addPictureBlock(pictures, function() {
          document.querySelector('.filters').classList.remove('hidden');
        });
      });
    }

    changeFilter(activeFilter);
    setScroll();
    setThrottle();
  });










