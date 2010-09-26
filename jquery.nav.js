;(function($) {
  $.fn.onePageNav = function(options) {
    var opts = $.extend({}, $.fn.onePageNav.defaults, options);

    return this.each(function() {
      var $this = $(this),
          o = $.meta ? $.extend({}, opts, $this.data()) : opts,
          onePageNav = {};
        
      onePageNav.positions = [];
      onePageNav.sections = [];
        
      onePageNav.bindNav = function() {
        $this.find('a').bind('click', function(e) {
          var $el = $(this),
              $par = $el.parent(),
              newLoc = $el.attr('href'),
              $doc = $(document);

          if(!$par.hasClass(o.currentClass)) {
            onePageNav.adjustNav($par);
            $doc.unbind('.onePageNav');
            $.scrollTo(newLoc, o.scrollSpeed, {
              onAfter: function() {
                if(o.changeHash) {
                  window.location.hash = newLoc;
                }
                $doc.bind('scroll.onePageNav', onePageNav.scrollChange);
              }
            });
          }

          e.preventDefault();
        });
      };
    
      onePageNav.adjustNav = function($el) {
        $this.find('.'+o.currentClass).removeClass(o.currentClass);
        $el.addClass(o.currentClass);
      };
    
      onePageNav.buildArrays = function() {
        $this.find('a').map(function(i) {
          var linkHref = $(this).attr('href'),
              divPos = $(linkHref).offset(),
              topPos = divPos.top;
          onePageNav.positions[i] = Math.round(topPos);
          onePageNav.sections[i] = linkHref;
        });
      };
    
      onePageNav.getArrayPos = function(windowPos) {
        var returnValue = -1,
            windowHeight = Math.round($(window).height() / 2);
      
        for(var i = 0; i < onePageNav.positions.length; i++) {
          if((onePageNav.positions[i] - windowHeight) < windowPos) {
            returnValue = i;
          }
        }
        return returnValue;
      };
    
      onePageNav.scrollChange = function() {
        var windowTop = $(window).scrollTop(),
            arrayPos = onePageNav.getArrayPos(windowTop);
        
        if(arrayPos !== -1) {
          onePageNav.adjustNav($this.find('a[href='+onePageNav.sections[arrayPos]+']').parent());
        }
      };
    
      onePageNav.initialHash = function() {
        if(window.location.hash.length) {
          var loc = window.location.hash;
          onePageNav.adjustNav($this.find('a[href='+window.location.hash+']').parent());
        }
      };
    
      onePageNav.init = function() {
        onePageNav.bindNav();
      
        onePageNav.buildArrays();
      
        $(document).bind('scroll.onePageNav', onePageNav.scrollChange);
      };
    
      onePageNav.init();
    
    });
  };

  // default options
  $.fn.onePageNav.defaults = {
    currentClass: 'current',
    changeHash: false,
    scrollSpeed: 750
  };

})(jQuery);
