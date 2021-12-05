/*!-----------------------------------------------------------------
    Name: Godlike - Gaming HTML Template
    Version: 2.4.2
    Author: nK
    Website: https://nkdev.info/
    Purchase: https://1.envato.market/godlike-html-info
    Support: https://nk.ticksy.com/
    License: You must have a valid license purchased only from ThemeForest (the above link) in order to legally use the theme for your project.
    Copyright 2020.
-------------------------------------------------------------------*/
    /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/*------------------------------------------------------------------

  Theme Options

-------------------------------------------------------------------*/
var options = {
  enableSearchAutofocus: true,
  enableActionLikeAnimation: true,
  enableShortcuts: true,
  enableFadeBetweenPages: true,
  enableMouseParallax: true,
  enableCookieAlert: true,
  scrollToAnchorSpeed: 700,
  parallaxSpeed: 0.6,
  templates: {
    secondaryNavbarBackItem: 'Back',
    likeAnimationLiked: 'Liked!',
    likeAnimationDisliked: 'Disliked!',
    // cookieAlert: "<span class=\"nk-cookie-alert-close\"><span class=\"nk-icon-close\"></span></span>\n            Cookie alert are ready to use. You can simply change content inside this alert or disable it in javascript theme options. <a href=\"#\">Cookies policy</a>.\n            <div class=\"nk-gap\"></div>\n            <span class=\"nk-cookie-alert-confirm nk-btn link-effect-4 nk-btn-bg-white nk-btn-color-dark-1\">Confirm</span>",
    plainVideoIcon: '<span class="nk-video-icon"><i class="fa fa-play pl-5"></i></span>',
    plainVideoLoadIcon: '<span class="nk-loading-spinner"><i></i></span>',
    fullscreenVideoClose: '<span class="nk-icon-close"></span>',
    gifIcon: '<span class="nk-gif-icon"><i class="fa fa-hand-pointer-o"></i></span>',
    audioPlainButton: "<div class=\"nk-audio-plain-play-pause\">\n                <span class=\"nk-audio-plain-play\">\n                    <span class=\"ion-play ml-3\"></span>\n                </span>\n                <span class=\"nk-audio-plain-pause\">\n                    <span class=\"ion-pause\"></span>\n                </span>\n            </div>",
    instagram: "<div class=\"col-4\">\n                <a href=\"{{link}}\" target=\"_blank\">\n                    <img src=\"{{image}}\" alt=\"{{caption}}\" class=\"nk-img-stretch\">\n                </a>\n            </div>",
    instagramLoadingText: 'Loading...',
    instagramFailText: 'Failed to fetch data',
    instagramApiPath: 'php/instagram/instagram.php',
    twitter: "<div class=\"nk-twitter\">\n                <span class=\"nk-twitter-icon fa fa-twitter\"></span>\n                <div class=\"nk-twitter-text\">\n                   {{tweet}}\n                </div>\n                <div class=\"nk-twitter-date\">\n                    <span>{{date}}</span>\n                </div>\n            </div>",
    twitterLoadingText: 'Loading...',
    twitterFailText: 'Failed to fetch data',
    twitterApiPath: 'php/twitter/tweet.php',
    countdown: "<div>\n                <span>%D</span>\n                Days\n            </div>\n            <div>\n                <span>%H</span>\n                Hours\n            </div>\n            <div>\n                <span>%M</span>\n                Minutes\n            </div>\n            <div>\n                <span>%S</span>\n                Seconds\n            </div>"
  },
  shortcuts: {
    toggleSearch: 's',
    showSearch: '',
    closeSearch: 'esc',
    toggleCart: 'p',
    showCart: '',
    closeCart: 'esc',
    toggleSignForm: 'f',
    showSignForm: '',
    closeSignForm: 'esc',
    closeFullscreenVideo: 'esc',
    postLike: 'l',
    postDislike: 'd',
    postScrollToComments: 'c',
    toggleSideLeftNavbar: 'alt+l',
    openSideLeftNavbar: '',
    closeSideLeftNavbar: 'esc',
    toggleSideRightNavbar: 'alt+r',
    openSideRightNavbar: '',
    closeSideRightNavbar: 'esc',
    toggleFullscreenNavbar: 'alt+f',
    openFullscreenNavbar: '',
    closeFullscreenNavbar: 'esc'
  },
  events: {
    actionHeart: function actionHeart(params) {
      params.updateIcon(); // fake timeout for demonstration
      // Change on AJAX request or something

      setTimeout(function () {
        var result = params.currentNum + (params.type === 'like' ? 1 : -1);
        params.updateNum(result);
      }, 300);
    },
    actionLike: function actionLike(params) {
      params.updateIcon(); // fake timeout for demonstration
      // Change on AJAX request or something

      setTimeout(function () {
        var additional = 0;

        if (params.type === 'like') {
          if (params.isLiked) {
            additional = -2;
          }

          if (params.isDisliked) {
            additional = 1;
          }
        }

        if (params.type === 'dislike') {
          if (params.isLiked) {
            additional = -1;
          }

          if (params.isDisliked) {
            additional = 2;
          }
        }

        var result = params.currentNum + (params.type === 'like' ? 1 : -1) + additional;
        params.updateNum(result);
      }, 300);
    }
  }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _parts_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _parts_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _parts_setOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _parts_shortcuts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _parts_initBlog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _parts_initParallaxMouse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _parts_initPreloader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var _parts_initBackgroundVideo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11);
/* harmony import */ var _parts_initBackgroundAudio__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(12);
/* harmony import */ var _parts_initLinkEffects__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(13);
/* harmony import */ var _parts_initNavbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(14);
/* harmony import */ var _parts_initNavbarSide__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(15);
/* harmony import */ var _parts_initNavbarFullscreen__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(16);
/* harmony import */ var _parts_initNavbarDropEffect1__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(17);
/* harmony import */ var _parts_initSearchBlock__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(18);
/* harmony import */ var _parts_initCart__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(19);
/* harmony import */ var _parts_initSignForm__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(20);
/* harmony import */ var _parts_initHeaderTitle__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(21);
/* harmony import */ var _parts_initCounters__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(22);
/* harmony import */ var _parts_initSideButtons__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(23);
/* harmony import */ var _parts_initActionsLike__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(24);
/* harmony import */ var _parts_initAnchors__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(25);
/* harmony import */ var _parts_initLinesForBoxes__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(26);
/* harmony import */ var _parts_initImageBoxes__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(27);
/* harmony import */ var _parts_initVideoBlocks__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(28);
/* harmony import */ var _parts_initGIF__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(29);
/* harmony import */ var _parts_initInfoBoxes__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(30);
/* harmony import */ var _parts_initForms__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(31);
/* harmony import */ var _parts_initFormsMailChimp__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(32);
/* harmony import */ var _parts_initTeamMembers__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(33);
/* harmony import */ var _parts_initAudioPlayer__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(34);
/* harmony import */ var _parts_initFacebook__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(35);
/* harmony import */ var _parts_initInstagram__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(36);
/* harmony import */ var _parts_initTwitter__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(37);
/* harmony import */ var _parts_initCookieAlert__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(38);
/* harmony import */ var _parts_initPluginObjectFitImages__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(39);
/* harmony import */ var _parts_initPluginStickySidebar__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(40);
/* harmony import */ var _parts_initPluginFastClick__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(41);
/* harmony import */ var _parts_initPluginNano__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(42);
/* harmony import */ var _parts_initPluginJarallax__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(43);
/* harmony import */ var _parts_initPluginFlickity__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(44);
/* harmony import */ var _parts_initPluginIsotope__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(45);
/* harmony import */ var _parts_initPluginPhotoswipe__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(46);
/* harmony import */ var _parts_initPluginTabs__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(47);
/* harmony import */ var _parts_initPluginAccordions__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(48);
/* harmony import */ var _parts_initPluginCountdown__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(49);
/* harmony import */ var _parts_initPluginTypedjs__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(50);
/* harmony import */ var _parts_initPluginSummernote__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(51);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




































/* Plugins */














/*------------------------------------------------------------------

  GODIKE Class

-------------------------------------------------------------------*/

var GODLIKE = /*#__PURE__*/function () {
  function GODLIKE() {
    _classCallCheck(this, GODLIKE);

    this.options = _parts_options__WEBPACK_IMPORTED_MODULE_0__["options"];
  }

  _createClass(GODLIKE, [{
    key: "init",
    value: function init() {
      // prt:sc:dm
      var self = this;
      self.initNavbar();
      self.initNavbarSide();
      self.initNavbarFullscreen();
      self.initNavbarDropEffect1();
      self.initSearchBlock();
      self.initCart();
      self.initSignForm();
      self.initHeaderTitle();
      self.initSideButtons();
      self.initBlog();
      self.initActionsLike();
      self.initBackgroundVideo();
      self.initBackgroundAudio();
      self.initLinkEffects();
      self.initCounters();
      self.initAnchors();
      self.initLinesForBoxes();
      self.initImageBoxes();
      self.initVideoBlocks();
      self.initGIF();
      self.initInfoBoxes();
      self.initForms();
      self.initFormsMailChimp();
      self.initTeamMembers();
      self.initAudioPlayer();
      self.initFacebook();
      self.initInstagram();
      self.initTwitter();
      self.initShortcuts();
      self.initCookieAlert(); // init plugins

      self.initPluginObjectFitImages();
      self.initPluginStickySidebar();
      self.initPluginFastClick();
      self.initPluginNano();
      self.initPluginFlickity();
      self.initPluginIsotope();
      self.initPluginPhotoswipe();
      self.initPluginTabs();
      self.initPluginAccordions();
      self.initPluginJarallax();
      self.initPluginCountdown();
      self.initPluginTypedjs();
      self.initPluginSummernote();
      self.initPreloader();
      self.initParallaxMouse();
      _parts_utility__WEBPACK_IMPORTED_MODULE_1__["$wnd"].on('resize scroll load', function () {
        self.initParallaxMouse();
      });
      return self;
    }
  }, {
    key: "setOptions",
    value: function setOptions(newOpts) {
      return _parts_setOptions__WEBPACK_IMPORTED_MODULE_2__["setOptions"].call(this, newOpts);
    }
  }, {
    key: "debounceResize",
    value: function debounceResize(func) {
      return _parts_utility__WEBPACK_IMPORTED_MODULE_1__["debounceResize"].call(this, func);
    }
  }, {
    key: "throttleScroll",
    value: function throttleScroll(callback) {
      return _parts_utility__WEBPACK_IMPORTED_MODULE_1__["throttleScroll"].call(this, callback);
    }
  }, {
    key: "bodyOverflow",
    value: function bodyOverflow(type) {
      return _parts_utility__WEBPACK_IMPORTED_MODULE_1__["bodyOverflow"].call(this, type);
    }
  }, {
    key: "isInViewport",
    value: function isInViewport($item, returnRect) {
      return _parts_utility__WEBPACK_IMPORTED_MODULE_1__["isInViewport"].call(this, $item, returnRect);
    }
  }, {
    key: "scrollTo",
    value: function scrollTo($to, callback) {
      return _parts_utility__WEBPACK_IMPORTED_MODULE_1__["scrollTo"].call(this, $to, callback);
    }
  }, {
    key: "key",
    value: function key(name, callback) {
      return _parts_shortcuts__WEBPACK_IMPORTED_MODULE_3__["key"].call(this, name, callback);
    }
  }, {
    key: "initPreloader",
    value: function initPreloader() {
      return _parts_initPreloader__WEBPACK_IMPORTED_MODULE_6__["initPreloader"].call(this);
    }
  }, {
    key: "initParallaxMouse",
    value: function initParallaxMouse() {
      return _parts_initParallaxMouse__WEBPACK_IMPORTED_MODULE_5__["initParallaxMouse"].call(this);
    }
  }, {
    key: "initShortcuts",
    value: function initShortcuts() {
      return _parts_shortcuts__WEBPACK_IMPORTED_MODULE_3__["initShortcuts"].call(this);
    }
  }, {
    key: "initBackgroundVideo",
    value: function initBackgroundVideo() {
      return _parts_initBackgroundVideo__WEBPACK_IMPORTED_MODULE_7__["initBackgroundVideo"].call(this);
    }
  }, {
    key: "initBackgroundAudio",
    value: function initBackgroundAudio() {
      return _parts_initBackgroundAudio__WEBPACK_IMPORTED_MODULE_8__["initBackgroundAudio"].call(this);
    }
  }, {
    key: "initLinkEffects",
    value: function initLinkEffects() {
      return _parts_initLinkEffects__WEBPACK_IMPORTED_MODULE_9__["initLinkEffects"].call(this);
    }
  }, {
    key: "initHeaderTitle",
    value: function initHeaderTitle() {
      return _parts_initHeaderTitle__WEBPACK_IMPORTED_MODULE_17__["initHeaderTitle"].call(this);
    }
  }, {
    key: "initNavbar",
    value: function initNavbar() {
      return _parts_initNavbar__WEBPACK_IMPORTED_MODULE_10__["initNavbar"].call(this);
    }
  }, {
    key: "initNavbarSide",
    value: function initNavbarSide() {
      return _parts_initNavbarSide__WEBPACK_IMPORTED_MODULE_11__["initNavbarSide"].call(this);
    }
  }, {
    key: "initNavbarFullscreen",
    value: function initNavbarFullscreen() {
      return _parts_initNavbarFullscreen__WEBPACK_IMPORTED_MODULE_12__["initNavbarFullscreen"].call(this);
    }
  }, {
    key: "initNavbarDropEffect1",
    value: function initNavbarDropEffect1() {
      return _parts_initNavbarDropEffect1__WEBPACK_IMPORTED_MODULE_13__["initNavbarDropEffect1"].call(this);
    }
  }, {
    key: "initSearchBlock",
    value: function initSearchBlock() {
      return _parts_initSearchBlock__WEBPACK_IMPORTED_MODULE_14__["initSearchBlock"].call(this);
    }
  }, {
    key: "initCart",
    value: function initCart() {
      return _parts_initCart__WEBPACK_IMPORTED_MODULE_15__["initCart"].call(this);
    }
  }, {
    key: "initSignForm",
    value: function initSignForm() {
      return _parts_initSignForm__WEBPACK_IMPORTED_MODULE_16__["initSignForm"].call(this);
    }
  }, {
    key: "initCounters",
    value: function initCounters() {
      return _parts_initCounters__WEBPACK_IMPORTED_MODULE_18__["initCounters"].call(this);
    }
  }, {
    key: "initSideButtons",
    value: function initSideButtons() {
      return _parts_initSideButtons__WEBPACK_IMPORTED_MODULE_19__["initSideButtons"].call(this);
    }
  }, {
    key: "initActionsLike",
    value: function initActionsLike() {
      return _parts_initActionsLike__WEBPACK_IMPORTED_MODULE_20__["initActionsLike"].call(this);
    }
  }, {
    key: "initBlog",
    value: function initBlog() {
      return _parts_initBlog__WEBPACK_IMPORTED_MODULE_4__["initBlog"].call(this);
    }
  }, {
    key: "initAnchors",
    value: function initAnchors() {
      return _parts_initAnchors__WEBPACK_IMPORTED_MODULE_21__["initAnchors"].call(this);
    }
  }, {
    key: "initLinesForBoxes",
    value: function initLinesForBoxes() {
      return _parts_initLinesForBoxes__WEBPACK_IMPORTED_MODULE_22__["initLinesForBoxes"].call(this);
    }
  }, {
    key: "initImageBoxes",
    value: function initImageBoxes() {
      return _parts_initImageBoxes__WEBPACK_IMPORTED_MODULE_23__["initImageBoxes"].call(this);
    }
  }, {
    key: "initVideoBlocks",
    value: function initVideoBlocks() {
      return _parts_initVideoBlocks__WEBPACK_IMPORTED_MODULE_24__["initVideoBlocks"].call(this);
    }
  }, {
    key: "initGIF",
    value: function initGIF() {
      return _parts_initGIF__WEBPACK_IMPORTED_MODULE_25__["initGIF"].call(this);
    }
  }, {
    key: "initInfoBoxes",
    value: function initInfoBoxes() {
      return _parts_initInfoBoxes__WEBPACK_IMPORTED_MODULE_26__["initInfoBoxes"].call(this);
    }
  }, {
    key: "initForms",
    value: function initForms() {
      return _parts_initForms__WEBPACK_IMPORTED_MODULE_27__["initForms"].call(this);
    }
  }, {
    key: "initFormsMailChimp",
    value: function initFormsMailChimp() {
      return _parts_initFormsMailChimp__WEBPACK_IMPORTED_MODULE_28__["initFormsMailChimp"].call(this);
    }
  }, {
    key: "initTeamMembers",
    value: function initTeamMembers() {
      return _parts_initTeamMembers__WEBPACK_IMPORTED_MODULE_29__["initTeamMembers"].call(this);
    }
  }, {
    key: "initAudioPlayer",
    value: function initAudioPlayer() {
      return _parts_initAudioPlayer__WEBPACK_IMPORTED_MODULE_30__["initAudioPlayer"].call(this);
    }
  }, {
    key: "initFacebook",
    value: function initFacebook() {
      return _parts_initFacebook__WEBPACK_IMPORTED_MODULE_31__["initFacebook"].call(this);
    }
  }, {
    key: "initInstagram",
    value: function initInstagram() {
      return _parts_initInstagram__WEBPACK_IMPORTED_MODULE_32__["initInstagram"].call(this);
    }
  }, {
    key: "initTwitter",
    value: function initTwitter() {
      return _parts_initTwitter__WEBPACK_IMPORTED_MODULE_33__["initTwitter"].call(this);
    }
  }, {
    key: "initCookieAlert",
    value: function initCookieAlert() {
      return _parts_initCookieAlert__WEBPACK_IMPORTED_MODULE_34__["initCookieAlert"].call(this);
    }
  }, {
    key: "initPluginObjectFitImages",
    value: function initPluginObjectFitImages() {
      return _parts_initPluginObjectFitImages__WEBPACK_IMPORTED_MODULE_35__["initPluginObjectFitImages"].call(this);
    }
  }, {
    key: "initPluginStickySidebar",
    value: function initPluginStickySidebar() {
      return _parts_initPluginStickySidebar__WEBPACK_IMPORTED_MODULE_36__["initPluginStickySidebar"].call(this);
    }
  }, {
    key: "initPluginFastClick",
    value: function initPluginFastClick() {
      return _parts_initPluginFastClick__WEBPACK_IMPORTED_MODULE_37__["initPluginFastClick"].call(this);
    }
  }, {
    key: "initPluginNano",
    value: function initPluginNano($context) {
      return _parts_initPluginNano__WEBPACK_IMPORTED_MODULE_38__["initPluginNano"].call(this, $context);
    }
  }, {
    key: "initPluginJarallax",
    value: function initPluginJarallax($context) {
      return _parts_initPluginJarallax__WEBPACK_IMPORTED_MODULE_39__["initPluginJarallax"].call(this, $context);
    }
  }, {
    key: "initPluginFlickity",
    value: function initPluginFlickity($context) {
      return _parts_initPluginFlickity__WEBPACK_IMPORTED_MODULE_40__["initPluginFlickity"].call(this, $context);
    }
  }, {
    key: "initPluginIsotope",
    value: function initPluginIsotope($context) {
      return _parts_initPluginIsotope__WEBPACK_IMPORTED_MODULE_41__["initPluginIsotope"].call(this, $context);
    }
  }, {
    key: "initPluginPhotoswipe",
    value: function initPluginPhotoswipe($context) {
      return _parts_initPluginPhotoswipe__WEBPACK_IMPORTED_MODULE_42__["initPluginPhotoswipe"].call(this, $context);
    }
  }, {
    key: "initPluginTabs",
    value: function initPluginTabs($context) {
      return _parts_initPluginTabs__WEBPACK_IMPORTED_MODULE_43__["initPluginTabs"].call(this, $context);
    }
  }, {
    key: "initPluginAccordions",
    value: function initPluginAccordions($context) {
      return _parts_initPluginAccordions__WEBPACK_IMPORTED_MODULE_44__["initPluginAccordions"].call(this, $context);
    }
  }, {
    key: "initPluginCountdown",
    value: function initPluginCountdown($context) {
      return _parts_initPluginCountdown__WEBPACK_IMPORTED_MODULE_45__["initPluginCountdown"].call(this, $context);
    }
  }, {
    key: "initPluginTypedjs",
    value: function initPluginTypedjs($context) {
      return _parts_initPluginTypedjs__WEBPACK_IMPORTED_MODULE_46__["initPluginTypedjs"].call(this, $context);
    }
  }, {
    key: "initPluginSummernote",
    value: function initPluginSummernote($context) {
      return _parts_initPluginSummernote__WEBPACK_IMPORTED_MODULE_47__["initPluginSummernote"].call(this, $context);
    }
  }]);

  return GODLIKE;
}();
/*------------------------------------------------------------------

  Init Godlike

-------------------------------------------------------------------*/


