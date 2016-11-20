'use strict';

define(function() {

  var PictureModel = function(data) {
    this.data = data;
  };

  PictureModel.prototype.getPictureUrl = function() {
    return this.data.preview ? this.data.preview : this.data.url;
  };

  PictureModel.prototype.getPictureLikes = function() {
    return this.data.likes;
  };

  PictureModel.prototype.getPictureComments = function() {
    return this.data.comments;
  };

  PictureModel.prototype.getPictureCreated = function() {
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

