export function map(mapId) {
    
    // Success function 
    async function success(position) {

        // get coordinates 
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;  

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

        let greenIcon = new LeafIcon({iconUrl: '../icons/leaf-green.png'});

        // Icons for locations on map 

        let customMarker= L.Icon.extend({
            options: {
                iconSize:     [60, 60],
            }
        });

        // Parks

        let parkIcon = new customMarker({iconUrl: '../icons/parkIcon.png'});

        // Businesss Icon 

        let businessIcon= new customMarker({iconUrl: '../icons/businessIcon.png'});

        // Charging Icon 

        let electricVehicleIcon= new customMarker({iconUrl: '../icons/chargingIcon.png'});

        // Farming icon

        let farmIcon = new customMarker({iconUrl: '../icons/farmIcon.png'}); 

        // Farmers market icon 

        let farmersMarketIcon = new customMarker({iconUrl: '../icons/marketIcon.png'}); 

        // Garden icon 

        let gardenIcon = new customMarker({iconUrl: '../icons/gardenIcon.png'});

        // recycling icon 

        let recyclingIcon = new customMarker({iconUrl: '../icons/recycleIcon.png'});

        var map = L.map(`${mapId}`).setView([latitude, longitude], 13);

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

    // Make the map 
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
}
