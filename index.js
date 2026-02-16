// --- NAVIGATION LOGIC ---
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links li a');

// Toggle Menu Open/Close
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('is-active');
});

// Close menu automatically when any link is clicked (Best for Mobile UX)
navItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('is-active');
    });
});


// --- SERVICES ANIMATION LOGIC ---
/**
 * Triggers a 'pop' animation when a service card is clicked.
 * @param {HTMLElement} element - The service card element.
 */
function animateService(element) {
    // Add the animation class (defined in your CSS)
    element.classList.add('clicked');

    // Remove it after 400ms so it can be re-triggered on next click
    setTimeout(() => {
        element.classList.remove('clicked');
    }, 400);
}



// ====================
// First Map (International focused)
// ====================
const map1 = L.map('map1').setView([20, 0], 1);

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

L.tileLayer(tileUrl, { attribution }).addTo(map1);

// ====================
// Second Map ( India)
// ====================
const map2 = L.map('map2').setView([29.0, 77.5], 6);   //

L.tileLayer(tileUrl, { attribution }).addTo(map2);

// ====================
// Icons (shared between both maps)
// ====================
const greenIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [10, 15],
  iconAnchor: [6, 18],
  popupAnchor: [0, -15],
  className: "pulsing-marker"
});

const redIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [12, 18],
  iconAnchor: [6, 18],
  popupAnchor: [0, -15]
});

const blueIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [12, 18],
  iconAnchor: [6, 18],
  popupAnchor: [0, -15],
  shadowSize: [20, 20],
  shadowAnchor: [6, 18]
});

const yellowIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [12, 18],
  iconAnchor: [6, 18],
  popupAnchor: [0, -15],
  shadowSize: [20, 20],
  shadowAnchor: [6, 18]
});

// ====================
// Single shared places array (use same for both maps)
// ====================
const places = [
  { coords: [30.704, 76.710], name: "Mohali (SAS Nagar), Punjab", icon: greenIcon },

  // Delhi
  { coords: [28.5753, 77.2235], name: "Delhi (South Extension) - Blue", icon: blueIcon },
  { coords: [28.6139, 77.2090], name: "Delhi (Central) - Green", icon: greenIcon },

  { coords: [28.4595, 77.0266], name: "Gurgaon (Gurugram), Haryana", icon: greenIcon },

  // Manesar (three colors with offsets)
  { coords: [28.3723, 76.9196], name: "Manesar - Red", icon: redIcon },
  { coords: [28.369273, 76.888483], name: "Manesar - Blue", icon: blueIcon },
  { coords: [28.3553, 76.9327], name: "Manesar - Yellow", icon: yellowIcon },

  { coords: [28.5355, 77.3910], name: "Noida, Uttar Pradesh", icon: greenIcon },
  { coords: [18.5204, 73.8567], name: "Pune, Maharashtra", icon: greenIcon },

  // Chennai
  { coords: [13.0827, 80.2707], name: "Chennai - Blue", icon: blueIcon },
  { coords: [13.0827 + 0.0010, 80.2707 + 0.0007], name: "Chennai - Yellow", icon: yellowIcon },

  { coords: [11.9161, 79.8123], name: "Pondicherry (Puducherry)", icon: greenIcon },
  { coords: [27.989, 76.388], name: "Neemrana, Rajasthan", icon: greenIcon },
  { coords: [28.799, 76.134], name: "Bhiwani, Haryana", icon: greenIcon },

  { coords: [39.9334, 32.8597], name: "Turkey - Ankara", icon: greenIcon },
  { coords: [50.0755, 14.4378], name: "Czech Republic - Prague", icon: greenIcon },
  { coords: [41.9028, 12.4964], name: "Italy - Rome", icon: greenIcon },
  { coords: [52.5200, 13.4050], name: "Germany - Berlin", icon: greenIcon },
  { coords: [-15.7939, -47.8828], name: "Brazil - Brasília", icon: greenIcon },
  { coords: [-34.6037, -58.3816], name: "Argentina - Buenos Aires", icon: greenIcon },
  { coords: [19.4326, -99.1332], name: "Mexico - Mexico City", icon: greenIcon },
  { coords: [38.9072, -77.0369], name: "USA - Washington D.C.", icon: greenIcon },
  { coords: [45.4215, -75.6972], name: "Canada - Ottawa", icon: greenIcon },

];

// ====================
// Add markers to BOTH maps
// ====================
function addMarkersToMap(targetMap) {
  places.forEach(place => {
    const marker = L.marker(place.coords, { icon: place.icon })
      .addTo(targetMap)
      .bindPopup(`<b>${place.name}</b>`);

    // Hover → show popup
    marker.on('mouseover', function () {
      this.openPopup();
    });

    // Mouse out → hide popup
    marker.on('mouseout', function () {
      this.closePopup();
    });

    // Click → zoom in (you can remove this if not needed)
    marker.on('click', function () {
      targetMap.setView(place.coords, 16, { animate: true });
    });
  });
}

// Add same markers to both maps
addMarkersToMap(map1);
addMarkersToMap(map2);