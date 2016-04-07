// Avoid `console` errors in browsers that lack a console.
(function() {
	var oldPositionTopScroll=0;
	var positionTopScroll=0;
	$(window).scroll(function(event) {
		// Get the value of the scroll position
		positionTopScroll = $(window).scrollTop();
		resizeTopBar();
		$("#firstSlide").css("top",-10*$(window).scrollTop()+"px");
	})
	
	var scrollUp = false;
	function resizeTopBar() {
		if(oldPositionTopScroll-5>positionTopScroll && scrollUp) {
			scrollUp=!scrollUp;
			$("#topbar").clearQueue();
			$("#topbar").stop();
			$("#topbar").animate({"top":"0px"},200);
		} else if(oldPositionTopScroll+5<positionTopScroll && !scrollUp) {
			scrollUp=!scrollUp;
			$("#topbar").clearQueue();
			$("#topbar").stop();
			$("#topbar").animate({"top":"-"+$("#firstTopBar").height()+"px"},200);
		}
		oldPositionTopScroll = positionTopScroll;
	}
	
	function adaptContent() {
		$(".imgHolder").each(function( index ) {
			$(this).css("height",$( window ).height()+"px");
		});
		var imgW = $(".imgHolder").width();
		var imgH = $(".imgHolder").height();
		var winW = $(window).width();
		var winH = $(window).height();
		var calW = $(".imgHolder").width() / 2400;
		var calH = $(".imgHolder").height() / 1600;
		$(".imgContainer").css("transform","translate3d(0px, 0px, 0px) scale("+calW+","+calW+")");
		if($(".imgContainer")[0].getBoundingClientRect().height<winH) {
			var offsetX = ((calH*2400) - winW)/2;
			$(".imgContainer").css("transform","translate3d(-"+offsetX+"px, 0px, 0px) scale("+calH+","+calH+")");
		}
		
	}
	
	/**
	 * Adapte le contenu lors du chargement de la page et lorsque l'on modifie la taille de la fenetre
	 */
	$( window ).on("resize load",function() {
		adaptContent();
	});
	
}());