window.Godlike = new GODLIKE();

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$", function() { return $; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tween", function() { return tween; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIOs", function() { return isIOs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobile", function() { return isMobile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFireFox", function() { return isFireFox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTouch", function() { return isTouch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$wnd", function() { return $wnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$doc", function() { return $doc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$body", function() { return $body; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wndW", function() { return wndW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wndH", function() { return wndH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "docH", function() { return docH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounceResize", function() { return debounceResize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttleScroll", function() { return throttleScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bodyOverflow", function() { return bodyOverflow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBodyOverflowed", function() { return isBodyOverflowed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInViewport", function() { return isInViewport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollTo", function() { return scrollTo; });
/*------------------------------------------------------------------

  Utility

-------------------------------------------------------------------*/
var $ = jQuery;
var tween = window.gsap;
var isIOs = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var isMobile = /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/g.test(navigator.userAgent || navigator.vendor || window.opera);
var isFireFox = typeof InstallTrigger !== 'undefined';
var isTouch = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch; // add 'is-mobile' or 'is-desktop' classname to html tag

$('html').addClass(isMobile ? 'is-mobile' : 'is-desktop');
/**
 * window size
 */

var $wnd = $(window);
var $doc = $(document);
var $body = $('body');
var wndW = 0;
var wndH = 0;
var docH = 0;

function getWndSize() {
  wndW = $wnd.width();
  wndH = $wnd.height();
  docH = $doc.height();
}

getWndSize();
$wnd.on('resize load orientationchange', getWndSize);
/**
 * Debounce resize
 */

var resizeArr = [];
var resizeTimeout;

function debounceResized() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    if (resizeArr.length) {
      for (var k = 0; k < resizeArr.length; k++) {
        resizeArr[k]();
      }
    }
  }, 50);
}

$wnd.on('ready load resize orientationchange', debounceResized);
debounceResized();

function debounceResize(func) {
  if (typeof func === 'function') {
    resizeArr.push(func);
  } else {
    window.dispatchEvent(new Event('resize'));
  }
}
/**
 * Throttle scroll
 * thanks: https://jsfiddle.net/mariusc23/s6mLJ/31/
 */


var hideOnScrollList = [];
var didScroll;
var lastST = 0;
$wnd.on('scroll load resize orientationchange', function () {
  if (hideOnScrollList.length) {
    didScroll = true;
  }
});

function hasScrolled() {
  var ST = $wnd.scrollTop();
  var type = ''; // [up, down, end, start]

  if (ST > lastST) {
    type = 'down';
  } else if (ST < lastST) {
    type = 'up';
  } else {
    type = 'none';
  }

  if (ST === 0) {
    type = 'start';
  } else if (ST >= docH - wndH) {
    type = 'end';
  }

  hideOnScrollList.forEach(function (value) {
    if (typeof value === 'function') {
      value(type, ST, lastST, $wnd);
    }
  });
  lastST = ST;
}

setInterval(function () {
  if (didScroll) {
    didScroll = false;
    window.requestAnimationFrame(hasScrolled);
  }
}, 250);

function throttleScroll(callback) {
  hideOnScrollList.push(callback);
}
/**
 * Body Overflow
 * Thanks https://jsfiddle.net/mariusc23/s6mLJ/31/
 * Usage:
 *    // enable
 *    bodyOverflow(1);
 *
 *    // disable
 *    bodyOverflow(0);
 */


var bodyOverflowEnabled;
var isBodyOverflowing;
var scrollbarWidth;
var originalBodyPadding;
var $header = $('.nk-header');

function isBodyOverflowed() {
  return bodyOverflowEnabled;
}

function bodyGetScrollbarWidth() {
  // thx d.walsh
  var scrollDiv = document.createElement('div');
  scrollDiv.className = 'nk-body-scrollbar-measure';
  $body[0].appendChild(scrollDiv);
  var result = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  $body[0].removeChild(scrollDiv);
  return result;
}

function bodyCheckScrollbar() {
  var fullWindowWidth = window.innerWidth;

  if (!fullWindowWidth) {
    // workaround for missing window.innerWidth in IE8
    var documentElementRect = document.documentElement.getBoundingClientRect();
    fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
  }

  isBodyOverflowing = $body[0].clientWidth < fullWindowWidth;
  scrollbarWidth = bodyGetScrollbarWidth();
}

function bodySetScrollbar() {
  if (typeof originalBodyPadding === 'undefined') {
    originalBodyPadding = $body[0].style.paddingRight || '';
  }

  if (isBodyOverflowing) {
    $body.add($header.filter(':not(.nk-header-opaque)').children()).add($header.filter('.nk-header-opaque').children('.nk-navbar-fixed')).css('paddingRight', "".concat(scrollbarWidth, "px"));
  }
}

function bodyResetScrollbar() {
  $body.css('paddingRight', originalBodyPadding);
  $header.children().css('paddingRight', '');
}

function bodyOverflow(enable) {
  if (enable && !bodyOverflowEnabled) {
    bodyOverflowEnabled = 1;
    bodyCheckScrollbar();
    bodySetScrollbar();
    $body.css('overflow', 'hidden');
    $body.addClass('nk-body-overflow');
  } else if (!enable && bodyOverflowEnabled) {
    bodyOverflowEnabled = 0;
    $body.css('overflow', '');
    $body.removeClass('nk-body-overflow');
    bodyResetScrollbar();
  }
}
/**
 * In Viewport checker
 * return visible percent from 0 to 1
 */


function isInViewport($item, returnRect) {
  var rect = $item[0].getBoundingClientRect();
  var result = 1;

  if (rect.right <= 0 || rect.left >= wndW) {
    result = 0;
  } else if (rect.bottom < 0 && rect.top <= wndH) {
    result = 0;
  } else {
    var beforeTopEnd = Math.max(0, rect.height + rect.top);
    var beforeBottomEnd = Math.max(0, rect.height - (rect.top + rect.height - wndH));
    var afterTop = Math.max(0, -rect.top);
    var beforeBottom = Math.max(0, rect.top + rect.height - wndH);

    if (rect.height < wndH) {
      result = 1 - (afterTop || beforeBottom) / rect.height;
    } else if (beforeTopEnd <= wndH) {
      result = beforeTopEnd / wndH;
    } else if (beforeBottomEnd <= wndH) {
      result = beforeBottomEnd / wndH;
    }

    result = result < 0 ? 0 : result;
  }

  if (returnRect) {
    return [result, rect];
  }

  return result;
}
/**
 * Scroll To
 */


function scrollTo($to, callback) {
  var scrollPos = false;
  var speed = this.options.scrollToAnchorSpeed / 1000;

  if ($to === 'top') {
    scrollPos = 0;
  } else if ($to === 'bottom') {
    scrollPos = Math.max(0, docH - wndH);
  } else if (typeof $to === 'number') {
    scrollPos = $to;
  } else {
    scrollPos = $to.offset ? $to.offset().top : false;
  }

  if (scrollPos !== false && $wnd.scrollTop() !== scrollPos) {
    tween.to($wnd, {
      scrollTo: {
        y: scrollPos,
        // disable autokill on iOs (buggy scrolling)
        autoKill: !isIOs
      },
      duration: speed,
      ease: Power2.easeOut,
      overwrite: 5
    });

    if (callback) {
      tween.delayedCall(speed, callback);
    }
  } else if (typeof callback === 'function') {
    callback();
  }
}



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOptions", function() { return setOptions; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Set Custom Options

-------------------------------------------------------------------*/

function setOptions(newOpts) {
  var self = this;
  var optsTemplates = _utility__WEBPACK_IMPORTED_MODULE_0__["$"].extend({}, this.options.templates, newOpts && newOpts.templates || {});
  var optsShortcuts = _utility__WEBPACK_IMPORTED_MODULE_0__["$"].extend({}, this.options.shortcuts, newOpts && newOpts.shortcuts || {});
  var optsEvents = _utility__WEBPACK_IMPORTED_MODULE_0__["$"].extend({}, this.options.events, newOpts && newOpts.events || {});
  self.options = _utility__WEBPACK_IMPORTED_MODULE_0__["$"].extend({}, self.options, newOpts);
  self.options.templates = optsTemplates;
  self.options.shortcuts = optsShortcuts;
  self.options.events = optsEvents;
}



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "key", function() { return key; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initShortcuts", function() { return initShortcuts; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Shortcuts
  https://github.com/madrobby/keymaster

-------------------------------------------------------------------*/

function key(name, fn) {
  if (typeof window.key === 'undefined') {
    return;
  }

  name = this.options && this.options.shortcuts && this.options.shortcuts[name];

  if (name) {
    window.key(name, fn);
  }
}

function initShortcuts() {
  if (typeof window.key === 'undefined' || !this.options.enableShortcuts) {
    return;
  }

  var self = this; // Search

  self.key('toggleSearch', function () {
    self.toggleSearch();
  });
  self.key('openSearch', function () {
    self.openSearch();
  });
  self.key('closeSearch', function () {
    self.closeSearch();
  }); // Cart

  self.key('toggleCart', function () {
    self.toggleCart();
  });
  self.key('openCart', function () {
    self.openCart();
  });
  self.key('closeCart', function () {
    self.closeCart();
  }); // Sign Form

  self.key('toggleSignForm', function () {
    self.toggleSignForm();
  });
  self.key('openSignForm', function () {
    self.openSignForm();
  });
  self.key('closeSignForm', function () {
    self.closeSignForm();
  }); // FullScreen Video

  self.key('closeFullscreenVideo', function () {
    if (self.closeFullScreenVideo) {
      self.closeFullScreenVideo();
    }
  }); // post single

  self.key('postLike', function () {
    if (Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-blog-post-single').length) {
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-action-heart:not(.liked):eq(0), .nk-action-like:eq(0) .like-icon').eq(0).click();
    }
  });
  self.key('postDislike', function () {
    if (Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-blog-post-single').length) {
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-action-heart.liked:eq(0), .nk-action-like:eq(0) .dislike-icon').eq(0).click();
    }
  });
  self.key('postScrollToComments', function () {
    var $comments = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('#comments');

    if ($comments.length) {
      self.scrollTo($comments);
    }
  }); // Side Left Navbar

  var $leftSide = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-left-side');
  self.key('toggleSideLeftNavbar', function () {
    self.toggleSide($leftSide);
  });
  self.key('openSideLeftNavbar', function () {
    self.openSide($leftSide);
  });
  self.key('closeSideLeftNavbar', function () {
    self.closeSide($leftSide);
  }); // Side Right Navbar

  var $rightSide = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-right-side');
  self.key('toggleSideRightNavbar', function () {
    self.toggleSide($rightSide);
  });
  self.key('openSideRightNavbar', function () {
    self.openSide($rightSide);
  });
  self.key('closeSideRightNavbar', function () {
    self.closeSide($rightSide);
  }); // Fullscreen Navbar

  self.key('toggleFullscreenNavbar', function () {
    self.toggleFullscreenNavbar();
  });
  self.key('openFullscreenNavbar', function () {
    self.openFullscreenNavbar();
  });
  self.key('closeFullscreenNavbar', function () {
    self.closeFullscreenNavbar();
  }); // ESC - use also inside form elements

  window.key.filter = function (event) {
    var tagName = (event.target || event.srcElement).tagName;
    var isContentEditable = (event.target || event.srcElement).getAttribute('contenteditable');
    var isESC = window.key.isPressed('esc');
    return isESC || !(isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA');
  };
}



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initBlog", function() { return initBlog; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Blog

-------------------------------------------------------------------*/

function initBlog() {
  var $blogList = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-blog-list'); // add hover classname

  $blogList.on('mouseover', '.nk-blog-post .nk-post-thumb, .nk-blog-post .nk-post-content', function onBlogListMouseOver() {
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parents('.nk-blog-post:eq(0)').addClass('hover');
  }).on('mouseleave', '.nk-blog-post .nk-post-thumb, .nk-blog-post .nk-post-content', function onBlogListMouseLeave() {
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parents('.nk-blog-post:eq(0)').removeClass('hover');
  });
}



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initParallaxMouse", function() { return initParallaxMouse; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


/*------------------------------------------------------------------

  Mouse Parallax

-------------------------------------------------------------------*/

var $parallaxMouseList = false;
var parallaxMouseTimeout; // run parallax animation

function runParallaxMouse(x, y) {
  var data;
  var itemX;
  var itemY;
  var itemCenterLeft;
  var itemCenterTop;
  $parallaxMouseList.each(function eachParallaxMouse() {
    data = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).data('nk-parallax-mouse-data'); // don't animate if block isn't in viewport

    if (_typeof(data) !== 'object' || !data.isInViewport) {
      return;
    } // mouse calculate


    itemCenterLeft = data.rect.left + data.rect.width / 2;
    itemCenterTop = data.rect.top + data.rect.height / 2;
    itemX = (itemCenterLeft - x) / (x > itemCenterLeft ? _utility__WEBPACK_IMPORTED_MODULE_0__["wndW"] - itemCenterLeft : itemCenterLeft);
    itemY = (itemCenterTop - y) / (y > itemCenterTop ? _utility__WEBPACK_IMPORTED_MODULE_0__["wndH"] - itemCenterTop : itemCenterTop); // animate
    // yep, magic number just to let user add attribute data-mouse-parallax="4" instead of data-mouse-parallax="20"

    var maxOffset = 5 * data.z;
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to(this, {
      x: itemX * maxOffset,
      y: itemY * maxOffset,
      duration: data.speed,
      force3D: true
    });
  });
}

function initParallaxMouse() {
  var self = this;

  if (!self.options.enableMouseParallax || _utility__WEBPACK_IMPORTED_MODULE_0__["isMobile"]) {
    return;
  }

  clearTimeout(parallaxMouseTimeout);
  parallaxMouseTimeout = setTimeout(function () {
    var $newParallax = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('[data-mouse-parallax-z]:not(.parallaxed)').addClass('parallaxed');

    if ($newParallax.length) {
      // add new parallax blocks
      if ($parallaxMouseList) {
        $parallaxMouseList = $parallaxMouseList.add($newParallax); // first init parallax
      } else {
        $parallaxMouseList = $newParallax;

        if (!_utility__WEBPACK_IMPORTED_MODULE_0__["isFireFox"]) {
          _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].on('mousemove', function (event) {
            runParallaxMouse(event.clientX, event.clientY);
          });
        }
      }
    } // update data for parallax blocks


    if ($parallaxMouseList) {
      $parallaxMouseList.each(function eachParallaxMouse() {
        var $this = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);
        $this.data('nk-parallax-mouse-data', {
          isInViewport: self.isInViewport($this) ? $this.is(':visible') : 0,
          rect: $this[0].getBoundingClientRect(),
          z: parseFloat($this.attr('data-mouse-parallax-z')),
          speed: parseFloat($this.attr('data-mouse-parallax-speed') || 2)
        });
      });
    }
  }, 100);
}



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPreloader", function() { return initPreloader; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Preloader

-------------------------------------------------------------------*/

function initPreloader() {
  var self = this;
  var $preloader = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-preloader');
  var $preloaderBG = $preloader.find('.nk-preloader-bg');
  var $content = $preloader.find('.nk-preloader-content, .nk-preloader-skip');

  if (!$preloader.length) {
    return;
  }

  var isBusy = 0;
  var isOpened = 1; // prepare preloader

  var closeData = {
    frames: parseInt($preloaderBG.attr('data-close-frames'), 10),
    speed: parseFloat($preloaderBG.attr('data-close-speed')),
    sprites: $preloaderBG.attr('data-close-sprites'),
    loaded: false,
    width: false,
    height: false
  };
  var openData = {
    frames: parseInt($preloaderBG.attr('data-open-frames'), 10),
    speed: parseFloat($preloaderBG.attr('data-open-speed')),
    sprites: $preloaderBG.attr('data-open-sprites'),
    loaded: false,
    width: false,
    height: false
  }; // preload images

  function preloadImages(data, cb) {
    if (!data.frames || !data.speed || !data.sprites) {
      return;
    }

    var img = new Image();

    img.onload = function onImgLoad() {
      data.width = this.width;
      data.height = this.height;
      data.loaded = true;

      if (cb) {
        cb(data);
      }
    };

    img.src = data.sprites;
  } // set div size and position


  function prepareBgDiv(data) {
    // set size and position
    var w = data.width / data.frames;
    var h = data.height;
    var bgCSS = {
      left: 0,
      top: 0,
      backgroundImage: "url(\"".concat(data.sprites, "\")")
    };

    if (w / h > _utility__WEBPACK_IMPORTED_MODULE_0__["wndW"] / _utility__WEBPACK_IMPORTED_MODULE_0__["wndH"]) {
      bgCSS.height = _utility__WEBPACK_IMPORTED_MODULE_0__["wndH"];
      bgCSS.width = bgCSS.height * w / h;
      bgCSS.left = (_utility__WEBPACK_IMPORTED_MODULE_0__["wndW"] - bgCSS.width) / 2;
    } else {
      bgCSS.width = _utility__WEBPACK_IMPORTED_MODULE_0__["wndW"];
      bgCSS.height = bgCSS.width * h / w;
      bgCSS.top = (_utility__WEBPACK_IMPORTED_MODULE_0__["wndH"] - bgCSS.height) / 2;
    } // set css to background


    $preloaderBG.css(bgCSS);
  } // initial image preload (widhout this code background image was flickering)


  preloadImages(closeData, function (data) {
    if (!isBusy && isOpened) {
      $preloaderBG.css({
        backgroundPosition: '200% 50%'
      });
      prepareBgDiv(data);
    }
  }); // close preloader

  self.closePreloader = function closePreloader(cb) {
    if (!isBusy && isOpened) {
      isBusy = 1;

      if (!closeData.loaded) {
        _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($preloader, {
          opacity: 0,
          duration: 0.3,
          display: 'none',
          force3D: true,
          onComplete: function onComplete() {
            // hide content
            _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($content, {
              opacity: 0,
              display: 'none'
            });

            if (cb) {
              cb();
            }

            isBusy = 0;
            isOpened = false;
          }
        });
        return;
      }

      prepareBgDiv(closeData); // animate background

      _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($preloaderBG, {
        backgroundPosition: '100% 50%',
        backgroundColor: 'transparent'
      });
      _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($preloaderBG, {
        backgroundPosition: '0% 50%',
        duration: closeData.speed,
        ease: SteppedEase.config(closeData.frames - 1),
        onComplete: function onComplete() {
          _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($preloader, {
            opacity: 0,
            display: 'none'
          });

          if (cb) {
            cb();
          }

          isBusy = 0;
          isOpened = false;
        }
      }); // animate content

      _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($content, {
        y: '-20px',
        opacity: 0,
        duration: 0.3,
        display: 'none',
        force3D: true
      });
    }
  }; // open preloader


  self.openPreloader = function openPreloader(cb) {
    if (!isBusy && !isOpened) {
      isBusy = 1;

      if (!openData.loaded) {
        if (cb) {
          cb();
        }

        isBusy = 0;
        return;
      }

      _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($preloaderBG, {
        backgroundPosition: '0% 50%',
        backgroundColor: 'transparent'
      });
      prepareBgDiv(openData);
      _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($preloader, {
        opacity: 1,
        display: 'block'
      }); // animate background

      _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($preloaderBG, openData.speed, {
        backgroundPosition: '100% 50%',
        duration: openData.speed,
        ease: SteppedEase.config(openData.frames - 1),
        onComplete: function onComplete() {
          if (cb) {
            cb();
          }

          isBusy = 0;
          isOpened = true;
        }
      });
    }
  }; // hide preloader after page load


  var preloadedOpenImage = 0;

  function firstClosePreloader() {
    self.closePreloader(); // preload image for opening animation

    if (!preloadedOpenImage) {
      preloadedOpenImage = 1;
      setTimeout(function () {
        preloadImages(openData);
      }, 1000);
    }
  }

  _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].on('load', firstClosePreloader);
  $preloader.on('click', '.nk-preloader-skip', firstClosePreloader); // fade between pages

  if (!self.options.enableFadeBetweenPages) {
    return;
  } // Internal: Return the `href` component of given URL object with the hash
  // portion removed.
  //
  // location - Location or HTMLAnchorElement
  //
  // Returns String


  function stripHash(href) {
    return href.replace(/#.*/, '');
  }

  _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"].on('click', 'a:not(.no-fade):not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not([href^="javascript:"])', function onLinksClick(e) {
    var href = this.href; // stop if empty href

    if (!href) {
      return;
    } // Middle click, cmd click, and ctrl click should open
    // links in a new tab as normal.


    if (e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    } // Ignore case when a hash is being tacked on the current URL


    if (href.indexOf('#') > -1 && stripHash(href) === stripHash(window.location.href)) {
      return;
    } // Ignore e with default prevented


    if (e.isDefaultPrevented()) {
      return;
    } // prevent item clicked


    if (Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).next('.dropdown').length) {
      if (Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).next('.dropdown').css('visibility') === 'hidden' || Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent().hasClass('open')) {
        return;
      }
    }

    e.preventDefault();
    self.openPreloader(function () {
      window.location.href = href;
    });
  }); // fix safari back button
  // thanks http://stackoverflow.com/questions/8788802/prevent-safari-loading-from-cache-when-back-button-is-clicked

  _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].on('pageshow', function (e) {
    if (e.originalEvent.persisted) {
      self.closePreloader();
    }
  });
}



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initBackgroundVideo", function() { return initBackgroundVideo; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Background Video

