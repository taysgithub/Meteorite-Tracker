let map = null;
let markers = [];

function initMap() {
    if (map === null) {
        map = new google.maps.Map(
            document.getElementById("map"), 
            {
                zoom: 4.0,
                center: {lat: 46, lng: -95},
                mapId: "2db99f4eb11cd98d",
            }
        );                   
    }
}

window.initMap = initMap;

function drawPin(location){
    let string = `<b>ID</b>: ${location.id}<br><b>Name</b>: ${location.name}<br><b>Year</b>: ${location.year}<br><b>Class</b>: ${location.class}`;
    let marker = new google.maps.Marker({
        position: {
            lat: location.lat, //latitude
            lng: location.lng  //longitude
        },
        map: map
    });
    let infowindow = new google.maps.InfoWindow({
        content: string,
    });
    marker.addListener("click", () => {
        infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
        });
    });
    markers.push(marker);
}