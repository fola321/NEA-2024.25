let centre = L.latLng(51.438169210961554, 0.03854894655899355); // when the map loads, it is centred on the school
let zoom = 19; // maximum zoom OSM allows for
const map = L.map('map').setView(centre, zoom); // instantiating the map

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, // overlaying OSM's tiles onto the map
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const floorplanBounds = [ // this determines where the floorplan will be placed on the map
    [51.43879365871755, 0.03755286608972658], // co-ordinates of the top left
    [51.43813284164057, 0.03974555388976837] // co-ordinates of the bottom right
]

fetch("../floorplan/floorplan.svg")
    .then(response => response.text())
    .then(svgText => {
        // Create a div container to hold the SVG content
        const svgContainer = L.DomUtil.create('div');
        svgContainer.innerHTML = svgText;

        const svgElement = svgContainer.querySelector('svg');
        svgElement.setAttribute("transform", "rotate(-12)");  // Adjust angle as needed
        svgElement.setAttribute("transform-origin", "center center");


        // Create a Leaflet overlay that will hold the SVG container
        const svgOverlay = L.svgOverlay(svgContainer, floorplanBounds, {
            opacity: 0.9,
            interactive: true
        }).addTo(map);
    })
    .catch(error => console.error("Error loading SVG:", error));