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
	  // Div hiding (to be replaced with animation)
	  $(activeLink.attr('href')).hide();
	  $($(this).attr('href')).show();
	  
	  // Style links
	  styleInactiveLink(activeLink);
	  styleActiveLink(activeLink = $(this));
	  
	  return false;
	});
	
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
});