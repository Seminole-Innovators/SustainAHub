import { map } from './mapmodule.js';
import { aqi } from './aqimodule.js';
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

map('small-map');
aqi();

// Create a new Date object to get the current date and time
const currentDate = new Date();

// Get the current date and time in a readable format
const dateTimeString = currentDate.toLocaleString();

const update = document.querySelector('#update');

update.textContent = `Page last updated on: ${dateTimeString}`;