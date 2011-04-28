// Site code
$(function() {
	// For testing without js:
	// return;
	
	var activeLink = $('#content nav a.active');
	$('#content nav a').each(function() {
	  if ($(this).hasClass('active'))
	    return;
	    
	  $($(this).attr('href')).hide();
	}).click(function(e) {
    e.preventDefault();
    
	  // triggers location management
	  location.hash = $(this).attr('href').substr(1);
	});
	
	// Contain page specific show behaviours
	var onPageShownHandlers = {
	  contact: function(pageElem) {
	    $("#contact-name").focus();
	  }
	};
	
	/** Selects the specified page */
	var selectPage = function(page) {
	  // Determine nav link associated with page
	  var clickedLink = $('#content nav a[href=#' + page + ']');
	  
	  // Div hiding (to be replaced with animation)
	  $(activeLink.attr('href')).hide();
	  var pageElem = $('#' + page).show();
	  
	  // Style links
	  styleInactiveLink(activeLink);
	  styleActiveLink(activeLink = clickedLink);
	  
	  // If we have a page handler, invoke it
	  if (onPageShownHandlers[page] != undefined)
	    onPageShownHandlers[page](pageElem);
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
	    $(this).find(".on-over").removeClass('hidden');
      $(this).find(".on-out").addClass('hidden');
	  },
	  function() {
	    $(this).find(".on-over").addClass('hidden');
      $(this).find(".on-out").removeClass('hidden');
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
      'changeFade'        : 100
    });
  }); 

  //
  // Contact form
  //

  var contactForm = $("#contact form").submit(function(e) {
    var form = $(this);
    if (!validateForm(form)) {
      log("Form invalid");
      return false;
    }

    // hide the submit button
    $("#contact-submit").hide();

    // show progres indicator
    $("#contact-sending").show();

    $.ajax({
      url: "contact.php",
      type: "post",
      data: form.serialize(),
      success: function() {
        $("#contact-sending").hide();
        $("#contact-sent-status").show();
        $("#contact input, #contact textarea").val("");
      },
      error: function() {
        $("#contact-sending").hide();
        $("#contact-sent-status").text("ERROR! Please send an email instead.").show();
        $("#contact input, #contact textarea").val("");
      }
    });

    return false;
  });

  var validateForm = function(form) {
    form.find("input, textarea").removeClass("error");

    var isValid = true;
    isValid = validateRequired($("#contact-name")) && isValid;
    isValid = validateRequired($("#contact-email")) && isValid;
    isValid = validateRequired($("#contact-phone")) && isValid;
    isValid = validateRequired($("#contact-message")) && isValid;

    return isValid;
  };

  var validateRequired = function(field) {
    if ($.trim(field.val()).length == 0) {
      field.addClass("error");
      return false;
    }

    return true;
  };

  $("#contact-submit").click(function(e) {
    contactForm.submit(); // triggers the handler above
    return false;
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