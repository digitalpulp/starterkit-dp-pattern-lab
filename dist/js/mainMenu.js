(function ($) {
  'use strict';

  var initHoverIntent = function () {
    var menu = this;

    $('ul.m--main > li', menu).hoverIntent({
      over: function () {
        $(this).addClass('hover');
      },
      out: function () {
        $(this).removeClass('hover');
      },
      interval: 80
    });
  };

  var initMainMenu = function () {
    var $menuItems = $('.cc--menu-main ul.m--menu > li');

    ally.style.focusWithin();

    $menuItems.on('click', function () {
      $menuItems.removeClass('ally-focus-within');

      if (whatInput.ask() === 'touch') {
        $(this).addClass('ally-focus-within');
      }
    });
  };

  window.DP.behaviors.mainMenu = {
    attach: function (context) {
      $(context).find('.main-nav-container .cc--menu-main').once('mainMenu').each(function () {
        initHoverIntent.apply(this);
        initMainMenu.apply();
      });
    }
  };

})(jQuery);
