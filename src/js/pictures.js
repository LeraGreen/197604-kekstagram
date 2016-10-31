'use strict';

function createCallBack(url, callback) {
  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);

  window.JSONPCallback = function(data) {
    callback(data);
  };
}

createCallBack('http://localhost:1507/api/pictures?callback=JSONPCallback', function(data) {
  var pictures = data;
  addPictureBlock(pictures, function() {
    document.querySelector('.filters').classList.remove('hidden');
  });
});

var template = document.querySelector('#picture-template');
var templateContainer = 'content' in template ? template.content : template;
var picturesContainer = document.querySelector('.pictures');

function hideFilters() {
  document.querySelector('.filters').classList.add('hidden');
}

function addPictureBlock(arr, callback) {
  arr.forEach(function(item) {
    picturesContainer.appendChild(createNode(item));
  });

  if (typeof callback === 'function') {
    callback();
  }
}

function createNode(obj) {
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

hideFilters();










