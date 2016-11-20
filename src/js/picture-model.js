'use strict';

define(function() {

  var PictureModel = function(data) {
    this.data = data;
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

  PictureModel.prototype.setLikesCount = function(number) {
    this.data.likes = number;
    this.change();
  };

  PictureModel.prototype.setCommentsCount = function(number) {
    this.data.comments = number;
    this.change();
  };

  PictureModel.prototype.change = function() {

  };

  return PictureModel;

});

