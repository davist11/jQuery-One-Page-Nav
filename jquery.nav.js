/**
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 0.9.1
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */
;(function($) {
  $.fn.onePageNav = function(options) {
    var opts = $.extend({}, $.fn.onePageNav.defaults, options),
        onePageNav = {};
    
    onePageNav.sections = {};
    
    onePageNav.bindNav = function($el, $this, o) {
      var $par = $el.parent(),
          newLoc = $el.attr('href'),
          $win = $(window);

      if(!$par.hasClass(o.currentClass)) {
        if(o.begin) {
          o.begin();
        }
        onePageNav.adjustNav($this, $par, o.currentClass);
        $win.unbind('.onePageNav');
        $.scrollTo(newLoc, o.scrollSpeed, {
          easing: o.easing,
          offset: {
            top: -o.scrollOffset
          },
          onAfter: function() {
            if(o.changeHash) {
              window.location.hash = newLoc;
            }
            $win.bind('scroll.onePageNav', function() {
              onePageNav.scrollChange($this, o);
            });
            if(o.end) {
              o.end();
            }
          }
        });
      }
    };
    
    onePageNav.adjustNav = function($this, $el, curClass) {
      $this.find('.'+curClass).removeClass(curClass);
      $el.addClass(curClass);
    };
    
    /**
     * @return {string} The ID of the last section (positionally) on the page.
     */
    onePageNav.getLastSection = function($this, o) {
      var max = 0;
      var returnValue;

      var $nav = $this.find('a');
      if(o.filter !== '') {
        $nav = $nav.filter(o.filter);
      }

      $nav.each(function() {
        var section = $(this).attr('href');
        var current_max = Math.max( max, $(section).offset().top );
        if (current_max >= max) {
          returnValue = section.substr(1);
        }
      });
      return returnValue;
    };

    onePageNav.getPositions = function($this, o) {
      var $nav = $this.find('a');
      
      if(o.filter !== '') {
        $nav = $nav.filter(o.filter);
      }
      
      $nav.each(function() {
        var linkHref = $(this).attr('href'),
            divPos = $(linkHref).offset(),
            topPos = divPos.top;
            
        onePageNav.sections[linkHref.substr(1)] = Math.round(topPos) - o.scrollOffset;
      });
    };
    
    onePageNav.getSection = function($this, windowPos, o) {
      var returnValue = '',
          windowHeight = Math.round($(window).height() * o.scrollThreshold);

      lastSection = onePageNav.getLastSection($this, o);
      if($(window).scrollTop() + $(window).height() >=
            $(document).height() - $(lastSection).height() - 5) {
        // last section when we hit the bottom of the document
        returnValue = lastSection;
      } else {
        for(var section in onePageNav.sections) {
          if((onePageNav.sections[section] - windowHeight) < windowPos) {
            returnValue = section;
          }
        }
      }
      return returnValue;
    };
    
    onePageNav.scrollChange = function($this, o) {
      onePageNav.getPositions($this, o);
      
      var windowTop = $(window).scrollTop(),
          position = onePageNav.getSection($this, windowTop, o);
          
      if(position !== '') {
        onePageNav.adjustNav($this,$this.find('a[href=#'+position+']').parent(), o.currentClass);
      }
    };
    
    onePageNav.init = function($this, o) {
      var didScroll = false,
          $nav = $this.find('a');
      
      if(o.filter !== '') {
        $nav = $nav.filter(o.filter);
      }

      $nav.bind('click', function(e) {
        onePageNav.bindNav($(this), $this, o);
        e.preventDefault();
      });
    
      onePageNav.getPositions($this, o);
    
      $(window).bind('scroll.onePageNav', function() {
        didScroll = true;
      });

      setInterval(function() {
        if(didScroll) {
          didScroll = false;
          onePageNav.scrollChange($this, o);
        }
      }, 250);
    };
    
    return this.each(function() {
      var $this = $(this),
          o = $.meta ? $.extend({}, opts, $this.data()) : opts;
      
      onePageNav.init($this, o);
    
    });
  };

  // default options
  $.fn.onePageNav.defaults = {
    currentClass: 'current',
    changeHash: false,
    easing: 'swing',
    filter: '',
    scrollSpeed: 750,
    scrollOffset: 0,
    scrollThreshold: 0.5,
    begin: false,
    end: false
  };

})(jQuery);

