/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 0.2
 */
(function(e){e.fn.onePageNav=function(l){var g=e.extend({},e.fn.onePageNav.defaults,l),c={};c.sections={};c.bindNav=function(a,b,d,f){a.find("a").bind("click",function(m){var h=e(this),i=h.parent(),j=h.attr("href"),k=e(document);if(!i.hasClass(b)){c.adjustNav(a,i,b);k.unbind(".onePageNav");e.scrollTo(j,f,{onAfter:function(){if(d)window.location.hash=j;k.bind("scroll.onePageNav",function(){c.scrollChange(a,b)})}})}m.preventDefault()})};c.adjustNav=function(a,b,d){a.find("."+d).removeClass(d);b.addClass(d)};
c.getPositions=function(a){a.find("a").each(function(){var b=e(this).attr("href"),d=e(b).offset();d=d.top;c.sections[b.substr(1)]=Math.round(d)})};c.getSection=function(a){var b="",d=Math.round(e(window).height()/2);for(var f in c.sections)if(c.sections[f]-d<a)b=f;return b};c.scrollChange=function(a,b){c.getPositions(a);var d=e(window).scrollTop();d=c.getSection(d);d!==""&&c.adjustNav(a,a.find("a[href=#"+d+"]").parent(),b)};c.init=function(a,b){c.bindNav(a,b.currentClass,b.changeHash,b.scrollSpeed);
c.getPositions(a);e(document).bind("scroll.onePageNav",function(){c.scrollChange(a,b.currentClass)})};return this.each(function(){var a=e(this),b=e.meta?e.extend({},g,a.data()):g;c.init(a,b)})};e.fn.onePageNav.defaults={currentClass:"current",changeHash:false,scrollSpeed:750}})(jQuery);