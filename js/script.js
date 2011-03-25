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
	}

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
	// Initialize history management
	//
	
	$.history.init(function(hash) {
    selectPage(hash == "" ? "home" : hash);
  }, { unescape: ",/" });
});