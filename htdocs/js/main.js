$( document ).ready(function() {
	$('#msg').each(function() {
	    var elem = $(this);
	    setInterval(function() {
	        if (elem.css('opacity') == '0.7') {
	            elem.animate({"opacity":"1"},1000);
	        } else {
	            elem.animate({"opacity":"0.7"},1000);
	        }    
	    }, 1500);
	});
});