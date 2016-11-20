'use strict';

define(['./utils.js', './superclass.js'], function(utils, SuperClass) {

  var Picture = function(data) {
    SuperClass.call(this);

    this.data = data;
    this.index = null;
    this.element = this.createNode(this.data);

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
    this.onclick(this.index);
  };

  Picture.prototype.createNode = function(obj) {
    var template = document.querySelector('#picture-template');
    var templateContainer = 'content' in template ? template.content : template;
    var img = new Image();
    var imgNode = templateContainer.querySelector('.picture').cloneNode(true);
    console.log(obj);

    img.onload = function() {
      imgNode.querySelector('img').setAttribute('src', this.src);
      imgNode.querySelector('img').setAttribute('width', 182);
      imgNode.querySelector('img').setAttribute('height', 182);
      imgNode.querySelector('.picture-likes').insertAdjacentHTML('afterBegin', obj.likes);
      imgNode.querySelector('.picture-comments').insertAdjacentHTML('afterBegin', obj.comments);
    };

    img.src = obj.preview ? obj.preview : obj.url;

    img.onerror = function() {
      imgNode.classList.add('picture-load-failure');
    };

    return imgNode;
  };

  return Picture;

});
