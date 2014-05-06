/* jslint node: true */
/*global document */
'use strict';
require('modernizr');
var $ = require('jquery');

require('bootstrap');
$(document).ready(function() {
  $('#sidebar').affix({
    offset: {
      top: 411
    }
  });

  var $body   = $(document.body);
  var navHeight = $('.navbar').outerHeight(true) + 10;

  $body.scrollspy({
    target: '#leftCol',
    offset: navHeight
  });
});
