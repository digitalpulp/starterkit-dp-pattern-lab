(function ($) {
  'use strict';

  var $container;
  var TRANSITION_TIMING = 250;
  var subNavOpenLabel = 'Expand ';
  var subNavCloseLabel = 'Close ';

  var initMobileMenu = function () {
    $container = $(this);
    var $navItems = $('.cc--menu-main .arrow-toggle, .information-for-toggle', $container);

    // trigger on click/tap events for submenu toggles
    $navItems.on('click', function (e) {
      e.preventDefault();
      toggleSubMenu(this);
    });
  };

  // submenu toggle
  var toggleSubMenu = function (el) {
    // get the toggle
    var $el = $(el);
    var $toggleParent = $('li.menu-item');
    var navItemsOpenLabel = subNavOpenLabel + 'Sub-Navigation';
    var navItemsCloseLabel = subNavCloseLabel + 'Sub-Navigation';

    // check if it's open
    if ($el.hasClass('is-open')) {
      // close if it's opened
      $el.closest($toggleParent).removeClass('is-open');
      $el.removeClass('is-open');
      $el.closest($toggleParent).find('.submenu').slideUp(TRANSITION_TIMING).attr('aria-hidden', 'true');
      $el.attr('aria-expanded', 'false');
      $el.attr('aria-label', navItemsOpenLabel);
    }
    else {
      // user has expanded one second-level link list and then expands another, the first list should collapse
      $toggleParent.removeClass('is-open');
      $('.cc--menu-main .arrow-toggle').removeClass('is-open').attr({'aria-expanded': 'false', 'aria-label': navItemsOpenLabel});
      $('.submenu').slideUp(TRANSITION_TIMING).attr('aria-hidden', 'true');
      // if it's not open, open it
      $el.closest($toggleParent).addClass('is-open');
      $el.addClass('is-open');
      $el.closest($toggleParent).find('.submenu').slideDown(TRANSITION_TIMING).attr('aria-hidden', 'false');
      $el.attr('aria-expanded', 'true');
      $el.attr('aria-label', navItemsCloseLabel);
    }
  };

  window.DP.behaviors.mobileMenu = {
    attach: function (context) {
      $(context).find('.cc--global-nav').once('mobileMenu').each(function () {
        initMobileMenu.apply(this);
      });
    }
  };

}(jQuery));
