'use strict';

define(['./picture.js'], function(Picture) {

  var Gallery = function() {
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

  Gallery.prototype.setPictures = function(arr) {
    arr.forEach(function(item) {
      this.pictures.push(item);
    }, this);
    this.render(arr);
  };

  Gallery.prototype.render = function(arr) {
    arr.forEach(function(item, i) {
      var pictureModel = new PictureModel();
      var picture = new Picture(item);
      picture.index = i;

      picture.onclick = function(index) {
        this.show(index);
        return false;
      };

      picture.onclick = picture.onclick.bind(this);
      document.querySelector('.pictures').appendChild(picture.element);
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
    this.pictures.forEach(function(item, i) {
      if (i === number) {
        var imgSrc = item.preview ? item.preview : item.url;
        this.overlayImage.setAttribute('src', imgSrc);
        document.querySelector('.likes-count').innerHTML = item.likes;
        document.querySelector('.comments-count').innerHTML = item.comments;
      }
    }, this);

  };

  return new Gallery();

});
