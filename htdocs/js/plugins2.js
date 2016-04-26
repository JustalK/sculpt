$( document ).ready(function() {

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
		    		$(".back-image").each(function() {
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

	var goToSlide1 = $(window).height();
	var goToSlide2 = 3*$(window).height();
	var state = 1;
	function transition() {
		//console.log(positionTopScroll+" "+goToSlide1);
		if(positionTopScroll<goToSlide1 && state!=1) {
			$("#img1").css("display","block");
    		$(".back-image").not("#img1").each(function() {
    			$(this).css("display","none");
    		});
			state=1;
		}
		if(positionTopScroll>goToSlide1 && state!=2) {
			$("#img2").css("display","block");
    		$(".back-image").not("#img2").each(function() {
    			$(this).css("display","none");
    		});
			state=2;
		}
		if(positionTopScroll>goToSlide2 && state!=3) {
			$("#img3").css("display","block");
    		$(".back-image").not("#img3").each(function() {
    			$(this).css("display","none");
    		});
			state=3;
		}
	}
	
	$( window ).on("resize",function() {
		init();
	});
	
	init();
	function init() {
		//Angle
		$(".tbl").css("border-left",$(window).width()+"px solid transparent");
		$(".ttr").css("border-right",$(window).width()+"px solid transparent");
		
		$(".tbl").each(function() {
			$(this).css("top",-100+"px");
		});
		
		$(".ttr").each(function() {
			$(this).css("top",$(window).height()+"px");
		});
		// Set the position of all the slide
		var positionSlide = $(window).height();
		$(".cache").each(function() {
			$(this).css("top",positionSlide+"px");
			positionSlide += 2*$(window).height();
		});
		
		// Set the first image to display
		$("#img1").css("display","block");
		$("#img2").css("display","none");
		$("#img3").css("display","none");
		
		// Set the limite
		goToSlide1 = $(window).height();
		goToSlide2 = 3*$(window).height();
		

		positionTopScroll = $(window).scrollTop();
		transition();
	}
});







