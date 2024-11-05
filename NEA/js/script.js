let centre = L.latLng(51.438169210961554, 0.03854894655899355); // when the map loads, it is centred on the school
let zoom = 19; // maximum zoom OSM allows for
const map = L.map('map').setView(centre, zoom); // instantiating the map

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, // overlaying OSM's tiles onto the map
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const floorplanBounds = [
    [51.43847553199154, 0.037628591359193685]

]

