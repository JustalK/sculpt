// Avoid `console` errors in browsers that lack a console.
(function() {
	var oldPositionTopScroll=0;
	var positionTopScroll=0;
	$(window).scroll(function(event) {
		// Get the value of the scroll position
		positionTopScroll = $(window).scrollTop();
		$("#firstSlide").css("top",-10*$(window).scrollTop()+"px");
		secondSlide();
	})
	
	/**
	 * Specialement pour l'animation sur le petit menu
	 */
	var lastScrollTop = 0;
	$(window).scroll(function(event){
		var st = $(this).scrollTop();
		if (st > lastScrollTop){
			if (!$("#topbar").is(':animated')) {
				$("#topbar").clearQueue();
				$("#topbar").stop();
				$("#topbar").animate({"top":"-"+$("#firstTopBar").height()+"px"},200);
			}
		} else {
			if (!$("#topbar").is(':animated')) {
				$("#topbar").clearQueue();
				$("#topbar").stop();
				$("#topbar").animate({"top":"0px"},200);
			}
		}
		lastScrollTop = st;
	});
		
		
	function secondSlide() {
		if(positionTopScroll>100) {
			console.log("yes");
		}
	}
	
	var scrollUp = false;
	function resizeTopBar() {
		/**
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
		**/
	}
	
	function adaptContent() {
		$(".imgHolder").each(function( index ) {
			$(this).css("height",$( window ).height()+"px");
		});
		var imgW = $(".imgHolder").width();
		var imgH = $(".imgHolder").height();
		var winW = $(window).width();
		var winH = $(window).height();
		var calW = $(".imgHolder").width() / 1440;
		var calH = $(".imgHolder").height() / 960;
		$(".imgContainer").css("transform","translate3d(0px, -100px, 0px) scale("+calW+","+calW+")");
		if($(".imgContainer")[0].getBoundingClientRect().height<winH) {
			var offsetX = ((calH*1440) - winW)/2;
			$(".imgContainer").css("transform","translate3d(-"+offsetX+"px, -100px, 0px) scale("+calH+","+calH+")");
		}
		
	}
	
	/**
	 * Adapte le contenu lors du chargement de la page et lorsque l'on modifie la taille de la fenetre
	 */
	$( window ).on("resize load",function() {
		adaptContent();
	});
	
}());
