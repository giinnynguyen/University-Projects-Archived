function initMap() {
    var mapDiv = document.getElementById("map");
    var map = new google.maps.Map(mapDiv, { center: { lat: 10.883343, lng: 106.782905 }, zoom: 8 });
}
window.onscroll = function () {
    myfuntion();
};
function myfuntion() {
    if (window.scrollY > 120 && document.getElementById("menu").className != "white") {
        document.getElementById("menu").className = "white";
    }
    else if (window.scrollY < 120 && document.getElementById("menu").className != "white-menu") {
        document.getElementById("menu").className = "white-menu";
    }
}