

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
// ##  Tabs for the textbox   ##
// #############################


//// FIRST TAB

function doSetTimeout(i){

    // var thisSvg  = $("#tab1_SVG");
    // var elements = thisSvg.children();

    // setTimeout(function() { 
    // $(elements[i]).velocity( {
    //     width:"-=10"
    // })
    // })
}

function textTabMouseOver() {
    var thisSvg  = $("#tab1_SVG");
    var elements = thisSvg.children();
    var animSpeed = 30;

    $(thisSvg).velocity({fill:'#ffffff'})

    for (var i = 0; i<elements.length; i++) {

        (function(i) {
        setTimeout(function() {
            $(elements[i]).velocity( {
            width:"-=10"
        })
        }, animSpeed * i);
        })(i);

     }
setTimeout(function() {
     for (var i = 0; i<elements.length; i++) {

        (function(i) {
        setTimeout(function() {
            $(elements[i]).velocity( {
            width:"+=10"
        })
        }, animSpeed * i);
        })(i);

     }
     }, animSpeed * elements.length);
}
function textTabMouseOut() {

    var thisSvg = $("#tab1_SVG");

    var elements = thisSvg.children();
    var origFill = thisSvg.attr('fill');

if(!isTextTabSelected | (isStatsticTabSelected && !isTextTabSelected))
    thisSvg.velocity({fill:origFill})


}

//// SECOND TAB

var isStatsticTabSelected = false;
function statisticsTabMouseOver() {

if(!isStatsticTabSelected) {
    // First bar
    var firstElement = $("#tab2_SVG").children().first();
    $(firstElement).velocity({
        fill:"#ffffff",
        height:48,
        y:"-=10"
    })

    // Second bar
    var secondElement = firstElement.next();
    $(secondElement).velocity({
        fill:"#ffffff",
        height:32.4,
        y:"+=30px"
    })
    // Third bar
    var thirdElement = secondElement.next();
    $(thirdElement).velocity({
        fill:"#ffffff",
        height:58.4,
        y:"-=35px"
    })
    // Fourth bar
    var fourthElement = thirdElement.next();
    $(fourthElement).velocity({
        fill:"#ffffff",
        height:20.8,
        y:"+=30px"
    })
}
}
var isTextTabSelected = false;
function statisticsTabMouseOut() {

if(!isStatsticTabSelected | (isTextTabSelected && !isStatsticTabSelected)) {

 var origFill = $("#tab2_SVG").attr('fill'); 

    // First bar
    var firstElement = $("#tab2_SVG").children().first();
    $(firstElement).velocity({
        fill:origFill,
        height:38,
        y:"+=10"
    })

    // Second bar
    var secondElement = firstElement.next();
    $(secondElement).velocity({
        fill:origFill,
        height:62.4,
        y:"-=30px"
    })
    // Third bar
    var thirdElement = secondElement.next();
    $(thirdElement).velocity({
        fill:origFill,
        height:23.4,
        y:"+=35px"
    })
    // Fourth bar
    var fourthElement = thirdElement.next();
    $(fourthElement).velocity({
        fill:origFill,
        height:50.8,
        y:"-=30px"
    })
}
}

$('#tab-container').easytabs();
$('#tab1').hover(textTabMouseOver, textTabMouseOut)
$('#tab2').hover(statisticsTabMouseOver,statisticsTabMouseOut);

$('#tab2').click(function() {

        $('#tab-container').easytabs('select', '#curtainContentStatisticsTab');
        isStatsticTabSelected = true;  
        isTextTabSelected = false;
        textTabMouseOut();
})

$('#tab1').click(function() {
    if(isStatsticTabSelected) {
        $('#tab-container').easytabs('select', '#curtainContentTextTab');
        isTextTabSelected = true;
        isStatsticTabSelected = false;       
        statisticsTabMouseOut();
    }
})

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
var bottomOffsetFlag = true;
function addSlideContent(this_, trigger) {

        var nextSlide = this_.next();
        var curtainContentContainer = this_.children().children();
        var curtainContentBackground = curtainContentContainer.children().first();
        var curtainContent = curtainContentBackground.next();
        var mapContainer = curtainContent.next();

        // If the trigger is 80% visible on screen fadeIn the content
        if(trigger.isOnScreen(0.8,0.8) && (!nextSlide.isOnScreen(0,0))) {
            if(scrollTrigger === true) {
                $("body").disablescroll();
            }
                setTimeout(function(){ $("body").disablescroll("undo"); scrollTrigger = false; }, 1500);

            curtainContentBackground.addClass("curtainContentBackgroundVis"); // Fades the background under the text
            curtainContent.addClass("curtainContentVis"); // Fades the text content of the curtain

            $("#headerSlideContainer").addClass("slideHeaderVis"); // Shows the header of the current slide

            $(".curtainContentTabInner").mCustomScrollbar("update");


            if(bottomOffsetFlag === true) {

                var this_ = $('.map_container');
                
                var bottom = findOffsetTop()

                setTimeout(function(){
                    $('.map_container').css({bottom:bottom})
                bottomOffsetFlag = false; }, 250);
            } 
            fadeMapIn();                         

        }
        else {
            $('.map_container').css({bottom:0}) // Get the map container to its original position

            bottomOffsetFlag = true;
            $(".curtainContentTabInner").mCustomScrollbar("disable");

            scrollTrigger = true;
            curtainContentBackground.removeClass("curtainContentBackgroundVis");
            curtainContent.removeClass("curtainContentVis");

            fadeMapOut();

            $("#headerSlideContainer").removeClass("slideHeaderVis");
        }

        // If the trigger is visible only half of the screen reduce scroll speed
        if(trigger.isOnScreen(0.5,0.5)) {
            //jQuery.scrollSpeed(20, 800);
        }
}


