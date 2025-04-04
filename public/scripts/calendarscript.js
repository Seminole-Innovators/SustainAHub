const exampleEvents = [
    { id: 1, name: "Tallahassee Farmers Market", date: "2025-03-23", location: "Market Square Park", description: "A weekly event featuring local vendors, fresh produce, and live music." },
    { id: 2, name: "Park Clean-up Day", date: "2025-03-25", location: "Cascades Park", description: "Join us for a volunteer clean-up to keep the park beautiful for the community." },
    { id: 3, name: "Sustainability Workshop", date: "2025-03-30", location: "FSU Innovation Hub", description: "Learn practical sustainability tips from local experts and community leaders." },
    { id: 4, name: "Nature Walk & Birdwatching", date: "2025-04-02", location: "Apalachicola National Forest", description: "A guided nature walk and birdwatching event for all ages." },
    { id: 5, name: "Green Energy Fair", date: "2025-04-10", location: "Tallahassee Civic Center", description: "Exhibits and talks on renewable energy solutions and technology." },
    { id: 6, name: "Community Garden Planting", date: "2025-04-15", location: "Lake Ella", description: "Help us plant and maintain our local community garden." },
    { id: 7, name: "Composting 101 Workshop", date: "2025-04-20", location: "FSU Sustainability Center", description: "Learn how to start composting at home and reduce waste." },
    { id: 8, name: "Earth Day Celebration", date: "2025-04-22", location: "Downtown Tallahassee", description: "A full day of eco-friendly activities, music, and food trucks." }
  ];

  function loadEvents() {
      const eventColumn = document.querySelector('.event-column');
      if (!eventColumn) return;

      exampleEvents.forEach(event => {
          const card = document.createElement('div');
          card.className = 'event-card';
          card.innerHTML = `
            <div class="card-header">${event.name}</div>
            <div class="card-content">
              <p><strong>Date:</strong> ${event.date}</p>
              <p><strong>Location:</strong> ${event.location}</p>
              <button class="expand-btn">Show More</button>
              <div class="expandable-info">
                <p>${event.description}</p>
              </div>
            </div>
          `;
          eventColumn.appendChild(card);
      });

      document.querySelectorAll('.expand-btn').forEach(button => {
          button.addEventListener('click', (e) => {
              const card = e.target.closest('.event-card');
              card.classList.toggle('expanded');
              button.textContent = card.classList.contains('expanded') ? 'Show Less' : 'Show More';
          });
      });
  }

  const resizer = document.querySelector('.resizer-bar');
  const eventColumn = document.querySelector('.event-column');
  const container = document.querySelector('.columns-container');
  let isResizing = false;

  if (resizer && eventColumn && container) {
      resizer.addEventListener('mousedown', function () {
          isResizing = true;
      });

      window.addEventListener('mousemove', function (e) {
          if (!isResizing) return;
          const containerOffsetLeft = container.offsetLeft;
          const containerWidth = container.offsetWidth;
          const newWidth = e.clientX - containerOffsetLeft;
          if (newWidth > 250 && newWidth < containerWidth - 250) {
              eventColumn.style.flex = `0 0 ${newWidth}px`;
          }
      });

      window.addEventListener('mouseup', function () {
          isResizing = false;
      });
  }

  window.addEventListener('load', loadEvents);
  
import { map } from './mapmodule.js'; 


map('events-map');
