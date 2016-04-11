// Avoid `console` errors in browsers that lack a console.
(function() {
	var oldPositionTopScroll=0;
	var positionTopScroll=0;
	$(window).scroll(function(event) {
		// Get the value of the scroll position
		positionTopScroll = $(window).scrollTop();
		slide1();
		slide2();
		slide3();
	});
	
	/**
	 * =======================================================================================>
	 * SLIDE 1
	 * =======================================================================================>
	 */
	var VITESSE_SLIDE_1 = 10;
	function slide1() {
		$("#firstSlide").css("top",-VITESSE_SLIDE_1*$(window).scrollTop()+"px");
	}
	
	var endPositionSlide1;
	function endSlide1() {
		endPositionSlide1 = $(window).height()/VITESSE_SLIDE_1;
	}

	/**
	 * =======================================================================================>
	 * SLIDE 2
	 * =======================================================================================>
	 */	
	
	var VITESSE_SLIDE_2 = 3;
	var PUISSANCE_OPACITY_SLIDE_2 = 0.5;
	var VITESSE_OPACITY_SLIDE_2 = 0.02;
	var OFFSET_SLIDE_2 = 300;
	var OFFSET_TRANSITION_SLIDE_2 = 50;
	function slide2() {
		if(positionTopScroll>endPositionSlide1) {
			// Gere l'ensemble du premier rayon d'opacite...
			var calOpacity = PUISSANCE_OPACITY_SLIDE_2*(1-Math.exp(-VITESSE_OPACITY_SLIDE_2*(positionTopScroll-endPositionSlide1)));
			if(positionTopScroll>endPositionSlide1+OFFSET_SLIDE_2) {
				calOpacity = PUISSANCE_OPACITY_SLIDE_2-VITESSE_OPACITY_SLIDE_2*0.2*(positionTopScroll-endPositionSlide1-OFFSET_SLIDE_2);
			}
			$("#backgroundSlideText1").css("opacity",calOpacity);
			
			
			var calText = VITESSE_SLIDE_2*(positionTopScroll - endPositionSlide1);
			$("#secondSlideText1").css("top","calc(100% - "+calText+"px)");
		} else {
			// Reset l'opacite en dehors du slide
			$("#backgroundSlideText1").css("opacity",0);
		}
	}
	
	var endPositionSlide2;
	function endSlide2() {
		endPositionSlide2 = endPositionSlide1+OFFSET_SLIDE_2+$(window).height()/4;
	}

	/**
	 * =======================================================================================>
	 * SLIDE 3
	 * =======================================================================================>
	 */		
	

	function slide3() {
		/**
		if(positionTopScroll>480) {
			zoom+=0.01;
			var calW = $(".imgHolder").width() / 1440;
			//$(".imgContainer").css("transform","translate3d("+offset+"px, 0px, 0px) scale("+(calW+zoom)+","+(calW+zoom)+")");
		}
		**/
		if(positionTopScroll>endPositionSlide2) {
			var calX = 1800+offset;
			var calY = -800;
			$(".imgContainer").css("transform","translate3d(-"+calX+"px, "+calY+"px, 0px) scale(0.5,0.5)");
			//$(".imgContainer").css("transform","translate3d(-"+calX+"px, "+calY+"px, 0px) scale("+(ratio)+","+(ratio)+")");
			console.log("here");
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
	
	var ratio = 0;
	var offset = 300;
	function adaptContent() {
		$(".imgHolder").each(function( index ) {
			$(this).css("height",$( window ).height()+"px");
		});
		var imgW = $(".imgHolder").width();
		var imgH = $(".imgHolder").height();
		var winW = $(window).width();
		var winH = $(window).height();
		var calW = $(".imgHolder").width() / 6000;
		var calH = $(".imgHolder").height() / 4000;
		$(".imgContainer").css("transform","translate3d(0px, 0px, 0px) scale("+calW+","+calW+")");
		ratio = calW;
		offset = 0;
		if($(".imgContainer")[0].getBoundingClientRect().height<winH || $(".imgHolder")[0].getBoundingClientRect().height<$(".imgContainer")[0].getBoundingClientRect().height) {
			var offsetX = ((calH*6000) - winW)/2;
			ratio = calH;
			offset = offsetX;
			$(".imgContainer").css("transform","translate3d(-"+offsetX+"px, 0px, 0px) scale("+calH+","+calH+")");
		}
		
	}
	
	/**
	 * Adapte le contenu lors du chargement de la page et lorsque l'on modifie la taille de la fenetre
	 */
	$( window ).on("resize load",function() {
		adaptContent();
		endSlide1();
		endSlide2();
	});
}());
