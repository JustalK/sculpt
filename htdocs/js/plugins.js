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
	
	function secondSlide() {
		if(positionTopScroll>50) {
			var cal = 2*(positionTopScroll - 50);
			$("#secondSlideText1").css("top","calc(100% - "+cal+"px)");
				if(cal/250<0.5) {
					$("#backgroundSlideText1").css("opacity",cal/250);
				}
			if($("#secondSlideText1").css("top")<-($(window).height()*50/100)) {
				$("#backgroundSlideText1").css("opacity",cal/250);
			}
			console.log(($(window).height()*50/100)+" "+$("#secondSlideText1").css("top"));
		}
	}
	
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
				$("#topbar").animate({"top":"-"+$("#firstTopBar").height()+"px"},100);
			}
		} else {
			if (!$("#topbar").is(':animated')) {
				$("#topbar").clearQueue();
				$("#topbar").stop();
				$("#topbar").animate({"top":"0px"},100);
			}
		}
		lastScrollTop = st;
	});
	
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
		$(".imgContainer").css("transform","translate3d(0px, 0px, 0px) scale("+calW+","+calW+")");
		console.log($(".imgHolder")[0].getBoundingClientRect().height+" "+$(".imgContainer")[0].getBoundingClientRect().height);
		if($(".imgContainer")[0].getBoundingClientRect().height<winH || $(".imgHolder")[0].getBoundingClientRect().height<$(".imgContainer")[0].getBoundingClientRect().height) {
			var offsetX = ((calH*1440) - winW)/2;
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
