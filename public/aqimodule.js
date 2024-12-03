export function aqi() {
    
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
    
        return response.json();
    };
    
    // Success function 
    async function success(position) {

        // get coordinates => used for both the air quality and map 
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Air quality section 
        const aqiData = await fetchAirQuality(latitude, longitude);

        const airQualityText = document.querySelector('#air-quality-text'); 

        let airQualityNumber = document.querySelector('#air-quality-number');

        airQualityNumber.textContent = aqiData.list[0].main.aqi;

        if (aqiData.list[0].main.aqi == 5) {
        // airQualityNumber.classList.add('bad');
        airQualityText.innerText = 'This air quality score, from 1 (very little to no pollutants) to 5 (dangerously high pollutants), indicates that the air quality in your area is so heavily polluted that it is hazardous to breathe. You must take action right away to protect the environment and reverse the grave damages that have been done.'; 
        } else if (aqiData.list[0].main.aqi == 4) {
        // airQualityNumber.classList.add('low'); 
        airQualityText.innerText = 'This air quality score, from 1 (almost no pollutants) to 5 (dangerously high pollutants), indicates that the air quality in your area is dangerously low and possibly harmful to breathe. You should strongly consider taking action to prevent it from becoming worse.'
        } else if (aqiData.list[0].main.aqi == 3) {
        // airQualityNumber.classList.add('middle'); 
        airQualityText.innerText = 'This air quality score, from 1 (almost no pollutants) to 5 (dangerously high pollutants), indicates that the air quality in your area is somewhat polluted and you should consider taking action to encourage a more sustainable future for your area.';
        } else if (aqiData.list[0].main.aqi == 2) {
        // airQualityNumber.classList.add('good'); 
        airQualityText.innerText = 'This air quality score, from 1 (almost no pollutants) to 5 (dangerously high pollutants), indicates that the air quality in your area is relatively good, however it needs improvement. If you get involved with efforts to protect the environment, you will ensure that it will become cleaner and stay that way.';
        } else if (aqiData.list[0].main.aqi <= 1) {
        // airQualityNumber.classList.add('great'); 
        airQualityText.innerText = 'This air quality score, from 1 (almost no pollutants) to 5 (dangerously high pollutants), indicates that the air quality in your area is very good, however, it does not mean it will stay that way forever. By encouraging sustainability and environmental protection, you can ensure that the air quality will stay as good as it is now for genereations to come.';
        }
    }

    // Handle the map and air quality
    async function getAQI() {

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

    getAQI();
}
