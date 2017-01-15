'use strict';

define(['./picture.js', './utils.js', './superclass.js', './picture-model.js'],
  function(Picture, utils, SuperClass, PictureModel) {

    var Gallery = function() {
      SuperClass.call(this);

      this.activePicture = null;
      this.pictures = [];
      this.overlay = document.querySelector('.gallery-overlay');
      this.overlayClose = document.querySelector('.gallery-overlay-close');
      this.overlayImage = document.querySelector('.gallery-overlay-image');
      this.overlayLikes = document.querySelector('.likes-count');

      this.hide = this.hide.bind(this);
      this.overlayClose.addEventListener('click', this.hide);

      this.showNextPicture = this.showNextPicture.bind(this);
      this.overlayImage.addEventListener('click', this.showNextPicture);

      this.callChangeLikes = this.callChangeLikes.bind(this);
      this.overlayLikes.addEventListener('click', this.callChangeLikes);

      this.restoreFromHash = this.restoreFromHash.bind(this);
    };

    utils.inherit(SuperClass, Gallery);

    Gallery.prototype.setPictures = function(arr) {
      var pictureModelList = arr.map(function(item) {
        return (new PictureModel(item));
      });
      this.pictures = this.pictures.concat(pictureModelList);
      this.render(pictureModelList);
    };

    Gallery.prototype.callChangeLikes = function() {
      this.changeNumberLikes(this.pictures[this.activePicture]);
    };

    Gallery.prototype.render = function(arr) {
      arr.forEach(function(model, i) {
        model.index = i + this.pictures.length - arr.length;
        var picture = new Picture(model);
        picture.onclick = function() {
          var url = picture.model.getUrl();
          location.hash = '#photo/' + url;
        };
        picture.onclick = picture.onclick;
        SuperClass.prototype.show.call(this, document.querySelector('.pictures'), picture.element);
      }, this);
      if (this.pictures.length === arr.length) {
        window.addEventListener('hashchange', this.restoreFromHash);
        this.restoreFromHash();
      }
    };

    Gallery.prototype.restoreFromHash = function() {
      var regexp = /#photo\/(\S+)/;
      if (location.hash.match(regexp)) {
        this.show(location.hash.match(regexp)[1]);
      } else {
        this.hide();
      }
    };

    Gallery.prototype.show = function(url) {
      this.overlay.classList.remove('invisible');
      this.setActivePicture(url);
    };

    Gallery.prototype.showNextPicture = function(evt) {
      if (evt.target === this.overlayImage) {
        if (this.activePicture === this.pictures.length - 1) {
          var firstPictureUrl = this.pictures[0].getUrl();
          location.hash = '#photo/' + firstPictureUrl;
        }
        var nexPictureUrl = this.pictures[this.activePicture + 1].getUrl();
        location.hash = '#photo/' + nexPictureUrl;
      }
    };

    Gallery.prototype.hide = function() {
      this.overlay.classList.add('invisible');
      location.hash = '';
    };

    Gallery.prototype.changeNumberLikes = function(picture) {
      if (this.overlayLikes.classList.contains('likes-count-liked')) {
        this.overlayLikes.classList.remove('likes-count-liked');
        picture.setLikes(picture.getLikes() - 1);
        picture.liked = false;
      } else {
        this.overlayLikes.classList.add('likes-count-liked');
        picture.setLikes(picture.getLikes() + 1);
        picture.liked = true;
      }
    };

    Gallery.prototype.setActivePicture = function(url) {
      this.pictures.forEach(function(item) {
        if (item.getUrl() === url) {
          this.activePicture = item.index;
          var picture = this.pictures[this.activePicture];
          var imgSrc = url;
          this.overlayImage.setAttribute('src', imgSrc);
          document.querySelector('.likes-count').innerHTML = picture.getLikes();
          document.querySelector('.comments-count').innerHTML = picture.getComments();
          if (picture.liked === true) {
            this.overlayLikes.classList.add('likes-count-liked');
          } else {
            this.overlayLikes.classList.remove('likes-count-liked');
          }
          window.addEventListener('change', function() {
            document.querySelector('.likes-count').innerHTML = picture.getLikes();
          });
        }

      }.bind(this));
    };

    return new Gallery();
  });
