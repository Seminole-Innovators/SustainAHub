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
  
      // Icons
  
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
  
      // Park Icon
  
      let customMarker= L.Icon.extend({
          options: {
              iconSize:     [60, 60],
              // iconAnchor:   [-22, -94],
              // popupAnchor:  [-3, -76]
          }
      });
  
      // Parks
  
      let parkIcon = new customMarker({iconUrl: 'parkIcon.png'});
  
      // Businesss Icon 
  
      let businessIcon= new customMarker({iconUrl: 'businessIcon.png'});
  
  
      // Charging Icon 
  
      let electricVehicleIcon= new customMarker({iconUrl: 'chargingIcon.png'});
  
      // Farming icon
  
      let farmIcon = new customMarker({iconUrl: 'farmIcon.png'}); 
  
      // Farmers market icon 
  
      let farmersMarketIcon = new customMarker({iconUrl: 'marketIcon.png'}); 
  
      // Garden icon 
  
      let gardenIcon = new customMarker({iconUrl: 'gardenIcon.png'});
  
      // recycling icon 
  
      let recyclingIcon = new customMarker({iconUrl: 'recycleIcon.png'});
  
  
      // get coordinates 
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      // gets air quality data 
      fetchAirQuality(latitude, longitude);
  
      var map = L.map('small-map').setView([latitude, longitude], 13);
  
      // I believe that there is a problem with the map theme and it must be changed 
  
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
  
      L.marker([latitude, longitude], {icon: greenIcon}).addTo(map).bindPopup("Your Current Location.");
      
      // Place parks on map
      fetch('/fetchParks')
      .then(response => response.json())
      .then(jsonData => {
          for (let i = 0; i < jsonData.length; i++) {
              L.marker([jsonData[i].geom.coordinates[1], jsonData[i].geom.coordinates[0]], {icon: parkIcon}).addTo(map).bindPopup(`<b>${jsonData[i].park_name}</b> <br> ${jsonData[i].address}`);
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
              if (jsonData[i].loc_class == 'Sustainable Business') {
                  L.marker([jsonData[i].geom.coordinates[1], jsonData[i].geom.coordinates[0]], {icon: businessIcon}).addTo(map).bindPopup(`<b>${jsonData[i].name}</b> <br> ${jsonData[i].loc_class} <br> ${jsonData[i].loc_addr1}, ${jsonData[i].loc_addr2} <br> ${validPhone(jsonData[i].contact_phone)} <br>`);
              } else if (jsonData[i].loc_class == 'Electric Vehicle Charging Station') {
                  L.marker([jsonData[i].geom.coordinates[1], jsonData[i].geom.coordinates[0]], {icon: electricVehicleIcon}).addTo(map).bindPopup(`<b>${jsonData[i].name}</b> <br> ${jsonData[i].loc_class} <br> ${jsonData[i].loc_addr1}, ${jsonData[i].loc_addr2} <br> ${validPhone(jsonData[i].contact_phone)} <br>`);
              } else if (jsonData[i].loc_class == 'Regional Farm') {
                  L.marker([jsonData[i].geom.coordinates[1], jsonData[i].geom.coordinates[0]], {icon: farmIcon}).addTo(map).bindPopup(`<b>${jsonData[i].name}</b> <br> ${jsonData[i].loc_class} <br> ${jsonData[i].loc_addr1}, ${jsonData[i].loc_addr2} <br> ${validPhone(jsonData[i].contact_phone)} <br>`);
              } else if (jsonData[i].loc_class == 'Farmers\' Market') {
                  L.marker([jsonData[i].geom.coordinates[1], jsonData[i].geom.coordinates[0]], {icon: farmersMarketIcon}).addTo(map).bindPopup(`<b>${jsonData[i].name}</b> <br> ${jsonData[i].loc_class} <br> ${jsonData[i].loc_addr1}, ${jsonData[i].loc_addr2} <br> ${validPhone(jsonData[i].contact_phone)} <br>`);
              } else if (jsonData[i].loc_class == 'Garden') {
                  L.marker([jsonData[i].geom.coordinates[1], jsonData[i].geom.coordinates[0]], {icon: gardenIcon}).addTo(map).bindPopup(`<b>${jsonData[i].name}</b> <br> ${jsonData[i].loc_class} <br> ${jsonData[i].loc_addr1}, ${jsonData[i].loc_addr2} <br> ${validPhone(jsonData[i].contact_phone)} <br>`);
              } else if (jsonData[i].loc_class == 'Recycling') {
                  L.marker([jsonData[i].geom.coordinates[1], jsonData[i].geom.coordinates[0]], {icon: recyclingIcon}).addTo(map).bindPopup(`<b>${jsonData[i].name}</b> <br> ${jsonData[i].loc_class} <br> ${jsonData[i].loc_addr1}, ${jsonData[i].loc_addr2} <br> ${validPhone(jsonData[i].contact_phone)} <br>`);
              }
          }
          // console.log(jsonData);
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