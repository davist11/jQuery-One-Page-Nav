/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 0.3
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
    
    onePageNav.bindNav = function($el, $this, curClass, changeHash, scrollSpeed) {
      var $par = $el.parent(),
          newLoc = $el.attr('href'),
          $doc = $(document);

      if(!$par.hasClass(curClass)) {
        onePageNav.adjustNav($this, $par, curClass);
        $doc.unbind('.onePageNav');
        $.scrollTo(newLoc, scrollSpeed, {
          onAfter: function() {
            if(changeHash) {
              window.location.hash = newLoc;
            }
            $doc.bind('scroll.onePageNav', function() {
              onePageNav.scrollChange($this, curClass);
            });
          }
        });
      }
    };
    
    onePageNav.adjustNav = function($this, $el, curClass) {
      $this.find('.'+curClass).removeClass(curClass);
      $el.addClass(curClass);
    };
    
    onePageNav.getPositions = function($this) {
      $this.find('a').each(function() {
        var linkHref = $(this).attr('href'),
            divPos = $(linkHref).offset(),
            topPos = divPos.top;
        onePageNav.sections[linkHref.substr(1)] = Math.round(topPos);
      });
    };
    
    onePageNav.getSection = function(windowPos) {
      var returnValue = '',
          windowHeight = Math.round($(window).height() / 2);
      
      for(var section in onePageNav.sections) {
        if((onePageNav.sections[section] - windowHeight) < windowPos) {
          returnValue = section;
        }
      }
      return returnValue;
    };
    
    onePageNav.scrollChange = function($this, curClass) {
      onePageNav.getPositions($this);
      
      var windowTop = $(window).scrollTop(),
          position = onePageNav.getSection(windowTop);
      
      if(position !== '') {
        onePageNav.adjustNav($this,$this.find('a[href=#'+position+']').parent(), curClass);
      }
    };
    
    onePageNav.init = function($this, o) {
      $this.find('a').bind('click', function(e) {
        onePageNav.bindNav($(this), $this, o.currentClass, o.changeHash, o.scrollSpeed);
        e.preventDefault();
      });
    
      onePageNav.getPositions($this);

      var didScroll = false;
    
      $(document).bind('scroll.onePageNav', function() {
        didScroll = true;
      });

      setInterval(function() {
        if(didScroll) {
          didScroll = false;
          onePageNav.scrollChange($this, o.currentClass);
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
    scrollSpeed: 750
  };

})(jQuery);