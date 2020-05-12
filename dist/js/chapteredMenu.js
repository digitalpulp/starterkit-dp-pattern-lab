(function ($) {
  'use strict';

  var TRANSITION_TIMING = 250;
  var SCROLL_TIMING = 600;
  var SCROLL_THRESSHOLD = 50;
  var ACTIVE_LINK_CLASS = 'is-active';
  var DESKTOP_SCREEN = '(min-width: 1024px)';
  var $htmlBody = $('html, body');
  var $container;
  var $window = $(window);
  var windowMedia1024 = window.matchMedia(DESKTOP_SCREEN);
  var sticky;

  var initMenu = function (context) {
    $container = $(this);
    var $menuContainer = $('.dropdown-container', context);
    var $links = $menuContainer.find('a');
    var $trigger = $('.dropdown-trigger', context);

    sticky = Stickyfill.addOne($menuContainer);

    $.mediaquery('bind', 'initChapteredMenu', DESKTOP_SCREEN, {
      enter: function () {
        if ($window.scrollTop() > SCROLL_THRESSHOLD) {
          sticky.refresh();
          $container.addClass('fixed');
        }

        $(window).on('scroll.base', function () {
          if ($window.scrollTop() > SCROLL_THRESSHOLD) {
            sticky.refresh();
            $container.addClass('sticky');
          }
          else {
            sticky.refresh();
            $container.removeClass('sticky');
          }
        });
      }
    });

    if ($links.length === 0) {
      return;
    }
    $($links[0]).toggleClass(ACTIVE_LINK_CLASS);
    $links.on('click', function (e) {
      e.preventDefault();
      if (!windowMedia1024.matches) {
        $trigger.trigger('click');
      }
      $($links).removeClass(ACTIVE_LINK_CLASS);
      var target = $(this);
      target.addClass(ACTIVE_LINK_CLASS);
      var scrollPos = $(target.attr('href')).offset().top;

      $htmlBody.stop().animate({
        scrollTop: scrollPos
      }, SCROLL_TIMING);
    });

    $trigger.on('click', function (e) {
      e.preventDefault();
      $(this).toggleClass('collapsed');
      $menuContainer.fadeToggle(TRANSITION_TIMING);
    });

    $(window).on('scroll.chapteredMenu', function () {
      calculateScroll();
    });

    calculateScroll();
  };


  function calculateScroll() {
    $('.c--chaptered-nav .dropdown-container a.is-active', $container).removeClass('is-active');

    $('.chaptered-nav-anchor').each(function (i, el) {
      var $el = $(el);
      if ($el.attr('id')) {
        if ($el.offset().top - $(window).scrollTop() >= 0 && $el.offset().top - $(window).scrollTop() <= $(window).outerHeight() / 3 || $el.offset().top <= ( $(window).scrollTop() + $(window).outerHeight() / 3 )) {
          var id = $(el).attr('id');
          $('.c--chaptered-nav .dropdown-container a.is-active', $container).removeClass('is-active');
          $('.c--chaptered-nav .dropdown-container a[href="' + '#' + id + '"]', $container).addClass('is-active');
        }

        if ($('.c--chaptered-nav .dropdown-container a').last().hasClass('is-active') || $(window).scrollTop() + $(window).height() === $(document).height()) {
          $('.c--chaptered-nav .dropdown-container a.is-active', $container).removeClass('is-active');
          $('.c--chaptered-nav .dropdown-container a', $container).last().addClass('is-active');
        }
      }
    });
  }

  window.DP.behaviors.chapteredMenu = {
    attach: function (context) {
      $(context).find('.cc--chaptered-nav').once('chapteredMenu').each(function () {
        initMenu.apply(this);
      });
    }
  };

}(jQuery, Stickyfill));