-------------------------------------------------------------------*/

function initBackgroundVideo() {
  var $bg = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-page-background');

  if (!$bg.length || typeof window.VideoWorker === 'undefined') {
    return;
  }

  function resizeVideo($video, api) {
    if (!$video || !$video[0]) {
      return;
    } // native video size


    var vW = api.videoWidth || 1280;
    var vH = api.videoHeight || 720;
    var styles = {};

    if (_utility__WEBPACK_IMPORTED_MODULE_0__["wndW"] / vW > _utility__WEBPACK_IMPORTED_MODULE_0__["wndH"] / vH) {
      styles = {
        width: _utility__WEBPACK_IMPORTED_MODULE_0__["wndW"],
        height: vH * _utility__WEBPACK_IMPORTED_MODULE_0__["wndW"] / vW,
        marginTop: (_utility__WEBPACK_IMPORTED_MODULE_0__["wndH"] - vH * _utility__WEBPACK_IMPORTED_MODULE_0__["wndW"] / vW) / 2,
        marginLeft: 0
      };
    } else {
      styles = {
        width: vW * _utility__WEBPACK_IMPORTED_MODULE_0__["wndH"] / vH,
        height: _utility__WEBPACK_IMPORTED_MODULE_0__["wndH"],
        marginTop: 0,
        marginLeft: (_utility__WEBPACK_IMPORTED_MODULE_0__["wndW"] - vW * _utility__WEBPACK_IMPORTED_MODULE_0__["wndH"] / vH) / 2
      };
    } // hide progress bar


    styles.marginTop -= 220;
    styles.height += 440;
    $video.css(styles);
  }

  $bg.each(function eachBackground() {
    var $this = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);
    var url = $this.attr('data-video') || '';
    var loop = $this.attr('data-video-loop') !== 'false';
    var mute = $this.attr('data-video-mute') !== 'false';
    var volume = parseInt($this.attr('data-video-volume'), 10) || 0;
    var startTime = parseInt($this.attr('data-video-start-time'), 10) || 0;
    var endTime = parseInt($this.attr('data-video-end-time'), 10) || 0;
    var pauseOnPageLeave = $this.attr('data-video-pause-on-page-leave') !== 'false'; // deprecated syntax

    if (!url) {
      console.warn('Deprecated background video attributes `data-bg-*`. Please, use `data-video` attribute instead.');
      url = [];
      var mp4 = $this.attr('data-bg-mp4') || '';
      var webm = $this.attr('data-bg-webm') || '';
      var ogv = $this.attr('data-bg-ogv') || '';
      var poster = $this.attr('data-bg-poster') || '';

      if (mp4) {
        url.push("mp4:".concat(mp4));
      }

      if (webm) {
        url.push("webm:".concat(webm));
      }

      if (ogv) {
        url.push("ogv:".concat(ogv));
      }

      url = url.join(','); // add background image

      if (poster) {
        $this.css({
          'background-image': "url(\"".concat(poster, "\")")
        });
      }
    } // play video


    if (url) {
      var api = new VideoWorker(url, {
        autoplay: 1,
        controls: 0,
        loop: loop,
        mute: mute,
        volume: volume,
        startTime: startTime,
        endTime: endTime
      });

      if (api && api.isValid()) {
        // add API to the dom element.
        this.VideoWorkerAPI = api;
        var $video;
        api.getIframe(function (iframe) {
          // add iframe
          $video = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(iframe);
          var $parent = $video.parent();
          $video.appendTo($this);
          $parent.remove();
          resizeVideo($video, api);
        });
        api.on('started', function () {
          $this.addClass('nk-page-background-loaded');
          resizeVideo($video, api);
        }); // cover video on resize

        Object(_utility__WEBPACK_IMPORTED_MODULE_0__["debounceResize"])(function () {
          resizeVideo($video, api);
        });

        if (pauseOnPageLeave) {
          _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].on('blur focus', function (e) {
            // timeout for FireFox
            setTimeout(function () {
              // don't pause the background video when clicked on iframe.
              if (document.activeElement && document.activeElement.nodeName === 'IFRAME') {
                return;
              }

              if (e.type === 'blur') {
                api.pause();
              } else {
                api.play();
              }
            }, 0);
          });
        }
      }
    }
  });
}



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initBackgroundAudio", function() { return initBackgroundAudio; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Background Audio

-------------------------------------------------------------------*/

function initBackgroundAudio() {
  var self = this;
  var $toggle = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-bg-audio-toggle');
  var $audio = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-page-background-audio');

  if (!($audio.length || self.options.backgroundMusic) || typeof soundManager === 'undefined') {
    $toggle.hide();
    return;
  }

  var api;
  var audio;
  var audioVolume;
  var audioAutoplay;
  var audioLoop;
  var pauseOnPageLeave;

  if ($audio.length) {
    audio = $audio.attr('data-audio');
    audioVolume = $audio.attr('data-audio-volume') || 100;
    audioAutoplay = $audio.attr('data-audio-autoplay') !== 'false';
    audioLoop = $audio.attr('data-audio-loop') !== 'false';
    pauseOnPageLeave = $audio.attr('data-audio-pause-on-page-leave') !== 'false'; // deprecated.
  } else if (self.options.backgroundMusic) {
    console.warn('Deprecated background audio from Godlike JS init options. Please, use `data-audio` block on the page.');
    audio = self.options.backgroundMusic;
    audioVolume = self.options.backgroundMusicVolume;
    audioAutoplay = self.options.backgroundMusicAutoplay;
    audioLoop = self.options.backgroundMusicLoop;
    pauseOnPageLeave = true;
  } // hide / show play icon


  $toggle.find('.nk-bg-audio-play-icon').hide();

  function saveParams() {
    if (api) {
      localStorage.nkBackgroundAudio = JSON.stringify({
        playing: !api.paused && api.playState,
        progress: api.position
      });
    }
  } // save on close window and every 20 seconds


  _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].on('unload', saveParams);
  setInterval(saveParams, 20000);

  function getParams() {
    var params = {
      playing: audioAutoplay,
      progress: 0
    }; // restore local data

    if (localStorage && typeof localStorage.nkBackgroundAudio !== 'undefined') {
      var storedData = JSON.parse(localStorage.nkBackgroundAudio);
      params = _utility__WEBPACK_IMPORTED_MODULE_0__["$"].extend(params, storedData);
    } // prevent autoplay on mobile devices


    if (_utility__WEBPACK_IMPORTED_MODULE_0__["isMobile"]) {
      params.playing = false;
    }

    return params;
  }

  function onPlay() {
    $toggle.find('.nk-bg-audio-play-icon').hide();
    $toggle.find('.nk-bg-audio-pause-icon').show();
  }

  function onStop() {
    $toggle.find('.nk-bg-audio-pause-icon').hide();
    $toggle.find('.nk-bg-audio-play-icon').show();
  }

  var params = getParams(); // toggle button if autoplay

  if (params.playing) {
    onPlay();
  } else {
    onStop();
  } // fade


  var fadeInterval;

  function fadeOut() {
    var volume = api.volume;
    var dur = 1000;
    var toVol = 0;
    var interval = dur / Math.abs(volume - toVol);
    clearInterval(fadeInterval);
    fadeInterval = setInterval(function () {
      volume = volume > toVol ? volume - 1 : volume + 1;
      api.setVolume(volume);

      if (volume === toVol) {
        clearInterval(fadeInterval);
        api.pause();
      }
    }, interval);
  }

  function fadeIn() {
    var volume = 0;
    var dur = 1000;
    var toVol = audioVolume;
    var interval = dur / Math.abs(volume - toVol);
    api.play({
      url: audio
    });
    api.setVolume(volume);
    clearInterval(fadeInterval);
    fadeInterval = setInterval(function () {
      volume = volume > toVol ? volume - 1 : volume + 1;
      api.setVolume(volume);

      if (volume === toVol) {
        clearInterval(fadeInterval);
      }
    }, interval);
  }

  soundManager.onready(function () {
    var firstLoad = 1;
    api = soundManager.createSound({
      onplay: function onplay() {
        onPlay();
      },
      onresume: function onresume() {
        onPlay();
      },
      onpause: function onpause() {
        onStop();
      },
      onstop: function onstop() {
        onStop();
      },
      volume: audioVolume,
      onload: function onload(ok) {
        if (!ok && this._iO && this._iO.onerror) {
          this._iO.onerror();
        }
      },
      onfinish: function onfinish() {
        if (audioLoop) {
          api.play();
        }
      },
      onbufferchange: function onbufferchange() {
        // move to saved progress position on first load
        if (firstLoad && api.duration) {
          firstLoad = 0;
          api.setPosition(params.progress);
        }
      }
    }); // autoplay

    if (params.playing) {
      fadeIn();
    } // play / pause


    $toggle.on('click', function () {
      if (api.paused || !api.playState) {
        fadeIn();
      } else {
        api.pause();
      }
    }); // window focus / blur

    if (pauseOnPageLeave) {
      var pausedOnBlur = false;
      _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].on('blur focus', function (e) {
        // timeout for FireFox
        setTimeout(function () {
          if (e.type === 'blur') {
            // don't pause the background audio when clicked on iframe.
            if (document.activeElement && document.activeElement.nodeName === 'IFRAME') {
              return;
            }

            if (!api.paused && api.playState) {
              pausedOnBlur = true;
              fadeOut();
            }
          } else if (pausedOnBlur) {
            pausedOnBlur = false;
            fadeIn();
          }
        }, 0);
      });
    }
  });
}



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initLinkEffects", function() { return initLinkEffects; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Link Effects

-------------------------------------------------------------------*/

function initLinkEffects() {
  if (_utility__WEBPACK_IMPORTED_MODULE_0__["isMobile"]) {
    return;
  } // add link effect for navbar


  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar:not(.nk-navbar-no-link-effect) ul > li > a:not(.btn):not(.nk-btn):not(.no-link-effect)').addClass('link-effect-4'); // Link Effect 1 (rotate all letters)

  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.link-effect-1:not(.ready)').each(function eachLinkEffect1() {
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).addClass('ready');
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).contents().each(function () {
      // text node only
      if (this.nodeType === 3) {
        var itemText = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).text().replace(/([^\x00-\x80]|\w)/g, '<span>$&</span>');
        Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).replaceWith(itemText);
      }
    });
  }); // mouse over class

  var timeout;

  function toggleClass($span, type) {
    var $nextSpan = $span[type === 'add' ? 'next' : 'prev']();
    $span["".concat(type, "Class")]('active');
    clearTimeout(timeout);

    if ($nextSpan.length) {
      timeout = setTimeout(function () {
        toggleClass($nextSpan, type);
      }, 40);
    }
  }

  _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"].on('mouseover', '.link-effect-1.ready', function linkEffect1OnMouseOver() {
    toggleClass(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).children('span:not(.active):first'), 'add');
  }).on('mouseleave', '.link-effect-1.ready', function linkEffect1OnMouseLeave() {
    toggleClass(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).children('span.active:last'), 'remove');
  }); // Link Effect 2 and 3 (color for letters from left to right and top to bottom)

  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.link-effect-2:not(.ready), .link-effect-3:not(.ready)').each(function eachLinkeEffect2and3() {
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).addClass('ready');
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).html(function (i, letters) {
      return Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('<span>').html(letters).prepend(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('<span class="link-effect-shade">').html(letters));
    });
  }); // Link Effect 4 (cut words)

  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.link-effect-4:not(.ready)').each(function eachLinkEffect4() {
    // fix for navigation item descriptions
    var $descr = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).find('.nk-item-descr').clone();

    if ($descr.length) {
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).find('.nk-item-descr').remove();
    }

    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).addClass('ready');
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).html(function (i, letters) {
      return Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('<span class="link-effect-inner">').html("<span class=\"link-effect-l\"><span>".concat(letters, "</span></span><span class=\"link-effect-r\"><span>").concat(letters, "</span></span><span class=\"link-effect-shade\"><span>").concat(letters, "</span></span>"));
    });

    if ($descr.length) {
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).append($descr);
    }
  });
}



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initNavbar", function() { return initNavbar; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Navbar

-------------------------------------------------------------------*/

function initNavbar() {
  var self = this;
  var $navbarTop = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-top');
  var $contactsTop = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-contacts-top'); // add mobile navbar

  var $mobileNavItems = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('[data-nav-mobile]');

  if ($mobileNavItems.length) {
    $mobileNavItems.each(function eachMobileNavItems() {
      var $nav = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).html());
      var $mobileNav = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-nav-mobile')); // insert into mobile nav

      $mobileNav.find('.nk-navbar-mobile-content > ul.nk-nav').append($nav);
    });
    var $nav = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-mobile-content > ul.nk-nav'); // remove background images

    $nav.find('.bg-image, .bg-video').remove(); // remove mega menus

    $nav.find('.nk-mega-item > .dropdown').each(function eachMegaMenuDropdowns() {
      var $drop = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).children('ul').addClass('dropdown'); // fix mega menu columns

      var megaItems = '';
      $drop.find('> li > ul').each(function eachMegaDropdownULs() {
        megaItems += Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).html();
      });
      $drop.html(megaItems);
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).replaceWith($drop);
    });
    $nav.find('.nk-mega-item').removeClass('nk-mega-item');
  } // sticky navbar


  var navbarTop = $navbarTop.length ? $navbarTop.offset().top : 0; // fake hidden navbar to prevent page jumping on stick

  var $navbarFake = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('<div>').hide();

  function onScrollNav() {
    var stickyOn = _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].scrollTop() >= navbarTop;

    if (stickyOn) {
      $navbarTop.addClass('nk-navbar-fixed');
      $navbarFake.show();
    } else {
      $navbarTop.removeClass('nk-navbar-fixed');
      $navbarFake.hide();
    }
  }

  if ($navbarTop.hasClass('nk-navbar-sticky')) {
    $navbarTop.after($navbarFake);
    $navbarFake.height($navbarTop.innerHeight());
    self.debounceResize(function () {
      $navbarFake.height($navbarTop.innerHeight());
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].on('scroll resize', onScrollNav);
    onScrollNav();
  } // correct dropdown position


  function correctDropdown($item) {
    if ($item.parent().is('.nk-nav')) {
      var $dropdown = $item.children('.dropdown');
      var $parent = $item.parents('.nk-navbar:eq(0)');
      var $parentContainer = $parent.children('.container');
      $parentContainer = $parentContainer.length ? $parentContainer : $parent; // fix right value when sub menu is not hidden

      $dropdown.css('display', 'none');
      var isRight = $dropdown.css('right') !== 'auto';
      var $contacts = $item.parents('.nk-contacts-top:eq(0)');
      var css = {
        marginLeft: '',
        marginRight: '',
        marginTop: 0,
        display: 'block'
      };
      $dropdown.css(css);
      var rect = $dropdown[0].getBoundingClientRect();
      var rectContainer = $parentContainer[0].getBoundingClientRect();
      var itemRect = $item[0].getBoundingClientRect(); // move dropdown from right corner (right corner will check in nav container)

      if (rect.right > rectContainer.right) {
        css.marginLeft = rectContainer.right - rect.right;
        $dropdown.css(css);
        rect = $dropdown[0].getBoundingClientRect();
      } // move dropdown from left corner


      if (rect.left < 0) {
        css.marginLeft = -rect.left;
        $dropdown.css(css);
        rect = $dropdown[0].getBoundingClientRect();
      } // check if dropdown not under item


      var currentLeftPost = rect.left + (css.marginLeft || 0);

      if (currentLeftPost > itemRect.left) {
        css.marginLeft = (css.marginLeft || 0) - (currentLeftPost - itemRect.left);
      } // change to margin-right. In some cases left margin isn't working, for ex. in mega menu


      if (isRight) {
        css.marginRight = -1 * css.marginLeft;
        css.marginLeft = '';
      } // correct top position


      css.marginTop = $parent.innerHeight() - $dropdown.offset().top + $parent.offset().top; // additional 2px offset

      css.marginTop += 2; // add offset if contacts

      if ($contacts.length) {
        css.marginTop += parseFloat($contacts.css('padding-bottom') || 0);
      } // hide menu


      css.display = 'none';
      $dropdown.css(css);
    }
  } // toggle dropdown


  function closeSubmenu($item) {
    if ($item.length) {
      $item.removeClass('open');
      _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($item.children('.dropdown'), {
        opacity: 0,
        duration: 0.3,
        display: 'none',
        force3D: true
      });
      _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].trigger('nk-closed-submenu', [$item]);
    }
  }

  function openSubmenu($item) {
    if (!$item.hasClass('open')) {
      correctDropdown($item);
      _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($item.children('.dropdown'), {
        opacity: 1,
        duration: 0.3,
        display: 'block',
        force3D: true
      });
      $item.addClass('open');
      _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].trigger('nk-opened-submenu', [$item]);
    }
  }

  var dropdownTimeout;
  $navbarTop.add($contactsTop).on('mouseenter', 'li.nk-drop-item', function onNavbarTopMouseEnter() {
    var $item = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);
    var $otherDropdown = $item.closest($contactsTop).length ? $navbarTop : $contactsTop;
    var $openedSiblings = $item.siblings('.open').add($item.siblings().find('.open')).add($item.parents('.nk-nav:eq(0)').siblings().find('.open')).add($item.parents('.nk-nav:eq(0)').siblings('.open')).add($item.parents('.nk-nav:eq(0)').parent().siblings().find('.open')).add($otherDropdown.find('.open'));
    clearTimeout(dropdownTimeout);
    closeSubmenu($openedSiblings);
    openSubmenu($item);
  }).on('mouseleave', 'li.nk-drop-item', function onNavbarTopMouseLeave() {
    var $item = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);
    clearTimeout(dropdownTimeout);
    dropdownTimeout = setTimeout(function () {
      closeSubmenu($item);
    }, 200);
  });
  $navbarTop.add($contactsTop).on('mouseleave', function () {
    clearTimeout(dropdownTimeout);
    dropdownTimeout = setTimeout(function () {
      closeSubmenu($navbarTop.add($contactsTop).find('.open'));
    }, 400);
  }); // hide / show
  // add / remove solid color

  var $autohideNav = $navbarTop.filter('.nk-navbar-autohide');
  self.throttleScroll(function (type, scroll) {
    var start = 400;
    var hideClass = 'nk-onscroll-hide';
    var showClass = 'nk-onscroll-show'; // hide / show

    if (type === 'down' && scroll > start) {
      $autohideNav.removeClass(showClass).addClass(hideClass);
    } else if (type === 'up' || type === 'end' || type === 'start') {
      $autohideNav.removeClass(hideClass).addClass(showClass);
    } // add solid color


    if ($navbarTop.hasClass('nk-navbar-transparent')) {
      $navbarTop["".concat(scroll > 70 ? 'add' : 'remove', "Class")]('nk-navbar-solid');
    }
  });
}



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initNavbarSide", function() { return initNavbarSide; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Navbar Side

