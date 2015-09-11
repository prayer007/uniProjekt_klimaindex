

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

    var elements = svgTab1.children();
    var animSpeed = 30;

    svgTab1.velocity({fill:'#ffffff'})

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

    var elements = svgTab1.children(),
        origFill = svgTab1.attr('fill');

    svgTab1.velocity({fill:origFill})
}

//// SECOND TAB

var isStatsticTabSelected = false;
function statisticsTabMouseOver(svgTab2) {



    // First bar
    var firstElement = svgTab2.children().first();
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


 var origFill = svgTab2.attr('fill'); 

    // First bar
    var firstElement = svgTab2.children().first();

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


function enableTabs(section,tabContainer) {

var tabContainer = section.find(".tab-container"),
    tab1 = tabContainer.find(".tabs1"),
    tab2 = tabContainer.find(".tabs2"),
    etab1 = tabContainer.find("a:first").attr("href"),
    etab2 = tabContainer.find("a:last").attr("href"),
    svgTab1 = section.find("svg:first"),
    svgTab2 = section.find("svg:last");

tabContainer.easytabs();


isStatsticTabSelected = tab1.attr("value");
isTextTabSelected = tab2.attr("value");
var isStart = true;

tab1.click(function(){
    tabContainer.easytabs('select', etab1);
    tab2.attr("value","1");
    if(tab1.attr("value") == 1) {
        textTabMouseOver(svgTab1);
    }
    if(tab1.attr("value") == 1 && !isStart) {
        statisticsTabMouseOut(svgTab2);
    }
    tab1.attr("value","0");
    isStart = false;
});

tab2.click(function(){
    tabContainer.easytabs('select', etab2);
    tab1.attr("value","1")
    if(tab2.attr("value") == 1)
        statisticsTabMouseOver(svgTab2);
    textTabMouseOut(svgTab1);
    tab2.attr("value","0");
});
}




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





// ########################################
// ##  Create the content for each slide ##
// ########################################

// Create map and tabs for every slide 

$("section").each(function() {

var section = $(this);

  enableTabs(section); // Creates the tabs in the content text box

var mapId = section.find(".map").attr("id");

if(mapId) {
    createMap(section); // Creates the map for each slide
}

});


// Create the content for each slide

var scrollTrigger = true;

$(window).on("scrollstop", {latency: 0}, function() {

$("section").each(function() {

var slide = $(this),
    trigger = slide.find('.trigger'), // Trigger to show up the content
    chapter = $('.slideHeader').find('.chapters').children()[0],
    slideNumber = slide.attr('id').substr(slide.attr('id').length - 1); 

        if(slide.isOnScreen(0.3,0.3)) {
            $(".chapter").removeClass("chapterSelected");
            $("#chapter" + slideNumber).addClass("chapterSelected");
            addSlideContent(slide, trigger); // Fades in each slide content 
            doAutoScroll(trigger); // Automatic scroll the the next slide 
        } 
});
});


// Create the autoscroll for each slide

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

// Fades in each slide content 

var bottomOffsetFlag = true;
var selectTabFlag2 = false;
var isSlideOnScreen = false,
    isSlideNotOnScreen = false;

function addSlideContent(section, trigger) {

        var nextSlide = section.next(),
            curtainContentContainer = section.children().children(),
            curtainContentBackground = curtainContentContainer.children().first(),
            curtainContent = curtainContentBackground.next(),
            mapContainer = curtainContent.next();

            tabContainerId = section.find(".tab-container").attr("id"),
            tab1 = section.find(".tabs1"),
            tab2 = section.find(".tabs2"),
            etab1 = section.find("a:first").attr("href"),
            svgTab1 = section.find("svg:first").attr("id"),
            svgTab2 = section.find("svg:last").attr("id");

            var mapId = section.find(".map").attr("id");

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
                        
                        var bottom = findOffsetTop(mapContainer)

                        mapContainer.css({bottom:bottom})
                        bottomOffsetFlag = false;
                    } 
                }, 300);


                tab1.trigger("click"); 

                selectTabFlag2 = false; 
                isSlideNotOnScreen = false;

                if(mapId)
                    fadeMapIn(window["map_" + mapId],mapContainer); 
            }                        

        }
        else {
            if(isSlideNotOnScreen === false) { 
                isSlideNotOnScreen = true;

                mapContainer.css({bottom:0}) // Get the map container to its original position

                isSlideOnScreen = false;

                if(selectTabFlag2 === false) { 
                    selectTabFlag2 = true; 
                    setTimeout(function(){ 
                        tab1.trigger("click"); 
                    }, 500); 
                }

                bottomOffsetFlag = true;
                selectTabFlag = false; 

                $(".curtainContentTabInner").mCustomScrollbar("disable");
                $(".countryLadderContainer").mCustomScrollbar("disable");

                scrollTrigger = true;
                curtainContentBackground.removeClass("curtainContentBackgroundVis");
                curtainContent.removeClass("curtainContentVis");

                if(mapId) {
                    fadeMapOut(mapContainer);

                    if(expandMapFlag==1) {
                        expandMap(window["map_" + mapId]);
                    }
                }
                // console.log(window["map_" + mapId])
                // if(window["map_" + mapId].hasLayer(marker))
                //     window["map_" + mapId].removeLayer(marker)



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
    scrollbarPosition: "inside",
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




function createMap(section) {

// 1 and 2 stands for first and second country

var mapId = section.find(".map").attr("id"),
    countryName1 = section.find(".tabFirstCountryName"),
    countryName2 = section.find(".tabSecondCountryName"),
    score1 = section.find(".cciScoreFirstCountry"),
    score2 = section.find(".cciScoreSecondCountry"),
    rank1 = section.find(".rankScoreFirstCountry"),
    rank2 = section.find(".rankScoreSecondCountry"),
    totalScore1 = section.find(".totalScoreFirstCountry"),
    totalScore2 = section.find(".totalScoreSecondCountry"),
    countryLadder1 = section.find(".tabFirstCountryLadder"),
    countryLadder2 = section.find(".tabSecondCountryLadder"),
    flagBar1 = section.find(".flagBarFlag1"),
    flagBar2 = section.find(".flagBarFlag2"),
    countryLadderContainer1 = section.find("[secClass='countryLadderContainerFirst']"),
    countryLadderContainer2 = section.find("[secClass='countryLadderContainerSecond']"),
    resizeMapButton = section.find(".resizeMapButton"),
    searchBarButton = section.find(".mapSearchBarButton"),
    searchBar = section.find(".mapSearchBar"),
    statisticsTab = section.find(".tabCountries");


var tabContainer = section.find(".tab-container"),
    tab1 = tabContainer.find(".tabs1"),
    tab2 = tabContainer.find(".tabs2");

var dataset = parseJSON("json/co2_emissions_new.json");


// The mapId is the root to its tiles

window["map_" + mapId] = L.map(mapId, {
        maxZoom: 6
}).setView([30, 15], 1);



L.tileLayer('tiles/'+ mapId + '/{z}/{x}/{y}.png', {
    attribution: '&copy; Manuel Strohmaier'
}).addTo(window["map_" + mapId]);



window["utfGrid_" + mapId] = new L.UtfGrid('tiles/' + mapId +'/{z}/{x}/{y}.grid.json', {
    useJsonP: false
});


//// Tooltip

var tooltip = document.getElementById('mapTooltip');

$("#" + mapId).mousemove(function(e) {
    var x = e.clientX,
        y = e.clientY;
    tooltip.style.top = (y - 120) + 'px';
    tooltip.style.left = (x - 196) + 'px';
});


// Mouseover

window["utfGrid_" + mapId].on('mouseover', function(e) {

    var value = e.data[2011],
        color = setColor(value),
        isoCode = e.data.ISO3; 


    $('#mapTooltipContent').html('<img src="images/flags/' + isoCode + '.png" height="15">' 
                             +  '<h1>' + e.data.NAME + '</h1>'
                             +  '<span>' + 'CO2 Emissions: ' + '<em style="color:' + color +' ;">' + value + '</em>' + '</span>'  
    )
    $('#mapTooltip').addClass('tooltip_hover')
    $('#tooltipArrow').addClass('tooltip_hover')
});

window["utfGrid_" + mapId].on('mouseout', function(e) {
    $('#mapTooltip').removeClass('tooltip_hover ')
});

$("#" + mapId).on('mouseout', function(e) {
    $('#mapTooltip').removeClass('tooltip_hover ')
});



// Click
window["utfGrid_" + mapId].on('click', function (e) {

    tab2.trigger("click");

var time;               // If the country statistics opens the first time set a timeout function to prevent query issues
if(statisticsTab.is(":hidden"))
    time = 600;
else
    time = 0;

setTimeout(function() {

    if (e.data) {

        var value = e.data[2011],
            color = setColor(value),
            iso3_code = e.data.ISO3,
            rank = getRank(dataset,iso3_code),
            countryNumber = countCountries(dataset);

            countryName1.text(e.data.NAME);
            score1.text(value);
            score1.css({color:color});
            rank1.text(rank);
            rank1.css({color:color});
            totalScore1.text(countryNumber);

        var sortedDataset = getSortedDataset(dataset);
        var ladder ="",
            rank = 1,
            highlight = "transparent",
            highlightFlag = 0,
            idToScroll = "",
            rankToScroll = 0,
            scrollTo = "";


        for(i in sortedDataset) {
            if(sortedDataset[i][2011] !== 0) {

                var iso3_code_for_ladder = sortedDataset[i].ISO3; 

                if(sortedDataset[i].ISO3 === iso3_code) {
                    highlight = "grey";
                    idToScroll = "countryToScroll_" + mapId;
                    scrollTo = "#" + idToScroll;
                    rankToScroll = rank;
                } else {
                    highlight = "transparent";
                    idToScroll = "";
                }

                ladder += "<tr id='" + idToScroll + "' style='background-color:" + highlight + "'>" + 
                                   "<td>" + "<img height='14' width='22' src='images/flags/" + iso3_code_for_ladder + ".png'>" + "</td>" + 
                                   "<td>" + sortedDataset[i][2011].toFixed(3) + "</td>" +
                                   "<td>" + sortedDataset[i].NAME + "</td>" +
                                   "<td>" + rank + "</tr>"; 
                rank++;
            }
              
        }

        countryLadder1.html(ladder);
        flagBar1.html('<img src="images/flags/' + iso3_code + '.png">'); 


        setTimeout(function() {
            countryLadderContainer1.mCustomScrollbar("scrollTo", scrollTo);           
        }, time)


    }

    } ,time)

mapClickFlag = 1;

});

// Rightclick

window["utfGrid_" + mapId].on('contextmenu', function (e) {

    tab2.trigger("click");

var time;               // If the country statistics opens the first time set a timeout function to prevent query issues
if(statisticsTab.is(":hidden"))
    time = 600;
else
    time = 0;


setTimeout(function() {

    if (e.data) {
        var value = e.data[2011],
            color = setColor(value),
            iso3_code = e.data.ISO3,
            rank = getRank(dataset,iso3_code),
            countryNumber = countCountries(dataset);


        countryName2.text(e.data.NAME);
        score2.text(value);
        score2.css({color:color});
        rank2.text(rank);
        rank2.css({color:color});
        totalScore2.text(countryNumber);


        var sortedDataset = getSortedDataset(dataset);
        var ladder ="",
            rank = 1,
            highlight = "transparent",
            highlightFlag = 0,
            idToScroll = "",
            rankToScroll = 0,
            scrollTo = "";


        for(i in sortedDataset) {
            if(sortedDataset[i][2011] !== 0) {


            var iso3_code_for_ladder = sortedDataset[i].ISO3; 

                if(sortedDataset[i].ISO3 === iso3_code) {
                    highlight = "grey";
                    idToScroll = "countryToScroll2_" + mapId;
                    scrollTo = "#" + idToScroll;
                    rankToScroll = rank;
                } else {
                    highlight = "transparent";
                    idToScroll = "";
                }

                ladder += "<tr id='" + idToScroll + "' style='background-color:" + highlight + "'>" + 
                                   "<td>" + "<img height='14' width='22' src='images/flags/" + iso3_code_for_ladder + ".png'>" + "</td>" + 
                                   "<td>" + sortedDataset[i][2011].toFixed(3) + "</td>" +
                                   "<td>" + sortedDataset[i].NAME + "</td>" +
                                   "<td>" + rank + "</tr>"; 
                rank++;
            }
              
        }

        countryLadder2.html(ladder);
        flagBar2.html('<img src="images/flags/' + iso3_code + '.png">');  


        setTimeout(function() {
            countryLadderContainer2.mCustomScrollbar("scrollTo", scrollTo);           
        }, time);

    }

} ,time)


});

window["map_" + mapId].addLayer(window["utfGrid_" + mapId]);


// Expand map button

resizeMapButton.click(function() {
    expandMap(window["map_" + mapId]);
});


// Search bar

var marker;
var searchBarInput = section.find($('.mapSearchBar ' + "input")); 
var popupFlag;

searchBarButton.click(function(){

popupFlag = 0;

var myIcon = L.icon({
    iconUrl: 'images/map_marker.png',
    iconSize: [20, 30],
    iconAnchor: [10, 30],
});

var value = searchBarInput.val();
var foundFlag = 0;
for(i in dataset) {
    if(dataset[i].NAME == value) {
        var lat = dataset[i].LAT, 
            lng = dataset[i].LON,
            name = dataset[i].NAME;
            foundFlag = 1;
    }
}

if(foundFlag) {

    if(window["map_" + mapId].hasLayer(marker))
        window["map_" + mapId].removeLayer(marker)

    window["map_" + mapId].on('popupclose', function(e) {
        if(popupFlag == 1)
            window["map_" + mapId].removeLayer(marker)
    });

    var popup = L.popup({offset:L.point(0, -25)})
        .setLatLng([lat, lng])
        .setContent('<h1>' + name + '</h1>')
        .openOn(window["map_" + mapId]);

    marker = new L.marker([lat, lng], {icon: myIcon}); 


    window["map_" + mapId].addLayer(marker)
                          .setView([lat, lng]);

popupFlag = 1;
}
});



var searchBarFlag = 0;

searchBarInput.focus(function(){
    if(searchBarFlag == 0) {
        searchBarInput.val("");
        searchBar.addClass('mapSearchBarFocus');
        searchBarFlag = 1;
    }
});

$(window).click(function(){
    if(!searchBarInput.is(":focus") && searchBarFlag == 1) {
        searchBar.removeClass('mapSearchBarFocus');
        searchBarInput.val("Search country..");
        searchBarFlag = 0;
    }
});

searchBarInput.autocomplete({
    source: tagsForAutocomplete(),
    open:function(e,ui){
        /* create the scrollbar each time autocomplete menu opens/updates */
        $("#ui-id-1").mCustomScrollbar();
    },
    response:function(e,ui){
        /* destroy the scrollbar after each search completes, before the menu is shown */
        $("#ui-id-1").mCustomScrollbar("destroy");
    },
    close:function(e,ui){
        /* destroy the scrollbar each time autocomplete menu closes */
        $("#ui-id-1").mCustomScrollbar("destroy");
    }
});

};


// Create autocomplete for map searchbar


function tagsForAutocomplete() {

tagsForAutocompleteArr = [];

    var dataset = parseJSON("json/co2_emissions_new.json");

        for(i in dataset) {
            tagsForAutocompleteArr.push(dataset[i].NAME);
        }

        return tagsForAutocompleteArr;
}


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


function fadeMapIn(map,mapContainer) {
    mapContainer.addClass('map_containerVis')

    setTimeout(function(){ 
        map.invalidateSize(false);
    }, 510); // After animation from css have done

}

function fadeMapOut(mapContainer) {
    mapContainer.removeClass('map_containerVis') 
}

var expandMapFlag = 0;
function expandMap(map) {

var latlng = L.latLng(35, 15);

        var newHeight = findHeightTop(),
            newWidth = findWidthLeft() + $('.map_container').width();

        if(expandMapFlag==0) {

            $('.map_container').height(newHeight)
            $('.map_container').width(newWidth);
            $('.resizeMapButton').addClass('resizeMapButtonZoomout');
            map.setView(latlng,2);

        expandMapFlag=1;

        setTimeout(function(){ 
            map.invalidateSize(false);  
        }, 510); // Resize if css ease has done

        return;
        }

        if(expandMapFlag==1) {

            $('.map_container').css({height:""})
            $('.map_container').css({width:""})
            $('.resizeMapButton').removeClass('resizeMapButtonZoomout');
            map.setView(latlng,1)

        expandMapFlag=0;

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

function findOffsetTop(mapContainer) {

    var thisMap = mapContainer;

    var heightOfTopElements = $("#header").height() + $("#headerSlideContent").height();

    var scrollTop = $(window).scrollTop(),
        windowHeight = $(window).height(),
        thisElementsTopOffset = thisMap.offset().top,
        distanceToTopOfWindow = (thisElementsTopOffset - scrollTop),
        heightOfTruncated = windowHeight - distanceToTopOfWindow;

    var distance = thisMap.height() - heightOfTruncated;

    return distance;  

}




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

                    if (sortedDataset[elem].ISO3 == keyToFind) {
                        return i;
                    }
                    if(sortedDataset[elem][2011] !== 0) { // Dont count noData elements(countries)
                        i++;
                    }
            }
            return i;
        }

}

// Get the number of countries in the dataset

function countCountries(dataset) {

        var i = 1;
        for (elem in dataset) {
                if(dataset[elem][2011] !== 0) { // Dont count noData elements(countries)
                    i++;
                }
        }
        return i;
    }


});

