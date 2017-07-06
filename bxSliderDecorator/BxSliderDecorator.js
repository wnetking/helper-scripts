/*
 * @constructor  BxSliderDecorator
 * @description  Decorators can simplify routine, repetitive tasks such us reload slider
 *               on different breakpoints.
 *
 * @param {object} userConfig, custom configuration for slider
 * @return {object} object with 2 methods (init, destroy).
 */
;function BxSliderDecorator(userConfig) {
  'use strict';
  // default bxSlider settings
  let settings = {
      mode: "horizontal",
      slideSelector: "",
      infiniteLoop: !0,
      hideControlOnEnd: !0,
      speed: 500,
      easing: null,
      slideMargin: 20,
      startSlide: 0,
      randomStart: !1,
      captions: !1,
      ticker: !1,
      tickerHover: !1,
      adaptiveHeight: !1,
      adaptiveHeightSpeed: 500,
      video: !1,
      useCSS: !0,
      preloadImages: "visible",
      responsive: !0,
      slideZIndex: 50,
      touchEnabled: !0,
      swipeThreshold: 50,
      oneToOneTouch: !0,
      preventDefaultSwipeX: !0,
      preventDefaultSwipeY: !1,
      pager: !1,
      pagerType: "full",
      pagerShortSeparator: " / ",
      pagerSelector: null,
      buildPager: null,
      pagerCustom: null,
      controls: !0,
      nextText: "Next",
      prevText: "Prev",
      nextSelector: null,
      prevSelector: null,
      autoControls: !1,
      startText: "Start",
      stopText: "Stop",
      autoControlsCombine: !1,
      autoControlsSelector: null,
      auto: !1,
      pause: 4e3,
      autoStart: !0,
      autoDirection: "next",
      autoHover: !1,
      autoDelay: 0,
      minSlides: 1,
      maxSlides: 1,
      moveSlides: 0,
      slideWidth: 500,
      onSliderLoad: function () {
      },
      onSlideBefore: function () {
      },
      onSlideAfter: function () {
        lazyProductListImageInit.revalidate();
      },
      onSlideNext: function () {
      },
      onSlidePrev: function () {
      },
      onSliderResize: function () {
      }
    },
  // decorator custom settings
    decoratorSettings = {
      wrap: $('.bx-slider'),
      triggerElement: $(window),
      scrollNameSpace: 'bxSlider',
      responsive: [
        {breakpoint: 320, slidesToShow: 1},
        {breakpoint: 480, slidesToShow: 2}
      ]
    }, slider,
    oldSlidesToShow;

  const config = $.extend({}, $.extend({}, settings, decoratorSettings), userConfig);


  function setCarousel(itemsToShow) {
    devLog('setCarousel', config.wrap.selector);

    if (config.wrap.length && !!$.prototype.bxSlider) {
      slider = config.wrap.bxSlider($.extend({}, config, {
        minSlides: itemsToShow,
        maxSlides: itemsToShow
      }));
    }
  }

  function resetCarousel(itemsToShow) {
    devLog('resetCarousel', slider.selector);

    slider.reloadSlider($.extend({}, config, {
      minSlides: itemsToShow,
      maxSlides: itemsToShow
    }));
  }

  function devLog(type, message) {
    let devMode = false;
    if (devMode) {
      console.log(type, message);
    }
  }

  function countItems($triggerElement) {
    var count = 1;
    config.responsive.forEach(function (item) {
      if ($triggerElement.width() >= item.breakpoint) count = item.slidesToShow;
    });
    return count;
  }

  function timeOut(f, arg, time) {
    var orientation_time;
    clearTimeout(orientation_time);
    orientation_time = setTimeout(function () {
      f(arg);
    }, time);
  }

  function resizeEvent() {
    $(window).on('resize.' + config.scrollNameSpace, function () {
      if (config.wrap.length && oldSlidesToShow !== countItems(config.triggerElement)) {
        oldSlidesToShow = countItems(config.triggerElement);
        timeOut(resetCarousel, countItems(config.triggerElement), 200);
      }
    });
    if (isMobile) {
      $(window).on("orientationchange", function () {
        if (config.wrap.length && oldSlidesToShow !== countItems(config.triggerElement)) {
          oldSlidesToShow = countItems(config.triggerElement);
          timeOut(resetCarousel, countItems(config.triggerElement), 500);
        }
      });
    }
  }

  BxSliderDecorator.prototype.destroy = function () {
    slider.destroySlider();
  }

  BxSliderDecorator.prototype.init = function () {
    try {
      oldSlidesToShow = countItems(config.triggerElement);
      setCarousel(countItems(config.triggerElement));
      resizeEvent();
    } catch (e) {
      console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack)
    }
  }
}