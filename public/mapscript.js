// Preloader (Optional)
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});

// Smooth Scrolling for Navigation Links
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

// Fetch air quality from the Express server route 

const fetchAirQuality = async (latitude, longitude) => {
  const response = await fetch('/airquality', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          lat: latitude,
          lon: longitude,
      }),
  });

  const data = await response.json();
  console.log(data);
};

// Success function 
function success(position) {

    let LeafIcon = L.Icon.extend({
        options: {
            shadowUrl: 'leaf-shadow.png',
            iconSize:     [38, 95],
            shadowSize:   [50, 64],
            iconAnchor:   [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor:  [-3, -76]
        }
    });

    let greenIcon = new LeafIcon({iconUrl: 'leaf-green.png'});
    // get coordinates 
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // gets air quality data 
    fetchAirQuality(latitude, longitude);

    var map = L.map('map').setView([latitude, longitude], 13);

    // I believe that there is a problem with the map theme and it must be changed 

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([latitude, longitude], {icon: greenIcon}).addTo(map).bindPopup("Your Current Location.");
    
    // Place parks on map
    fetch('/fetchParks')
    .then(response => response.json())
    .then(jsonData => {
        for (let i = 0; i < jsonData.length; i++) {
            L.circle([jsonData[i].geom.coordinates[1], jsonData[i].geom.coordinates[0]], {color: '#3e8e41', fillColor: '#3e8e41', fillOpacity: 1, radius: 70}).addTo(map).bindPopup(`<b>${jsonData[i].park_name}</b> <br> ${jsonData[i].address}`);
        }
    })
    .catch(error => {
    console.error('Error fetching data:', error);
    });
    
    // condition for valid phone numbers
    function validPhone(n) {
        if (n) {
            return n;
        } else {
            return "no phone number available"
        }
    }
    // Place Sustainability Locations on Map

    fetch('/fetchLocations')
    .then(response => response.json())
    .then(jsonData => {
        for (let i = 0; i < jsonData.length; i++) {
            L.circle([jsonData[i].geom.coordinates[1], jsonData[i].geom.coordinates[0]], {color: '#2c3e50', fillColor: '#2c3e50', fillOpacity: 1, radius: 70}).addTo(map).bindPopup(`<b>${jsonData[i].name}</b> <br> ${jsonData[i].loc_class} <br> ${jsonData[i].loc_addr1}, ${jsonData[i].loc_addr2} <br> ${validPhone(jsonData[i].contact_phone)} <br>`);
        }
    })
    .catch(error => {
    console.error('Error fetching data:', error);
    });
}

// Map
async function makeMap() {
  
    function error() {
      alert("Unable to retrieve your location.");
    }

    const options = {
        enableHighAccuracy: true,
    };
  
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.)");
    } else {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
    
}
  
makeMap();