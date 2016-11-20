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

      this.hide = this.hide.bind(this);
      this.overlayClose.addEventListener('click', this.hide);

      this.showNextPicture = this.showNextPicture.bind(this);
      this.overlayImage.addEventListener('click', this.showNextPicture);
    };

    utils.inherit(SuperClass, Gallery);

    Gallery.prototype.setPictures = function(arr) {
      var pictureModelList = arr.map(function(item) {
        return (new PictureModel(item));
      });
      this.pictures = this.pictures.concat(pictureModelList);
      this.render(pictureModelList);
    };

    Gallery.prototype.render = function(arr) {
      arr.forEach(function(item, i) {
        var picture = new Picture(item);
        picture.index = i;

        picture.onclick = function(index) {
          this.show(index);
          return false;
        };

        picture.onclick = picture.onclick.bind(this);
        SuperClass.prototype.show.call(this, document.querySelector('.pictures'), picture.element);
      }, this);
    };

    Gallery.prototype.show = function(number) {
      this.overlay.classList.remove('invisible');
      this.setActivePicture(number);
    };

    Gallery.prototype.showNextPicture = function(evt) {
      if (evt.target === this.overlayImage) {
        if (this.activePicture === this.pictures.length - 1) {
          this.setActivePicture(0);
        }
        this.setActivePicture(this.activePicture + 1);
      }
    };

    Gallery.prototype.hide = function() {
      this.overlay.classList.add('invisible');
    };

    Gallery.prototype.setActivePicture = function(number) {
      this.activePicture = number;
      this.pictures.forEach(function(picture, i) {
        if (i === number) {
          var imgSrc = picture.getUrl();
          this.overlayImage.setAttribute('src', imgSrc);
          document.querySelector('.likes-count').innerHTML = picture.getLikes();
          document.querySelector('.comments-count').innerHTML = picture.getComments();
        }
      }, this);
    };

    return new Gallery();
  });