-------------------------------------------------------------------*/

function initNavbarSide() {
  var self = this;
  var $overlay = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('<div class="nk-navbar-overlay">').appendTo(_utility__WEBPACK_IMPORTED_MODULE_0__["$body"]); // side navbars

  var $leftSide = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-left-side');
  var $rightSide = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-right-side');
  var $sideNavs = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-side'); // toggle navbars

  function updateTogglers() {
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('[data-nav-toggle]').each(function eachNavToggle() {
      var active = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-nav-toggle')).hasClass('open');
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this)["".concat(active ? 'add' : 'remove', "Class")]('active');
    });
  }

  self.toggleSide = function ($side, speed) {
    self[$side.hasClass('open') ? 'closeSide' : 'openSide']($side, speed);
  };

  self.openSide = function ($side, speed) {
    if ($side.css('display') === 'none') {
      return;
    }

    $side.addClass('open'); // show sidebar

    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($side, {
      x: $side.hasClass('nk-navbar-left-side') ? '100%' : '-100%',
      duration: speed || 0.4,
      force3D: true
    }); // show overlay

    if ($side.hasClass('nk-navbar-overlay-content')) {
      _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($overlay, {
        opacity: 0.8,
        duration: 0.3,
        display: 'block',
        force3D: true
      });
    }

    updateTogglers();
  };

  self.closeSide = function ($side, speed) {
    $side.each(function eachSide() {
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).removeClass('open'); // hide sidebar

      _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to(this, {
        x: '0%',
        duration: speed || 0.4,
        force3D: true
      });
      updateTogglers();
    });

    if (!$sideNavs.filter('.nk-navbar-overlay-content.open').length) {
      // hide overlay
      _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($overlay, {
        opacity: 0,
        duration: 0.3,
        display: 'none',
        force3D: true
      });
    }
  };

  _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"].on('click', '[data-nav-toggle]', function onNavToggleClick(e) {
    var $nav = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-nav-toggle'));

    if ($nav.hasClass('open')) {
      self.closeSide($nav);
    } else {
      // hide another navigations
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('[data-nav-toggle]').each(function eachNavToggle() {
        self.closeSide(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-nav-toggle')));
      });
      self.openSide($nav);
    }

    e.preventDefault();
  }); // overlay

  _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"].on('click', '.nk-navbar-overlay', function () {
    self.closeSide($sideNavs);
  }); // hide sidebar if it invisible

  self.debounceResize(function () {
    $sideNavs.filter('.open').each(function eachOpenedNavs() {
      if (!Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).is(':visible')) {
        self.closeSide(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this));
      }
    });
  }); // swipe side navbars

  if (!_utility__WEBPACK_IMPORTED_MODULE_0__["isTouch"] || typeof Hammer === 'undefined') {
    return;
  }

  var swipeStartSize = 50;
  var $swipeItem;
  var navSize;
  var openNav;
  var closeNav;
  var isRightSide;
  var isLeftSide;
  var isScrolling = 0;
  var swipeDir;
  var sidePos = false;
  var startSwipe = false;
  var endSwipe = false; // strange solution to fix pan events on the latest Chrome
  // https://github.com/hammerjs/hammer.js/issues/1065

  var mc = new Hammer.Manager(document, {
    touchAction: 'auto',
    inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
    recognizers: [[Hammer.Pan, {
      direction: Hammer.DIRECTION_HORIZONTAL
    }]]
  }); // If we detect a scroll before a panleft/panright, disable panning
  // thanks: https://github.com/hammerjs/hammer.js/issues/771

  mc.on('panstart', function (e) {
    if (e.additionalEvent === 'panup' || e.additionalEvent === 'pandown') {
      isScrolling = 1;
    }
  }); // Reenable panning

  mc.on('panend', function (e) {
    if (!isScrolling) {
      if ($swipeItem) {
        var swipeSize;

        if (sidePos) {
          if (openNav) {
            swipeSize = sidePos;
          } else if (closeNav) {
            swipeSize = navSize - sidePos;
          } else {
            swipeSize = 0;
          }
        } else {
          swipeSize = 0;
        }

        var transitionTime = Math.max(0.15, 0.4 * (navSize - swipeSize) / navSize);
        var swiped = 0;

        if (swipeSize && swipeSize > 10) {
          var velocityTest = Math.abs(e.velocityX) > 0.7;

          if (swipeSize >= navSize / 3 || velocityTest) {
            swiped = 1;

            if (openNav) {
              self.openSide($swipeItem, transitionTime);
            } else {
              self.closeSide($swipeItem, transitionTime);
            }
          }
        }

        if (!swiped) {
          if (openNav) {
            self.closeSide($swipeItem, transitionTime);
          } else {
            self.openSide($swipeItem, transitionTime);
          }
        }
      }

      openNav = false;
      closeNav = false;
      isRightSide = false;
      isLeftSide = false;
      swipeDir = false;
      sidePos = false;
      $swipeItem = false;
      startSwipe = false;
      endSwipe = false;
    }

    isScrolling = 0;
  });
  mc.on('panleft panright panup pandown', function (e) {
    if (isScrolling) {
      return;
    }

    var isFirst = false;
    var isFinal = e.isFinal;

    if (startSwipe === false) {
      startSwipe = e.center.x;
      isFirst = true;
    }

    endSwipe = e.center.x; // init

    if (isFirst) {
      if (e.direction === 2) {
        swipeDir = 'left';
      } else if (e.direction === 4) {
        swipeDir = 'right';
      } else {
        swipeDir = false;
      } // right side


      if ($rightSide && $rightSide.length) {
        navSize = $rightSide.width(); // open

        if (_utility__WEBPACK_IMPORTED_MODULE_0__["wndW"] - startSwipe <= swipeStartSize && !$rightSide.hasClass('open') && !$leftSide.hasClass('open')) {
          openNav = 1;
          isRightSide = 1; // close
        } else if (_utility__WEBPACK_IMPORTED_MODULE_0__["wndW"] - startSwipe >= navSize - 100 && $rightSide.hasClass('open')) {
          closeNav = 1;
          isRightSide = 1;
        }
      } // left side


      if ($leftSide && $leftSide.length && !isRightSide && $leftSide.is(':visible')) {
        navSize = $leftSide.width(); // open

        if (startSwipe <= swipeStartSize && !$rightSide.hasClass('open') && !$leftSide.hasClass('open')) {
          openNav = 1;
          isLeftSide = 1; // close
        } else if (startSwipe >= navSize - 100 && $leftSide.hasClass('open')) {
          closeNav = 1;
          isLeftSide = 1;
        }
      } // swipe item


      if (isLeftSide) {
        $swipeItem = $leftSide;
      } else if (isRightSide) {
        $swipeItem = $rightSide;
      } else {
        $swipeItem = false;
      } // move

    } else if (!isFinal && $swipeItem) {
      if (isRightSide && (openNav && swipeDir === 'left' || closeNav && swipeDir === 'right')) {
        // open side navbar
        if (openNav) {
          sidePos = Math.min(navSize, Math.max(0, startSwipe - endSwipe));
        } // close side navbar


        if (closeNav) {
          var curPos = startSwipe - endSwipe;

          if (startSwipe < _utility__WEBPACK_IMPORTED_MODULE_0__["wndW"] - navSize) {
            curPos = _utility__WEBPACK_IMPORTED_MODULE_0__["wndW"] - navSize - endSwipe;
          }

          sidePos = navSize - Math.abs(Math.max(-navSize, Math.min(0, curPos)));
        }

        _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($swipeItem, {
          x: "".concat(-100 * sidePos / navSize, "%")
        });
      } else if (isLeftSide && (openNav && swipeDir === 'right' || closeNav && swipeDir === 'left')) {
        // open mobile navbar
        if (openNav) {
          sidePos = Math.min(navSize, Math.max(0, endSwipe - startSwipe));
        } // close mobile navbar


        if (closeNav) {
          var curPos2 = endSwipe - startSwipe;

          if (startSwipe > navSize) {
            curPos2 = endSwipe - navSize;
          }

          sidePos = navSize - Math.abs(Math.max(-navSize, Math.min(0, curPos2)));
        }

        _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($swipeItem, {
          x: "".concat(100 * sidePos / navSize, "%")
        });
      }
    }
  }); // prevent scrolling when opening/hiding navigation

  window.addEventListener('touchmove', function (e) {
    if (isRightSide || isLeftSide) {
      e.srcEvent.preventDefault();
      e.preventDefault();
    }
  }, {
    passive: false
  });
}



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initNavbarFullscreen", function() { return initNavbarFullscreen; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Navbar Fullscreen

-------------------------------------------------------------------*/

