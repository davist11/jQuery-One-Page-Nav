A lightweight jQuery plugin for the navigation on one-page sites. Uses the [ScrollTo Plugin](http://flesler.blogspot.com/2007/10/jqueryscrollto.html) plugin to add smooth scrolling when clicking on the navigation. Also adds a class to the correct navigation items as you are scrolling through the different sections.

The plugin still works even if you add additional content to the page after the fact that changes the position of each section.

### Sample Markup:
<pre>&lt;ul id="nav">
	&lt;li class="current">&lt;a href="#section-1">Section 1&lt;/a>&lt;/li>
	&lt;li>&lt;a href="#section-2">Section 2&lt;/a>&lt;/li>
	&lt;li>&lt;a href="#section-3">Section 3&lt;/a>&lt;/li>
&lt;/ul>

&lt;div id="section-1">
	&lt;strong>Section 1&lt;/strong>
	&lt;p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&lt;/p>
&lt;/div>

&lt;div id="section-2">
	&lt;strong>Section 2&lt;/strong>
	&lt;p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&lt;/p>
&lt;/div>

&lt;div id="section-3">
	&lt;strong>Section 3&lt;/strong>
	&lt;p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&lt;/p>
&lt;/div></pre>

### Example Usage with Defaults:
<pre>$('#nav').onePageNav({
	currentClass: 'current',
	changeHash: false,
	scrollSpeed: 750,
	scrollOffset: 30,
	scrollThreshold: 0.5,
	filter: '',
	easing: 'swing',
	begin: function() {
		//I get fired when the animation is starting
	},
	end: function() {
		//I get fired when the animation is ending
	},
	scrollChange: function($currentListItem) {
		//I get fired when you enter a section and I pass the list item of the section
	}
});</pre>

If you want the hash to change when a user clicks on the navigation, then change the **changeHash** options to **true**.

If you want to filter items out of your navigation then pass in a selector to the filter option.

### Filter Example:
<pre>&lt;ul id="nav">
	&lt;li class="current">&lt;a href="#section-1">Section 1&lt;/a>&lt;/li>
	&lt;li>&lt;a href="#section-2">Section 2&lt;/a>&lt;/li>
	&lt;li>&lt;a href="#section-3">Section 3&lt;/a>&lt;/li>
	&lt;li>&lt;a href="#section-4">Section 4&lt;/a>&lt;/li>
	&lt;li>&lt;a href="#section-5">Section 5&lt;/a>&lt;/li>
	&lt;li>&lt;a href="http://google.com" class="external">Some other link&lt;/a>&lt;/li>
&lt;/ul>
  
$('#nav').onePageNav({
	filter: ':not(.external)'
});</pre>

### topOffset Example:

In an effort to bring back support for the now-deprecated scrollOffset, you may now
use the `topOffset` option in conjunction with a header. See `top-offset.html` and 
`top-offset-bg-color.htm` for examples.
<pre>$('#nav').onePageNav({
	topOffset: {
		selectionSelector: '.section',
		value: 30 //typically the height of your header
	}
}</pre>

A couple of known limitations:
1. Sections may have a top/bottom border, OR a unique background (different bg than the container/sibling sections) but not both.
2. For sections with unique backgrounds, you must add padding by using a wrapper element, see `top-offset-bg-color.htm`

### If you are having issues with iOS devices
If clicking a link in the nav makes the rest of the links unclickable until you scroll, you can solve it in this hacky way:

<pre>$('#nav').onePageNav({
	begin: function() {
		//Hack so you can click other menu items after the initial click
		$('body').append('&lt;div id="device-dummy" style="height: 1px;">&lt;/div>');
	},
	end: function() {
		$('#device-dummy').remove();
	}
});</pre>

Found the solution [here](http://stackoverflow.com/a/10030251)
