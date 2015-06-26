$(document).ready(function() {

	// Initialize Skrollr for parallax scrolling
	var s = skrollr.init({
        render: function(data) {
            console.log(data.curTop);
        }
    });

	var windowHeight = $(window).height(); // Height of the current viewport
	var hideHeight = (windowHeight/2)-$("#header").height(); // This is the height where the header gets minimalized 

	$(window).on("scroll", function () {
    if ($(this).scrollTop() >= hideHeight) {
        $("#header").addClass("header_minimalize");
    }
    else {
        $("#header").removeClass("header_minimalize");
    }
});

});
