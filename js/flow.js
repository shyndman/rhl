$.widget("ui.flow", {
	/** Widget options, populated with defaults */
	options: {},
	
	/** The slide map (id to jquery element) */
	slides: {},
	
	/** Current slide */
	curSlide: null,

	/** Initializes the gallery */
	_create: function () {
		this.setupSlides();
	},

	/** Widget destructor */
	destroy: function () {
		$.Widget.prototype.destroy.apply(this, arguments);
	},
	
	/** Sets up the content slides for sliding */
	setupSlides: function() {
		var self = this;
		// find slides, populate the slide map
		var s = this.element.find(".content-slide").each(function() {
			self.slides[$(this).attr("id")] = $(this);
		});
	},
	
	/** Slides focus to the specified slide */
	slideToId: function(slideId) {
		if (!this.slides[slideId]) {
			console.error("Slide ID not found, slideId=" + slideId);
			return;
		}
		
		var newSlide = this.slides[slideId];
		var curSlidePos = this.curSlide ? this.curSlide.position() : {left:0};
		var newSlidePos = newSlide.position();
		
		curSlidePos.left = -curSlidePos.left;
		newSlidePos.left = -newSlidePos.left;

		this.element.stop();
		this.element.animate(
			{'left': newSlidePos.left+'px'},
			this.getDuration(curSlidePos, newSlidePos),
			'easeInOutQuad'
		);
		
		this.curSlide = newSlide;
	},
	
	/** Gets the amount of time the animation should take */
	getDuration: function(from, to) {
		var dur = Math.pow(Math.abs(from.left - to.left), .93);
		return dur;
	}
});