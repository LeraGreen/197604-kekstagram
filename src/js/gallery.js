'use strict';

define(['./picture.js', './utils.js', './superclass.js', './picture-model.js'],
  function(Picture, utils, SuperClass, PictureModel) {

    var Gallery = function() {
      SuperClass.call(this);

      this.activePicture = null;
      this.pictureNumber = null;
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
      arr.forEach(function(item, i) {
        var picture = new Picture(item);
        picture.index = i + this.pictures.length - arr.length;
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

    Gallery.prototype.setActivePicture = function(number) {
      this.activePicture = number;
      var picture = this.pictures[this.activePicture];
      var imgSrc = picture.getUrl();
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
    };

    return new Gallery();
  });
