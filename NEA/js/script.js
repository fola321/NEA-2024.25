let centre = L.latLng(51.438169210961554, 0.03854894655899355); // Map center
let zoom = 19; // Initial zoom level

const maxBounds = [
    [51.43970242084919, 0.033531769774171834], // Top-left corner (latitude, longitude)
    [51.43519890029115, 0.04160087761712992]  // Bottom-right corner (latitude, longitude)
];

// Initialize the map
var map = L.map('map', {
    center: centre,
    zoom: zoom,
    maxBounds: maxBounds, // Set the maximum panning bounds
    maxBoundsViscosity: 1.0, // Prevent movement beyond bounds
    minZoom: 17, // Set the minimum zoom level
    maxZoom: 19  // Set the maximum zoom level
});

// Add OpenStreetMap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, // Maximum zoom level for tiles
    minZoom: 17, // Minimum zoom level for tiles
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Add a marker for reference
L.marker([51.438439, 0.037766]).addTo(map)
    .bindPopup('Foxbury Building. Nurses are on hand to help sick/injured students.')
    .openPopup();

// Define the bounds for the floorplan overlay
const floorplanBounds = [
    [51.43879365871755, 0.03755286608972658], // Top-left corner
    [51.43813284164057, 0.03974555388976837]  // Bottom-right corner
];

// Load and add the floorplan
fetch("../floorplan/floorplan.svg")
    .then(response => response.text())
    .then(svgText => {
        const blob = new Blob([svgText], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        const imageOverlay = L.imageOverlay(url, floorplanBounds, {
            opacity: 0.9 // Transparency for overlay
        }).addTo(map);

        imageOverlay.on('add', function () {
            const imgElement = imageOverlay.getElement();
            if (imgElement) {
                const originalTransform = imgElement.style.transform;

                const observer = new MutationObserver(() => {
                    imgElement.style.transform = `${originalTransform} rotate(-12deg)`;
                    imgElement.style.transformOrigin = 'center';
                });

                observer.observe(imgElement, {
                    attributes: true,
                    attributeFilter: ['style']
                });

                map.on('unload', () => observer.disconnect());
            }
        });

        map.on('unload', () => URL.revokeObjectURL(url));
    })
    .catch(error => console.error("Error loading SVG:", error));


//fetch("../floorplan/floorplan.svg")
//    .then(response => response.text())
//    .then(svgText => {
//        // Create a div container to hold the SVG content
//        const svgContainer = L.DomUtil.create('div');
//        svgContainer.innerHTML = svgText;

//        const svgElement = svgContainer.querySelector('svg');
//        svgElement.setAttribute("transform", "rotate(-12)");  // Angle of rotation of the floor plan
//        svgElement.setAttribute("transform-origin", "center center"); // centre of rotation is the centre of the image


//        // Create a Leaflet overlay that will hold the SVG container
//        const svgOverlay = L.svgOverlay(svgContainer, floorplanBounds, {
//            opacity: 0.9, // adjusting the opacity of the floor plan
//            interactive: true,
//        }).addTo(map);
//    })
//    .catch(error => console.error("Error loading SVG:", error));
