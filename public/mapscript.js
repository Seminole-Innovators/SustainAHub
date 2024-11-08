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

// Function to get data from api 

const fetchData = async (latitude, longitude) => {
  const response = await fetch('/api', {
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

      var map = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        L.marker([latitude, longitude], {icon: greenIcon}).addTo(map).bindPopup("I am a green leaf.");
        
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