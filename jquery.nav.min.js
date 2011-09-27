/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 0.5
 */
(function(e){e.fn.onePageNav=function(k){var g=e.extend({},e.fn.onePageNav.defaults,k),c={};c.sections={};c.bindNav=function(b,d,a,f,l){var h=b.parent(),i=b.attr("href"),j=e(window);if(!h.hasClass(a)){c.adjustNav(d,h,a);j.unbind(".onePageNav");e.scrollTo(i,l,{onAfter:function(){if(f)window.location.hash=i;j.bind("scroll.onePageNav",function(){c.scrollChange(d,a)})}})}};c.adjustNav=function(b,d,a){b.find("."+a).removeClass(a);d.addClass(a)};c.getPositions=function(b){b.find("a").each(function(){var d=
e(this).attr("href"),a=e(d).offset();a=a.top;c.sections[d.substr(1)]=Math.round(a)})};c.getSection=function(b){var d="",a=Math.round(e(window).height()/2);for(var f in c.sections)if(c.sections[f]-a<b)d=f;return d};c.scrollChange=function(b,d){c.getPositions(b);var a=e(window).scrollTop();a=c.getSection(a);a!==""&&c.adjustNav(b,b.find("a[href=#"+a+"]").parent(),d)};c.init=function(b,d){b.find("a").bind("click",function(f){c.bindNav(e(this),b,d.currentClass,d.changeHash,d.scrollSpeed);f.preventDefault()});
c.getPositions(b);var a=false;e(window).bind("scroll.onePageNav",function(){a=true});setInterval(function(){if(a){a=false;c.scrollChange(b,d.currentClass)}},250)};return this.each(function(){var b=e(this),d=e.meta?e.extend({},g,b.data()):g;c.init(b,d)})};e.fn.onePageNav.defaults={currentClass:"current",changeHash:false,scrollSpeed:750}})(jQuery);
