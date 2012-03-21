A lightweight jQuery plugin for the navigation on one-page sites. Uses the [ScrollTo Plugin](http://flesler.blogspot.com/2007/10/jqueryscrollto.html) plugin to add smooth scrolling when clicking on the navigation. Also adds a class to the correct navigation items as you are scrolling through the different sections.

The plugin still works even if you add additional content to the page after the fact that changes the position of each section.

### Sample Markup:
<pre>&lt;ul id="nav">
  &lt;li class="current">&lt;a href="#section-1">Section 1&lt;/a>&lt;/li>
  &lt;li>&lt;a href="#section-2">Section 2&lt;/a>&lt;/li>
  &lt;li">&lt;a href="#section-3">Section 3&lt;/a>&lt;/li>
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
    console.log('I get fired when the animation is starting');
  },
  end: function() {
	console.log('I get fired when the animation is ending');
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

<hr />

### Javascript compression

http://closure-compiler.appspot.com/home

### Semantic Versioning

http://semver.org/

### Documentation

http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
http://code.google.com/p/jsdoc-toolkit/

