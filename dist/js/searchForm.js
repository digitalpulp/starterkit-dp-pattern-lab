(function ($) {
  'use strict';

  var $searchIcon;
  var $body = $('body');
  var $searchFormContainer = $('.main-nav-container .cc--search-form');
  var $searchInput = $searchFormContainer.find('input');
  var $closeIcon = $searchFormContainer.find('.icon-close');

  /**
  * Main functionality should be in an 'init' function
  */
  var initSearchForm = function () {
    $searchIcon = $(this);

    $searchFormContainer.attr({
      'aria-hidden': 'true',
      'aria-labelledby': 'dialog-title'
    });

    $searchIcon.on('click', function (e) {
      e.preventDefault();
      openSearch();
    });

    $closeIcon.on('click', function (e) {
      e.preventDefault();
      closeSearch();
    });

    $searchFormContainer.on('keydown', function (ev) {
      // KEY_TAB
      if (ev.keyCode === 9) {
        // ev.preventDefault();
        var inputs = $searchFormContainer.find('input, button').filter(':visible').not(':disabled');

        // redirect last tab to first input
        if (!ev.shiftKey) {
          if (inputs[inputs.length - 1] === ev.target) {
            ev.preventDefault();
            inputs.first().focus();
          }
        }
        // redirect first shift+tab to last input
        else {
          if (inputs[0] === ev.target) {
            ev.preventDefault();
            inputs.last().focus();
          }
        }
      }

      // KEY_ESC
      if (ev.keyCode === 27) {
        ev.preventDefault();
        closeSearch();
      }
    });
  };

  var openSearch = function () {
    $searchFormContainer.addClass('is-open').attr('aria-hidden', 'false');
    $body.addClass('search-is-open');
    $searchInput.first().focus();
  };

  var closeSearch = function () {
    $searchFormContainer.removeClass('is-open').attr('aria-hidden', 'true');
    $body.removeClass('search-is-open');
  };

  /**
   * This is boilerplate: add a behavior to window.DP.behaviors
   */
  window.DP.behaviors.searchForm = {
    attach: function (context) {
      $(context).find('.utility-nav-container .icon-search, .branding-mainmenu-container .icon-search').once('searchForm').each(function () {
        initSearchForm.apply(this);
      });
    }
  };

}(jQuery));
