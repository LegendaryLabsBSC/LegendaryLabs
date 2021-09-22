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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _parts_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


if (typeof Godlike !== 'undefined') {
  Godlike.setOptions(_parts_options__WEBPACK_IMPORTED_MODULE_0__["options"]);
  Godlike.init();
}

/***/ }),
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
    cookieAlert: "<span class=\"nk-cookie-alert-close\"><span class=\"nk-icon-close\"></span></span>\n            Cookie alert are ready to use. You can simply change content inside this alert or disable it in javascript theme options. <a href=\"#\">Cookies policy</a>.\n            <div class=\"nk-gap\"></div>\n            <span class=\"nk-cookie-alert-confirm nk-btn link-effect-4 nk-btn-bg-white nk-btn-color-dark-1\">Confirm</span>",
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


/***/ })
/******/ ]);