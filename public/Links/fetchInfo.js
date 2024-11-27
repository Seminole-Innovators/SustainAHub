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

function validPhone(n) {
    if (n) {
        return n;
    } else {
        return "no phone number available"
    }
}

const recyclePoints = document.querySelector('#recyclePoints'); 

if (recyclePoints) {
    fetch('/fetchLocations')
      .then(response => response.json())
      .then(jsonData => {
          for (let i = 0; i < jsonData.length; i++) {
            const newDiv = document.createElement('div');
              if (jsonData[i].loc_class == 'Recycling') {
                  newDiv.innerHTML = `<b>${jsonData[i].name}</b> <br> ${jsonData[i].loc_class} <br> ${jsonData[i].loc_addr1}, ${jsonData[i].loc_addr2} <br> ${validPhone(jsonData[i].contact_phone)} <br>`;
                  recyclePoints.appendChild(newDiv)
            }
          }
          console.log(jsonData);
      })
      .catch(error => {
      console.error('Error fetching data:', error);
      });
}

const sustainableBusinesses = document.querySelector('#sustainableBusinesses'); 

if (sustainableBusinesses) {
    fetch('/fetchLocations')
    .then(response => response.json())
    .then(jsonData => {
        for (let i = 0; i < jsonData.length; i++) {
            const newDiv = document.createElement('div');
            if (jsonData[i].loc_class == 'Recycling') {
                newDiv.innerHTML = `<b>${jsonData[i].name}</b> <br> ${jsonData[i].loc_class} <br> ${jsonData[i].loc_addr1}, ${jsonData[i].loc_addr2} <br> ${validPhone(jsonData[i].contact_phone)} <br>`;
                sustainableBusinesses.appendChild(newDiv)
            }
        }
        console.log(jsonData);
    })
    .catch(error => {
    console.error('Error fetching data:', error);
    });
}
