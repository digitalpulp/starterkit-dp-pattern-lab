(function ($) {
  'use strict';

  /**
   * Main functionality should be in an 'init' function
   **/
  var initFilterForm = function () {

    var container = this;

    var $filterToggleBtn = $('.filter-form-header button', container);
    var $form = $('.form-filter-content', container);
    var $submitButton = $('input[name="filter-submit"]', $form);
    var TRANSITION_TIME = 250;

    var breakpoint = window.matchMedia('(min-width: 1024px)');

    $submitButton.off('click').click(function (event) {
      event.preventDefault();
      $form.submit();
    });

    $filterToggleBtn.on('click', function () {

      var $this = $(this);
      var $target = $this.parent().next();

      // toggle button
      if ($this.hasClass('open')) {
        // close filter
        $this.removeClass('open');
        $target.removeClass('active').slideUp(TRANSITION_TIME);
        $this.attr('aria-expanded', 'false');
      }
      else {
        // open filter
        $this.addClass('open');
        $target.addClass('active').slideDown(TRANSITION_TIME);
        $this.attr('aria-expanded', 'true');
      }
    });

    // remove inline styles from filter form at desktop
    breakpoint.addListener(function () {
      if (breakpoint.matches === true) {
        $form.removeAttr('style').removeClass('active');
        $filterToggleBtn.removeClass('open').attr('aria-expanded', 'false');
      }
    });
  };

  /**
   * This is boilerplate: add a behavior to window.DP.behaviors
   **/
  window.DP.behaviors.filterForm = {
    attach: function (context) {
      $(context).find('.cc--filter-form, .cc--filter-form-accordions').once('filterForm').each(function () {
        initFilterForm.apply(this);
      });
    }
  };

}(jQuery));
