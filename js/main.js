/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(pictures) {
	  return pictures;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(upload) {
	  return upload;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function(resizer) {
	  return resizer;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(gallery) {
	  return gallery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function(utils) {
	  return utils;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(load, gallery) {
	
	    function hideFilters() {
	      document.querySelector('.filters').classList.add('hidden');
	    }
	
	    function addPictureBlock(arr, callback) {
	      hideFilters();
	      gallery.setPictures(arr);
	
	      if (typeof callback === 'function') {
	        callback();
	      }
	    }
	
	    var pageNumber = 0;
	    var pageSize = 12;
	    var footer = document.querySelector('footer');
	    var throttleTimeOut = 100;
	    var optimizedScroll = throttle(checkNextPage, throttleTimeOut);
	
	    function setActiveFilter() {
	      return localStorage.getItem('filter') || 'filter-popular';
	    }
	
	    function changeFilter(filterID) {
	      document.getElementById(filterID).checked = true;
	      document.querySelector('.pictures').innerHTML = '';
	      pageNumber = 0;
	      localStorage.setItem('filter', filterID);
	      setScroll();
	      gallery.pictures = [];
	      loadPhotos(filterID, pageNumber);
	    }
	
	    function calcBottomIndent() {
	      var pictureArr = document.querySelectorAll('.picture');
	      var lastPicture = pictureArr[pictureArr.length - 1];
	      if (lastPicture) {
	        var lastPictureTop = lastPicture.getBoundingClientRect().top;
	        var lastPictureBottom = lastPicture.getBoundingClientRect().bottom;
	        var lastPictureHight = lastPictureBottom - lastPictureTop;
	        return lastPictureHight;
	      } else {
	        return 100;
	      }
	    }
	
	    function setScroll() {
	      window.addEventListener('scroll', optimizedScroll);
	    }
	
	    function throttle(callback, timeout) {
	      var lastCall = Date.now();
	      return function() {
	        if (Date.now() - lastCall >= timeout) {
	          callback();
	          lastCall = Date.now();
	        }
	      };
	    }
	
	    function checkNextPage() {
	      if (footer.getBoundingClientRect().top - window.innerHeight <= calcBottomIndent()) {
	        loadPhotos(setActiveFilter(), ++pageNumber);
	      }
	    }
	
	    function checkFilter() {
	      document.querySelector('.filters').addEventListener('change', function(evt) {
	        if (evt.target.classList.contains('filters-radio')) {
	          changeFilter(evt.target.id);
	        }
	      });
	    }
	
	    function checkEndList(data, from, to) {
	      if (data.length < to - from) {
	        window.removeEventListener('scroll', optimizedScroll);
	      } else {
	        checkNextPage();
	      }
	    }
	
	    function loadPhotos(filter, currentPage) {
	      var from = currentPage * pageSize;
	      var to = (currentPage * pageSize) + pageSize;
	      load('data/data.json', {
	        from: from,
	        to: to,
	        filter: filter
	      },
	      function(data) {
	        var pictures = data;
	        addPictureBlock(pictures, function() {
	          document.querySelector('.filters').classList.remove('hidden');
	          checkEndList(data, from, to);
	        });
	      });
	    }
	
	    changeFilter(setActiveFilter());
	    setScroll();
	    checkFilter();
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	
	
	
	
	
	
	
	
	


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
	  function getSearchString(params) {
	    return Object.keys(params).map(function(param) {
	      return [param, params[param]].join('=');
	    }).join('&');
	  }
	
	  function createCallBack(url, params, callback) {
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', url + '?' + getSearchString(params));
	    xhr.onload = function(evt) {
	      var data = JSON.parse(evt.target.response);
	      callback(data);
	    };
	    xhr.send();
	  }
	
	  return createCallBack;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(5), __webpack_require__(6), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Picture, utils, SuperClass, PictureModel) {
	
	    var Gallery = function() {
	      SuperClass.call(this);
	
	      this.activePicture = null;
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
	
	      this.restoreFromHash = this.restoreFromHash.bind(this);
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
	      arr.forEach(function(model, i) {
	        model.index = i + this.pictures.length - arr.length;
	        var picture = new Picture(model);
	        picture.onclick = function() {
	          var url = picture.model.getUrl();
	          location.hash = '#photo/' + url;
	        };
	        picture.onclick = picture.onclick;
	        SuperClass.prototype.show.call(this, document.querySelector('.pictures'), picture.element);
	      }, this);
	      if (this.pictures.length === arr.length) {
	        window.addEventListener('hashchange', this.restoreFromHash);
	        this.restoreFromHash();
	      }
	    };
	
	    Gallery.prototype.restoreFromHash = function() {
	      var regexp = /#photo\/(\S+)/;
	      if (location.hash.match(regexp)) {
	        this.show(location.hash.match(regexp)[1]);
	      } else {
	        this.hide();
	      }
	    };
	
	    Gallery.prototype.show = function(url) {
	      this.overlay.classList.remove('invisible');
	      this.setActivePicture(url);
	    };
	
	    Gallery.prototype.showNextPicture = function(evt) {
	      if (evt.target === this.overlayImage) {
	        if (this.activePicture === this.pictures.length - 1) {
	          var firstPictureUrl = this.pictures[0].getUrl();
	          location.hash = '#photo/' + firstPictureUrl;
	        }
	        var nexPictureUrl = this.pictures[this.activePicture + 1].getUrl();
	        location.hash = '#photo/' + nexPictureUrl;
	      }
	    };
	
	    Gallery.prototype.hide = function() {
	      this.overlay.classList.add('invisible');
	      location.hash = '';
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
	
	    Gallery.prototype.setActivePicture = function(url) {
	      this.pictures.forEach(function(item) {
	        if (item.getUrl() === url) {
	          this.activePicture = item.index;
	          var picture = this.pictures[this.activePicture];
	          var imgSrc = url;
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
	        }
	
	      }.bind(this));
	    };
	
	    return new Gallery();
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(utils, SuperClass) {
	
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
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
	  var utils = {};
	
	  utils.inherit = function(Parent, Child) {
	    var EmptyConstructor = function() {};
	    EmptyConstructor.prototype = Parent.prototype;
	    Child.prototype = new EmptyConstructor();
	  };
	
	  return utils;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
	  var SuperClass = function(data) {
	    this.element = data;
	  };
	
	  SuperClass.prototype.show = function(parent, element) {
	    parent.appendChild(element);
	  };
	
	  SuperClass.prototype.remove = function(element) {
	    if (element.parentNode) {
	      element.parentNode.removeChild(element);
	    }
	    return;
	  };
	
	  return SuperClass;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
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
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global Resizer: true */
	
	/**
	 * @fileoverview
	 * @author Igor Alexeenko (o0)
	 */
	
	'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(cookies) {
	  (function() {
	    try {
	      new CustomEvent('IE has CustomEvent, but doesn\'t support constructor'); // eslint-disable-line
	    } catch (e) {
	      window.CustomEvent = function(event, params) {
	        var evt;
	        params = params || {
	          bubbles: false,
	          cancelable: false,
	          detail: null
	        };
	        evt = document.createEvent('CustomEvent');
	        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
	        return evt;
	      };
	
	      CustomEvent.prototype = Object.create(window.Event.prototype);
	    }
	    /** @enum {string} */
	    var FileType = {
	      'GIF': '',
	      'JPEG': '',
	      'PNG': '',
	      'SVG+XML': ''
	    };
	
	    /** @enum {number} */
	    var Action = {
	      ERROR: 0,
	      UPLOADING: 1,
	      CUSTOM: 2
	    };
	
	    /**
	     * Регулярное выражение, проверяющее тип загружаемого файла. Составляется
	     * из ключей FileType.
	     * @type {RegExp}
	     */
	    var fileRegExp = new RegExp('^image/(' + Object.keys(FileType).join('|').replace('\+', '\\+') + ')$', 'i');
	
	    /**
	     * @type {Object.<string, string>}
	     */
	    var filterMap;
	
	    /**
	     * Объект, который занимается кадрированием изображения.
	     * @type {Resizer}
	     */
	    var currentResizer;
	
	
	    /**
	     * Удаляет текущий объект {@link Resizer}, чтобы создать новый с другим
	     * изображением.
	     */
	    var cleanupResizer = function() {
	      if (currentResizer) {
	        currentResizer.remove();
	        currentResizer = null;
	      }
	    };
	
	    /**
	     * Ставит одну из трех случайных картинок на фон формы загрузки.
	     */
	    var updateBackground = function() {
	      var images = [
	        'img/logo-background-1.jpg',
	        'img/logo-background-2.jpg',
	        'img/logo-background-3.jpg'
	      ];
	
	      var backgroundElement = document.querySelector('.upload');
	      var randomImageNumber = Math.round(Math.random() * (images.length - 1));
	      backgroundElement.style.backgroundImage = 'url(' + images[randomImageNumber] + ')';
	    };
	
	    /**
	     * Проверяет, валидны ли данные, в форме кадрирования.
	     * @return {boolean}
	     */
	
	    var resizeControls = document.getElementsByClassName('upload-resize-control');
	
	    for (var i = 0; i < resizeControls.length; i++) {
	      var inputElement = resizeControls[i];
	      inputElement.value = 0;
	      if (inputElement.id === 'resize-x' || inputElement.id === 'resize-y') {
	        inputElement.min = 0;
	      }
	      inputElement.addEventListener('input', validate);
	    }
	
	    function validate() {
	      if (resizeFormIsValid()) {
	        document.getElementById('resize-fwd').removeAttribute('disabled');
	      } else {
	        document.getElementById('resize-fwd').setAttribute('disabled', 'disabled');
	      }
	    }
	
	    var resizeFormIsValid = function() {
	      var horizontalOffset = +document.getElementById('resize-x').value;
	      var verticalOffset = +document.getElementById('resize-y').value;
	      var side = +document.getElementById('resize-size').value;
	      var sumXSide = horizontalOffset + side;
	      var sumYSide = verticalOffset + side;
	      return sumXSide <= currentResizer._image.naturalWidth &&
	        sumYSide <= currentResizer._image.naturalHeight;
	    };
	
	    /**
	     * Форма загрузки изображения.
	     * @type {HTMLFormElement}
	     */
	    var uploadForm = document.forms['upload-select-image'];
	
	    /**
	     * Форма кадрирования изображения.
	     * @type {HTMLFormElement}
	     */
	    var resizeForm = document.forms['upload-resize'];
	
	
	    /**
	     * Форма добавления фильтра.
	     * @type {HTMLFormElement}
	     */
	    var filterForm = document.forms['upload-filter'];
	
	    /**
	     * @type {HTMLImageElement}
	     */
	    var filterImage = filterForm.querySelector('.filter-image-preview');
	
	    /**
	     * @type {HTMLElement}
	     */
	    var uploadMessage = document.querySelector('.upload-message');
	
	    /**
	     * @param {Action} action
	     * @param {string=} message
	     * @return {Element}
	     */
	    var showMessage = function(action, message) {
	      var isError = false;
	
	      switch (action) {
	        case Action.UPLOADING:
	          message = message || 'Кексограмим&hellip;';
	          break;
	
	        case Action.ERROR:
	          isError = true;
	          message = message || 'Неподдерживаемый формат файла<br> <a href="' + document.location + '">Попробовать еще раз</a>.';
	          break;
	      }
	
	      uploadMessage.querySelector('.upload-message-container').innerHTML = message;
	      uploadMessage.classList.remove('invisible');
	      uploadMessage.classList.toggle('upload-message-error', isError);
	      return uploadMessage;
	    };
	
	    var hideMessage = function() {
	      uploadMessage.classList.add('invisible');
	    };
	
	    /**
	     * Обработчик изменения изображения в форме загрузки. Если загруженный
	     * файл является изображением, считывается исходник картинки, создается
	     * Resizer с загруженной картинкой, добавляется в форму кадрирования
	     * и показывается форма кадрирования.
	     * @param {Event} evt
	     */
	    uploadForm.addEventListener('change', function(evt) {
	      var element = evt.target;
	      if (element.id === 'upload-file') {
	        // Проверка типа загружаемого файла, тип должен быть изображением
	        // одного из форматов: JPEG, PNG, GIF или SVG.
	        if (fileRegExp.test(element.files[0].type)) {
	          var fileReader = new FileReader();
	
	          showMessage(Action.UPLOADING);
	
	          fileReader.addEventListener('load', function() {
	            cleanupResizer();
	
	            currentResizer = new Resizer(fileReader.result);
	            currentResizer.setElement(resizeForm);
	            uploadMessage.classList.add('invisible');
	
	            uploadForm.classList.add('invisible');
	            resizeForm.classList.remove('invisible');
	
	            hideMessage();
	          });
	
	          fileReader.readAsDataURL(element.files[0]);
	        } else {
	          // Показ сообщения об ошибке, если формат загружаемого файла не поддерживается
	          showMessage(Action.ERROR);
	        }
	      }
	    });
	
	    /**
	     * Обработка сброса формы кадрирования. Возвращает в начальное состояние
	     * и обновляет фон.
	     * @param {Event} evt
	     */
	    resizeForm.addEventListener('reset', function(evt) {
	      evt.preventDefault();
	
	      cleanupResizer();
	      updateBackground();
	
	      resizeForm.classList.add('invisible');
	      uploadForm.classList.remove('invisible');
	    });
	
	    var resizeX = document.querySelector('#resize-x');
	    var resizeY = document.querySelector('#resize-y');
	    var resizeSize = document.querySelector('#resize-size');
	
	    var eventResize = new CustomEvent('resizerchange');
	    window.addEventListener('resizerchange', function() {
	      if (currentResizer) {
	        resizeX.value = Math.round(currentResizer.getConstraint().x);
	        resizeY.value = Math.round(currentResizer.getConstraint().y);
	        resizeSize.value = Math.round(currentResizer.getConstraint().side);
	      }
	    });
	
	    window.dispatchEvent(eventResize);
	
	    var uploadResizeControls = document.querySelector('.upload-resize-controls');
	    uploadResizeControls.addEventListener('input', function() {
	      var valueX = parseInt(resizeX.value, 10);
	      var valueY = parseInt(resizeY.value, 10);
	      var valueSize = parseInt(resizeSize.value, 10);
	
	      currentResizer.setConstraint(valueX, valueY, valueSize);
	    });
	
	    /**
	     * Обработка отправки формы кадрирования. Если форма валидна, экспортирует
	     * кропнутое изображение в форму добавления фильтра и показывает ее.
	     * @param {Event} evt
	     */
	    resizeForm.addEventListener('submit', function(evt) {
	      evt.preventDefault();
	
	      if (resizeFormIsValid()) {
	        var image = currentResizer.exportImage().src;
	
	        var thumbnails = filterForm.querySelectorAll('.upload-filter-preview');
	        for (i = 0; i < thumbnails.length; i++) {
	          thumbnails[i].style.backgroundImage = 'url(' + image + ')';
	        }
	
	        filterImage.src = image;
	
	        resizeForm.classList.add('invisible');
	        filterForm.classList.remove('invisible');
	        cookies.setFilterName(filterForm['upload-filter'], filterForm);
	      }
	    });
	
	    /**
	     * Сброс формы фильтра. Показывает форму кадрирования.
	     * @param {Event} evt
	     */
	    filterForm.addEventListener('reset', function(evt) {
	      evt.preventDefault();
	
	      filterForm.classList.add('invisible');
	      resizeForm.classList.remove('invisible');
	    });
	
	    /**
	     * Отправка формы фильтра. Возвращает в начальное состояние, предварительно
	     * записав сохраненный фильтр в cookie.
	     * @param {Event} evt
	     */
	
	    filterForm.addEventListener('submit', function(evt) {
	      evt.preventDefault();
	
	      cleanupResizer();
	      updateBackground();
	      filterForm.classList.add('invisible');
	      uploadForm.classList.remove('invisible');
	    });
	
	    /**
	     * Обработчик изменения фильтра. Добавляет класс из filterMap соответствующий
	     * выбранному значению в форме.
	     */
	    filterForm.addEventListener('change', function() {
	      if (!filterMap) {
	        // Ленивая инициализация. Объект не создается до тех пор, пока
	        // не понадобится прочитать его в первый раз, а после этого запоминается
	        // навсегда.
	        filterMap = {
	          'none': 'filter-none',
	          'chrome': 'filter-chrome',
	          'sepia': 'filter-sepia',
	          'marvin': 'filter-marvin'
	        };
	      }
	
	      var selectedFilter = [].filter.call(filterForm['upload-filter'], function(item) {
	        return item.checked;
	      })[0].value;
	
	      // Класс перезаписывается, а не обновляется через classList потому что нужно
	      // убрать предыдущий примененный класс. Для этого нужно или запоминать его
	      // состояние или просто перезаписывать.
	      filterImage.className = 'filter-image-preview ' + filterMap[selectedFilter];
	      cookies.setNewCookie(filterMap[selectedFilter]);
	    });
	
	    cleanupResizer();
	    updateBackground();
	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  function getLastGraceBithday() {
	    var graceBirthday = new Date();
	    graceBirthday.setMonth(11, 9);
	    var now = new Date();
	
	    if (graceBirthday > now) {
	      return graceBirthday.setFullYear(graceBirthday.getFullYear() - 1);
	    }
	    return graceBirthday;
	  }
	
	  function getExpireCookiesDate() {
	    var days = 24 * 60 * 60 * 1000;
	    return Math.floor((new Date() - getLastGraceBithday()) / days);
	  }
	
	  function setCookie(filter) {
	    window.Cookies.set('upload-filter', filter, { expires: getExpireCookiesDate() });
	  }
	
	  function getFilterNameFromCookies() {
	    return window.Cookies.get('upload-filter');
	  }
	
	  function setCurrentFilterName(list, form) {
	    if (getFilterNameFromCookies() === null) {
	      return;
	    }
	    for (var i = 0; i < list.length; i++) {
	      if (list[i].id === 'upload-' + getFilterNameFromCookies()) {
	        list[i].setAttribute('checked', 'checked');
	        var event = null;
	        if (navigator.appName.indexOf('Internet Explorer') !== -1) {
	          event = new CustomEvent('change');
	        } else {
	          event = new Event('change');
	        }
	        form.dispatchEvent(event);
	      }
	    }
	  }
	
	  return {
	    setFilterName: setCurrentFilterName,
	    setNewCookie: setCookie
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  (function() {
	    /**
	     * @constructor
	     * @param {string} image
	     */
	    var Resizer = function(image) {
	      // Изображение, с которым будет вестись работа.
	      this._image = new Image();
	      this._image.src = image;
	
	      // Холст.
	      this._container = document.createElement('canvas');
	      this._ctx = this._container.getContext('2d');
	
	      // Создаем холст только после загрузки изображения.
	      this._image.onload = function() {
	        // Размер холста равен размеру загруженного изображения. Это нужно
	        // для удобства работы с координатами.
	        this._container.width = this._image.naturalWidth;
	        this._container.height = this._image.naturalHeight;
	
	        /**
	         * Предлагаемый размер кадра в виде коэффициента относительно меньшей
	         * стороны изображения.
	         * @const
	         * @type {number}
	         */
	        var INITIAL_SIDE_RATIO = 0.75;
	
	        // Размер меньшей стороны изображения.
	        var side = Math.min(
	            this._container.width * INITIAL_SIDE_RATIO,
	            this._container.height * INITIAL_SIDE_RATIO);
	
	        // Изначально предлагаемое кадрирование — часть по центру с размером в 3/4
	        // от размера меньшей стороны.
	        this._resizeConstraint = new Square(
	            this._container.width / 2 - side / 2,
	            this._container.height / 2 - side / 2,
	            side);
	
	        // Отрисовка изначального состояния канваса.
	        this.setConstraint();
	      }.bind(this);
	
	      // Фиксирование контекста обработчиков.
	      this._onDragStart = this._onDragStart.bind(this);
	      this._onDragEnd = this._onDragEnd.bind(this);
	      this._onDrag = this._onDrag.bind(this);
	    };
	
	    Resizer.prototype = {
	      /**
	       * Родительский элемент канваса.
	       * @type {Element}
	       * @private
	       */
	      _element: null,
	
	      /**
	       * Положение курсора в момент перетаскивания. От положения курсора
	       * рассчитывается смещение на которое нужно переместить изображение
	       * за каждую итерацию перетаскивания.
	       * @type {Coordinate}
	       * @private
	       */
	      _cursorPosition: null,
	
	      /**
	       * Объект, хранящий итоговое кадрирование: сторона квадрата и смещение
	       * от верхнего левого угла исходного изображения.
	       * @type {Square}
	       * @private
	       */
	      _resizeConstraint: null,
	
	      /**
	       * Отрисовка канваса.
	       */
	      redraw: function() {
	        // Очистка изображения.
	        this._ctx.clearRect(0, 0, this._container.width, this._container.height);
	
	        // Параметры линии.
	        // NB! Такие параметры сохраняются на время всего процесса отрисовки
	        // canvas'a поэтому важно вовремя поменять их, если нужно начать отрисовку
	        // чего-либо с другой обводкой.
	
	        // Толщина линии.
	        this._ctx.lineWidth = 6;
	        // Цвет обводки.
	        this._ctx.strokeStyle = '#ffe753';
	
	        // Сохранение состояния канваса.
	        this._ctx.save();
	
	        // Установка начальной точки системы координат в центр холста.
	        this._ctx.translate(this._container.width / 2, this._container.height / 2);
	
	        var displX = -(this._resizeConstraint.x + this._resizeConstraint.side / 2);
	        var displY = -(this._resizeConstraint.y + this._resizeConstraint.side / 2);
	        // Отрисовка изображения на холсте. Параметры задают изображение, которое
	        // нужно отрисовать и координаты его верхнего левого угла.
	        // Координаты задаются от центра холста.
	        this._ctx.drawImage(this._image, displX, displY);
	
	        // Отрисовка прямоугольника, обозначающего область изображения после
	        // кадрирования. Координаты задаются от центра.
	        // this._ctx.strokeRect(
	
	        var size = Math.round(this._resizeConstraint.side - this._ctx.lineWidth / 2);
	
	        this._ctx.translate(-this._container.width / 2, -this._container.height / 2);
	
	        var innerFrame = {};
	        innerFrame.side = Math.round(size + this._ctx.lineWidth);
	
	        var offsetX = Math.round( this._ctx.lineWidth / 2 ) + 1;
	        var offsetY = Math.round( this._ctx.lineWidth / 2 ) + 1;
	
	        var self = this;
	
	        var blocks = [];
	
	        blocks[0] = {};
	        blocks[0].x = 0;
	        blocks[0].y = 0;
	        blocks[0].width = this._container.width;
	        blocks[0].height = Math.round((this._container.height - innerFrame.side) / 2) - offsetY;
	
	        blocks[1] = {};
	        blocks[1].x = blocks[0].x;
	        blocks[1].y = blocks[0].y + blocks[0].height;
	        blocks[1].width = Math.round((this._container.width - innerFrame.side) / 2) - offsetX;
	        blocks[1].height = innerFrame.side;
	
	        blocks[2] = {};
	        blocks[2].x = blocks[0].x;
	        blocks[2].y = blocks[1].y + blocks[1].height;
	        blocks[2].width = blocks[0].width;
	        blocks[2].height = this._container.height - blocks[0].height - blocks[1].height;
	
	        blocks[3] = {};
	        blocks[3].x = blocks[0].x + blocks[1].width + innerFrame.side;
	        blocks[3].y = blocks[1].y;
	        blocks[3].width = this._container.width - blocks[3].x;
	        blocks[3].height = blocks[1].height;
	
	        this._ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
	
	        function drawOutFrame(arr) {
	          arr.forEach(function(item) {
	            self._ctx.fillRect(item.x, item.y, item.width, item.height);
	          });
	        }
	
	        drawOutFrame(blocks);
	
	        this._ctx.fillStyle = '#FFF';
	        this._ctx.textAlign = 'center';
	        this._ctx.font = '30px Tahoma';
	        this._ctx.textBaseline = 'bottom';
	        this._ctx.fillText(this._image.naturalWidth + ' x ' + this._image.naturalHeight,
	          this._container.width / 2, blocks[0].height);
	
	        this._ctx.translate(Math.round(this._container.width / 2), Math.round(this._container.height / 2));
	
	        var lineLength = 12;
	        var zigzagXFirst = Math.floor((-this._resizeConstraint.side / 2) - this._ctx.lineWidth / 2);
	        var zigzagYFirst = Math.floor((-this._resizeConstraint.side / 2) - this._ctx.lineWidth / 2);
	        var zigzagLineX = zigzagXFirst;
	        var zigzagLineY = zigzagYFirst;
	        var zigzagLineLengthHor = Math.floor((this._resizeConstraint.side - this._ctx.lineWidth / 2) + zigzagXFirst);
	        var zigzagLineLengthVer = Math.floor((this._resizeConstraint.side - this._ctx.lineWidth / 2) + zigzagYFirst);
	
	        this._ctx.lineCap = 'square';
	
	        while (zigzagLineX <= zigzagLineLengthHor - lineLength / 2) {
	          this._ctx.beginPath();
	          this._ctx.moveTo(zigzagLineX, zigzagLineY);
	          zigzagLineX = zigzagLineX + lineLength;
	          zigzagLineY = zigzagLineY - lineLength;
	          this._ctx.lineTo(zigzagLineX, zigzagLineY);
	          zigzagLineX = zigzagLineX + lineLength;
	          zigzagLineY = zigzagLineY + lineLength;
	          this._ctx.lineTo(zigzagLineX, zigzagLineY);
	          this._ctx.stroke();
	        }
	
	        while (zigzagLineY <= zigzagLineLengthVer - lineLength / 2) {
	          this._ctx.beginPath();
	          this._ctx.moveTo(zigzagLineX, zigzagLineY);
	          zigzagLineX = zigzagLineX - lineLength;
	          zigzagLineY = zigzagLineY + lineLength;
	          this._ctx.lineTo(zigzagLineX, zigzagLineY);
	          zigzagLineX = zigzagLineX + lineLength;
	          zigzagLineY = zigzagLineY + lineLength;
	          this._ctx.lineTo(zigzagLineX, zigzagLineY);
	          this._ctx.stroke();
	        }
	
	        while (zigzagLineX >= zigzagXFirst + lineLength / 2) {
	          this._ctx.beginPath();
	          this._ctx.moveTo(zigzagLineX, zigzagLineY);
	          zigzagLineX = zigzagLineX - lineLength;
	          zigzagLineY = zigzagLineY + lineLength;
	          this._ctx.lineTo(zigzagLineX, zigzagLineY);
	          zigzagLineX = zigzagLineX - lineLength;
	          zigzagLineY = zigzagLineY - lineLength;
	          this._ctx.lineTo(zigzagLineX, zigzagLineY);
	          this._ctx.stroke();
	        }
	
	        while (zigzagLineY >= zigzagYFirst + lineLength / 2) {
	          this._ctx.beginPath();
	          this._ctx.moveTo(zigzagLineX, zigzagLineY);
	          zigzagLineX = zigzagLineX + lineLength;
	          zigzagLineY = zigzagLineY - lineLength;
	          this._ctx.lineTo(zigzagLineX, zigzagLineY);
	          zigzagLineX = zigzagLineX - lineLength;
	          zigzagLineY = zigzagLineY - lineLength;
	          this._ctx.lineTo(zigzagLineX, zigzagLineY);
	          this._ctx.stroke();
	        }
	
	        // Восстановление состояния канваса, которое было до вызова ctx.save
	        // и последующего изменения системы координат. Нужно для того, чтобы
	        // следующий кадр рисовался с привычной системой координат, где точка
	        // 0 0 находится в левом верхнем углу холста, в противном случае
	        // некорректно сработает даже очистка холста или нужно будет использовать
	        // сложные рассчеты для координат прямоугольника, который нужно очистить.
	        this._ctx.restore();
	
	      },
	
	      /**
	       * Включение режима перемещения. Запоминается текущее положение курсора,
	       * устанавливается флаг, разрешающий перемещение и добавляются обработчики,
	       * позволяющие перерисовывать изображение по мере перетаскивания.
	       * @param {number} x
	       * @param {number} y
	       * @private
	       */
	      _enterDragMode: function(x, y) {
	        this._cursorPosition = new Coordinate(x, y);
	        document.body.addEventListener('mousemove', this._onDrag);
	        document.body.addEventListener('mouseup', this._onDragEnd);
	      },
	
	      /**
	       * Выключение режима перемещения.
	       * @private
	       */
	      _exitDragMode: function() {
	        this._cursorPosition = null;
	        document.body.removeEventListener('mousemove', this._onDrag);
	        document.body.removeEventListener('mouseup', this._onDragEnd);
	      },
	
	      /**
	       * Перемещение изображения относительно кадра.
	       * @param {number} x
	       * @param {number} y
	       * @private
	       */
	      updatePosition: function(x, y) {
	        this.moveConstraint(
	            this._cursorPosition.x - x,
	            this._cursorPosition.y - y);
	        this._cursorPosition = new Coordinate(x, y);
	      },
	
	      /**
	       * @param {MouseEvent} evt
	       * @private
	       */
	      _onDragStart: function(evt) {
	        this._enterDragMode(evt.clientX, evt.clientY);
	      },
	
	      /**
	       * Обработчик окончания перетаскивания.
	       * @private
	       */
	      _onDragEnd: function() {
	        this._exitDragMode();
	      },
	
	      /**
	       * Обработчик события перетаскивания.
	       * @param {MouseEvent} evt
	       * @private
	       */
	      _onDrag: function(evt) {
	        this.updatePosition(evt.clientX, evt.clientY);
	      },
	
	      /**
	       * Добавление элемента в DOM.
	       * @param {Element} element
	       */
	      setElement: function(element) {
	        if (this._element === element) {
	          return;
	        }
	
	        this._element = element;
	        this._element.insertBefore(this._container, this._element.firstChild);
	        // Обработчики начала и конца перетаскивания.
	        this._container.addEventListener('mousedown', this._onDragStart);
	      },
	
	      /**
	       * Возвращает кадрирование элемента.
	       * @return {Square}
	       */
	      getConstraint: function() {
	        return this._resizeConstraint;
	      },
	
	      /**
	       * Смещает кадрирование на значение указанное в параметрах.
	       * @param {number} deltaX
	       * @param {number} deltaY
	       * @param {number} deltaSide
	       */
	      moveConstraint: function(deltaX, deltaY, deltaSide) {
	        this.setConstraint(
	            this._resizeConstraint.x + (deltaX || 0),
	            this._resizeConstraint.y + (deltaY || 0),
	            this._resizeConstraint.side + (deltaSide || 0));
	      },
	
	      /**
	       * @param {number} x
	       * @param {number} y
	       * @param {number} side
	       */
	      setConstraint: function(x, y, side) {
	        if (typeof x !== 'undefined') {
	          this._resizeConstraint.x = x;
	        }
	
	        if (typeof y !== 'undefined') {
	          this._resizeConstraint.y = y;
	        }
	
	        if (typeof side !== 'undefined') {
	          this._resizeConstraint.side = side;
	        }
	
	        requestAnimationFrame(function() {
	          this.redraw();
	          var resizerChangeEvent = document.createEvent('CustomEvent');
	          resizerChangeEvent.initEvent('resizerchange', false, false);
	          window.dispatchEvent(resizerChangeEvent);
	        }.bind(this));
	      },
	
	      /**
	       * Удаление. Убирает контейнер из родительского элемента, убирает
	       * все обработчики событий и убирает ссылки.
	       */
	      remove: function() {
	        this._element.removeChild(this._container);
	
	        this._container.removeEventListener('mousedown', this._onDragStart);
	        this._container = null;
	      },
	
	      /**
	       * Экспорт обрезанного изображения как HTMLImageElement и исходником
	       * картинки в src в формате dataURL.
	       * @return {Image}
	       */
	      exportImage: function() {
	        // Создаем Image, с размерами, указанными при кадрировании.
	        var imageToExport = new Image();
	
	        // Создается новый canvas, по размерам совпадающий с кадрированным
	        // изображением, в него добавляется изображение взятое из канваса
	        // с измененными координатами и сохраняется в dataURL, с помощью метода
	        // toDataURL. Полученный исходный код, записывается в src у ранее
	        // созданного изображения.
	        var temporaryCanvas = document.createElement('canvas');
	        var temporaryCtx = temporaryCanvas.getContext('2d');
	        temporaryCanvas.width = this._resizeConstraint.side;
	        temporaryCanvas.height = this._resizeConstraint.side;
	        temporaryCtx.drawImage(this._image,
	            -this._resizeConstraint.x,
	            -this._resizeConstraint.y);
	        imageToExport.src = temporaryCanvas.toDataURL('image/png');
	
	        return imageToExport;
	      }
	    };
	
	    /**
	     * Вспомогательный тип, описывающий квадрат.
	     * @constructor
	     * @param {number} x
	     * @param {number} y
	     * @param {number} side
	     * @private
	     */
	    var Square = function(x, y, side) {
	      this.x = x;
	      this.y = y;
	      this.side = side;
	    };
	
	    /**
	     * Вспомогательный тип, описывающий координату.
	     * @constructor
	     * @param {number} x
	     * @param {number} y
	     * @private
	     */
	    var Coordinate = function(x, y) {
	      this.x = x;
	      this.y = y;
	    };
	
	    window.Resizer = Resizer;
	  })();
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map?dropcache