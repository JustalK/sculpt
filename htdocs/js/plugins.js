// Avoid `console` errors in browsers that lack a console.
(function() {
	var positionTopScroll=0;
	$(window).scroll(function(event) {
		// Get the value of the scroll position
		positionTopScroll = $(window).scrollTop();
		resizeTopBar();
	})
	
	var hiddenTopBar = false;
	function resizeTopBar() {
		if(positionTopScroll>50 && !hiddenTopBar) {
			hiddenTopBar=true;
			$("#topbar").animate({"top":"-"+$("#firstTopBar").height()+"px"},200);
		} else if(positionTopScroll<50 && hiddenTopBar) {
			hiddenTopBar=false;
			$("#topbar").animate({"top":"0px"},200);
		}
	}
	
	function adaptContent() {
		$(".imgHolder").each(function( index ) {
			$(this).css("height",$( window ).height()+"px");
		});
	}
	
	$( window ).resize(function() {
		adaptContent();
	})
	
	$( window ).load(function() {
		$(".imgHolder").each(function( index ) {
			$(this).css("height",$( window ).height()+"px");
		});
		var cal = $(".imgHolder").width() / 2400;
		$(".imgContainer").css("transform","translate3d(0px, 0px, 0px) scale(0.8,0.8)");
	});
}());

// Place any jQuery/helper plugins in here.
