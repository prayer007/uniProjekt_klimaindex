
 var originColor = "";

$(document).ready(function() {


    //### Load svg files for the social media icons ###

    // facebook logo
$.get("images/svg/facebook_logo.svg", null,
            function(data)
        {
        var svgNode = $("svg", data);
        var docNode = document.adoptNode(svgNode[0]);
        var pageNode = $("#fb_logo");

        pageNode.html(docNode);

        originColor = $("svg" + " path").css("fill"); // Get the color of the origin svg to set it in mousout
        originColor = rgb2hex(originColor);
        },
        'xml');

    // twitter logo
$.get("images/svg/twitter_logo.svg", null,
            function(data)
        {
        var svgNode = $("svg", data);
        var docNode = document.adoptNode(svgNode[0]);
        var pageNode = $("#twitter_logo");

        pageNode.html(docNode);
        },
        'xml');

    // google plus logo
$.get("images/svg/google_logo.svg", null,
            function(data)
        {
        var svgNode = $("svg", data);
        var docNode = document.adoptNode(svgNode[0]);
        var pageNode = $("#google_logo");

        pageNode.html(docNode);
        },
        'xml');

    // about logo
$.get("images/svg/about_logo.svg", null,
            function(data)
        {
        var svgNode = $("svg", data);
        var docNode = document.adoptNode(svgNode[0]);
        var pageNode = $("#about_logo");

        pageNode.html(docNode);
        },
        'xml');

    // impressum logo
$.get("images/svg/impressum_logo.svg", null,
            function(data)
        {
        var svgNode = $("svg", data);
        var docNode = document.adoptNode(svgNode[0]);
        var pageNode = $("#impressum_logo");

        pageNode.html(docNode);
        },
        'xml');

// Convert rgb to hex
function rgb2hex(rgb){
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
}

});