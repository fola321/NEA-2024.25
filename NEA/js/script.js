let centre = L.latLng(51.438169210961554, 0.03854894655899355); // when the map loads, it is centred on the school
let zoom = 19; // maximum zoom OSM allows for
var map = L.map('map').setView(centre, zoom); // instantiating the map

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, // overlaying OSM's tiles onto the map
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.marker([51.438439, 0.037766]).addTo(map)
    .bindPopup('Foxbury Building. Nurses are on hand to help sick/injured students.')
    .openPopup();

const floorplanBounds = [ // this determines where the floorplan will be placed on the map
    [51.43879365871755, 0.03755286608972658], // co-ordinates of the top left
    [51.43813284164057, 0.03974555388976837] // co-ordinates of the bottom right
]

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



fetch("../floorplan/floorplan.svg")
    .then(response => response.text())
    .then(svgText => {
        // create an SVG Blob URL
        const blob = new Blob([svgText], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        // add the image as an overlay fixed to the map bounds
        const imageOverlay = L.imageOverlay(url, floorplanBounds, {
            opacity: 0.9 // Adjust transparency
        }).addTo(map);

        // apply rotation after the overlay is added
        imageOverlay.on('add', function () {
            const imgElement = imageOverlay.getElement(); // access the <img> element
            if (imgElement) {
                // override the Leaflet transformation function
                const originalTransform = imgElement.style.transform;

                // observe and adjust rotation whenever Leaflet applies transforms
                const observer = new MutationObserver(() => {
                    imgElement.style.transform = `${originalTransform} rotate(-12deg)`;
                    imgElement.style.transformOrigin = 'center'; // Set the rotation origin
                });

                // observe style changes to the image element
                observer.observe(imgElement, {
                    attributes: true,
                    attributeFilter: ['style'] // Only observe style changes
                });

                // cleanup observer when the map is destroyed
                map.on('unload', () => observer.disconnect());
            }
        });

        // clean up the Blob URL when the map is destroyed
        map.on('unload', () => URL.revokeObjectURL(url));
    })
    .catch(error => console.error("Error loading SVG:", error));