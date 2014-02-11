/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */

(function( w, $ ){

  // Enable strict mode
  "use strict";

  w.picturefill = function() {
    $(document).trigger('picturefill:ready');
    $('span[data-picture]').each(function(i,picfill) {
      picfill = $(picfill);
      var matches = [];
      picfill.find("span").each(function(i,span) {
        span = $(span);
        var media = span.attr("data-media");
        // if there's no media specified, OR w.matchMedia is supported 
        if (!media || ( w.matchMedia && w.matchMedia( media ).matches )) {
          matches.push( span );
        }
      });

      // Find any existing img element in the picture element
      var picImg = picfill.find( "img" );

      if (matches.length) {
        var matchedEl = $(matches.pop());
        if (!picImg.length || picImg.parent("NOSCRIPT").length) {
          picImg = $("<img>");
          picImg.attr('alt', picfill.attr("data-alt"));
        } else if (matchedEl === picImg.parent('noscript')) {
          // Skip further actions if the correct image is already in place
          return true;
        }

        picImg.attr('src', matchedEl.attr("data-src"));
        $.each(picImg[0].attributes, function(i,at) {
          if (/^data-/.test(at.name)) {
            picImg.removeAttr(at.name);
          }
        });
        $.each(matchedEl[0].attributes, function(i,at) {
          if (/^data-/.test(at.name) && at.name !== 'data-src' && at.name !== 'data-media') {
            picImg.attr(at.name, at.value);
          }
        });
        matchedEl.append( picImg );
        picImg.removeAttr("width");
        picImg.removeAttr("height");
      } else if (picImg) {
        picImg.remove();
      }
    });
    $(document).trigger('picturefill:complete');
  };

  $(document).ready(w.picturefill);
  $(window).resize(function() {
    w.clearTimeout(w.picTimer);
    w.picTimer = setTimeout(function() {
      w.picturefill();
    }, 100);
  });

}( this, jQuery ));
