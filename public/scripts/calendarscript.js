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

// leave fullcalendar out for now

// document.addEventListener('DOMContentLoaded', function() {
//     var calendarEl = document.getElementById('calendar');
//     var calendar = new FullCalendar.Calendar(calendarEl, {
//       initialView: 'dayGridMonth'
//     });
//     calendar.render();
// });

const eventsDiv = document.querySelector('#events');
fetch('/fetchEvents')
.then(response => response.json())
.then(jsonData => {
    console.log(jsonData)
    for (let i = 0; i < jsonData.events.length; i++) {
        const newDiv = document.createElement('div'); 
        newDiv.innerHTML = `<h2>${jsonData.events[i].title}</h2> <br> <a href="${jsonData.events[i].link}">Link to Event</a> <br> ${jsonData.events[i].date} <br> ${jsonData.events[i].county}`
        eventsDiv.appendChild(newDiv);
    }
});

// Create a new Date object to get the current date and time

const currentDate = new Date();

// Get the current date and time in a readable format
const dateTimeString = currentDate.toLocaleString();

const update = document.querySelector('#update');

update.textContent = `Page last updated on: ${dateTimeString}`;