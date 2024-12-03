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
        newDiv.innerHTML = `${jsonData.events[i].title} <br> <a href="${jsonData.events[i].link}">Link</a> <br> ${jsonData.events[i].date} <br> ${jsonData.events[i].county}`
        eventsDiv.appendChild(newDiv);
    }
})