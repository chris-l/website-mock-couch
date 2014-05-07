/* jslint node: true */
/*global document, window */
'use strict';
require('modernizr');
require('prism');
var $ = require('jquery');

require('bootstrap');
$(window.document).ready(function() {
  $('#sidebar').affix({
    offset: {
      top: 430
    }
  });

  var $body   = $(document.body);
  var navHeight = $('.navbar').outerHeight(true) + 10;

  $body.scrollspy({
    target: '#leftCol',
    offset: navHeight
  });
});

$('a').click(function(){
  var href = $.attr(this, 'href'),
      anchor = $('[name="' + $.attr(this, 'href').substr(1) + '"]');

  // Do animation if the anchor exists
  if(anchor.length > 0) {
    $('html, body').animate({
      scrollTop: anchor.offset().top - 60
    }, 500,  function () {
      window.location.hash = href;
    });
    return false;
  }

  // Do the default action if not
  if(anchor.length === 0) {
    return true;
  }
});
