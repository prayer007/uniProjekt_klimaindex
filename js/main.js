

$(window).load(function() {
    NProgress.done(); // Finisch the progress load if all window content has been loaded
    $(".progressWindow").remove();
});

$(document).ready(function() {

    //jQuery.scrollSpeed(100, 800);


    NProgress.start(); // Start the progress bar if the body is known


    var windowHeight = $(window).height(); // Height of the current viewport
	// Initialize Skrollr for parallax scrolling
	var s = skrollr.init({
        render: function(data) {
            //console.log(data.curTop);
        }
    });

var triggerHeight = $(window).height(); // Trigger to show the content inside the slides
$(".trigger").css("height",triggerHeight);


// #############################
// ##  Minimalize the header  ##
// #############################

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
// ##  FadeIn the content of each slide ##
// #######################################


var scrollTrigger = true;
$(window).on("scrollstop", {latency: 0}, function() {


        // SLIDE 2
        var slide2 = $("#slide-2");
        var trigger = $("#triggerSlide2");
        if(slide2.isOnScreen(0.3,0.3)) { 
            $(".chapter").removeClass("chapterSelected");
            $("#chapter2").addClass("chapterSelected");
            addSlideContent(slide2, trigger); 
        } 

        // SLIDE 3
        var slide3 = $("#slide-3");
        var trigger = $("#triggerSlide3");
        if(slide3.isOnScreen(0.3,0.3)) { 
            $(".chapter").removeClass("chapterSelected");
            $("#chapter3").addClass("chapterSelected");
            addSlideContent(slide3, trigger); 
        } 

        // SLIDE 4
        var slide4 = $("#slide-4");
        var trigger = $("#triggerSlide4");
        if(slide4.isOnScreen(0.3,0.3)) { 
            $(".chapter").removeClass("chapterSelected");
            $("#chapter4").addClass("chapterSelected");
            addSlideContent(slide4, trigger); // Only excute this function if the slide is on screen,
        }                                     // else each funtion will be triggered and impair performance

         // SLIDE 5
        var slide5 = $("#slide-5");
        var trigger = $("#triggerSlide5");
        if(slide5.isOnScreen(0.3,0.3)) {        
            $(".chapter").removeClass("chapterSelected");
            $("#chapter5").addClass("chapterSelected");
            addSlideContent(slide5, trigger);
        }

  });


// Adds content and animation to each slide
function addSlideContent(this_, trigger) {

        var nextSlide = this_.next();
        var curtainContentContainer = this_.children().children();
        var curtainContentBackground = curtainContentContainer.children().first();
        var curtainContent = curtainContentBackground.next();
        var mapContainer = curtainContent.next();
        console.log(mapContainer)

        // If the trigger is 80% visible on screen fadeIn the content
        if(trigger.isOnScreen(0.8,0.8) && (!nextSlide.isOnScreen(0,0))) {
            if(scrollTrigger === true) {
                $("body").disablescroll();
            }
                setTimeout(function(){ $("body").disablescroll("undo"); scrollTrigger = false; }, 1500);

            curtainContentBackground.addClass("curtainContentBackgroundVis"); // Fades the background under the text
            curtainContent.addClass("curtainContentVis"); // Fades the text content of the curtain
            mapContainer.addClass('map_containerVis')
            $("#headerSlideContainer").addClass("slideHeaderVis"); // Shows the header of the current slide

            $(".curtainContent").mCustomScrollbar("update");
        }
        else {

            $(".curtainContent").mCustomScrollbar("disable");

            scrollTrigger = true;
            curtainContentBackground.removeClass("curtainContentBackgroundVis");
            curtainContent.removeClass("curtainContentVis");
            mapContainer.removeClass('map_containerVis');
            $("#headerSlideContainer").removeClass("slideHeaderVis");
        }

        // If the trigger is visible only half of the screen reduce scroll speed
        if(trigger.isOnScreen(0.5,0.5)) {
            //jQuery.scrollSpeed(20, 800);
        }
}



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


// #######################
// ##  Navigation bar   ##
// #######################




$(".chapter").click(function() {

    var id = $(this).attr('id');
    var sectionChapter = id.slice(-1);
    var scrollTo = "#" + "slide-" + sectionChapter;  
    
    var height = $(scrollTo).height()/2; 
    var padding = $(scrollTo).height()/16; // Using relative values ensures that the text appears in the middle of the screen
    var position = $(scrollTo).position().top;  
    var bottom = position + height-padding;

    $('html, body').animate({
        scrollTop: bottom
    }, 1000);

});



        $(".curtainContent").mCustomScrollbar({ 
            axis:"y" // horizontal scrollbar
        });

        $(".curtainContent").mCustomScrollbar("disable"); // Start disabled to prevent scrolling issues



// #######################
// ##  Interactive map  ##
// #######################

var map = L.map('map', {
        maxZoom: 6
}).setView([30, 15], 1);


L.tileLayer('http://localhost/uniProjekt_klimaindex/tiles/{z}/{x}/{y}.png', {
    attribution: '&copy; Manuel Strohmaier'
}).addTo(map);

function findOffsetTop() {

    var thisMap = $('.map_container');

    var heightOfTopElements = $("#header").height() + $("#headerSlideContent").height();

    var scrollTop = $(window).scrollTop(),
        thisElementsTopOffset = thisMap.offset().top;
        distanceToTopOfWindow = (thisElementsTopOffset - scrollTop);

    var distance = distanceToTopOfWindow - heightOfTopElements;

    return distance;  

}

$('.resizeMapButton').click(function() {

    height = findOffsetTop() + $(this).parent().height(); 
    $(this).parent().height(height);
    map.invalidateSize(false);
})

});
