(function ($) {
  'use strict';

  /**
  * Main functionality should be in an 'init' function
  **/
  var initAccordions = function () {
    var container = this;

    var $el = $('.accordion', container);
    var $accordionBtn = $('.accordion-trigger', container);
    var $accordionPanel = $('.accordion-panel', container);
    var TRANSITION_TIME = 250;

    $accordionBtn.on('click', function () {

      var $this = $(this);
      var $target = $this.parent().next();

      // open/close next() accordion
      if (!$target.hasClass('active')) {
        // close
        $accordionBtn.attr('aria-expanded', 'false');
        $accordionBtn.attr('aria-disabled', 'false');
        $accordionBtn.removeClass('open');
        $accordionPanel.removeClass('active').slideUp(TRANSITION_TIME);
        // open
        $target.addClass('active').slideDown(TRANSITION_TIME);
        $this.attr('aria-expanded', 'true');
        $this.attr('aria-disabled', 'true');
      }

      // toggle button
      if ($this.hasClass('open')) {
        // close accordion
        $this.removeClass('open');
        $target.removeClass('active').slideUp(TRANSITION_TIME);
        $this.attr('aria-expanded', 'false');
        $this.attr('aria-disabled', 'false');
      }
      else {
        // open accordion
        $this.addClass('open');
        $target.addClass('active').slideDown(TRANSITION_TIME);
        $this.attr('aria-expanded', 'true');
        $this.attr('aria-disabled', 'true');
      }
    });

    // accessibility
    $el.on('keydown', function (e) {
      // home key
      if (e.keyCode === 36) {
        e.preventDefault();
        $accordionBtn.get(0).focus();
      }

      // end key
      if (e.keyCode === 35) {
        e.preventDefault();
        $accordionBtn.last().focus();
      }
    });
  };

  /**
  * This is boilerplate: add a behavior to window.DP.behaviors
  **/
  window.DP.behaviors.accordions = {
    attach: function (context) {
      $(context).find('.cc--accordions').once('accordions').each(function () {
        initAccordions.apply(this);
      });
    }
  };

}(jQuery));
