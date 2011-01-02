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
	}).first().click();
	
	// PORTFOLIO
	
	var setSelectedPhoto = function(photo) {
		console.log(photo.image);
		
		var fullImg = $("#portfolio-selected-img > img");
		fullImg.attr("src", photo.project.baseDir + "/" + photo.image + ".jpg");
	};
	
	var setSelectedProject = function(project) {
		var thumbHolder = $("#portfolio-thumbnails > ul").empty();

		var thumbMap = _.reduce(project.photos, function(memo, photo) {
			photo.project = project;
			memo[photo.image] = photo;
			return memo;
		}, {});

		// Add the thumbnails
		$("#portfolio-thumb-tmpl").tmpl(
			project.photos, {baseDir: project.baseDir}).appendTo(thumbHolder);
			
		// Add click handlers to the thumbs
		thumbHolder.find("a").click(function() {
			$(this).parent().siblings().removeClass("selected");
			$(this).parent().addClass("selected");
			
			setSelectedPhoto(thumbMap[$(this).data("key")]);
			return false;
		}).first().click();
	};
	
	var setPortfolio = function(portfolio) {
		// Get a project map, keyed on name, for project selection
		var projectMap = _.reduce(portfolio, function(memo, project) {
			memo[project.name] = project;
			return memo;
		}, {});
		
		$("#portfolio-project-link-tmpl").tmpl(portfolio).appendTo("#portfolio-projects");
		
		$("#portfolio-projects a").click(function() {
			setSelectedProject(projectMap[$(this).text()]);
			return false;
		});
		
		setSelectedProject(portfolio[0]);
	};
	
	// Load portfolio JSON
		
	$.getJSON("portfolio.json", setPortfolio);
});