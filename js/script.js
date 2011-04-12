// Site code
$(function() {
	// For testing without js:
	// return;
	
	var activeLink = $('#content nav a.active');
	$('#content nav a').each(function() {
	  if ($(this).hasClass('active'))
	    return;
	    
	  $($(this).attr('href')).hide();
	}).click(function() {
	  // triggers location management
	  location.hash = $(this).attr('href').substr(1);

	  return false;
	});
	
	/** Selects the specified page */
	var selectPage = function(page) {
	  // Determine nav link associated with page
	  var clickedLink = $('#content nav a[href=#' + page + ']');
	  
	  // Div hiding (to be replaced with animation)
	  $(activeLink.attr('href')).hide();
	  $('#' + page).show();
	  
	  // Style links
	  styleInactiveLink(activeLink);
	  styleActiveLink(activeLink = clickedLink);
	};
	
	/** Styles a page navigation link as active */
	var styleActiveLink = function(link) {
	  if (link.hasClass('active'))
	    return;
	    
	  link.addClass('active');
	  link.text('[' + link.text() + ']');
	};

	/** Styles a page navigation link as inactive */	
	var styleInactiveLink = function(link) {
	  if (!link.hasClass('active'))
	    return;
	    
    link.removeClass('active');
    var curText = link.text();
    link.text(curText.substr(1, curText.length - 2))
	};
	
	//
	// Unobtrusively add behaviour to certain classes
	//
	$('.content-on-hover').hover(
	  function() {
	    $(this).children().removeClass('hidden');
	  },
	  function() {
	    $(this).children().addClass('hidden');	    
	  }
	);
	
	//
	// Gallery setup
	//
  $(".gallery-link").click(function() {
    var galKey = $(this).data("gal-key");
    var gallery = window.galleryInfo[galKey];
    
    $.fancybox(gallery.slice(), {
      'padding'           : 0,
      'transitionIn'      : 'fade',
      'transitionOut'     : 'none',
      'type'              : 'image',
      'changeFade'        : 0
    });
  });
	
	//
	// Initialize history management
	//
	
	$.history.init(function(hash) {
    selectPage(hash == "" ? "home" : hash);
  }, { unescape: ",/" });
});

//
// Analytics (run outside site ready)
//

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-22674522-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();