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




// #######################################
// ##  Animate the social media logos   ##
// #######################################

    // Facebook Logo
    animateSvgLogo("#fb_logo", "#3B5998")

    // Twitter Logo
    animateSvgLogo("#twitter_logo", "#2AA9E0")

    // Google Logo
    animateSvgLogo("#google_logo", "#DD4B39")

    // About Logo
    animateSvgLogo("#about_logo", "#000000")

    // Impressum Logo
    animateSvgLogo("#impressum_logo", "#000000")


// Function to animte the svg logo

var complete = true;
function animateSvgLogo(id, color) {

    $(id).hover(function() {

        if(complete === true) { // Only start a new animation if the last finished
            complete = false;

    $(id).find("path").velocity({
        fill: color
    }, {
        complete: function() {complete = true} })

    }},
    function() {
        $(id).find("path").velocity({
        fill: originColor // Variable got from fileLoader.js
        })
    });
}

});
