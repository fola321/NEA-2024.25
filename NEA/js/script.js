let centre = L.latLng(51.438169210961554, 0.03854894655899355); // when the map loads, it is centred on the school
let zoom = 19; // maximum zoom OSM allows for
const map = L.map('map').setView(centre, zoom); // instantiating the map

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, // overlaying OSM's tiles onto the map
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const floorplanBounds = [
    [51.438803, 0.037470],
    [51.438183, 0.039517]
]

fetch("../floorplan/floorplan.svg")
    .then(response => response.text())
    .then(svgText => {
        // Create a div container to hold the SVG content
        const svgContainer = L.DomUtil.create('div');
        svgContainer.innerHTML = svgText;

        const svgElement = svgContainer.querySelector('svg');
        svgElement.setAttribute("transform", "rotate(-15)");  // Adjust angle as needed
        svgElement.setAttribute("transform-origin", "center center");


        // Create a Leaflet overlay that will hold the SVG container
        const svgOverlay = L.svgOverlay(svgContainer, floorplanBounds, {
            opacity: 0.4,
            interactive: true
        }).addTo(map);
    })
    .catch(error => console.error("Error loading SVG:", error));