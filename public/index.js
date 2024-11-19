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

// Hello everyone! 

// Function to get data from api 

const fetchData = async (latitude, longitude) => {
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
  
  // Map
  async function geoFindMe() {
  
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
  
  
      function success(position) {
        // get coordinates 
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        // gets data 
        // Call the function
        fetchData(latitude, longitude);
  
          var map = L.map('small-map').setView([latitude, longitude], 13);
  
          L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);
  
          L.marker([latitude, longitude], {icon: greenIcon}).addTo(map).bindPopup("Your Current Location.");
          
          // Place parks on map
          // Place parks on map
        fetch('./data/Parks.geojson')
        .then(response => response.json())
        .then(jsonData => {
            for (let i = 0; i < jsonData.features.length; i++) {
                L.circle([jsonData.features[i].geometry.coordinates[1], jsonData.features[i].geometry.coordinates[0]], {color: '#3e8e41', fillColor: '#3e8e41', fillOpacity: 1, radius: 70}).addTo(map).bindPopup(`<b>${jsonData.features[i].properties.PARKNAME}</b> </br> ${jsonData.features[i].properties.ADDRESS}`);
            }
        }); 
        
        // condition 
        function validPhone(n) {
            if (n) {
                return n;
            } else {
                return "no phone number available"
            }
        }

        function validURL(n) {
            if (n) {
                return n;
            } else {
                return "no websiteURL available"
            }
        }

        // Place Sustainability Locations on Map
        fetch('./data/Filtered_Sustainability_Locations.geojson')
        .then(response => response.json())
        .then(jsonData => {
            for (let i = 0; i < jsonData.features.length; i++) {
                L.circle([jsonData.features[i].geometry.coordinates[1], jsonData.features[i].geometry.coordinates[0]], {color: '#2c3e50', fillColor: '#2c3e50', fillOpacity: 1, radius: 70}).addTo(map).bindPopup(`<b>${jsonData.features[i].properties.NAME}</b> <br> ${jsonData.features[i].properties.LOC_CLASS} <br> ${jsonData.features[i].properties.LOC_ADDR1}, ${jsonData.features[i].properties.LOC_ADDR2} <br> ${validPhone(jsonData.features[i].properties.CONTACT_PHONE)} <br> ${validURL(jsonData.features[i].properties.WEBSITE_URL)}`);
            }
        }); 
      }
    
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
    
  geoFindMe();

  // Calendar 
  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('small-calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
    });
    calendar.render();
  });