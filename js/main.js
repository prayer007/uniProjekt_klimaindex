

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



// ###################################
// ##  STYLE Tabs for the textbox   ##
// ###################################


//// FIRST TAB


function textTabMouseOver(svgTab1) {
    var thisSvg  = $("#" + svgTab1);
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
function textTabMouseOut(svgTab1) {

    var thisSvg = $("#" + svgTab1);

    var elements = thisSvg.children();
    var origFill = thisSvg.attr('fill');

    thisSvg.velocity({fill:origFill})
}

//// SECOND TAB

var isStatsticTabSelected = false;
function statisticsTabMouseOver(svgTab2) {



    // First bar
    var firstElement = $("#" + svgTab2).children().first();
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
    });



    // Fourth bar
    var fourthElement = thirdElement.next();
    $(fourthElement).velocity({
        fill:"#ffffff",
        height:20.8,
        y:"+=30px"
    })
}

var isTextTabSelected = false;
function statisticsTabMouseOut(svgTab2) {


 var origFill = $("#" + svgTab2).attr('fill'); 

    // First bar
    var firstElement = $("#" + svgTab2).children().first();

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

// ####################################
// ##  Create Tabs for the textbox   ##
// ####################################
var textTabMouseOverFlag = 0;
function enableTabs(tabContainer, tab1 ,tab2, etab1, etab2, svgTab1, svgTab2) {
$("#" + tabContainer).easytabs();

// if(textTabMouseOverFlag === 0) {    // Select it only once on start
//     textTabMouseOver(svgTab1); // Start with tab1 selected
//     textTabMouseOverFlag = 1;
// }

isStatsticTabSelected = true;
isTextTabSelected = false;
var isStart = true;

$("#" + tab1).click(function(){
    $("#" + tabContainer).easytabs('select', etab1);
    isTextTabSelected = true;
    if(isStatsticTabSelected) {
        textTabMouseOver(svgTab1);
    }
    if(isStatsticTabSelected && !isStart) {
        statisticsTabMouseOut(svgTab2);
    }
    isStatsticTabSelected = false;
    isStart = false;

});
$("#" + tab2).click(function(){
    $("#" + tabContainer).easytabs('select', etab2);
    isStatsticTabSelected = true;
    if(isTextTabSelected)
        statisticsTabMouseOver(svgTab2);
    textTabMouseOut(svgTab1);
    isTextTabSelected = false;
});
}


$( "section" ).each(function() {
  var sectionId = $(this).attr('id');

  var tabContainerId = $("#" + sectionId).find(".tab-container").attr("id"),
      tab1Id = $("#" + tabContainerId).find(".tabs1").attr("id"),
      tab2Id = $("#" + tabContainerId).find(".tabs2").attr("id"),
      etab1 = $("#" + tabContainerId).find("a:first").attr("href"),
      etab2 = $("#" + tabContainerId).find("a:last").attr("href"),
      svgTab1 = $("#" + sectionId).find("svg:first").attr("id"),
      svgTab2 = $("#" + sectionId).find("svg:last").attr("id");

  console.log(tabContainerId + " " + tab1Id + " " + tab2Id + " " + etab1 + " " + etab2 + " " + svgTab1 + " " + svgTab2); 

  enableTabs(tabContainerId, tab1Id, tab2Id, etab1, etab2, svgTab1, svgTab2);

});




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
            console.log("asdf")
            doAutoScroll(trigger);
        } 


        // SLIDE 3
        var slide3 = $("#slide-3");
        var trigger = $("#triggerSlide3");
        if(slide3.isOnScreen(0.3,0.3)) { 
            $(".chapter").removeClass("chapterSelected");
            $("#chapter3").addClass("chapterSelected");
            addSlideContent(slide3, trigger); 
            doAutoScroll(trigger); 
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

var doAutoScrollTriggerFlag = 0;

function doAutoScroll (trigger) {

    var height = $(".curtainHeaderContainer ").height();
    var parentSection = trigger.closest('section'); 
    var nextSlide = parentSection.next();

    if(trigger.isOnScreen(0.5,0.5) && doAutoScrollTriggerFlag === 0) {
        $(window).scrollTo(trigger, {duration: 500, offset:-height});
        doAutoScrollTriggerFlag = 1; 
    } 
    if(!trigger.isOnScreen(0.1,0.1)) {
        doAutoScrollTriggerFlag = 0;
    }
}

// Adds content and animation to each slide
var bottomOffsetFlag = true;
var selectTabFlag2 = false;
var isSlideOnScreen = false,
    isSlideNotOnScreen = false;

function addSlideContent(this_, trigger) {

        var nextSlide = this_.next(),
            curtainContentContainer = this_.children().children(),
            curtainContentBackground = curtainContentContainer.children().first(),
            curtainContent = curtainContentBackground.next(),
            mapContainer = curtainContent.next();

        var sectionId = $(this_).attr('id'),
            tabContainerId = $("#" + sectionId).find(".tab-container").attr("id"),
            tab1Id = $("#" + tabContainerId).find(".tabs1").attr("id"),
            tab2Id = $("#" + tabContainerId).find(".tabs2").attr("id"),
            etab1 = $("#" + tabContainerId).find("a:first").attr("href"),
            svgTab1 = $("#" + sectionId).find("svg:first").attr("id"),
            svgTab2 = $("#" + sectionId).find("svg:last").attr("id");


        // If the trigger is 80% visible on screen fadeIn the content
        if(trigger.isOnScreen(0.8,0.8) && (!nextSlide.isOnScreen(0,0))) {
            if(isSlideOnScreen === false) { // Trigger the slide in of the content only once to prevent lags
                isSlideOnScreen = true;

                if(scrollTrigger === true) {
                    $("body").disablescroll();
                }
                    setTimeout(function(){ $("body").disablescroll("undo"); scrollTrigger = false; }, 1500);

                curtainContentBackground.addClass("curtainContentBackgroundVis"); // Fades the background under the text
                curtainContent.addClass("curtainContentVis"); // Fades the text content of the curtain

                $("#headerSlideContainer").addClass("slideHeaderVis"); // Shows the header of the current slide

                $(".curtainContentTabInner").mCustomScrollbar("update");
                $(".countryLadderContainer").mCustomScrollbar("update");

                setTimeout(function(){
                    if(bottomOffsetFlag === true) {
                        
                        var bottom = findOffsetTop()

                            $('.map_container').css({bottom:bottom})
                        bottomOffsetFlag = false;
                    } 
                }, 300);


                $("#" + tab1Id).trigger("click"); 

                selectTabFlag2 = false; 
                isSlideNotOnScreen = false;
                fadeMapIn(); 
            }                        

        }
        else {
            if(isSlideNotOnScreen === false) { 
                isSlideNotOnScreen = true;

                $('.map_container').css({bottom:0}) // Get the map container to its original position

                isSlideOnScreen = false;

                if(selectTabFlag2 === false) { 
                    selectTabFlag2 = true; 
                    setTimeout(function(){ 
                        $("#" + tab1Id).trigger("click"); 
                    }, 500); 
                }

                bottomOffsetFlag = true;
                selectTabFlag = false; 

                $(".curtainContentTabInner").mCustomScrollbar("disable");
                $(".countryLadderContainer").mCustomScrollbar("disable");

                scrollTrigger = true;
                curtainContentBackground.removeClass("curtainContentBackgroundVis");
                curtainContent.removeClass("curtainContentVis");


                fadeMapOut();

                $("#headerSlideContainer").removeClass("slideHeaderVis");
            }
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




// ###################
// ##  Scrollbars   ##
// ###################



$(".curtainContentTabInner").mCustomScrollbar({ 
    axis:"y",
    scrollbarPosition: "outside",
    mouseWheel:{ 
        preventDefault: false 
    },
});
$(".countryLadderContainer").mCustomScrollbar({

    mouseWheel:{ 
        preventDefault: true 
    },
    advanced: {
        updateOnContentResize: true
    }
});

$(".curtainContentTabInner").mCustomScrollbar("disable"); // Start disabled to prevent scrolling issues
$(".countryLadderContainer").mCustomScrollbar("disable");




// #######################
// ##  Interactive map  ##
// #######################

map = L.map('map', {
        maxZoom: 6
}).setView([30, 15], 1);


L.tileLayer('tiles/{z}/{x}/{y}.png', {
    attribution: '&copy; Manuel Strohmaier'
}).addTo(map);



var utfGrid = new L.UtfGrid('tiles/{z}/{x}/{y}.grid.json', {
    useJsonP: false
});


//// Tooltip

var tooltip = document.getElementById('mapTooltip');

$("#map").mousemove(function(e) {
    var x = e.clientX,
        y = e.clientY;
    tooltip.style.top = (y - 120) + 'px';
    tooltip.style.left = (x - 196) + 'px';

});


// Mouseover

utfGrid.on('mouseover', function(e) {

    var value = e.data[2011],
        color = setColor(value),
        isoCode = e.data.ISO3; 


    $('#mapTooltipContent').html('<img src="images/flags/' + isoCode + '.png" height="15" width="20">' 
                             +  '<h1>' + e.data.NAME + '</h1>'
                             +  '<span>' + 'CO2 Emissions: ' + '<em style="color:' + color +' ;">' + value + '</em>' + '</span>'  
    )
    $('#mapTooltip').addClass('tooltip_hover')
    $('#tooltipArrow').addClass('tooltip_hover')
});

utfGrid.on('mouseout', function(e) {
    $('#mapTooltip').removeClass('tooltip_hover ')
});

$('#map').on('mouseout', function(e) {
    $('#mapTooltip').removeClass('tooltip_hover ')
});



// Click

utfGrid.on('click', function (e) {


    $("#tab2_slide2").trigger("click");


    if (e.data) {

            var value = e.data[2011],
                color = setColor(value),
                dataset = parseJSON("json/co2_emissions.json"),
                iso3_code = e.data.ISO3,
                rank = getRank(dataset,iso3_code),
                countryNumber = countCountries(dataset);

            $("#tabFirstCountryName").text(e.data.NAME);
            $("#cciScoreFirstCountry").text(value);
            $("#cciScoreFirstCountry").css({color:color});
            $("#rankScoreFirstCountry").text(rank);
            $("#rankScoreFirstCountry").css({color:color});
            $("#totalScoreFirstCountry").text(countryNumber);

        var sortedDataset = getSortedDataset(dataset);
        var ladder ="",
            rank = 1,
            highlight = "transparent",
            highlightFlag = 0,
            idToScroll = "",
            rankToScroll = 0,
            scrollTo = "";


        for(i in sortedDataset) {
            if(sortedDataset[i][2011] !== null) {

                var iso3_code_for_ladder = sortedDataset[i].country_code; 

                if(sortedDataset[i].country_code === iso3_code) {
                    highlight = "grey";
                    idToScroll = "countryToScroll";
                    scrollTo = idToScroll;
                    rankToScroll = rank;
                } else {
                    highlight = "transparent";
                    idToScroll = "";
                }

                ladder += "<tr id='" + idToScroll + "' style='background-color:" + highlight + "'>" + 
                                   "<td>" + "<img height='14' width='22' src='images/flags/" + iso3_code_for_ladder + ".png'>" + "</td>" + 
                                   "<td>" + sortedDataset[i][2011].toFixed(3) + "</td>" +
                                   "<td>" + sortedDataset[i].country_name + "</td>" +
                                   "<td>" + rank + "</tr>"; 
                rank++;
            }
              
        }

         $("#tabFirstCountryLadder").html(ladder);
         $("#flagBarFlag1").html('<img src="images/flags/' + iso3_code + '.png">'); 


        setTimeout(function() {
         $("#countryLadderContainerFirst").mCustomScrollbar("scrollTo", "#countryToScroll");           
     }, 200)


        }
});

// Rightclick

utfGrid.on('contextmenu', function (e) {

    $('#tab-container').easytabs('select', '#curtainContentStatisticsTab_slide2');

    if (e.data) {
        var value = e.data[2011],
            color = setColor(value),
            dataset = parseJSON("json/co2_emissions.json"),
            iso3_code = e.data.ISO3,
            rank = getRank(dataset,iso3_code),
            countryNumber = countCountries(dataset);

        if(isTextTabSelected)
            statisticsTabMouseOver();

        isStatsticTabSelected = true;
        isTextTabSelected = false;

        textTabMouseOut();

        $("#tabSecondCountryName").text(e.data.NAME);
        $("#cciScoreSecondCountry").text(value);
        $("#cciScoreSecondCountry").css({color:color});
        $("#rankScoreSecondCountry").text(rank);
        $("#rankScoreSecondCountry").css({color:color});
        $("#totalScoreSecondCountry").text(countryNumber);


        var sortedDataset = getSortedDataset(dataset);
        var ladder ="",
            rank = 1,
            highlight = "transparent",
            highlightFlag = 0,
            idToScroll = "",
            rankToScroll = 0,
            scrollTo = "";


        for(i in sortedDataset) {
            if(sortedDataset[i][2011] !== null) {

            var iso3_code_for_ladder = sortedDataset[i].country_code; 

                if(sortedDataset[i].country_code === iso3_code) {
                    highlight = "grey";
                    idToScroll = "countryToScroll2";
                    scrollTo = idToScroll;
                    rankToScroll = rank;
                } else {
                    highlight = "transparent";
                    idToScroll = "";
                }

                ladder += "<tr id='" + idToScroll + "' style='background-color:" + highlight + "'>" + 
                                   "<td>" + "<img height='14' width='22' src='images/flags/" + iso3_code_for_ladder + ".png'>" + "</td>" + 
                                   "<td>" + sortedDataset[i][2011].toFixed(3) + "</td>" +
                                   "<td>" + sortedDataset[i].country_name + "</td>" +
                                   "<td>" + rank + "</tr>"; 
                rank++;
            }
              
        }

        $("#tabSecondCountryLadder").html(ladder);
        $("#flagBarFlag2").html('<img src="images/flags/' + iso3_code + '.png">');  


        setTimeout(function() {
          $("#countryLadderContainerSecond").mCustomScrollbar("scrollTo", "#countryToScroll2");           
     }, 200)

    }

});

map.addLayer(utfGrid);

function setColor(value) {
    if(value > 0 && value < 0.629)
        return '#1a9850';
    else if (value >= 0.629 && value < 1.792)
        return  '#66bd63';
    else if (value >= 1.792 && value < 3.325)
        return '#a6d96a';
    else if (value >= 3.325 && value < 5.557)
        return '#d9ef8b';
    else if (value >= 5.557 && value < 8.8336)
        return '#fee08b';
    else if (value >= 8.8336 && value < 14.136)
        return '#fdae61';
    else if (value >= 14.136 && value < 23.968)
        return '#f46d43';
    else if (value >= 23.968)
        return '#d73027';
    else
        return '#000000';
}


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


// ############################
// ##  Access data via json  ##
// ############################


function parseJSON(data){
    
var request = new XMLHttpRequest();
   request.open("GET", data, false);
   request.send(false)
   
   return JSON.parse(request.responseText);
   
}

// Sort the dataset

function getSortedDataset(dataset) {
    var sorted = dataset.sort(function(a, b) {
            return a[2011] - b[2011];
    }); 

    return sorted;

}

//// Get the ranking of the selected country

function getRank(dataset, iso3_code) {


        var sortedDataset = getSortedDataset(dataset);

        return getObjectKeyIndex(sortedDataset, iso3_code)

        // Count till the country is found by its ISO code
        function getObjectKeyIndex(sortedDataset, keyToFind) {

            var i = 1;
            for (elem in sortedDataset) {
                    if (sortedDataset[elem].country_code == keyToFind) {
                        return i;
                    }
                    if(sortedDataset[elem][2011] !== null) { // Dont count noData elements(countries)
                        i++;
                    }
            }
            return null;
        }

}

// Get the number of countries in the dataset

function countCountries(dataset) {

        var i = 1;
        for (elem in dataset) {
                if(dataset[elem][2011] !== null) { // Dont count noData elements(countries)
                    i++;
                }
        }
        return i;
    }

});
