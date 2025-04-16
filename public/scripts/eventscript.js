async function getEvents() {
    try {
        const response = await fetch('/events');
        const jsonData = await response.json();
        console.log("events:", jsonData);
        return jsonData; // Now you can use this result later
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

const events = getEvents();

console.log(events); 

async function loadEvents() {
    const eventColumn = document.querySelector('.event-list');
    if (!eventColumn) return;

    const events = await getEvents(); // Wait for the actual data
    if (!events) return; // In case of error or no data

    // Sort events by date
    events.sort((a, b) => new Date(a.date) - new Date(b.date));


    events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
          <div class="card-header">${event.eventName}</div>
          <div class="card-content">
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.address}</p>
            <button class="expand-btn">Show More</button>
            <div class="expandable-info">
              <p>${event.info}</p>
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

window.addEventListener('load', loadEvents);