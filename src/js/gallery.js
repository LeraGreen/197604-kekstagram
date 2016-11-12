'use strict';

define(['./picture.js'], function(Picture) {

  var Gallery = function() {
    this.activePicture = null;
    this.pictures = [];
    this.overlay = document.querySelector('.gallery-overlay');
    this.overlayClose = document.querySelector('.gallery-overlay-close');
    this.overlayImage = document.querySelector('.gallery-overlay-image');
  };

  Gallery.prototype.setPictures = function(arr) {
    var self = this;
    arr.forEach(function(item, i) {
      self.pictures.push(item);
    });
    this.render(arr);
  };

  Gallery.prototype.render = function(arr) {
    var self = this;
    arr.forEach(function(item, i) {
      var picture = new Picture(item);
      picture.onclick = function() {
        self.show(i);
        return false;
      };
      document.querySelector('.pictures').appendChild(picture.element);
    });
  };

  Gallery.prototype.show = function(number) {
    var self = this;
    this.overlayClose.onclick = function() {
      self.hide();
    };
    this.overlayImage.onclick = function(evt) {
      if (evt.target === self.overlayImage) {
        if (self.activePicture === self.pictures.length - 1) {
          self.setActivePicture(0);
        }
        self.setActivePicture(self.activePicture + 1);
      }
    };

    this.overlay.classList.remove('invisible');
    this.setActivePicture(number);
  };

  Gallery.prototype.hide = function() {
    this.overlay.classList.add('invisible');
  };

  Gallery.prototype.setActivePicture = function(number) {
    var self = this;
    this.activePicture = number;
    this.pictures.forEach(function(item, i) {
      if (i === number) {
        var imgSrc = item.preview ? item.preview : item.url;
        self.overlayImage.setAttribute('src', imgSrc);
        document.querySelector('.likes-count').innerHTML = item.likes;
        document.querySelector('.comments-count').innerHTML = item.comments;
      }
    });

  };

  return new Gallery();

});
