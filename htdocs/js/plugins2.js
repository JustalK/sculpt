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
    			$("#title").css("color","#FFFFFF");
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
	    			$("#title").css("color","#000000");
					state=i;
				}
				calcul = $(".cache:eq("+(i-2)+")").height();
			}
		}
	}
	
	$( window ).on("resize load",function() {
		init();
	});
	
	// Affichage du menu 2
	
	
	// Affichage du menu 1
	$("#bmenu1").click(function() {
		$("#menu1").css("display","block");		
		$("#bemenu1").css("display","block");		
		$("#bmenu1").css("display","none");			
		$("#bmenu2").css("display","none");	
		$("#bmenu1").animate({"opacity":"0"},{ duration: 50, queue: false });
		$("#menu1").animate({"opacity":"0.8"},{ duration: 50, queue: false });
		$("#menu1").animate({"width":"90%"},{ duration: 100, queue: false });
		$("#menu1").animate({"height":"90%"},{ duration: 100, queue: false });
	});
	
	// Suppression d'affichage du menu 1
	$("#bemenu1").click(function() {	
		$("#bmenu1").css("display","block");
		$("#bmenu2").css("display","block");		
		$("#bmenu1").animate({"opacity":"1"},{ duration: 50, queue: false });
		$("#menu1").animate({"opacity":"0"},{ duration: 50, queue: false, complete: function(){
			$("#menu1").css("display","none");	
			$("#bemenu1").css("display","none");	
		}});
		$("#menu1").animate({"width":"100%"},{ duration: 100, queue: false });
		$("#menu1").animate({"height":"100%"},{ duration: 100, queue: false });
	});	
	
	init();
	function init() {
		heightCache = 0;
		$(".cache").each(function() {
			heightCache += $(this).height();
		});
		$("body").css("height",numberImg*$(window).height()+offsetBetweenSlide*numberImg+heightCache+"px");
		
		//Angle
		$(".tbl").css("border-left",$(window).width()+"px solid transparent");
		$(".tbr").css("border-right",$(window).width()+"px solid transparent");
		$(".ttr").css("border-right",$(window).width()+"px solid transparent");
		$(".ttl").css("border-left",$(window).width()+"px solid transparent");
		
		$(".tbl").each(function() {
			$(this).css("top",-100+"px");
		});

		$(".tbr").each(function() {
			$(this).css("top",-100+"px");
		});		
		
		$(".ttr").each(function(index) {
			$(this).css("top",$(".cache:eq("+index+")").height()+"px");
		});
		
		$(".ttl").each(function(index) {
			$(this).css("top",$(".cache:eq("+index+")").height()+"px");
		});
		
		// Set the position of all the slide
		var positionSlide = $(window).height()+offsetBetweenSlide;
		$(".cache").each(function(index) {
			$(this).css("top",positionSlide+"px");
			positionSlide += $(window).height()+$(this).height()+offsetBetweenSlide;
		});
		$("#footer").css("top",positionSlide-$(window).height()-offsetBetweenSlide+"px");
		
		// Set the first image to display
		$("#img1").css("display","block");
		$(".back-image").not("#img1").each(function() {
			$(this).css("display","none");
		});

		positionTopScroll = $(window).scrollTop();
		transition();
	}
});







