// Site code
$(function() {
	// For testing without js:
	// return;
		
	// CONTENT SCROLLING
	
	var scroller = $("#slide-scroller").flow();
	
	// NAVIGATION
	
	// Page title setup
	var pageTitleBase = document.title;
	pageTitleBase += " - ";
	
	var navLinks = $("header nav a");
	navLinks.click(function(eventObj) {
		var self = $(this);
				
		// selected nav link
		navLinks.removeClass("selected");
		self.addClass("selected");
		
		// page title
		document.title = pageTitleBase + self.data("page-title");
		
		// grab the id to scroll to, which is in the href after the first character (#)
		scroller.flow("slideToId", $(this).attr("href").substring(1));
		
		return false;
	});
	
	// Select the portfolio
	navLinks.first().click();
	
	// PORTFOLIO
	
	var setSelectedProject = function(projectObj) {
		
	};
	
	var setPortfolio = function(portfolioObj) {
		var projectMap = _.reduce(portfolioObj, function(memo, project) {
			memo[project.name] = project;
			return memo;
		}, {});
		
		$("#portfolio-project-link-tmpl").tmpl(portfolioObj).appendTo("#portfolio-projects");
		
		$("#portfolio-projects a").click(function() {
			setSelectedProject(projectMap[$(this).text()]);
			return false;
		});
		
		setSelectedProject(portfolioObj[0]);
	};
	
	// Load portfolio JSON
		
	$.getJSON("portfolio.json", setPortfolio);
});