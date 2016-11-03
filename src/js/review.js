'use strict';

define( function() {
  function createNode(obj) {
    var template = document.querySelector('#picture-template');
    var templateContainer = 'content' in template ? template.content : template;
    var img = new Image();
    var imgNode = templateContainer.querySelector('.picture').cloneNode(true);

    img.onload = function() {
      imgNode.querySelector('img').setAttribute('src', img.src);
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
  }
  return createNode;
});
