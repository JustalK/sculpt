$( document ).ready(function() {

	// Variable pour le script
	var numberImg = $(".back-image").length;
	var heightCache = 0;
	
	// Variable pour savoir sur quel slide on se trouve
	var state = 1;
	
	// Variable pour les slides
	var offsetBetweenSlide = 50;
	
	// Variable pour le zoom
	var timeZoom = 10000;
	var timeBetweenZoom = 200;
	var powerZoom = 1.1;
	var zoomInStart = {"ZoomIn" : "1"};
	var zoomInEnd = {"ZoomIn" : powerZoom};
	var zoomState = true;
	
	zoomin();
	
	function zoomin() {
		jQuery(zoomInStart).animate(zoomInEnd, {
		    duration: timeZoom,
		    step: function(now) {
		    		$(".back-image:visible").each(function() {
	    		    	$(this).css("transform","scale("+now+","+now+")");
		    		});
		    }, 
			complete : function() {
				if(zoomState) {
					zoomState = false;
					zoomInEnd = {"ZoomIn" : "1"};
					zoomInStart = {"ZoomIn" : powerZoom};
				} else {
					zoomState = true;
					zoomInStart = {"ZoomIn" : "1"};
					zoomInEnd = {"ZoomIn" : powerZoom};
				}
				setTimeout(zoomin, timeBetweenZoom);
			}
		});		
	};
	
	var positionTopScroll=0;
	$(window).scroll(function(event) {
		positionTopScroll = $(window).scrollTop();
		transition();
	});

	function transition() {
		if(positionTopScroll<($(window).height()+offsetBetweenSlide)) {
			if(state!=1) {
				$("#img1").css("display","block");
	    		$(".back-image").not("#img1").each(function() {
	    			$(this).css("display","none");
	    		});
    			$("#title").css("display","block");
				state=1;
			}
		} else {
			var calcul = 0;
			for(var i=2;i<numberImg+1;i++) {
				if(positionTopScroll>($(window).height()*(i-1)+offsetBetweenSlide*(i-1)+calcul) && state!=i) {
					$("#img"+i).css("display","block");
		    		$(".back-image").not("#img"+i).each(function() {
		    			$(this).css("display","none");
		    		});
	    			$("#title").css("display","none");
					state=i;
				}
				calcul = $(".cache:eq("+(i-2)+")").height();
			}
		}
	}
	
	$( window ).on("resize",function() {
		init();
	});
	
	init();
	function init() {
		$(".cache").each(function() {
			heightCache += $(this).height();
		});
		$("body").css("height",numberImg*$(window).height()+offsetBetweenSlide*numberImg+heightCache+"px");
		
		//Angle
		$(".tbl").css("border-left",$(window).width()+"px solid transparent");
		$(".ttr").css("border-right",$(window).width()+"px solid transparent");
		
		$(".tbl").each(function() {
			$(this).css("top",-100+"px");
		});
		
		$(".ttr").each(function(index) {
			$(this).css("top",$(".cache:eq("+index+")").height()+"px");
		});
		// Set the position of all the slide
		var positionSlide = $(window).height()+offsetBetweenSlide;
		$(".cache").each(function(index) {
			$(this).css("top",positionSlide+"px");
			positionSlide += $(window).height()*(index+1)+$(this).height()+offsetBetweenSlide;
		});
		
		// Set the first image to display
		$("#img1").css("display","block");
		$(".back-image").not("#img1").each(function() {
			$(this).css("display","none");
		});

		positionTopScroll = $(window).scrollTop();
		transition();
	}
});







