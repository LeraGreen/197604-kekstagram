'use strict';

define(function() {

  var PictureModel = function(data) {
    this.data = data;
    this.list = [];
    this.liked = false;
  };

  PictureModel.prototype.getUrl = function() {
    return this.data.preview || this.data.url;
  };

  PictureModel.prototype.getLikes = function() {
    return this.data.likes;
  };

  PictureModel.prototype.getComments = function() {
    return this.data.comments;
  };

  PictureModel.prototype.getCreated = function() {
    return new Date(this.data.created);
  };

  PictureModel.prototype.setLikes = function(number) {
    this.data.likes = number;
    this.changeLikes();
  };

  PictureModel.prototype.setComments = function(number) {
    this.data.comments = number;
  };

  PictureModel.prototype.changeLikes = function() {
    var changeLikes = new CustomEvent('change');
    window.dispatchEvent(changeLikes);
  };

  return PictureModel;
});

