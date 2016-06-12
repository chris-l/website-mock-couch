/* jslint node: true */
/*global window */
'use strict';
var $ = require('jquery');
require('modernizr');
require('prismjs-package');
require('bootstrap');

$('#sidebar').affix({
  offset: {
    top: 430
  }
});

var navHeight = $('#header').outerHeight(true) + 10;

$('body').scrollspy({
  target: '#leftCol',
  offset: navHeight
});

$('a').click(function() {
  var href   = $.attr(this, 'href'),
      anchor = $($.attr(this, 'href'));

  // Do animation if the anchor exists
  if (anchor.length > 0 || href === '#home') {
    $('html, body').animate({
      scrollTop: href === '#home' ? 0 : Number(anchor.offset().top)
    }, 500, function () {
      window.location.hash = href;
    });
    return false;
  }

  // Do the default action if not
  if(anchor.length === 0) {
    return true;
  }
});
