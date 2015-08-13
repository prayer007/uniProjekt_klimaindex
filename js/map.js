// #######################
// ##  Interactive map  ##
// #######################

$(document).ready(function() {

var map = L.map('map', {
        maxZoom: 6
}).setView([30, 15], 1);


L.tileLayer('http://localhost/uniProjekt_klimaindex/tiles/{z}/{x}/{y}.png', {
    attribution: '&copy; Manuel Strohmaier'
}).addTo(map);

});


