export function map(mapId) {

    async function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Define Icons
        let customMarker = L.Icon.extend({
            options: {
                iconSize: [60, 60],
            }
        });

        // Define all icons
        let locationIcon = new customMarker({ iconUrl: '../icons/leaf-green.png'});
        let parkIcon = new customMarker({ iconUrl: '../icons/parkIcon.png' });
        let businessIcon = new customMarker({ iconUrl: '../icons/businessIcon.png' });
        let electricVehicleIcon = new customMarker({ iconUrl: '../icons/chargingIcon.png' });
        let farmIcon = new customMarker({ iconUrl: '../icons/farmIcon.png' });
        let farmersMarketIcon = new customMarker({ iconUrl: '../icons/marketIcon.png' });
        let gardenIcon = new customMarker({ iconUrl: '../icons/gardenIcon.png' });
        let recyclingIcon = new customMarker({ iconUrl: '../icons/recycleIcon.png' });

        const map = L.map(`${mapId}`).setView([latitude, longitude], 13);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        L.marker([latitude, longitude], { icon: locationIcon }).addTo(map).bindPopup("Your Current Location.");

        // Store markers by type
        const markers = {
            park: [],
            recycle: [],
            evCharging: [],
            garden: [],
            farm: [],
            business: [],
            market: []
        };

        // Function to determine if it is a park or other location type 

        function sortType(location) {
            if (location.name) {
                return `<b>${location.name}</b> <br> ${location.loc_class} <br> ${location.loc_addr1}, ${location.loc_addr2}`;
            } else {
                return `<b>${location.park_name}</b> <br> ${location.address}`
            }
        }

        // Function to fetch and add markers
        function addMarkersToMap(locations, type, icon) {
            locations.forEach(location => {
                let marker = L.marker([location.geom.coordinates[1], location.geom.coordinates[0]], { icon: icon })
                    .addTo(map)
                    .bindPopup(sortType(location));
                markers[type].push(marker);
            });
        }

        // Fetch and place parks
        fetch('/fetchParks')
            .then(response => response.json())
            .then(jsonData => {
                console.log("Parks data:", jsonData);  // Log the fetched parks data
                addMarkersToMap(jsonData, 'park', parkIcon);
            })
            .catch(error => {
                console.error("Error fetching parks:", error);
            });

        // Fetch and place other locations
        fetch('/fetchLocations')
            .then(response => response.json())
            .then(jsonData => {
                console.log("Locations data:", jsonData);  // Log the fetched locations data
                jsonData.forEach(location => {
                    switch (location.loc_class) {
                        case 'Sustainable Business':
                            addMarkersToMap([location], 'business', businessIcon);
                            break;
                        case 'Electric Vehicle Charging Station':
                            addMarkersToMap([location], 'evCharging', electricVehicleIcon);
                            break;
                        case 'Regional Farm':
                            addMarkersToMap([location], 'farm', farmIcon);
                            break;
                        case 'Farmers\' Market':
                            addMarkersToMap([location], 'market', farmersMarketIcon);
                            break;
                        case 'Garden':
                            addMarkersToMap([location], 'garden', gardenIcon);
                            break;
                        case 'Recycling':
                            addMarkersToMap([location], 'recycle', recyclingIcon);
                            break;
                    }
                });
            })
            .catch(error => {
                console.error("Error fetching locations:", error);
            });

        // Filter functionality
        function filterMarkers() {
            const selectedFilters = Array.from(document.querySelectorAll('input[name="filter"]:checked'))
                .map(checkbox => checkbox.value);
            
            // Show or hide markers based on the selected filters
            Object.keys(markers).forEach(type => {
                markers[type].forEach(marker => {
                    if (selectedFilters.includes(type)) {
                        marker.addTo(map);
                    } else {
                        map.removeLayer(marker);
                    }
                });
            });
        }

        // Event listener for filter changes
        document.querySelectorAll('input[name="filter"]').forEach(checkbox => {
            checkbox.addEventListener('change', filterMarkers);
        });

        // Initially call filterMarkers to show the default selection
        filterMarkers();
    }

    // Error function for geolocation
    function error() {
        alert("Unable to retrieve your location.");
    }

    const options = {
        enableHighAccuracy: true,
    };

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
    } else {
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
}


