"use strict";

!function ($) {
  'use strict'; //------NAVopen------

  $('.nav').click(function () {
    $('.menu').toggleClass('menu--active');
    $('.nav').toggleClass('nav--active');
    $('.aside').toggleClass('aside--active');
  }); //------decounce------
  // func為我們要操作的函數,wait為延遲時間,immediate為第一次是否要立即執行

  function debounce(func) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
    var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var timeout;
    return function () {
      var context = this,
          // 能獲取所有參數並以陣列型式返回
      args = arguments;

      var later = function later() {
        timeout = null; // apply與call功能一樣差別在於傳遞參數方式

        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  } //------decounce------


  function throttle(func, threshhold) {
    var last, timer;
    if (threshhold) threshhold = 250;
    return function () {
      var context = this;
      var args = arguments;
      var now = +new Date();

      if (last && now < last + threshhold) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          last = now;
          func.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  } //------PcHorizontalScroll------
  // var addPPP = _.throttle(function () { 
  //   if(persent>0){
  //     persent-=1;
  //     $('.content>section').attr('style',"transform:translateX(-"+persent+"%);");
  //     console.log('Add');
  //   } 
  // }, 20); 
  // var countPPP = _.throttle(function () { 
  //   if(persent<66){
  //     persent+=1;
  //     $('.content>section').attr('style',"transform:translateX( calc( -"+persent+"%  ) );");
  //   }
  // }, 20); 
  // let persent = 0;
  //   $(window).bind('mousewheel', function(e){
  //     let scrollLeft = $('.content>section').css('transform');
  //       if(e.originalEvent.wheelDelta /120 > 0) {
  //         addPPP();
  //     }
  //     else{
  //       countPPP()
  //     }
  //   });
  //------從這開始喔！------

}(jQuery);
"use strict";

!function ($) {
  'use strict';

  var windowWidth = $(window).width();

  if (windowWidth >= 992) {
    var scrollSlider = function scrollSlider(options) {
      // Default
      settings = $.extend({
        slider: '.content',
        sliderWrapper: '.content>section',
        slides: '.indexBox',
        slideWidth: null,
        slideHeight: null
      }, options); // Set dimensions

      setDimensions(); // On resize        

      $(window).on('resize', function () {
        clearTimeout(resizing);
        resizing = setTimeout(function () {
          setDimensions();
        }, 250);
      });
    };

    var setDimensions = function setDimensions() {
      settings.slideWidth = $firstSlide.width();
      settings.slideHeight = $firstSlide.height();
      console.log(settings.slideWidth);
      console.log(settings.slideHeight); // Calculate slider width and height

      settings.sliderWidth = Math.ceil(settings.slideWidth * $slides.length);
      settings.sliderHeight = $firstSlide.outerHeight(true); // Set slider width and height

      $sliderWrapper.width(settings.sliderWidth); //$sliderWrapper.height(settings.sliderHeight);
      // Set scene

      setScene(); //resizing = false;
    };

    var setScene = function setScene() {
      var xDist = -$slides.width() * ($slides.length - 1),
          tlParams = {
        x: xDist,
        ease: Power2.easeInOut
      };

      if (scrollScene != null && scrollTimeline != null) {
        progress = 0;
        scrollScene.progress(progress);
        scrollTimeline = new TimelineMax();
        scrollTimeline.to($sliderWrapper, 2, tlParams);
        scrollScene.setTween(scrollTimeline);
        scrollScene.refresh();
      } else {
        // Init ScrollMagic controller
        scrollController = new ScrollMagic.Controller(); //Create Tween

        scrollTimeline = new TimelineMax();
        scrollTimeline.to($sliderWrapper, 2, tlParams);
        scrollTimeline.progress(progress); // Create scene to pin and link animation

        scrollScene = new ScrollMagic.Scene({
          triggerElement: settings.slider,
          triggerHook: "onLeave",
          duration: settings.sliderWidth
        }).setPin(settings.slider).setTween(scrollTimeline).addTo(scrollController).on('start', function (event) {
          scrollTimeline.time(0);
        });
      }
    };

    var $slider = $('.content'),
        $slides = $('.indexBox'),
        $sliderWrapper = $('.content>section'),
        $firstSlide = $slides.first();
    var settings = {},
        resizing = false,
        scrollController = null,
        scrollTween = null,
        scrollTimeline = null,
        progress = 0,
        scrollScene = null;
    scrollSlider();
  }
}(jQuery);
"use strict";

!function ($) {
  'use strict'; //------decounce------

  function throttle(func, threshhold) {
    var last, timer;
    if (threshhold) threshhold = 250;
    return function () {
      var context = this;
      var args = arguments;
      var now = +new Date();

      if (last && now < last + threshhold) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          last = now;
          func.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }

  var windowWidth = $(window).width();

  if (windowWidth >= 992) {
    var scrollSlider = function scrollSlider(options) {
      // Default
      settings = $.extend({
        slider: '.content',
        sliderWrapper: '.content>section',
        slides: '.indexBox',
        slideWidth: null,
        slideHeight: null
      }, options); // Set dimensions

      setDimensions(); // On resize        

      $(window).on('resize', function () {
        clearTimeout(resizing);
        resizing = setTimeout(function () {
          setDimensions();
        }, 250);
      });
      console.log('scrollSlider');
    };

    var setDimensions = function setDimensions() {
      settings.slideWidth = $firstSlide.width();
      settings.slideHeight = $firstSlide.height();
      console.log(settings.slideWidth);
      console.log(settings.slideHeight); // Calculate slider width and height

      settings.sliderWidth = Math.ceil(settings.slideWidth * $slides.length);
      settings.sliderHeight = $firstSlide.outerHeight(true); // Set slider width and height

      $sliderWrapper.width(settings.sliderWidth); //$sliderWrapper.height(settings.sliderHeight);
      // Set scene

      setScene(); //resizing = false;
    };

    var setScene = function setScene() {
      var xDist = -$slides.width() * ($slides.length - 1),
          tlParams = {
        x: xDist,
        ease: Power2.easeInOut
      };

      if (scrollScene != null && scrollTimeline != null) {
        progress = 0;
        scrollScene.progress(progress);
        scrollTimeline = new TimelineMax();
        scrollTimeline.to($sliderWrapper, 2, tlParams);
        scrollScene.setTween(scrollTimeline);
        scrollScene.refresh();
      } else {
        // Init ScrollMagic controller
        scrollController = new ScrollMagic.Controller(); //Create Tween

        scrollTimeline = new TimelineMax();
        scrollTimeline.to($sliderWrapper, 2, tlParams);
        scrollTimeline.progress(progress); // Create scene to pin and link animation

        scrollScene = new ScrollMagic.Scene({
          triggerElement: settings.slider,
          triggerHook: "onLeave",
          duration: settings.sliderWidth
        }).setPin(settings.slider).setTween(scrollTimeline).addTo(scrollController).on('start', function (event) {
          scrollTimeline.time(0);
        });
      }
    };

    var $slider = $('.content'),
        $slides = $('.js-workItem'),
        $sliderWrapper = $('#workContent'),
        $firstSlide = $slides.first();
    var settings = {},
        resizing = false,
        scrollController = null,
        scrollTween = null,
        scrollTimeline = null,
        progress = 0,
        scrollScene = null;
    scrollSlider();
  }
}(jQuery);
//# sourceMappingURL=all.js.map