function initNavbarFullscreen() {
  var self = this;
  var $navbar = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-full');
  var $navbarTop = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-top');
  var $navbarSocial = $navbar.find('.nk-nav-social');
  var navTransparent;
  var navRect;
  var isOpened;

  self.toggleFullscreenNavbar = function () {
    self[isOpened ? 'closeFullscreenNavbar' : 'openFullscreenNavbar']();
  };

  self.openFullscreenNavbar = function () {
    if (isOpened || !$navbar.length) {
      return;
    }

    isOpened = 1;
    var $navbarMenuItems = $navbar.find('.nk-nav .nk-drop-item.open > .dropdown:not(.closed) > li > a');

    if (!$navbarMenuItems.length) {
      $navbarMenuItems = $navbar.find('.nk-nav > li > a');
    } // active all togglers


    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-full-toggle').addClass('active'); // padding bottom if there is social block

    var paddingBottom = $navbar.find('.nk-nav-social').innerHeight(); // add navbar top position

    navTransparent = $navbarTop.length ? $navbarTop.hasClass('nk-navbar-transparent') && !$navbarTop.hasClass('nk-navbar-solid') : 1;
    navRect = $navbarTop[0] ? $navbarTop[0].getBoundingClientRect() : 0; // set top position and animate

    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($navbar, {
      top: navRect ? navRect.top + (navTransparent ? 0 : navRect.height) : 0,
      paddingTop: navRect && navTransparent ? navRect.height : 0,
      paddingBottom: paddingBottom
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($navbarMenuItems, {
      y: -10,
      opacity: 0
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($navbarSocial, {
      y: 10,
      opacity: 0
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($navbar, {
      opacity: 1,
      duration: 0.5,
      display: 'block',
      force3D: true,
      onComplete: function onComplete() {
        self.initPluginNano($navbar);
      }
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($navbarMenuItems, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      delay: 0.2,
      stagger: 0.1
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($navbarSocial, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      delay: 0.4,
      force3D: true
    });
    $navbar.addClass('open'); // prevent body scrolling

    self.bodyOverflow(1); // trigger event

    _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].trigger('nk-open-full-navbar', [$navbar]);
  };

  self.closeFullscreenNavbar = function (dontTouchBody) {
    if (!isOpened || !$navbar.length) {
      return;
    }

    isOpened = 0; // disactive all togglers

    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-full-toggle').removeClass('active'); // set top position and animate

    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($navbar, {
      opacity: 0,
      duration: 0.5,
      display: 'none',
      force3D: true,
      onComplete: function onComplete() {
        if (!dontTouchBody) {
          // restore body scrolling
          self.bodyOverflow(0);
        }
      }
    }); // open navbar block

    $navbar.removeClass('open'); // trigger event

    _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].trigger('nk-close-full-navbar', [$navbar]);
  };

  _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"].on('click', '.nk-navbar-full-toggle', function (e) {
    self.toggleFullscreenNavbar();
    e.preventDefault();
  });
  _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].on('nk-open-search-block nk-open-cart nk-open-sign-form', function () {
    self.closeFullscreenNavbar(1);
  });
}



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initNavbarDropEffect1", function() { return initNavbarDropEffect1; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Dropdown Effect 1 for side navbars and fullscreen

-------------------------------------------------------------------*/

function initNavbarDropEffect1() {
  var self = this;
  var $navbars = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-side, .nk-navbar-full').find('.nk-nav'); // add perspective

  $navbars.css({
    perspective: '600px',
    perspectiveOrigin: 'center top'
  }); // add back item for dropdowns

  $navbars.find('.dropdown').prepend("<li class=\"bropdown-back\"><a href=\"#\">".concat(self.options.templates.secondaryNavbarBackItem, "</a></li>")); // change height of opened dropdown

  function updateSideNavDropdown($item) {
    var $nav = $item.parents('.nk-navbar:eq(0)');
    var $khNav = $nav.find('.nk-nav');
    var $nanoCont = $khNav.children('.nano-content');
    var $khNavRow = $khNav.parent();
    var $drop = $nav.find('.nk-drop-item.open > .dropdown:not(.closed)');

    if ($drop.length) {
      var dropHeight = $drop.innerHeight(); // vertical center for dropdown

      if ($khNavRow.hasClass('nk-nav-row-center')) {
        $drop.css({
          top: 0
        });
        $khNav.hide();
        var nanoHeight = $khNavRow.innerHeight();
        $khNav.show();
        var nanoNavRowHeight = nanoHeight;
        var nanoTop = $khNavRow.offset().top;
        var dropTop = $drop.offset().top;
        var top = nanoTop - dropTop;

        if (dropHeight < nanoNavRowHeight) {
          top += (nanoHeight - dropHeight) / 2;
        }

        $drop.css({
          top: top
        });
      }

      $khNav.css('height', dropHeight);
      self.initPluginNano($nav); // scroll to top

      _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($nanoCont, {
        scrollTo: {
          y: 0
        },
        duration: 0.3,
        delay: 0.2
      });
    } else {
      $khNav.css('height', '');
    }

    self.initPluginNano($nav);
  } // open / close submenu


  function toggleSubmenu(open, $drop) {
    var $newItems = $drop.find('> .dropdown > li > a');
    var $oldItems = $drop.parent().find('> li > a');

    if (open) {
      $drop.addClass('open').parent().addClass('closed');
    } else {
      $drop.removeClass('open').parent().removeClass('closed');
      var tmp = $newItems;
      $newItems = $oldItems;
      $oldItems = tmp;
    } // show items


    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($newItems, {
      x: open ? '30%' : '-30%',
      rotationY: open ? '30deg' : '-30deg',
      opacity: 0,
      display: 'block'
    }, 0.1);
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($newItems, {
      x: '0%',
      rotationY: '0deg',
      duration: 0.3,
      opacity: 1,
      delay: 0.1
    }); // hide items

    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($oldItems, {
      x: open ? '-30%' : '30%',
      rotationY: open ? '-30deg' : '30deg',
      duration: 0.3,
      opacity: 0,
      onComplete: function onComplete() {
        $oldItems.css('display', 'none');
      }
    });
  }

  $navbars.on('click', '.nk-drop-item > a', function navbarDropItemClick(e) {
    toggleSubmenu(true, Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent());
    updateSideNavDropdown(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this));
    e.preventDefault();
  });
  $navbars.on('click', '.bropdown-back > a', function navbarDropItemBackClick(e) {
    toggleSubmenu(false, Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent().parent().parent());
    updateSideNavDropdown(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this));
    e.preventDefault();
  });
}



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initSearchBlock", function() { return initSearchBlock; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Search Block

-------------------------------------------------------------------*/

function initSearchBlock() {
  var self = this;
  var $search = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-search');
  var $searchField = $search.find('.nk-search-field');
  var $nav = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-top');
  var navRect;
  var isOpened;

  self.toggleSearch = function () {
    self["".concat(isOpened ? 'close' : 'open', "Search")]();
  };

  self.openSearch = function () {
    if (isOpened) {
      return;
    }

    isOpened = 1; // active all togglers

    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-search-toggle').addClass('active'); // add search top position

    navRect = $nav[0] ? $nav[0].getBoundingClientRect() : 0; // set top position and animate

    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($search, {
      paddingTop: navRect ? navRect.bottom : 0
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($searchField, {
      y: -10,
      opacity: 0
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($search, {
      opacity: 1,
      duration: 0.5,
      display: 'block',
      force3D: true
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($searchField, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      delay: 0.2,
      force3D: true
    }); // open search block

    $search.addClass('open'); // focus search input

    if (self.options.enableSearchAutofocus) {
      setTimeout(function () {
        $search.find('.nk-search-field input').focus();
      }, 100);
    } // trigger event


    _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].trigger('nk-open-search-block', [$search]);
  };

  self.closeSearch = function () {
    if (!isOpened) {
      return;
    }

    isOpened = 0; // disactive all togglers

    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-search-toggle').removeClass('active');
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($search, {
      opacity: 0,
      duration: 0.5,
      display: 'none',
      force3D: true
    }); // open search block

    $search.removeClass('open'); // trigger event

    _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].trigger('nk-close-search-block', [$search]);
  };

  _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"].on('click', '.nk-search-toggle', function (e) {
    self.toggleSearch();
    e.preventDefault();
  }); // prevent search close on iOS after scroll. Scroll event triggers after focus on search input

  _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].on("nk-open-full-navbar nk-open-cart nk-open-sign-form".concat(_utility__WEBPACK_IMPORTED_MODULE_0__["isIOs"] ? '' : ' scroll'), function () {
    self.closeSearch();
  });
}



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initCart", function() { return initCart; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Cart

-------------------------------------------------------------------*/

function initCart() {
  var self = this;
  var $cart = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-cart');
  var $cartItems = $cart.find('.nk-store-cart-products tr');
  var $cartTotal = $cart.find('.nk-cart-total');
  var $cartBtns = $cart.find('.nk-cart-btns');
  var $cartToggle = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-cart-toggle');
  var $nav = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-top');
  var navRect;
  var isOpened;

  self.toggleCart = function () {
    self["".concat(isOpened ? 'close' : 'open', "Cart")]();
  };

  self.openCart = function () {
    if (isOpened) {
      return;
    }

    isOpened = 1; // active all togglers

    $cartToggle.addClass('active'); // add cart top position

    navRect = $nav[0] ? $nav[0].getBoundingClientRect() : 0; // set top position and animate

    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($cart, {
      paddingTop: navRect ? navRect.bottom : 0
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($cartItems, {
      y: -10,
      opacity: 0
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($cartTotal, {
      y: -10,
      opacity: 0
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($cartBtns, {
      y: -10,
      opacity: 0
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($cart, {
      opacity: 1,
      duration: 0.5,
      display: 'block',
      force3D: true
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($cartItems, {
      y: 0,
      opacity: 1,
      delay: 0.2,
      duration: 0.3,
      stagger: 0.1
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($cartTotal, {
      y: 0,
      opacity: 1,
      delay: 0.3,
      duration: 0.3,
      force3D: true
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($cartBtns, {
      y: 0,
      opacity: 1,
      delay: 0.4,
      duration: 0.3,
      force3D: true
    }); // open cart block

    $cart.addClass('open'); // prevent body scrolling

    self.bodyOverflow(1); // trigger event

    _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].trigger('nk-open-cart', [$cart]);
  };

  self.closeCart = function (dontTouchBody) {
    if (!isOpened) {
      return;
    }

    isOpened = 0; // deactive all togglers

    $cartToggle.removeClass('active');
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($cart, {
      opacity: 0,
      duration: 0.5,
      display: 'none',
      force3D: true,
      onComplete: function onComplete() {
        if (!dontTouchBody) {
          // restore body scrolling
          self.bodyOverflow(0);
        }
      }
    }); // open cart block

    $cart.removeClass('open'); // trigger event

    _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].trigger('nk-close-cart', [$cart]);
  };

  _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"].on('click', '.nk-cart-toggle', function (e) {
    self.toggleCart();
    e.preventDefault();
  });
  _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].on('nk-open-full-navbar nk-open-search-block nk-open-sign-form', function () {
    self.closeCart(1);
  });
}



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initSignForm", function() { return initSignForm; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Sign Form

-------------------------------------------------------------------*/

function initSignForm() {
  var self = this;
  var $signForm = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-sign-form');
  var $signFormContainer = $signForm.find('.nk-sign-form-container');
  var $signToggle = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-sign-toggle');
  var $nav = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-top');
  var navRect;
  var isOpened; // show / hide block with form

  self.toggleSignForm = function () {
    self["".concat(isOpened ? 'close' : 'open', "SignForm")]();
  }; // show block with form


  self.openSignForm = function () {
    if (isOpened) {
      return;
    }

    isOpened = 1; // active all togglers

    $signToggle.addClass('active'); // add form top position

    navRect = $nav[0] ? $nav[0].getBoundingClientRect() : 0; // set top position and animate

    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($signForm, {
      paddingTop: navRect ? navRect.bottom : 0
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($signFormContainer, {
      y: -10,
      opacity: 0
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($signForm, {
      opacity: 1,
      duration: 0.5,
      display: 'block',
      force3D: true
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($signFormContainer, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      delay: 0.4,
      force3D: true
    }); // open form block

    $signForm.addClass('open'); // prevent body scrolling

    self.bodyOverflow(1); // trigger event

    _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].trigger('nk-open-sign-form', [$signForm]);
  }; // hide block with form


  self.closeSignForm = function (dontTouchBody) {
    if (!isOpened) {
      return;
    }

    isOpened = 0; // deactive all togglers

    $signToggle.removeClass('active');
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($signForm, {
      opacity: 0,
      duration: 0.5,
      display: 'none',
      force3D: true,
      onComplete: function onComplete() {
        if (!dontTouchBody) {
          // restore body scrolling
          self.bodyOverflow(0);
        }
      }
    }); // open form block

    $signForm.removeClass('open'); // trigger event

    _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].trigger('nk-close-sign-form', [$signForm]);
  };

  _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"].on('click', '.nk-sign-toggle', function (e) {
    self.toggleSignForm();
    e.preventDefault();
  });
  _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].on('nk-open-full-navbar nk-open-search-block nk-open-cart', function () {
    self.closeSignForm(1);
  }); // show / hide forms

  var $formLost = $signForm.find('.nk-sign-form-lost');
  var $formLogin = $signForm.find('.nk-sign-form-login');
  var $formRegister = $signForm.find('.nk-sign-form-register');
  var $toggleLost = $signForm.find('.nk-sign-form-lost-toggle');
  var $toggleLogin = $signForm.find('.nk-sign-form-login-toggle');
  var $toggleRegister = $signForm.find('.nk-sign-form-register-toggle');

  function animateForms($showItems) {
    var inverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var $hideItems = $formLost.filter('.active').add($formRegister.filter('.active')).add($formLogin.filter('.active'));
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($hideItems, {
      position: 'absolute',
      display: 'block',
      x: 0
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($showItems, {
      position: 'absolute',
      display: 'none',
      x: inverse ? '-60%' : '60%'
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($hideItems, {
      opacity: 0,
      duration: 0.2,
      x: inverse ? '60%' : '-60%',
      display: 'none',
      force3D: true
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($showItems, {
      opacity: 1,
      duration: 0.2,
      display: 'block',
      x: '0%',
      force3D: true,
      onComplete: function onComplete() {
        _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($showItems, {
          position: 'relative'
        });
      }
    });
    $hideItems.removeClass('active');
    $showItems.addClass('active');
  }

  function showLoginForm() {
    animateForms($formLogin, true);
    $toggleLost.removeClass('active');
    $toggleLogin.addClass('active');
    $toggleRegister.removeClass('active');
  }

  function showLostForm() {
    animateForms($formLost);
    $toggleLost.addClass('active');
    $toggleLogin.removeClass('active');
    $toggleRegister.removeClass('active');
  }

  function showRegisterForm() {
    animateForms($formRegister);
    $toggleLost.removeClass('active');
    $toggleLogin.removeClass('active');
    $toggleRegister.addClass('active');
  }

  $signForm.on('click', '.nk-sign-form-login-toggle:not(.active)', function (e) {
    e.preventDefault();
    showLoginForm();
  });
  $signForm.on('click', '.nk-sign-form-lost-toggle:not(.active)', function (e) {
    e.preventDefault();
    showLostForm();
  });
  $signForm.on('click', '.nk-sign-form-register-toggle:not(.active)', function (e) {
    e.preventDefault();
    showRegisterForm();
  });
}



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initHeaderTitle", function() { return initHeaderTitle; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Header Title

-------------------------------------------------------------------*/

function initHeaderTitle() {
  var self = this;
  var $navbarHeader = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-header');
  var isNavbarOpaque = $navbarHeader.hasClass('nk-header-opaque');
  var isNavbarTransparent = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-top').hasClass('nk-header-transparent');
  var $headerTitle = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-header-title > .nk-header-table');
  var $fullHeaderTitle = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-header-title-full > .nk-header-table'); // remove header title padding if navbar opaque

  if (isNavbarOpaque) {
    $headerTitle.css('padding-top', 0);
  }

  self.debounceResize(function () {
    if ((isNavbarTransparent || isNavbarOpaque) && (!$fullHeaderTitle.length || !isNavbarOpaque)) {
      return;
    }

    var navH = $navbarHeader.outerHeight() || 0; // add header title padding

    if (!isNavbarTransparent && !isNavbarOpaque) {
      $headerTitle.css('padding-top', navH);
    } // fix header title height


    if ($fullHeaderTitle.length) {
      var headerH = '100vh';

      if (isNavbarOpaque) {
        headerH = "calc(100vh - ".concat(navH, "px)");
      }

      $fullHeaderTitle.css('min-height', headerH);
    }
  });
}



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initCounters", function() { return initCounters; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Counters

-------------------------------------------------------------------*/

function initCounters() {
  var self = this;
  var $progressCount = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-progress.nk-count');
  var $numberCount = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-count:not(.nk-progress)'); // set default progress

  $progressCount.each(function eachProgress() {
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-nk-count', Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-progress')).attr('data-nk-mask', Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-progress-mask')).find('.nk-progress-line > div').css('width', "".concat(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-nk-count-from') || '0', "%")).find('.nk-progress-percent').html('');
  }); // set default numbers

  $numberCount.each(function eachNumberCount() {
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-nk-count', Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-nk-count') || parseInt(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).text(), 10)).html(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-nk-count-from') || '0');
  });
  var countersNum = 1;

  function runCounters() {
    if (!countersNum) {
      return;
    }

    var progress = $progressCount.filter('[data-nk-count]');
    var numbers = $numberCount.filter('[data-nk-count]');
    countersNum = progress.length + numbers.length; // progress

    $progressCount.filter('[data-nk-count]').each(function eachProgressCount() {
      var $item = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);

      if (self.isInViewport($item)) {
        var count = {
          curr: $item.attr('data-nk-count-from') || '0',
          to: $item.attr('data-nk-count'),
          mask: $item.attr('data-nk-mask') || '{$}%'
        };
        var $itemLine = $item.find('.nk-progress-line > div');
        var $itemLabel = $item.find('.nk-progress-percent');
        _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($itemLine, {
          width: "".concat(count.to, "%"),
          duration: 1,
          force3D: true
        });
        _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to(count, {
          curr: count.to,
          duration: 1,
          roundProps: 'curr',
          ease: Circ.easeIn,
          onUpdate: function onUpdate() {
            $itemLabel.text(count.mask.replace('{$}', count.curr));
          }
        });
        $item.removeAttr('data-nk-count');
      }
    }); // number

    $numberCount.filter('[data-nk-count]').each(function eachNumberCount() {
      var $item = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);

      if (self.isInViewport($item)) {
        var count = {
          curr: $item.text(),
          to: $item.attr('data-nk-count')
        };
        $item.removeAttr('data-nk-count data-nk-count-from');
        _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to(count, {
          curr: count.to,
          duration: 1,
          roundProps: 'curr',
          ease: Circ.easeIn,
          onUpdate: function onUpdate() {
            $item.text(count.curr);
          }
        });
      }
    });
  }

  self.throttleScroll(runCounters);
  runCounters();
}



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initSideButtons", function() { return initSideButtons; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Side Buttons

-------------------------------------------------------------------*/

function initSideButtons() {
  var self = this;
  var $sideButtons = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-side-buttons'); // hide on scroll

  self.throttleScroll(function (type, scroll) {
    var start = 400;

    if (scroll > start) {
      $sideButtons.addClass('nk-side-buttons-show-scroll-top');
    } else {
      $sideButtons.removeClass('nk-side-buttons-show-scroll-top');
    }
  }); // scroll top

  _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"].on('click', '.nk-scroll-top', function (e) {
    e.preventDefault();
    self.scrollTo('top');
  });
}



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initActionsLike", function() { return initActionsLike; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Actions Like and Heart

-------------------------------------------------------------------*/

function initActionsLike() {
  var self = this; // like / dislike animation init

  var $likeAnimation;
  var $dislikeAnimation;

  if (self.options.enableActionLikeAnimation) {
    $likeAnimation = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])("<div class=\"nk-like-animation\">".concat(self.options.templates.likeAnimationLiked, "</div>")).appendTo(_utility__WEBPACK_IMPORTED_MODULE_0__["$body"]);
    $dislikeAnimation = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])("<div class=\"nk-dislike-animation\">".concat(self.options.templates.likeAnimationDisliked, "</div>")).appendTo(_utility__WEBPACK_IMPORTED_MODULE_0__["$body"]);
  }

  function runLikeAnimation(type) {
    var $animateItem = type === 'like' ? $likeAnimation : $dislikeAnimation;
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($animateItem, {
      scale: 1,
      opacity: 0
    });
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($animateItem, {
      scale: 1.1,
      opacity: 0.5,
      duration: 0.3,
      display: 'block',
      ease: Power2.easeIn,
      force3D: true,
      onComplete: function onComplete() {
        _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($animateItem, {
          scale: 1.2,
          opacity: 0,
          duration: 0.3,
          display: 'none',
          ease: Power2.easeOut,
          force3D: true
        });
      }
    });
  } // heart action


  _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"].on('click', '.nk-action-heart', function onActionHeartClick(e) {
    e.preventDefault();
    var $like = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);

    if ($like.hasClass('busy')) {
      return;
    }

    var $num = $like.find('.num');
    var type = $like.hasClass('liked') ? 'dislike' : 'like';
    var $parent = $like.parents('.nk-comment:eq(0), .nk-blog-post:eq(0)').eq(0);
    var updatedNum;
    var updatedIcon;
    $like.addClass('busy');
    self.options.events.actionHeart({
      $dom: $like,
      $parent: $parent,
      type: type,
      currentNum: parseInt($num.text(), 10),
      updateNum: function updateNum(num) {
        $num.text(num);
        updatedNum = 1;

        if (updatedNum && updatedIcon) {
          $like.removeClass('busy');
        }
      },
      updateIcon: function updateIcon() {
        $like[type === 'like' ? 'addClass' : 'removeClass']('liked');
        updatedIcon = 1;

        if (updatedNum && updatedIcon) {
          $like.removeClass('busy');
        } // like / dislike animation


        if (self.options.enableActionLikeAnimation) {
          runLikeAnimation(type);
        }
      }
    });
  }); // like action

  _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"].on('click', '.nk-action-like .like-icon, .nk-action-like .dislike-icon', function onLikeClick(e) {
    e.preventDefault();
    var $like = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);
    var $parentLike = $like.parent();

    if ($parentLike.hasClass('busy')) {
      return;
    }

    var isLiked = $parentLike.hasClass('liked');
    var isDisliked = $parentLike.hasClass('disliked');
    var isDislike = $like.hasClass('dislike-icon');
    var $num = $parentLike.find('.num');
    var $parent = $parentLike.parents('.nk-comment:eq(0), .nk-blog-post:eq(0)').eq(0);
    var type = isDislike ? 'dislike' : 'like';
    var updatedNum;
    var updatedIcon;
    $parentLike.addClass('busy');
    self.options.events.actionLike({
      $dom: $like,
      $parent: $parent,
      type: type,
      isLiked: isLiked,
      isDisliked: isDisliked,
      currentNum: parseInt($num.text(), 10),
      updateNum: function updateNum(num) {
        $num.text((num > 0 ? '+' : '') + num);
        updatedNum = 1;

        if (updatedNum && updatedIcon) {
          $parentLike.removeClass('busy');
        }
      },
      updateIcon: function updateIcon() {
        $parentLike.removeClass('liked disliked');

        if (!(isLiked && !isDislike || isDisliked && isDislike)) {
          $parentLike.addClass(type === 'like' ? 'liked' : 'disliked');
        }

        updatedIcon = 1;

        if (updatedNum && updatedIcon) {
          $parentLike.removeClass('busy');
        } // like / dislike animation


        if (self.options.enableActionLikeAnimation) {
          if (type === 'like' && !isLiked || type === 'dislike' && !isDisliked) {
            runLikeAnimation(type);
          }
        }
      }
    });
  });
}



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initAnchors", function() { return initAnchors; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Anchors

-------------------------------------------------------------------*/

function initAnchors() {
  var self = this; // click on anchors

  var $leftSide = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-left-side');
  var $rightSide = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar-right-side');

  function closeNavs() {
    self.closeSide($leftSide);
    self.closeSide($rightSide);
    self.closeFullscreenNavbar();
  }

  _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"].on('click', '.navbar a, .nk-navbar a, a.btn, a.nk-btn, a.nk-anchor', function anchorsOnClick(e) {
    var isHash = this.hash;
    var isURIsame = this.baseURI === window.location.href;

    if (isHash && isURIsame) {
      // sometimes hashs have no valid selector like ##hash, it will throw errors
      try {
        var $hashBlock = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(isHash);
        var hash = isHash.replace(/^#/, '');

        if ($hashBlock.length || hash === 'top' || hash === 'bottom') {
          // close navigations
          closeNavs(); // scroll to block

          self.scrollTo($hashBlock.length ? $hashBlock : hash);
          e.preventDefault();
        } // eslint-disable-next-line

      } catch (ev) {}
    }
  }); // add active class on navbar items

  var $anchorItems = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-navbar .nk-nav > li > a[href*="#"]');
  var anchorBlocks = [];

  function hashInArray(item) {
    for (var k = 0; k < anchorBlocks.length; k++) {
      if (anchorBlocks[k].hash === item) {
        return k;
      }
    }

    return false;
  } // get all anchors + blocks on the page


  $anchorItems.each(function eachAnchors() {
    var hash = this.hash.replace(/^#/, '');

    if (!hash) {
      return;
    }

    var $item = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent();
    var $block = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])("#".concat(hash));

    if (hash && $block.length || hash === 'top') {
      var inArray = hashInArray(hash);

      if (inArray === false) {
        anchorBlocks.push({
          hash: hash,
          $item: $item,
          $block: $block
        });
      } else {
        anchorBlocks[inArray].$item = anchorBlocks[inArray].$item.add($item);
      }
    }
  }); // prepare anchor list and listen for scroll to activate items in navbar

  function updateAnchorItemsPositions() {
    for (var k = 0; k < anchorBlocks.length; k++) {
      var item = anchorBlocks[k];
      var blockTop = 0;
      var blockH = _utility__WEBPACK_IMPORTED_MODULE_0__["wndH"];

      if (item.$block.length) {
        blockTop = item.$block.offset().top;
        blockH = item.$block.innerHeight();
      }

      item.activate = blockTop - _utility__WEBPACK_IMPORTED_MODULE_0__["wndH"] / 2;
      item.deactivate = blockTop + blockH - _utility__WEBPACK_IMPORTED_MODULE_0__["wndH"] / 2;
    }
  }

  function setAnchorActiveItem(type, ST) {
    for (var k = 0; k < anchorBlocks.length; k++) {
      var item = anchorBlocks[k];
      var active = ST >= item.activate && ST < item.deactivate;
      item.$item[active ? 'addClass' : 'removeClass']('active');
    }
  }

  if (anchorBlocks.length) {
    updateAnchorItemsPositions();
    setAnchorActiveItem('static', _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].scrollTop());
    self.throttleScroll(setAnchorActiveItem);
    self.debounceResize(updateAnchorItemsPositions);
  }
}



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initLinesForBoxes", function() { return initLinesForBoxes; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Line For Boxes
  <div class="nk-box nk-box-line"></div>

-------------------------------------------------------------------*/

function initLinesForBoxes() {
  var self = this;
  var $rowsWithBoxes;
  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.row').each(function eachRow() {
    if (Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).find('> * > .nk-box-line').length) {
      $rowsWithBoxes = $rowsWithBoxes ? $rowsWithBoxes.add(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this)) : Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);
    }
  }); // support for VC

  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.vc_row').each(function eachVCRow() {
    if (Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).find('> div > div > div > .nk-box-line').length) {
      $rowsWithBoxes = $rowsWithBoxes ? $rowsWithBoxes.add(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this)) : Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);
    }
  });

  if (!$rowsWithBoxes) {
    return;
  }

  function calculate() {
    $rowsWithBoxes.each(function eachRowWithBoxes() {
      var currentRowStart = 0;
      var rowDivs = [];
      var topPosition = 0;
      var $this = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this); // check all rows and add in array

      $this.children('*').each(function eachChildrenRow() {
        topPosition = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).position().top;

        if (currentRowStart !== topPosition) {
          currentRowStart = topPosition;
          rowDivs.push(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this));
        } else if (rowDivs[rowDivs.length - 1]) {
          rowDivs[rowDivs.length - 1] = rowDivs[rowDivs.length - 1].add(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this));
        } else {
          rowDivs[(rowDivs.length || 1) - 1] = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);
        }
      }); // support for VC

      if ($this.hasClass('vc_row')) {
        // remove additional classnames
        Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).find('> div > div > div > .nk-box-line').removeClass('nk-box-line-top nk-box-last'); // add new classnames

        for (var k = 0; k < rowDivs.length; k++) {
          rowDivs[k].last().find('> div > div > .nk-box-line').addClass('nk-box-last');

          if (k > 0) {
            rowDivs[k].find('> div > div > .nk-box-line').addClass('nk-box-line-top');
          }
        } // bootstrap

      } else {
        // remove additional classnames
        $this.find('> * > .nk-box-line').removeClass('nk-box-line-top nk-box-last'); // add new classnames

        for (var _k = 0; _k < rowDivs.length; _k++) {
          rowDivs[_k].last().children('.nk-box-line').addClass('nk-box-last');

          if (_k > 0) {
            rowDivs[_k].children('.nk-box-line').addClass('nk-box-line-top');
          }
        }
      }
    });
  }

  calculate();
  self.debounceResize(calculate);
}



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initImageBoxes", function() { return initImageBoxes; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Image Boxes

-------------------------------------------------------------------*/

function initImageBoxes() {
  // overlay smart show
  _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"].on('mouseenter mouseleave', '.nk-image-box-4', function onImageBoxMouseEnterLeave(e) {
    var $overlay = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).find('.nk-image-box-overlay');
    var itemRect = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this)[0].getBoundingClientRect(); // detect mouse enter or leave

    var x = (itemRect.width / 2 - e.clientX + itemRect.left) / (itemRect.width / 2);
    var y = (itemRect.height / 2 - e.clientY + itemRect.top) / (itemRect.height / 2);
    var enter = e.type === 'mouseenter';
    var endX = '0%';
    var endY = '0%';

    if (Math.abs(x) > Math.abs(y)) {
      endX = (x > 0 ? '-10' : '10') + endX;
    } else {
      endY = (y > 0 ? '-10' : '10') + endY;
    }

    if (enter) {
      _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($overlay, {
        x: endX,
        y: endY
      });
    }

    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($overlay, {
      x: enter ? '0%' : endX,
      y: enter ? '0%' : endY,
      duration: 0.25,
      display: enter ? 'flex' : 'none',
      ease: Power1.easeInOut,
      force3D: true
    });
  });
}