function adjustTextContent() {
    //$('.curtainContent').
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



        $(".curtainContentTabInner").mCustomScrollbar({ 
            axis:"y", // horizontal scrollbar
            scrollbarPosition: "outside"
        });

        $(".curtainContentTabInner").mCustomScrollbar("disable"); // Start disabled to prevent scrolling issues





// #######################
// ##  Interactive map  ##
// #######################

map = L.map('map', {
        maxZoom: 6
}).setView([30, 15], 1);


L.tileLayer('http://localhost/uniProjekt_klimaindex/tiles/{z}/{x}/{y}.png', {
    attribution: '&copy; Manuel Strohmaier'
}).addTo(map);



var utfGrid = new L.UtfGrid('http://localhost/uniProjekt_klimaindex/tiles/{z}/{x}/{y}.grid.json', {
    useJsonP: false
});

utfGrid.on('click', function (e) {

    $('#tab-container').easytabs('select', '#curtainContentStatisticsTab');
    statisticsTabMouseOver();
    isStatsticTabSelected = true; 
    isTextTabSelected = false;
    textTabMouseOut();


    //click events are fired with e.data==null if an area with no hit is clicked
    if (e.data) {
            $("#curtainContentStatisticsTabInner").text('click: ' + e.data["2011"] + " // " + e.data.NAME);
    } else {
        alert('click: nothing');
    }
});

map.addLayer(utfGrid);

function fadeMapIn() {
    $('.map_container').addClass('map_containerVis')

    setTimeout(function(){ 
        map.invalidateSize(false);
    }, 510); // After animation from css have done

}

function fadeMapOut() {
    $('.map_container').removeClass('map_containerVis') 
}

var flag = 0;
function expandMap() {


        var newHeight = findHeightTop(),
            newWidth = findWidthLeft() + $('.map_container').width();

        if(flag==0) {

            $('.map_container').height(newHeight)
            $('.map_container').width(newWidth);
            $('.resizeMapButton').addClass('resizeMapButtonZoomout');
            map.setZoom(2);

        flag=1;

        setTimeout(function(){ 
            map.invalidateSize(false);  
        }, 510); // Resize if css ease has done

        return;
        }

        if(flag==1) {

            $('.map_container').css({height:""})
            $('.map_container').css({width:""})
            $('.resizeMapButton').removeClass('resizeMapButtonZoomout');
            map.setZoom(1);

        flag=0;

        setTimeout(function(){ 
            map.invalidateSize(false);  
        }, 510); // Resize if css ease has done

        return;
        }
}

function findHeightTop() {

    var thisMap = $('.map_container');

    var windowHeight = $(window).height(),
        heightOfTopElements = $("#header").height() + $("#headerSlideContent").height();

    var distance = windowHeight - heightOfTopElements;

    return distance;  

}

function findWidthLeft() {

    var thisMap = $('.map_container');

    var widthOfLeftElements = $(".curtainContentBackground").width(),
        thisElementsWidth = thisMap.width(),
        windowWidth = $(window).width();

    var distance = windowWidth - (thisElementsWidth + widthOfLeftElements);

    return distance;  

}

function findOffsetTop() {

    var thisMap = $('.map_container');

    var heightOfTopElements = $("#header").height() + $("#headerSlideContent").height();

    var scrollTop = $(window).scrollTop(),
        windowHeight = $(window).height(),
        thisElementsTopOffset = thisMap.offset().top,
        distanceToTopOfWindow = (thisElementsTopOffset - scrollTop),
        heightOfTruncated = windowHeight - distanceToTopOfWindow;

    var distance = thisMap.height() - heightOfTruncated;

    return distance;  

}

$('.resizeMapButton').click(function() {
    expandMap();
})

});
