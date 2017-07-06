/*
 * @package      HeaderResponsive
 * @description  Module help you make header responsive
 *
 */
var headerResponsive = (function () {
  'use strict';
  let DOM = {};
  let DATA = {};

  function DOMcash() {
    DOM.$trigerWatcher = $('#header');
    DOM.$responsiveWraper = $('.responsive-wrapper');
    DOM.$responsiveElement = $('.responsive-elements');
    DOM.$responsiveElement2 = $('.responsive-elements-2');
  }

  function DATAcash() {
    DATA.production = true;
    DATA.desktopBreakpoint = 992;
    DATA.mobileBreakpoint = 991;
    DATA.dontMoveElClass = 'dont-move';
  }

  function triggerResizeWatcher(type) {
    type === 'mobile' ? DOM.$trigerWatcher.addClass('responsive') : DOM.$trigerWatcher.removeClass('responsive');
  }

  function isMobile() {
    return DOM.$trigerWatcher.hasClass('responsive') ? true : false;
  }

  function setDetectClassToChild() {
    DOM.$responsiveElement.find('> *').not('.' + DATA.dontMoveElClass).addClass('responsive-elements-child');
    DOM.$responsiveElement2.find('> *').not('.' + DATA.dontMoveElClass).addClass('responsive-elements-2-child');
  }

  function toggleElementsToConfigWrapper() {
    $('.config-wrap').prepend('<span class="current"></span>').removeClass('row');
  }

  function desktopResize() {
    $('.responsive-elements-child').prependTo(DOM.$responsiveElement);
    $('.responsive-elements-2-child').prependTo(DOM.$responsiveElement2);
    triggerResizeWatcher('desktop');
  }

  function mobileResize() {
    $('.responsive-elements-child').prependTo(DOM.$responsiveWraper);
    $('.responsive-elements-2-child').prependTo(DOM.$responsiveWraper);
    triggerResizeWatcher('mobile');
  }

  function helperLoger() {
    if (!DATA.production) {
      console.log(isMobile());
    }
  }

  function mainLogic() {
    toggleElementsToConfigWrapper();
    if ($(window).width() <= DATA.mobileBreakpoint) {
      triggerResizeWatcher('mobile');
      mobileResize();
    }
    $(window).on('resize.headerResponsive', function () {
      helperLoger();
      if ($(window).width() <= DATA.mobileBreakpoint && !isMobile()) {
        mobileResize();
      } else if ($(window).width() >= DATA.desktopBreakpoint && isMobile()) {
        desktopResize();
      }
    });
  }

  function init() {
    DOMcash();
    DATAcash();
    setDetectClassToChild();
    mainLogic();
  }

  return {
    init: init
  }
})();