/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initVideoBlocks", function() { return initVideoBlocks; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Video Blocks

-------------------------------------------------------------------*/

function initVideoBlocks() {
  if (typeof window.VideoWorker === 'undefined') {
    return;
  }

  var self = this; // open fullscreen videos

  var openedFSVideo;

  self.openFullScreenVideo = function (url) {
    if (_utility__WEBPACK_IMPORTED_MODULE_0__["isMobile"]) {
      window.open(url);
      return;
    }

    if (openedFSVideo) {
      return;
    }

    openedFSVideo = 1; // get api for this video

    self.FullScreenVideoApi = new VideoWorker(url, {
      autoplay: 1,
      loop: 0,
      mute: 0,
      controls: 1
    }); // set video size

    function setVideoSize() {
      var ratio = 16 / 9;
      var resultW;
      var resultH;

      if (ratio > _utility__WEBPACK_IMPORTED_MODULE_0__["wndW"] / _utility__WEBPACK_IMPORTED_MODULE_0__["wndH"]) {
        resultW = _utility__WEBPACK_IMPORTED_MODULE_0__["wndW"] * 0.9;
        resultH = resultW / ratio;
      } else {
        resultH = _utility__WEBPACK_IMPORTED_MODULE_0__["wndH"] * 0.9;
        resultW = resultH * ratio;
      }

      self.FullScreenVideoWrapper.css({
        width: resultW,
        height: resultH,
        top: (_utility__WEBPACK_IMPORTED_MODULE_0__["wndH"] - resultH) / 2,
        left: (_utility__WEBPACK_IMPORTED_MODULE_0__["wndW"] - resultW) / 2
      });
    } // create fullscreen video wrapper if doesn't exist


    if (!self.FullScreenVideo) {
      self.FullScreenVideo = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('<div class="nk-video-fullscreen"></div>').appendTo(_utility__WEBPACK_IMPORTED_MODULE_0__["$body"]);

      self.closeFullScreenVideo = function () {
        if (openedFSVideo) {
          openedFSVideo = 0;
          self.FullScreenVideoApi.pause(); // hide animation

          _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to(self.FullScreenVideo, {
            opacity: 0,
            duration: 0.4,
            display: 'none',
            force3D: true,
            onComplete: function onComplete() {
              self.FullScreenVideoWrapper.html('');
            }
          });
          _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to(self.FullScreenVideoWrapper, {
            scale: 0.9,
            duration: 0.4,
            force3D: true
          }); // restore body scrolling

          self.bodyOverflow(0);
        }
      }; // close icon


      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])("<div class=\"nk-video-fullscreen-close\">".concat(self.options.templates.fullscreenVideoClose, "</div>")).on('click', self.closeFullScreenVideo).appendTo(self.FullScreenVideo); // video container

      self.FullScreenVideoWrapper = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('<div class="nk-video-fullscreen-cont"></div>').appendTo(self.FullScreenVideo);
      setVideoSize();
      self.debounceResize(setVideoSize);
    } // check api and run fullscreen


    if (self.FullScreenVideoApi && self.FullScreenVideoApi.isValid()) {
      self.FullScreenVideoApi.getIframe(function (iframe) {
        var $parent = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(iframe).parent(); // fix Vimeo fullscreen features.

        iframe.setAttribute('webkitAllowFullScreen', '');
        iframe.setAttribute('mozAllowFullScreen', '');
        iframe.setAttribute('allowFullScreen', '');
        self.FullScreenVideoWrapper.append(iframe);
        $parent.remove(); // pause audio

        if (typeof soundManager !== 'undefined') {
          soundManager.pauseAll();
        } // show animation


        _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].fromTo(self.FullScreenVideo, {
          opacity: 0,
          duration: 0.4
        }, {
          opacity: 1,
          display: 'block'
        });
        _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].fromTo(self.FullScreenVideoWrapper, {
          opacity: 0,
          duration: 0.4,
          scale: 0.9
        }, {
          opacity: 1,
          scale: 1,
          delay: 0.3
        }); // prevent body scrolling

        self.bodyOverflow(1);
      });
    }
  };

  _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"].on('click', '.nk-video-fullscreen-toggle', function videoFullscreenTogglerClick(e) {
    e.preventDefault();
    self.openFullScreenVideo(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('href'));
  }); // init plain video

  function addPlainPlayButton($plainCont) {
    $plainCont.find('.nk-video-plain-toggle').html(self.options.templates.plainVideoIcon);
  }

  function addPlainLoadButton($plainCont) {
    $plainCont.find('.nk-video-plain-toggle').html(self.options.templates.plainVideoLoadIcon || self.options.templates.plainVideoIcon);
  }

  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-plain-video[data-video]').each(function plainVideoClick() {
    var $plainCont = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);
    var $plainIframe;
    var url = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-video');
    var thumb = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-video-thumb');
    var api = new VideoWorker(url, {
      autoplay: 0,
      loop: 0,
      mute: 0,
      controls: 1
    });

    if (api && api.isValid()) {
      var loaded = 0;
      var clicked = 0; // add play event

      $plainCont.on('click', function () {
        if (_utility__WEBPACK_IMPORTED_MODULE_0__["isMobile"]) {
          window.open(api.url);
          return;
        }

        if (clicked) {
          return;
        }

        clicked = 1; // add loading button

        if (!loaded) {
          addPlainLoadButton($plainCont);
          api.getIframe(function (iframe) {
            // add iframe
            $plainIframe = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(iframe); // fix Vimeo fullscreen features.

            iframe.setAttribute('webkitAllowFullScreen', '');
            iframe.setAttribute('mozAllowFullScreen', '');
            iframe.setAttribute('allowFullScreen', '');
            var $parent = $plainIframe.parent();
            _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set(iframe, {
              opacity: 0,
              left: '100%'
            });
            $plainIframe.appendTo($plainCont);
            $parent.remove();
            api.play();
          });
        } else {
          api.play();
        }
      }); // add play button

      $plainCont.append('<span class="nk-video-plain-toggle"></span>');
      addPlainPlayButton($plainCont); // set thumb

      if (thumb) {
        $plainCont.css('background-image', "url(\"".concat(thumb, "\")"));
      } else {
        api.getImageURL(function (imgSrc) {
          $plainCont.css('background-image', "url(\"".concat(imgSrc, "\")"));
        });
      }

      if (_utility__WEBPACK_IMPORTED_MODULE_0__["isMobile"]) {
        return;
      }

      api.on('ready', function () {
        api.play();
      });
      api.on('play', function () {
        _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($plainIframe, {
          left: 0
        });
        _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($plainIframe, {
          opacity: 1,
          duration: 0.5,
          force3D: true,
          onComplete: function onComplete() {
            // add play button
            if (!loaded) {
              addPlainPlayButton($plainCont);
              loaded = 1;
            }
          }
        }); // pause audio

        if (typeof soundManager !== 'undefined') {
          soundManager.pauseAll();
        }
      });
      api.on('pause', function () {
        _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($plainIframe, {
          opacity: 0,
          duration: 0.5,
          force3D: true,
          onComplete: function onComplete() {
            _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].set($plainIframe, {
              opacity: 0,
              left: '100%'
            });
            clicked = 0;
          }
        });
      });
    }
  });
}



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initGIF", function() { return initGIF; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init GIFs

-------------------------------------------------------------------*/

function initGIF() {
  var self = this; // load gif in background

  function loadGif(url, cb) {
    var temp = new Image();

    temp.onload = function () {
      cb();
    };

    temp.src = url;
  } // play gif


  function playGif(item) {
    var $item = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(item);

    if (!item.gifPlaying) {
      item.gifPlaying = true;

      if (item.khGifLoaded) {
        $item.addClass('nk-gif-playing');
        $item.find('img').attr('src', $item.find('img').attr('data-gif'));
      } else if (!item.khGifLoading) {
        item.khGifLoading = 1;
        $item.addClass('nk-gif-loading');
        loadGif($item.find('img').attr('data-gif'), function () {
          item.khGifLoaded = 1;
          $item.removeClass('nk-gif-loading');

          if (item.gifPlaying) {
            item.gifPlaying = false;
            playGif(item);
          }
        });
      }
    }
  } // stop playing gif


  function stopGif(item) {
    var $item = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(item);

    if (item.gifPlaying) {
      item.gifPlaying = false;
      $item.removeClass('nk-gif-playing');
      $item.find('img').attr('src', $item.find('img').attr('data-gif-static'));
    }
  } // prepare gif containers


  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-gif').each(function eachGif() {
    var $this = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this); // add toggle button

    $this.append("<a class=\"nk-gif-toggle\">".concat(self.options.templates.gifIcon, "</a>")); // add loading circle

    $this.append('<div class="nk-loading-spinner"><i></i></div>');
    $this.find('img').attr('data-gif-static', $this.find('img').attr('src'));
  }); // hover gif

  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-gif-hover').on('mouseenter', function gifOnMouseEnter() {
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).addClass('hover');
    playGif(this);
  }).on('mouseleave', function gifOnMouseLeave() {
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).removeClass('hover');
    stopGif(this);
  }); // click gif

  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-gif-click').on('click', function gifOnClick() {
    if (this.gifPlaying) {
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).removeClass('hover');
      stopGif(this);
    } else {
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).addClass('hover');
      playGif(this);
    }
  }); // autoplay in viewport

  var $gifVP = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-gif-viewport');

  if ($gifVP.length) {
    self.throttleScroll(function () {
      $gifVP.each(function eachGifInVeiwport() {
        var inVP = self.isInViewport(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this), 1);

        if (inVP[0]) {
          if (inVP[1].height / _utility__WEBPACK_IMPORTED_MODULE_0__["wndH"] < 0.7) {
            if (inVP[0] === 1) {
              playGif(this);
            } else {
              stopGif(this);
            }
          } else if (inVP[0] >= 0.7) {
            playGif(this);
          } else {
            stopGif(this);
          }
        } else {
          stopGif(this);
        }
      });
    });
  } // autoplay gif


  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-gif:not(.nk-gif-click):not(.nk-gif-hover):not(.nk-gif-viewport)').each(function eachGifAutoplay() {
    playGif(this);
  });
}



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initInfoBoxes", function() { return initInfoBoxes; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Info Boxes / Alerts

-------------------------------------------------------------------*/

function initInfoBoxes() {
  var self = this; // close

  _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"].on('click', '.nk-info-box .nk-info-box-close', function onInfoboxCloseClick(e) {
    e.preventDefault();
    var $box = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parents('.nk-info-box:eq(0)');
    _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($box, {
      opacity: 0,
      duration: 0.3,
      onComplete: function onComplete() {
        _utility__WEBPACK_IMPORTED_MODULE_0__["tween"].to($box, {
          height: 0,
          padding: 0,
          margin: 0,
          duration: 0.3,
          display: 'none',
          onComplete: function onComplete() {
            self.debounceResize();
          }
        });
      }
    });
  });
}



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initForms", function() { return initForms; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Forms

-------------------------------------------------------------------*/

function initForms() {
  var self = this; // Create Spinners in input number

  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('<span class="nk-form-control-number-up"></span>').insertAfter('.nk-form-control-number input');
  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('<span class="nk-form-control-number-down"></span>').insertBefore('.nk-form-control-number input');
  _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"].on('click', '.nk-form-control-number-up', function onFormControlNumberUpClick() {
    var $input = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).siblings('input');
    var max = $input.attr('max') || 9999999;
    var oldValue = parseFloat($input.val());
    var newVal = oldValue;

    if (oldValue < max) {
      newVal += 1;
    }

    $input.val(newVal);
    $input.trigger('change');
  });
  _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"].on('click', '.nk-form-control-number-down', function onFormControlNumberDownClick() {
    var $input = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).siblings('input');
    var min = $input.attr('min') || -9999999;
    var oldValue = parseFloat($input.val());
    var newVal = oldValue;

    if (oldValue > min) {
      newVal -= 1;
    }

    $input.val(newVal);
    $input.trigger('change');
  });

  if (typeof _utility__WEBPACK_IMPORTED_MODULE_0__["$"].validator === 'undefined') {
    return;
  } // Validate Forms


  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('form:not(.nk-form-ajax):not(.nk-mchimp):not([novalidate])').each(function eachFromValidate() {
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).validate({
      errorClass: 'nk-error',
      errorElement: 'div',
      errorPlacement: function errorPlacement(error, element) {
        var $parent = element.parent('.input-group, .nk-form-control-number');

        if ($parent.length) {
          $parent.after(error);
        } else {
          element.after(error);
        }

        self.debounceResize();
      }
    });
  }); // ajax form

  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('form.nk-form-ajax:not([novalidate])').each(function eachAjaxForm() {
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).validate({
      errorClass: 'nk-error',
      errorElement: 'div',
      errorPlacement: function errorPlacement(error, element) {
        var $parent = element.parent('.input-group');

        if ($parent.length) {
          $parent.after(error);
        } else {
          element.after(error);
        }

        self.debounceResize();
      },
      // Submit the form via ajax (see: jQuery Form plugin)
      submitHandler: function submitHandler(form) {
        var $responseSuccess = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(form).find('.nk-form-response-success');
        var $responseError = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(form).find('.nk-form-response-error');
        var $form = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(form);
        _utility__WEBPACK_IMPORTED_MODULE_0__["$"].ajax({
          url: $form.attr('action'),
          data: $form.serialize(),
          type: 'POST',
          success: function success(response) {
            response = JSON.parse(response);

            if (response.type && response.type === 'success') {
              $responseError.hide();
              $responseSuccess.html(response.response).show();
              form.reset();
            } else {
              $responseSuccess.hide();
              $responseError.html(response.response).show();
            }

            self.debounceResize();
          },
          error: function error(response) {
            $responseSuccess.hide();
            $responseError.html(response.responseText).show();
            self.debounceResize();
          }
        });
      }
    });
  });
}



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initFormsMailChimp", function() { return initFormsMailChimp; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* eslint-disable */

/*------------------------------------------------------------------

  Init MailChimp

-------------------------------------------------------------------*/

function initFormsMailChimp() {
  var $mchimp = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('form.nk-mchimp');

  if (typeof _utility__WEBPACK_IMPORTED_MODULE_0__["$"].validator === 'undefined' || !$mchimp.length) {
    return;
  }

  var self = this; // Additional Validate Methods From MailChimp
  // Validate a multifield birthday

  _utility__WEBPACK_IMPORTED_MODULE_0__["$"].validator.addMethod('mc_birthday', function (date, element, grouping_class) {
    var isValid = false;
    var $fields = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('input:not(:hidden)', Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(element).closest(grouping_class));

    if ($fields.filter(':filled').length === 0 && this.optional(element)) {
      isValid = true; // None have been filled out, so no error
    } else {
      var dateArray = new Array();
      dateArray.month = $fields.filter('input[name*="[month]"]').val();
      dateArray.day = $fields.filter('input[name*="[day]"]').val(); // correct month value

      dateArray.month -= 1;
      var testDate = new Date(1970, dateArray.month, dateArray.day);

      if (testDate.getDate() !== dateArray.day || testDate.getMonth() !== dateArray.month) {
        isValid = false;
      } else {
        isValid = true;
      }
    }

    return isValid;
  }, 'Please enter a valid month and day.'); // Validate a multifield date

  _utility__WEBPACK_IMPORTED_MODULE_0__["$"].validator.addMethod('mc_date', function (date, element, grouping_class) {
    var isValid = false;
    var $fields = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('input:not(:hidden)', Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(element).closest(grouping_class));

    if ($fields.filter(':filled').length === 0 && this.optional(element)) {
      isValid = true; // None have been filled out, so no error
    } else {
      var dateArray = new Array();
      dateArray.month = $fields.filter('input[name*="[month]"]').val();
      dateArray.day = $fields.filter('input[name*="[day]"]').val();
      dateArray.year = $fields.filter('input[name*="[year]"]').val(); // correct month value

      dateArray.month -= 1; // correct year value

      if (dateArray.year.length < 4) {
        dateArray.year = parseInt(dateArray.year, 10) < 50 ? 2000 + parseInt(dateArray.year, 10) : 1900 + parseInt(dateArray.year, 10);
      }

      var testDate = new Date(dateArray.year, dateArray.month, dateArray.day);

      if (testDate.getDate() !== dateArray.day || testDate.getMonth() !== dateArray.month || testDate.getFullYear() !== dateArray.year) {
        isValid = false;
      } else {
        isValid = true;
      }
    }

    return isValid;
  }, 'Please enter a valid date'); // Validate a multifield phone number

  _utility__WEBPACK_IMPORTED_MODULE_0__["$"].validator.addMethod('mc_phone', function (phone_number, element, grouping_class) {
    var isValid = false;
    var $fields = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('input:filled:not(:hidden)', Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(element).closest(grouping_class));

    if ($fields.length === 0 && this.optional(element)) {
      isValid = true; // None have been filled out, so no error
    } else {
      phone_number = $fields.eq(0).val() + $fields.eq(1).val() + $fields.eq(2).val();
      isValid = phone_number.length === 10 && phone_number.match(/[0-9]{9}/);
    }

    return isValid;
  }, 'Please specify a valid phone number');
  _utility__WEBPACK_IMPORTED_MODULE_0__["$"].validator.addMethod('skip_or_complete_group', function (value, element, grouping_class) {
    var $fields = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('input:not(:hidden)', Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(element).closest(grouping_class)),
        $fieldsFirst = $fields.eq(0),
        validator = $fieldsFirst.data('valid_skip') ? $fieldsFirst.data('valid_skip') : _utility__WEBPACK_IMPORTED_MODULE_0__["$"].extend({}, this),
        numberFilled = $fields.filter(function () {
      return validator.elementValue(this);
    }).length,
        isValid = numberFilled === 0 || numberFilled === $fields.length; // Store the cloned validator for future validation

    $fieldsFirst.data('valid_skip', validator); // If element isn't being validated, run each field's validation rules

    if (!Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(element).data('being_validated')) {
      $fields.data('being_validated', true);
      $fields.each(function () {
        validator.element(this);
      });
      $fields.data('being_validated', false);
    }

    return isValid;
  }, _utility__WEBPACK_IMPORTED_MODULE_0__["$"].validator.format('Please supply missing fields.'));
  _utility__WEBPACK_IMPORTED_MODULE_0__["$"].validator.addMethod('skip_or_fill_minimum', function (value, element, options) {
    var $fields = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(options[1], element.form),
        $fieldsFirst = $fields.eq(0),
        validator = $fieldsFirst.data('valid_skip') ? $fieldsFirst.data('valid_skip') : _utility__WEBPACK_IMPORTED_MODULE_0__["$"].extend({}, this),
        numberFilled = $fields.filter(function () {
      return validator.elementValue(this);
    }).length,
        isValid = numberFilled === 0 || numberFilled >= options[0]; // Store the cloned validator for future validation

    $fieldsFirst.data('valid_skip', validator); // If element isn't being validated, run each skip_or_fill_minimum field's validation rules

    if (!Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(element).data('being_validated')) {
      $fields.data('being_validated', true);
      $fields.each(function () {
        validator.element(this);
      });
      $fields.data('being_validated', false);
    }

    return isValid;
  }, _utility__WEBPACK_IMPORTED_MODULE_0__["$"].validator.format('Please either skip these fields or fill at least {0} of them.'));
  _utility__WEBPACK_IMPORTED_MODULE_0__["$"].validator.addMethod('zipcodeUS', function (value, element) {
    return this.optional(element) || /^\d{5}-\d{4}$|^\d{5}$/.test(value);
  }, 'The specified US ZIP Code is invalid');
  $mchimp.each(function () {
    var $form = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);

    if (!$form.length) {
      return;
    }

    var validator = $form.validate({
      errorClass: 'nk-error',
      errorElement: 'div',
      // Grouping fields makes jQuery Validation display one error for all the fields in the group
      // It doesn't have anything to do with how the fields are validated (together or separately),
      // it's strictly for visual display of errors
      groups: function groups() {
        var groups = {};
        $form.find('.input-group').each(function () {
          var inputs = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).find('input:text:not(:hidden)'); // TODO: What about non-text inputs like number?

          if (inputs.length > 1) {
            var mergeName = inputs.first().attr('name');
            var fieldNames = _utility__WEBPACK_IMPORTED_MODULE_0__["$"].map(inputs, function (f) {
              return f.name;
            });
            groups[mergeName.substring(0, mergeName.indexOf('['))] = fieldNames.join(' ');
          }
        });
        return groups;
      },
      // Place a field's inline error HTML just before the div.input-group closing tag
      errorPlacement: function errorPlacement(error, element) {
        element.closest('.input-group').after(error);
        self.debounceResize();
      },
      // Submit the form via ajax (see: jQuery Form plugin)
      submitHandler: function submitHandler() {
        var $responseSuccess = $form.find('.nk-form-response-success');
        var $responseError = $form.find('.nk-form-response-error');
        var url = $form.attr('action');
        url = url.replace('/post?u=', '/post-json?u=');
        url += '&c=?';
        _utility__WEBPACK_IMPORTED_MODULE_0__["$"].ajax({
          dataType: 'jsonp',
          url: url,
          data: $form.serializeArray(),
          success: function success(resp) {
            $responseSuccess.hide();
            $responseError.hide(); // On successful form submission, display a success message and reset the form

            if (resp.result === 'success') {
              $responseSuccess.show().html(resp.msg);
              $form[0].reset(); // If the form has errors, display them, inline if possible, or appended to #mce-error-response
            } else {
              // Example errors - Note: You only get one back at a time even if you submit several that are bad.
              // Error structure - number indicates the index of the merge field that was invalid, then details
              // Object {result: "error", msg: "6 - Please enter the date"}
              // Object {result: "error", msg: "4 - Please enter a value"}
              // Object {result: "error", msg: "9 - Please enter a complete address"}
              // Try to parse the error into a field index and a message.
              // On failure, just put the dump thing into in the msg letiable.
              var index = -1;
              var msg;

              try {
                var parts = resp.msg.split(' - ', 2);

                if (typeof parts[1] === 'undefined') {
                  msg = resp.msg;
                } else {
                  i = parseInt(parts[0], 10);

                  if (i.toString() === parts[0]) {
                    index = parts[0];
                    msg = parts[1];
                  } else {
                    index = -1;
                    msg = resp.msg;
                  }
                }
              } catch (e) {
                index = -1;
                msg = resp.msg;
              }

              try {
                // If index is -1 if means we don't have data on specifically which field was invalid.
                // Just lump the error message into the generic response div.
                if (index === -1) {
                  $responseError.show().html(msg);
                } else {
                  var fieldName = $form.find("input[name]:eq(".concat(index, ")")).attr('name'); // Make sure this exists

                  var data = {};
                  data[fieldName] = msg;
                  validator.showErrors(data);
                }
              } catch (e) {
                $responseError.show().html(msg);
              }
            }

            self.debounceResize();
          },
          error: function error(response) {
            $responseSuccess.hide();
            $responseError.html(response.responseText).show();
            self.debounceResize();
          }
        });
      }
    });
  }); // Custom validation methods for fields with certain css classes

  _utility__WEBPACK_IMPORTED_MODULE_0__["$"].validator.addClassRules('birthday', {
    digits: true,
    mc_birthday: '.datefield'
  });
  _utility__WEBPACK_IMPORTED_MODULE_0__["$"].validator.addClassRules('datepart', {
    digits: true,
    mc_date: '.datefield'
  });
  _utility__WEBPACK_IMPORTED_MODULE_0__["$"].validator.addClassRules('phonepart', {
    digits: true,
    mc_phone: '.phonefield'
  });
}



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initTeamMembers", function() { return initTeamMembers; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Blog

