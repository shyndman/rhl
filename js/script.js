// usage: log('inside coolFunc',this,arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};

// catch all document.write() calls
(function(doc){
  var write = doc.write;
  doc.write = function(q){ 
    log('document.write(): ',arguments); 
    if (/docwriteregexwhitelist/.test(q)) write.apply(doc,arguments);  
  };
})(document);

// Site code
$(function() {
	// For testing without js:
	// return;
		
	// Page title setup
	var pageTitleBase = document.title;
	pageTitleBase += " - ";
	
	// Content scroller
	var scroller = $("#slide-scroller").flow();
	
	// Navigation
	var lastNav = null;
	var navLinks = $("header nav a");
	navLinks.click(function(eventObj) {
		var self = $(this);
				
		// selected nav link
		navLinks.removeClass("selected");
		self.addClass("selected");
		
		// page title
		document.title = pageTitleBase + self.data("page-title");
		
		// scroller 
		// grab the id to scroll to, which is in the href after the first character (#)
		scroller.flow("slideToId", $(this).attr("href").substring(1));
		
		lastNav = self;
		return false;
	});
});
