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
    		    	$("#img1").css("transform","scale("+now+","+now+")");
    		    	$("#img2").css("transform","scale("+now+","+now+")");
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
	var state = 1;
	function transition() {
		//console.log(positionTopScroll+" "+goToSlide1);
		if(positionTopScroll<goToSlide1 && state!=1) {
			console.log("state1");
			$("#img1").css("display","block");
			$("#img2").css("display","none");
			state=1;
		}
		if(positionTopScroll>goToSlide1 && state!=2) {
			state=2;
			console.log("state2");
			$("#img2").css("display","block");
			$("#img1").css("display","none");
		}
	}
});