-------------------------------------------------------------------*/

function initTeamMembers() {
  var $teamMembers = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-team-member'); // add hover classname

  $teamMembers.on('mouseover', '.nk-team-member-photo, .nk-team-member-info', function onTeamMembersMouseOver() {
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parents('.nk-team-member:eq(0)').addClass('hover');
  }).on('mouseleave', '.nk-team-member-photo, .nk-team-member-info', function onTeamMembersMouseLeave() {
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parents('.nk-team-member:eq(0)').removeClass('hover');
  });
}



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initAudioPlayer", function() { return initAudioPlayer; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Audio Player

-------------------------------------------------------------------*/

function initAudioPlayer() {
  if (typeof soundManager === 'undefined') {
    return;
  }

  var _self = this;

  var progressBusy = false; // busy when user drag progress bar

  /* Plain audio players */

  var $playersPlain = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-audio-plain'); // add play and pause buttons

  $playersPlain.prepend(_self.options.templates.audioPlainButton);

  function PlayersPlain($item) {
    var self = this;
    self.$item = $item;
    self.url = $item.attr('data-src');
    self.$playPauseBtn = $item.find('.nk-audio-plain-play-pause');
    self.$progress = $item.find('.nk-audio-progress-current');
    self.$timer = $item.find('.nk-audio-plain-duration');
    self.$timer.attr('data-duration', self.$timer.text());

    function onPlay() {
      $item.addClass('nk-audio-plain-playing');
    }

    function onStop() {
      self.seek(0);
      self.step();
      self.$item.removeClass('nk-audio-plain-playing');
      self.$timer.text(self.$timer.attr('data-duration'));
    }

    self.api = soundManager.createSound({
      volume: 100,
      whileplaying: function whileplaying() {
        self.step();
      },
      onplay: onPlay,
      onresume: onPlay,
      onpause: function onpause() {
        self.$item.removeClass('nk-audio-plain-playing');
        self.$timer.text(self.$timer.attr('data-duration'));
      },
      onstop: onStop,
      onfinish: onStop,
      onload: function onload(ok) {
        if (!ok && this._iO && this._iO.onerror) {
          this._iO.onerror();
        }
      }
    });
    self.$playPauseBtn.on('click', function () {
      if (!self.api.paused && self.api.playState && self.api.url) {
        self.pause();
      } else {
        self.play();
      }
    });
  }

  PlayersPlain.prototype = {
    /**
    * Play a song in the playlist.
    * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
    */
    play: function play() {
      // pause all players
      soundManager.pauseAll(); // Begin playing the sound.

      this.api.play({
        url: this.url
      });
    },

    /**
    * Pause the currently playing track.
    */
    pause: function pause() {
      // Puase the sound.
      soundManager.pauseAll();
    },

    /**
    * Seek to a new position in the currently playing track.
    * @param  {Number} per Percentage through the song to skip.
    */
    seek: function seek(per) {
      this.api.setPosition(this.api.duration * per);
    },

    /**
    * The step called within requestAnimationFrame to update the playback position.
    */
    step: function step() {
      var self = this; // Determine our current seek position.

      var seek = self.api.position || 0;
      self.progress = seek / self.api.duration;
      self.$timer[0].innerHTML = self.formatTime(Math.round(seek));

      if (!progressBusy) {
        self.$progress[0].style.width = "".concat(self.progress * 100 || 0, "%");
      }
    },

    /**
    * Format the time from seconds to M:SS.
    * @param  {Number} secs Seconds to format.
    * @return {String}      Formatted time.
    */
    formatTime: function formatTime(msec) {
      var secs = Math.round(msec / 1000) || 0;
      var minutes = Math.floor(secs / 60) || 0;
      minutes = (minutes < 10 ? '0' : 0) + minutes;
      var seconds = secs - minutes * 60;
      return "".concat(minutes, ":").concat(seconds < 10 ? '0' : '').concat(seconds);
    }
  }; // progress

  if (typeof Hammer !== 'undefined') {
    var $progresses = $playersPlain.find('.nk-audio-progress');
    $progresses.each(function eachProgress() {
      var $curProgressCont = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);
      var $curProgres = $curProgressCont.children();
      var curApi;
      var progressW;
      var progressCurW;
      var progressStart = false;
      var HammerProgress = new Hammer.Manager($curProgressCont[0]);
      HammerProgress.add(new Hammer.Pan({
        pointers: 1,
        threshold: 0
      }));
      HammerProgress.add(new Hammer.Press({
        time: 1
      }));
      HammerProgress.on('pan press pressup', function (e) {
        // start
        if (e.type === 'press' || progressStart === false) {
          progressBusy = true;
          progressW = $curProgressCont.width();
          progressStart = e.pointers[0].clientX - $curProgressCont[0].getBoundingClientRect().left;
          $curProgressCont.addClass('hover');
        } // each


        progressCurW = Math.min(1, Math.max(0, (progressStart + e.deltaX) / progressW));
        $curProgres[0].style.width = "".concat(progressCurW * 100, "%"); // end

        if (e.isFinal || e.type === 'pressup') {
          if (!curApi) {
            curApi = $curProgressCont.parents('.nk-audio-player-main, .nk-audio-plain')[0].audioAPI;
          }

          if (curApi) {
            curApi.seek(progressCurW);
          }

          $curProgressCont.removeClass('hover');
          progressBusy = false;
          progressStart = false;
        }

        e.preventDefault();
      });
    });
  }

  soundManager.onready(function () {
    if ($playersPlain.length) {
      $playersPlain.each(function eachPlayersPlain() {
        this.audioAPI = new PlayersPlain(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this));
      });
    }
  });
}



/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initFacebook", function() { return initFacebook; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Facebook

-------------------------------------------------------------------*/

function initFacebook() {
  if (!Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.fb-page').length) {
    return;
  }

  _utility__WEBPACK_IMPORTED_MODULE_0__["$body"].append('<div id="fb-root"></div>');

  (function facebookClosure(d, s, id) {
    if (window.location.protocol === 'file:') {
      return;
    }

    var fjs = d.getElementsByTagName(s)[0];

    if (d.getElementById(id)) {
      return;
    }

    var js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
}



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initInstagram", function() { return initInstagram; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Instagram

-------------------------------------------------------------------*/

function initInstagram() {
  var self = this;
  var $instagram = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-instagram');

  if (!$instagram.length || !self.options.templates.instagram) {
    return;
  }
  /**
   * Templating a instagram item using '{{ }}' braces
   * @param  {Object} data Instagram item details are passed
   * @return {String} Templated string
   */


  function templating(data, temp) {
    var tempVariables = ['link', 'image', 'caption'];

    for (var i = 0, len = tempVariables.length; i < len; i++) {
      temp = temp.replace(new RegExp("{{".concat(tempVariables[i], "}}"), 'gi'), data[tempVariables[i]]);
    }

    return temp;
  }

  $instagram.each(function eachInstagram() {
    var $this = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);
    var options = {
      userID: $this.attr('data-instagram-user-id') || null,
      count: $this.attr('data-instagram-count') || 6,
      template: $this.attr('data-instagram-template') || self.options.templates.instagram,
      quality: $this.attr('data-instagram-quality') || 'sm',
      // sm, md, lg
      loadingText: self.options.templates.instagramLoadingText,
      failText: self.options.templates.instagramFailText,
      apiPath: self.options.templates.instagramApiPath
    }; // stop if running in file protocol

    if (window.location.protocol === 'file:') {
      $this.html("<div class=\"col-12\">".concat(options.failText, "</div>")); // eslint-disable-next-line

      console.error('You should run you website on webserver with PHP to get working Instagram');
      return;
    }

    $this.html("<div class=\"col-12\">".concat(options.loadingText, "</div>")); // Fetch instagram images

    _utility__WEBPACK_IMPORTED_MODULE_0__["$"].getJSON(options.apiPath, {
      userID: options.userID,
      count: options.count
    }, function (response) {
      $this.html('');

      for (var i = 0; i < options.count; i++) {
        var instaItem = false;

        if (response[i]) {
          instaItem = response[i];
        } else if (response.statuses && response.statuses[i]) {
          instaItem = response.statuses[i];
        } else {
          break;
        }

        var resolution = 'thumbnail';

        if (options.quality === 'md') {
          resolution = 'low_resolution';
        }

        if (options.quality === 'lg') {
          resolution = 'standard_resolution';
        }

        var tempData = {
          link: instaItem.link,
          image: instaItem.images[resolution].url,
          caption: instaItem.caption
        };
        $this.append(templating(tempData, options.template));
      }
    }).fail(function (a) {
      $this.html("<div class=\"col-12\">".concat(options.failText, "</div>"));
      _utility__WEBPACK_IMPORTED_MODULE_0__["$"].error(a.responseText);
    });
  });
}



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initTwitter", function() { return initTwitter; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Twitter

-------------------------------------------------------------------*/

function initTwitter() {
  var self = this;
  var $twtFeeds = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-twitter-list');

  if (!$twtFeeds.length || !self.options.templates.twitter) {
    return;
  }
  /**
   * Templating a tweet using '{{ }}' braces
   * @param  {Object} data Tweet details are passed
   * @return {String}      Templated string
   */


  function templating(data, temp) {
    var tempVariables = ['date', 'tweet', 'avatar', 'url', 'retweeted', 'screen_name', 'user_name'];

    for (var i = 0, len = tempVariables.length; i < len; i++) {
      temp = temp.replace(new RegExp("{{".concat(tempVariables[i], "}}"), 'gi'), data[tempVariables[i]]);
    }

    return temp;
  }

  $twtFeeds.each(function eachTwitterFeed() {
    var $this = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);
    var options = {
      username: $this.attr('data-twitter-user-name') || null,
      list: null,
      hashtag: $this.attr('data-twitter-hashtag') || null,
      count: $this.attr('data-twitter-count') || 2,
      hideReplies: $this.attr('data-twitter-hide-replies') === 'true',
      template: $this.attr('data-twitter-template') || self.options.templates.twitter,
      loadingText: self.options.templates.twitterLoadingText,
      failText: self.options.templates.twitterFailText,
      apiPath: self.options.templates.twitterApiPath
    }; // stop if running in file protocol

    if (window.location.protocol === 'file:') {
      $this.html(options.failText); // eslint-disable-next-line

      console.error('You should run you website on webserver with PHP to get working Twitter');
      return;
    } // Set loading


    $this.html("<span>".concat(options.loadingText, "</span>")); // Fetch tweets

    _utility__WEBPACK_IMPORTED_MODULE_0__["$"].getJSON(options.apiPath, {
      username: options.username,
      list: options.list,
      hashtag: options.hashtag,
      count: options.count,
      exclude_replies: options.hideReplies
    }, function (twt) {
      $this.html('');

      for (var i = 0; i < options.count; i++) {
        var tweet = false;

        if (twt[i]) {
          tweet = twt[i];
        } else if (twt.statuses && twt.statuses[i]) {
          tweet = twt.statuses[i];
        } else {
          break;
        }

        var tempData = {
          user_name: tweet.user.name,
          date: tweet.date_formatted,
          tweet: tweet.text_entitled,
          avatar: "<img src=\"".concat(tweet.user.profile_image_url, "\" />"),
          url: "https://twitter.com/".concat(tweet.user.screen_name, "/status/").concat(tweet.id_str),
          retweeted: tweet.retweeted,
          screen_name: "@".concat(tweet.user.screen_name)
        };
        $this.append(templating(tempData, options.template));
      }
    }).fail(function (a) {
      $this.html(options.failText);
      _utility__WEBPACK_IMPORTED_MODULE_0__["$"].error(a.responseText);
    });
  });
}



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initCookieAlert", function() { return initCookieAlert; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Cookie Alert

-------------------------------------------------------------------*/





/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPluginObjectFitImages", function() { return initPluginObjectFitImages; });
/* Object Fit Images */
function initPluginObjectFitImages() {
  if (typeof objectFitImages !== 'undefined') {
    objectFitImages();
  }
}



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPluginStickySidebar", function() { return initPluginStickySidebar; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Plugin Sticky Sidebar

-------------------------------------------------------------------*/

function initPluginStickySidebar() {
  if (typeof _utility__WEBPACK_IMPORTED_MODULE_0__["$"].fn.stick_in_parent === 'undefined') {
    return;
  }

  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-sidebar-sticky').each(function eachStickySidebar() {
    var $this = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);
    var $parent = $this.parent();
    $parent.addClass('nk-sidebar-sticky-parent');
    $this.wrapInner('<div>').children().stick_in_parent({
      parent: $parent,
      recalc_every: 50,
      offset_top: parseInt($this.attr('data-offset-top'), 10) || 50,
      // fixed ADS reloading issue https://github.com/leafo/sticky-kit/issues/45
      spacer: false
    }) // we need to set min height on parent block (in theme it is equal height column) to prevent sidebar content jumping
    .on('sticky_kit:unbottom sticky_kit:stick sticky_kit:bottom', function onStick() {
      $parent.css('min-height', Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).height());
    }).on('sticky_kit:unstick', function () {
      $parent.css('min-height', '');
    });
  });
}



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPluginFastClick", function() { return initPluginFastClick; });
/* FastClick */
function initPluginFastClick() {
  if (typeof FastClick !== 'undefined') {
    FastClick.attach(document.body);
  }
}



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPluginNano", function() { return initPluginNano; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/* Nano Scroller */

function initPluginNano($context) {
  if (typeof _utility__WEBPACK_IMPORTED_MODULE_0__["$"].fn.nanoScroller !== 'undefined') {
    ($context || _utility__WEBPACK_IMPORTED_MODULE_0__["$doc"]).find('.nano').nanoScroller();
  }
}



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPluginJarallax", function() { return initPluginJarallax; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/* Jarallax */

function initPluginJarallax() {
  if (typeof _utility__WEBPACK_IMPORTED_MODULE_0__["$"].fn.jarallax === 'undefined') {
    return;
  }

  var self = this; // video backgrounds

  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.bg-video[data-video]').each(function () {
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-jarallax-video', Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-video'));
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).removeAttr('data-video');
  }); // header parallax

  var $parallaxHeader = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-header-title-parallax').eq(0);

  if ($parallaxHeader.length) {
    var $headerImageOrVideo = $parallaxHeader.find('> .bg-image, > .bg-video').eq(0);
    var $headerContent = $headerImageOrVideo.find('~ *');
    var options = {
      speed: self.options.parallaxSpeed
    };
    $headerImageOrVideo.addClass('bg-image-parallax');

    if ($parallaxHeader.hasClass('nk-header-title-parallax-opacity')) {
      $headerImageOrVideo.attr('data-type', 'scroll-opacity');
    }

    options.onScroll = function (calc) {
      var scrollContent = Math.min(50, 50 * (1 - calc.visiblePercent)); // fix if top banner not on top

      if (calc.beforeTop > 0) {
        scrollContent = 0;
      }

      $headerContent.css({
        opacity: calc.visiblePercent < 0 || calc.beforeTop > 0 ? 1 : calc.visiblePercent,
        transform: "translateY(".concat(scrollContent, "px) translateZ(0)")
      });
    };

    $headerImageOrVideo.jarallax(options);
  } // footer parallax


  var $parallaxFooter = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-footer-parallax, .nk-footer-parallax-opacity').eq(0);

  if ($parallaxFooter.length) {
    var $footerImage = $parallaxFooter.find('> .bg-image > div');
    var $footerContent = $parallaxFooter.find('> .bg-image ~ *');
    var footerParallaxScroll = $parallaxFooter.hasClass('nk-footer-parallax');
    var footerParallaxOpacity = $parallaxFooter.hasClass('nk-footer-parallax-opacity');
    $parallaxFooter.jarallax({
      type: 'custom',
      imgSrc: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      imgWidth: 1,
      imgHeight: 1,
      onScroll: function onScroll(calc) {
        var scrollImg = -Math.min(100, 100 * (1 - calc.visiblePercent));
        var scrollInfo = -Math.min(50, 50 * (1 - calc.visiblePercent));

        if (footerParallaxScroll) {
          $footerImage.css({
            transform: "translateY(".concat(scrollImg, "px) translateZ(0)")
          });
          $footerContent.css({
            transform: "translateY(".concat(scrollInfo, "px) translateZ(0)")
          });
        }

        if (footerParallaxOpacity) {
          $footerContent.css({
            opacity: calc.visiblePercent < 0 ? 1 : calc.visiblePercent
          });
        }
      }
    });
  } // primary parallax


  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.bg-image-parallax, .bg-video-parallax').jarallax({
    speed: self.options.parallaxSpeed
  }); // video without parallax

  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.bg-video:not(.bg-video-parallax)').jarallax({
    speed: 1
  });
}



