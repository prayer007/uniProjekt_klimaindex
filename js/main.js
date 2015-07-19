

$(window).load(function() {
    NProgress.done(); // Finisch the progress load if all window content has been loaded
    $(".progressWindow").remove();
});

$(document).ready(function() {


    NProgress.start(); // Start the progress bar if the body is known

  console.log(screen.height) 

    var windowHeight = $(window).height(); // Height of the current viewport
	// Initialize Skrollr for parallax scrolling
	var s = skrollr.init({
        render: function(data) {
            //console.log(data.curTop);
        },
                constants: {
            box: '150p'
        }
    });

$(window).on("scrollstop", {latency: 0}, function() {

        if($("#slide-3").isOnScreen(0.9, 0.9)) {
        $("#slide-3-content-plur").addClass("slide-3-content-show");
        $("#slide-3-content").addClass("slide-3-content-show");

        $("#slide-3-content-inner").mCustomScrollbar("update");

    } else if(!$("#slide-3").isOnScreen(0.7, 0.7)){
                 $("#slide-3-content-plur").removeClass("slide-3-content-show");
                 $("#slide-3-content").removeClass("slide-3-content-show");

                 $("#slide-3-content-inner").mCustomScrollbar("disable");
    }

  })

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
    animateSvgLogo("#fb_logo", "#3B5998", 'Share on Facebook')

    // Twitter Logo
    animateSvgLogo("#twitter_logo", "#2AA9E0", 'Share on Twitter')

    // Google Logo
    animateSvgLogo("#google_logo", "#DD4B39", 'Share on Google+')

    // About Logo
    animateSvgLogo("#about_logo", "#000000", 'About')

    // Impressum Logo
    animateSvgLogo("#impressum_logo", "#000000", 'Impressum')


// Function to animte the svg logo

var complete = true;
function animateSvgLogo(id, color, infoWinContent) {

    // Set the tooltip
     $(id).tooltipster({ content: $('<span>' + infoWinContent + '</span>') });

    var thisHover2 = ""; // Hovered same icon second time

        $(id).hover(function() {

    var thisHover = this; // Hovered icon first time

            if(complete === true && thisHover !== thisHover2) { // Only start a new animation if the last finished, 
                                                                // but only if the same image is hovered

     thisHover2 = this;

        $(id).find("path").velocity({
            fill: color
        }, {
            complete: function() {complete = true;  thisHover2 = "";} 
           },
           {
            progress: function() {complete = false;} 
           })

        }},
        function() {
            $(id).find("path").velocity({
            fill: originColor // Variable got from fileLoader.js
            })
        });
}


        $("#slide-3-content-inner").mCustomScrollbar({ 
            axis:"y" // horizontal scrollbar
        });

        $("#slide-3-content-inner").mCustomScrollbar("disable"); // Start disabled to prevent scrolling issues
});
