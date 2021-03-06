'use strict';

define(['./utils.js', './superclass.js'], function(utils, SuperClass) {

  var Picture = function(model) {
    SuperClass.call(this);

    this.model = model;

    this.element = this.createNode();

    this.setPictureClick = this.setPictureClick.bind(this);
    this.element.addEventListener('click', this.setPictureClick);
  };

  utils.inherit(SuperClass, Picture);

  Picture.prototype.remove = function() {
    this.element.removeEventListener('click', this.setPictureClick);
    SuperClass.prototype.remove.call(this, this.element);
  };

  Picture.prototype.setPictureClick = function(event) {
    event.preventDefault();
    this.onclick();
  };

  Picture.prototype.createNode = function() {
    var template = document.querySelector('#picture-template');
    var templateContainer = 'content' in template ? template.content : template;
    var img = new Image();
    var imgNode = templateContainer.querySelector('.picture').cloneNode(true);

    img.onload = function() {
      imgNode.querySelector('img').setAttribute('src', img.src);
      imgNode.querySelector('img').setAttribute('width', 182);
      imgNode.querySelector('img').setAttribute('height', 182);
      imgNode.querySelector('.picture-likes').insertAdjacentHTML('afterBegin', this.model.getLikes());
      imgNode.querySelector('.picture-comments').insertAdjacentHTML('afterBegin', this.model.getComments());
      window.addEventListener('change', function() {
        var pictureLikes = imgNode.querySelector('.picture-likes');
        if (pictureLikes !== null) {
          pictureLikes.innerHTML = '';
          pictureLikes.insertAdjacentHTML('afterBegin', this.model.getLikes());
        }
      }.bind(this));
    }.bind(this);

    img.src = this.model.getUrl();

    img.onerror = function() {
      imgNode.classList.add('picture-load-failure');
    };

    return imgNode;
  };

  return Picture;

});