/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPluginFlickity", function() { return initPluginFlickity; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/* Flickity */

function initPluginFlickity() {
  if (typeof window.Flickity === 'undefined') {
    return;
  }

  var self = this;

  function addDefaultArrows($carousel) {
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('<div class="nk-flickity-arrow nk-flickity-arrow-prev"><span class="nk-icon-arrow-left"></span></div>').on('click', function () {
      $carousel.flickity('previous');
    }).appendTo($carousel);
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('<div class="nk-flickity-arrow nk-flickity-arrow-next"><span class="nk-icon-arrow-right"></span></div>').on('click', function () {
      $carousel.flickity('next');
    }).appendTo($carousel);
  }

  function updateCustomArrows($carousel) {
    var data = $carousel.children('.nk-carousel-inner').data('flickity');
    var currIndex = data.selectedIndex;
    var nextIndex;
    var prevIndex; // get next and prev cells

    if (currIndex === 0) {
      nextIndex = 1;
      prevIndex = data.cells.length - 1;
    } else if (currIndex === data.cells.length - 1) {
      nextIndex = 0;
      prevIndex = data.cells.length - 2;
    } else {
      nextIndex = currIndex + 1;
      prevIndex = currIndex - 1;
    }

    var $nextCell = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(data.cells[nextIndex].element);
    var $prevCell = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(data.cells[prevIndex].element);
    var $currCell = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(data.cells[currIndex].element); // get name and sources

    var nextName = $nextCell.find('.nk-carousel-item-name').text();
    var prevName = $prevCell.find('.nk-carousel-item-name').text();
    var currName = $currCell.find('.nk-carousel-item-name').html();
    var currLinks = $currCell.find('.nk-carousel-item-links').html(); // add info to buttons

    $carousel.find('.nk-carousel-next > .nk-carousel-arrow-name').html(nextName);
    $carousel.find('.nk-carousel-prev > .nk-carousel-arrow-name').html(prevName);
    $carousel.find('.nk-carousel-current > .nk-carousel-name').html(currName);
    $carousel.find('.nk-carousel-current > .nk-carousel-links').html(currLinks);
  } // prevent click event fire when drag carousel


  function noClickEventOnDrag($carousel) {
    $carousel.on('dragStart.flickity', function carouselOnDragStart() {
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).find('.flickity-viewport').addClass('is-dragging');
    });
    $carousel.on('dragEnd.flickity', function carouselOnDragEnd() {
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).find('.flickity-viewport').removeClass('is-dragging');
    });
  } // carousel 1


  var $carousel1 = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-carousel');

  if ($carousel1.length) {
    $carousel1.children('.nk-carousel-inner').each(function eachCarousel1() {
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).flickity({
        pageDots: Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent().attr('data-dots') === 'true' || false,
        autoPlay: parseFloat(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent().attr('data-autoplay')) || false,
        prevNextButtons: false,
        wrapAround: true,
        cellAlign: Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent().attr('data-cell-align') || 'center'
      });

      if (Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent().attr('data-arrows') === 'true') {
        addDefaultArrows(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this));
      }

      updateCustomArrows(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent());
    }).on('select.flickity', function carousel1OnSelect() {
      updateCustomArrows(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent());
    });
    $carousel1.on('click', '.nk-carousel-next', function carousel1NextOnClick() {
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent().children('.nk-carousel-inner').flickity('next');
    });
    $carousel1.on('click', '.nk-carousel-prev', function carousel1PrevOnClick() {
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent().children('.nk-carousel-inner').flickity('previous');
    });
    noClickEventOnDrag($carousel1.children('.nk-carousel-inner'));
  } // carousel 2


  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-carousel-2 > .nk-carousel-inner').each(function eachCarousel2() {
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).flickity({
      pageDots: Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent().attr('data-dots') === 'true' || false,
      autoPlay: parseFloat(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent().attr('data-autoplay')) || false,
      prevNextButtons: false,
      wrapAround: true,
      cellAlign: Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent().attr('data-cell-align') || 'center'
    });

    if (Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent().attr('data-arrows') === 'true') {
      addDefaultArrows(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this));
    }

    noClickEventOnDrag(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this));
  }); // carousel 3

  var $carousel3 = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-carousel-3'); // set height for items

  function setHeightCarousel3() {
    $carousel3.each(function eachCarousel3() {
      var $allImages = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).find('img');
      var size = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-size') || 0.8;
      var resultH = _utility__WEBPACK_IMPORTED_MODULE_0__["wndH"] * size;
      var maxItemW = Math.min(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent().width(), _utility__WEBPACK_IMPORTED_MODULE_0__["wndW"]) * size;
      $allImages.each(function eachCarousel3Images() {
        if (this.naturalWidth && this.naturalHeight && resultH * this.naturalWidth / this.naturalHeight > maxItemW) {
          resultH = maxItemW * this.naturalHeight / this.naturalWidth;
        }
      });
      $allImages.css('height', resultH);
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).children('.nk-carousel-inner').flickity('reposition');
    });
  }

  if ($carousel3.length) {
    $carousel3.children('.nk-carousel-inner').each(function eachCarousel3() {
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).flickity({
        pageDots: Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent().attr('data-dots') === 'true' || false,
        autoPlay: parseFloat(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent().attr('data-autoplay')) || false,
        prevNextButtons: false,
        wrapAround: true,
        cellAlign: Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent().attr('data-cell-align') || 'center'
      });
      updateCustomArrows(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent());

      if (Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent().attr('data-arrows') === 'true') {
        addDefaultArrows(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this));
      }
    }).on('select.flickity', function carousel3OnSelect() {
      updateCustomArrows(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parent());
    });
    $carousel3.on('click', '.nk-carousel-next', function carousel3OnNextClick() {
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parents('.nk-carousel-3:eq(0)').children('.nk-carousel-inner').flickity('next');
    });
    $carousel3.on('click', '.nk-carousel-prev', function carousel3OnPrevClick() {
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).parents('.nk-carousel-3:eq(0)').children('.nk-carousel-inner').flickity('previous');
    });
    setHeightCarousel3();
    self.debounceResize(setHeightCarousel3);
    noClickEventOnDrag($carousel3.children('.nk-carousel-inner'));
  } // update products carousel


  var $storeCarousel = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-carousel-1, .nk-carousel-2, .nk-carousel-3').filter('.nk-store');

  function updateStoreProducts() {
    $storeCarousel.each(function eachStoreCarousel() {
      var currentTallest = 0;
      var currentRowStart = 0;
      var rowDivs = [];
      var topPosition = 0;
      var currentDiv = 0;
      var $el;
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).find('.nk-product').each(function eachProduct() {
        $el = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);
        $el.css('height', '');
        topPosition = $el.position().top;

        if (currentRowStart !== topPosition) {
          for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
            rowDivs[currentDiv].css('height', currentTallest);
          }

          rowDivs.length = 0; // empty the array

          currentRowStart = topPosition;
          currentTallest = $el.innerHeight();
          rowDivs.push($el);
        } else {
          rowDivs.push($el);
          currentTallest = currentTallest < $el.innerHeight() ? $el.innerHeight() : currentTallest;
        }

        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
          rowDivs[currentDiv].css('height', currentTallest);
        }
      });
    });
  }

  if ($storeCarousel.length) {
    self.debounceResize(updateStoreProducts);
    updateStoreProducts();
  } // check for images loaded and call resize


  if (typeof _utility__WEBPACK_IMPORTED_MODULE_0__["$"].fn.imagesLoaded !== 'undefined') {
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-carousel, .nk-carousel-1, .nk-carousel-2, .nk-carousel-3').each(function eachCarousel() {
      if (Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).find('img').length) {
        Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).imagesLoaded({}, function () {
          self.debounceResize();
        });
      }
    });
  }
}



/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPluginIsotope", function() { return initPluginIsotope; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/* Isotope */

function initPluginIsotope() {
  if (typeof window.Isotope === 'undefined') {
    return;
  }

  var self = this;
  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-isotope').each(function eachIsotope() {
    var $grid = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).isotope({
      itemSelector: '.nk-isotope-item'
    });

    if (typeof _utility__WEBPACK_IMPORTED_MODULE_0__["$"].fn.imagesLoaded !== 'undefined') {
      $grid.imagesLoaded().progress(function () {
        $grid.isotope('layout');
      });
    }

    $grid.on('arrangeComplete', function () {
      self.debounceResize();
    }); // filter

    var $filter = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).prev('.nk-isotope-filter');

    if ($filter.length) {
      $filter.on('click', '[data-filter]', function isotopeFilterOnClick(e) {
        e.preventDefault();
        var filter = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-filter');
        Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).addClass('active').siblings().removeClass('active');
        $grid.isotope({
          filter: filter === '*' ? '' : "[data-filter*=".concat(filter, "]")
        });
      });
    }
  });
}



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPluginPhotoswipe", function() { return initPluginPhotoswipe; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/* PhotoSwipe */

function initPluginPhotoswipe() {
  var $gallery = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-popup-gallery');

  if (typeof PhotoSwipe === 'undefined' || !$gallery.length) {
    return;
  } // prepare photoswipe markup


  var markup = "<div id=\"gallery\" class=\"pswp\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n          <div class=\"pswp__bg\"></div>\n          <div class=\"pswp__scroll-wrap\">\n            <div class=\"pswp__container\">\n              <div class=\"pswp__item\"></div>\n              <div class=\"pswp__item\"></div>\n              <div class=\"pswp__item\"></div>\n            </div>\n            <div class=\"pswp__ui pswp__ui--hidden\">\n              <div class=\"pswp__top-bar\">\n                <div class=\"pswp__counter\"></div>\n                <button class=\"pswp__button pswp__button--close\" title=\"Close (Esc)\"></button>\n                <button class=\"pswp__button pswp__button--zoom\" title=\"Zoom in/out\"></button>\n                <div class=\"pswp__preloader\">\n                  <div class=\"pswp__preloader__icn\">\n                    <div class=\"pswp__preloader__cut\">\n                      <div class=\"pswp__preloader__donut\"></div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"pswp__loading-indicator\"><div class=\"pswp__loading-indicator__line\"></div></div>\n              <button class=\"pswp__button pswp__button--arrow--left\" title=\"Previous (arrow left)\"></button>\n              <button class=\"pswp__button pswp__button--arrow--right\" title=\"Next (arrow right)\"></button>\n              <div class=\"pswp__caption\">\n                <div class=\"pswp__caption__center\">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>";
  _utility__WEBPACK_IMPORTED_MODULE_0__["$body"].append(markup); // init code

  function parseThumbnailElements(el) {
    var thumbElements = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(el).find('a.nk-gallery-item');
    var items = [];
    var childElements;
    var descrElement;
    var size;
    var item;
    thumbElements.each(function eachThumbs() {
      childElements = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).find('img');
      descrElement = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).next('.photoswipe-description');
      size = (this.getAttribute('data-size') || '1920x1080').split('x'); // create slide object

      item = {
        src: this.getAttribute('href'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10),
        author: this.getAttribute('data-author')
      };

      if (childElements.length > 0) {
        // thumbnail url
        item.msrc = childElements[0].getAttribute('src');

        if (descrElement.length) {
          item.title = descrElement.html();
        }
      }

      var mediumSrc = this.getAttribute('data-med') || item.src;

      if (mediumSrc) {
        size = (this.getAttribute('data-med-size') || this.getAttribute('data-size') || '1920x1080').split('x'); // "medium-sized" image

        item.m = {
          src: mediumSrc,
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10)
        };
      } // original image


      item.o = {
        src: item.src,
        w: item.w,
        h: item.h
      };
      items.push(item);
    });
    return items;
  }

  function openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
    var pswpElement = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.pswp')[0];
    var items = parseThumbnailElements(galleryElement); // define options (if needed)

    var options = {
      captionAndToolbarShowEmptyCaptions: false,
      mainClass: 'pswp--minimal--dark',
      barsSize: {
        top: 0,
        bottom: 0
      },
      captionEl: true,
      fullscreenEl: false,
      shareEl: false,
      bgOpacity: 0.85,
      tapToClose: true,
      tapToToggleControls: false,
      showHideOpacity: true,
      // Function builds caption markup
      addCaptionHTMLFn: function addCaptionHTMLFn(item, captionEl) {
        // item      - slide object
        // captionEl - caption DOM element
        // isFake    - true when content is added to fake caption container
        //             (used to get size of next or previous caption)
        if (!item.title && !item.author) {
          captionEl.children[0].innerHTML = '';
          return false;
        }

        var caption = '';

        if (item.title) {
          caption += item.title;
        }

        if (item.author) {
          if (item.title) {
            caption += '<br>';
          }

          caption += "<small>".concat(item.author, "</small>");
        }

        captionEl.children[0].innerHTML = caption;
        return true;
      },
      galleryUID: galleryElement.getAttribute('data-pswp-uid')
    };

    if (fromURL) {
      if (options.galleryPIDs) {
        // parse real index when custom PIDs are used
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid === index) {
            options.index = j;
            break;
          }
        }
      } else {
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    } // exit if index not found


    if (Number.isNaN(options.index)) {
      return;
    }

    if (disableAnimation) {
      options.showAnimationDuration = 0;
    } // Pass data to PhotoSwipe and initialize it


    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options); // see: http://photoswipe.com/documentation/responsive-images.html

    var realViewportWidth;
    var useLargeImages = false;
    var firstResize = true;
    var imageSrcWillChange;
    gallery.listen('beforeResize', function () {
      var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
      dpiRatio = Math.min(dpiRatio, 2.5);
      realViewportWidth = gallery.viewportSize.x * dpiRatio;

      if (realViewportWidth >= 1200 || !gallery.likelyTouchDevice && realViewportWidth > 800 || _utility__WEBPACK_IMPORTED_MODULE_0__["wndW"] > 1200) {
        if (!useLargeImages) {
          useLargeImages = true;
          imageSrcWillChange = true;
        }
      } else if (useLargeImages) {
        useLargeImages = false;
        imageSrcWillChange = true;
      }

      if (imageSrcWillChange && !firstResize) {
        gallery.invalidateCurrItems();
      }

      if (firstResize) {
        firstResize = false;
      }

      imageSrcWillChange = false;
    });
    gallery.listen('gettingData', function (idx, item) {
      if (useLargeImages) {
        item.src = item.o.src;
        item.w = item.o.w;
        item.h = item.o.h;
      } else {
        item.src = item.m.src;
        item.w = item.m.w;
        item.h = item.m.h;
      }
    });
    gallery.init();
  }

  function photoswipeParseHash() {
    var hash = window.location.hash.substring(1);
    var params = {};

    if (hash.length < 5) {
      // pid=1
      return params;
    }

    var vars = hash.split('&');

    for (var _i = 0; _i < vars.length; _i++) {
      if (!vars[_i]) {
        continue;
      }

      var pair = vars[_i].split('=');

      if (pair.length < 2) {
        continue;
      }

      params[pair[0]] = pair[1];
    }

    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }

    return params;
  } // select all gallery elements


  var i = 0;
  $gallery.each(function eachGallery() {
    var $thisGallery = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);
    $thisGallery.attr('data-pswp-uid', i + 1);
    $thisGallery.on('click', 'a.nk-gallery-item', function onGalleryItemClick(e) {
      e.preventDefault();
      var index = 0;
      var clicked = this;
      $thisGallery.find('a.nk-gallery-item').each(function eachGalleryItem(idx) {
        if (this === clicked) {
          index = idx;
          return false;
        }

        return true;
      });
      openPhotoSwipe(index, $thisGallery[0]);
    });
    i++;
  }); // Parse URL and open gallery if it contains #&pid=3&gid=1

  var hashData = photoswipeParseHash();

  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, $gallery.get(hashData.gid - 1), true, true);
  }
}



/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPluginTabs", function() { return initPluginTabs; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/* Bootstrap Tabs */

function initPluginTabs() {
  var self = this;
  _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].on('shown.bs.tab', function () {
    self.debounceResize();
  });
}



/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPluginAccordions", function() { return initPluginAccordions; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/* Bootstrap Accordions */

function initPluginAccordions() {
  var self = this;
  _utility__WEBPACK_IMPORTED_MODULE_0__["$wnd"].on('shown.bs.collapse', function () {
    self.debounceResize();
  });
}



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPluginCountdown", function() { return initPluginCountdown; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/* Countdown */

function initPluginCountdown() {
  if (typeof _utility__WEBPACK_IMPORTED_MODULE_0__["$"].fn.countdown === 'undefined' || typeof moment === 'undefined' || typeof moment.tz === 'undefined') {
    return;
  }

  var self = this;
  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-countdown').each(function eachCountdown() {
    var tz = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-timezone');
    var end = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).attr('data-end');
    end = moment.tz(end, tz).toDate();
    Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).countdown(end, function onCountdownTick(event) {
      Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).html(event.strftime(self.options.templates.countdown));
    });
  });
}



/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPluginTypedjs", function() { return initPluginTypedjs; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/* Typed.js */

function initPluginTypedjs() {
  if (typeof Typed === 'undefined') {
    return;
  }

  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-typed').each(function eachTyped() {
    var $this = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this);
    var strings = [];
    $this.children('span').each(function eachTypedChild() {
      strings.push(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])(this).html());
    });

    if (!strings.length) {
      return;
    }

    $this.html('');
    var loop = $this.attr('data-loop') ? $this.attr('data-loop') === 'true' : true;
    var shuffle = $this.attr('data-shuffle') ? $this.attr('data-shuffle') === 'true' : false;
    var typeSpeed = $this.attr('data-type-speed') ? parseInt($this.attr('data-type-speed'), 10) : 30;
    var startDelay = $this.attr('data-start-delay') ? parseInt($this.attr('data-start-delay'), 10) : 0;
    var backSpeed = $this.attr('data-back-speed') ? parseInt($this.attr('data-back-speed'), 10) : 10;
    var backDelay = $this.attr('data-back-delay') ? parseInt($this.attr('data-back-delay'), 10) : 1000;
    var cursor = $this.attr('data-cursor');

    if (!cursor) {
      cursor = '|';
    } else if (cursor === 'false') {
      cursor = false;
    } // eslint-disable-next-line


    new Typed(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('<span>').appendTo($this)[0], {
      strings: strings,
      typeSpeed: typeSpeed,
      startDelay: startDelay,
      backSpeed: backSpeed,
      backDelay: backDelay,
      shuffle: shuffle,
      loop: loop,
      loopCount: false,
      showCursor: !!cursor,
      cursorChar: cursor
    }); // typed js used timeout from startDelay option

    setTimeout(function () {
      $this.addClass('ready');
    }, 0);
  });
}



/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPluginSummernote", function() { return initPluginSummernote; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/*------------------------------------------------------------------

  Init Blog

-------------------------------------------------------------------*/

function initPluginSummernote() {
  if (typeof _utility__WEBPACK_IMPORTED_MODULE_0__["$"].fn.summernote === 'undefined') {
    return;
  }

  var $summernote = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.nk-summernote');

  if (!$summernote.length) {
    return;
  } // insert block in body to style bootstrap modal


  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('body').append('<div class="nk-summernote-modal-style">');
  $summernote.summernote({
    height: 300,
    dialogsInBody: true,
    toolbar: [// [groupName, [list of button]]
    ['style', ['bold', 'italic', 'underline']], ['fontsize', ['fontsize']], ['color', ['color']], ['insert', ['link', 'picture', 'video']], ['para', ['ul', 'ol', 'paragraph']], ['height', ['height']], ['misc', ['codeview']]]
  }); // fix after load popovers are visible

  Object(_utility__WEBPACK_IMPORTED_MODULE_0__["$"])('.note-popover').hide();
}



/***/ })
/******/ ]);