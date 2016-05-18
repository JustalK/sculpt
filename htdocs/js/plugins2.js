$( document ).ready(function() {

	// Variable pour le script
	var numberImg = $(".back-image").length;
	var numImgCollection = $(".imageCatalogue").length
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
	var once = false;
	var sizeImg = 0;
	$("#bmenu2").click(function() {
		$("#menu2").css("display","block");	
		$("#bemenu1").css("display","none");		
		$("#bmenu1").css("display","none");			
		$("#bmenu2").css("display","none");
		$("#menu2").animate({"opacity":"0.8"},500,function(){
			$("#menu2").animate({"width":"90%"},{ duration: 100, queue: false });
			$("#menu2").animate({"height":"90%"},{ duration: 100, queue: false, complete: function() {
				imgCatalogue = 0;
				$(".imageCatalogue").each(function() {
					$(this).css("display","block");
					$(this).css("left","0px");
					$(this).css("opacity","0");
				});
				if(!once) {
					once = true;
					sizeImg = $(".imageCatalogue").eq(0).width();
				}
				$(".imageCatalogue").each(function(index) {
					if(index==0) {
						$(this).css("width",sizeImg/2);
						slotleft = sizeImg/2;
						$(this).css("left","0px");
					} else if(index==1) {
						$(this).css("width",sizeImg);
						slotmiddle = $("#menu2").width()/2-sizeImg/2;
						$(this).css("left",slotmiddle+"px");
					} else {
						$(this).css("width",sizeImg/2);
						slotright = $("#menu2").width()-sizeImg/2;
						$(this).css("left",slotright+"px");
					}
					if(index<3) {
						$(this).css("display","block");
						$(this).animate({"opacity":"1"},100);
					}
				});
			} });
			
		});
	});
	

	$("#bmenu2ext").click(function() {
		$(".imageSlide").each(function() {
			$(this).animate({"opacity":"0"},100,function() {
				$(this).css("display","none");
			});
		});
		$("#menu2").animate({"width":"100%"},{ duration: 100, queue: false });
		$("#menu2").animate({"height":"100%"},{ duration: 100, queue: false });	
		$("#menu2").animate({"opacity":"0"},{ duration: 300, queue: false, complete: function() {
			$("#menu2").css("display","none");		
			$("#bmenu1").css("display","block");			
			$("#bmenu2").css("display","block");
		}});
		
	});
	
	
	// Affichage du menu 1
	var menu2visible = false;
	$("#bmenu1,#bemenu1ext").click(function() {
		$(".imageSlide").each(function(index) {
			$(this).animate({"opacity":"0"},100,function() {
				$(this).css("display","none");
			});
		});
		$("#menu1").css("display","block");		
		$("#bemenu1").css("display","block");		
		$("#bmenu1").css("display","none");			
		$("#bmenu2").css("display","none");
		if($("#menu2").is(':visible')) {
			$("#menu2").css("display","none");	
			menu2visible=true;
		}
		$("#bmenu1").animate({"opacity":"0"},{ duration: 100, queue: false });
		$("#menu1").animate({"opacity":"0.8"},{ duration: 100, queue: false });
		$("#menu1").animate({"width":"90%"},{ duration: 300, queue: false });
		$("#menu1").animate({"height":"90%"},{ duration: 300, queue: false });
	});
	
	
	
	// Suppression d'affichage du menu 1
	$("#bemenu1").click(function() {
			
			if(menu2visible) {
				$("#menu2").css("display","block");	
				menu2visible=false;
				$(".imageSlide").each(function() {
					$(this).css("display","block");
					$(this).animate({"opacity":"1"},100);
				});
			} else {
				$("#bmenu1").css("display","block");
				$("#bmenu2").css("display","block");
				$(".imageSlide").each(function() {
					$(this).animate({"opacity":"0"},100,function() {
						$(this).css("display","none");
					});
				});
			}
			$("#bmenu1").animate({"opacity":"1"},{ duration: 100, queue: false });
			$("#menu1").animate({"opacity":"0"},{ duration: 100, queue: false, complete: function(){
				$("#menu1").css("display","none");	
				$("#bemenu1").css("display","none");	
			}});
			$("#menu1").animate({"width":"100%"},{ duration: 300, queue: false });
			$("#menu1").animate({"height":"100%"},{ duration: 300, queue: false });
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
	
	var imgCollection = 0;
	var imgInterract = 0;
	var offsetcollection = 200;
	var slotleft = -$(".imageSlide").first().width()+offsetcollection;
	var slotmiddle = $("#menu2").width()/2-$(".imageCatalogue").first().width()/2;
	var slotright = ($(window).width()-$(".imageSlide").first().width())+$(".imageSlide").first().width()-offsetcollection;
	
	var jewelries = [];
	var imgCollection = 0;
	$(".imageCatalogue").each(function() {
		jewelries.push($(this));
	});
	
	$("#arrowLeft").click(function() {
		$(".imageCatalogue").each(function(index) {
			console.log(imgCollection);
			if(imgCollection==numImgCollection-2) {
				if(index==0) {
					$(this).animate({"width" : $(this).width()*2},{duration:300, queue: false});
					$(this).animate({"left":slotmiddle+"px"},{duration:300, queue: false, complete: function() {
						$(".imageCatalogue").eq(1).css("left",slotright+"px");
						$(".imageCatalogue").eq(1).animate({"opacity" : "1"},{duration:300, queue: false});
					}});
				}	
				if(index==numImgCollection-1) {
					$(this).animate({"width" : $(this).width()/2},{duration:300, queue: false});
					$(this).animate({"left":"0px"},{duration:300, queue: false});
				}
				if(index==numImgCollection-2) {
					$(this).animate({"opacity" : "0"},{duration:300, queue: false, complete: function() {
						$(this).css("left",slotright+"px");
					}});
				}
			} else if(imgCollection==numImgCollection-1) {
				if(index==numImgCollection-1) {
					$(this).animate({"opacity" : "0"},{duration:300, queue: false, complete: function() {
						$(this).css("left",slotright+"px");
					}});
				}			
				if(index==0) {
					$(this).animate({"width" : $(this).width()/2},{duration:300, queue: false});
					$(this).animate({"left":"0px"},{duration:300, queue: false});
				}
				if(index==1) {
					$(this).animate({"width" : $(this).width()*2},{duration:300, queue: false});
					$(this).animate({"left":slotmiddle+"px"},{duration:300, queue: false, complete: function() {
						$(".imageCatalogue").eq(2).css("left",slotright+"px");
						$(".imageCatalogue").eq(2).animate({"opacity" : "1"},{duration:300, queue: false});
						imgCollection=0;
					}});
				}
			} else {
				if(index==imgCollection) {
					$(this).animate({"opacity" : "0"},{duration:300, queue: false, complete: function() {
						$(this).css("left",slotright+"px");
					}});
				}
				if(index==imgCollection+1) {
					$(this).animate({"width" : $(this).width()/2},{duration:300, queue: false});
					$(this).animate({"left":"0px"},{duration:300, queue: false});
				}	
				if(index==imgCollection+2) {								
					$(this).animate({"width" : $(this).width()*2},{duration:300, queue: false});
					$(this).animate({"left":slotmiddle+"px"},{duration:300, queue: false, complete: function() {
						$(".imageCatalogue").eq(imgCollection+2).animate({"opacity" : "1"},{duration:300, queue: false});
						if(imgCollection==numImgCollection-2) {
							$(".imageCatalogue").eq(0).css("left",slotright+"px");
							$(".imageCatalogue").eq(0).animate({"opacity" : "1"},{duration:300, queue: false});
						}
					}});
				}
			}
		});
		imgCollection++;
	});
	
	$("#arrowRight").click(function() {
		$(".imageCatalogue").each(function(index) {
			if(imgCollection==0) {
				if(index==0) {
					$(this).animate({"width" : $(this).width()*2},{duration:300, queue: false});
					$(this).animate({"left":slotmiddle+"px"},{duration:300, queue: false, complete: function() {
						$(".imageCatalogue").eq(numImgCollection-1).css("left","0px");
						$(".imageCatalogue").eq(numImgCollection-1).animate({"opacity" : "1"},{duration:300, queue: false});
					}});
				}
				if(index==1) {
					$(this).animate({"width" : $(this).width()/2},{duration:300, queue: false});
					$(this).animate({"left":slotright+"px"},{duration:300, queue: false});
				}
				if(index==2) {
					$(this).animate({"opacity" : "0"},{duration:300, queue: false});
				}
			} else if(imgCollection==4) {
				if(index==0) {
					$(this).animate({"width" : $(this).width()/2},{duration:300, queue: false});
					$(this).animate({"left":slotright+"px"},{duration:300, queue: false});
				}
				if(index==1) {
					$(this).animate({"opacity" : "0"},{duration:300, queue: false});
				}
				if(index==numImgCollection-1) {
					$(this).animate({"width" : $(this).width()*2},{duration:300, queue: false});
					$(this).animate({"left":slotmiddle+"px"},{duration:300, queue: false, complete: function() {
						$(".imageCatalogue").eq(numImgCollection-2).css("left","0px");
						$(".imageCatalogue").eq(numImgCollection-2).animate({"opacity" : "1"},{duration:300, queue: false});
					}});
				}		
			} else {
				if(index==imgCollection) {					
					$(this).animate({"width" : $(this).width()*2},{duration:300, queue: false});
					$(this).animate({"left":slotmiddle+"px"},{duration:300, queue: false, complete: function() {
						$(".imageCatalogue").eq(imgCollection).css("left","0px");
						$(".imageCatalogue").eq(imgCollection).animate({"opacity" : "1"},{duration:300, queue: false});
					}});
				}
				if(index==imgCollection+1) {
					$(this).animate({"width" : $(this).width()/2},{duration:300, queue: false});
					$(this).animate({"left":slotright+"px"},{duration:300, queue: false});
				}
				if(index==imgCollection+2 || index==0) {
					$(this).animate({"opacity" : "0"},{duration:300, queue: false});
				}
			}

		});
		if(imgCollection==0) {
			imgCollection=4;
		} else {
			imgCollection--;
		}
	});	
	
});







