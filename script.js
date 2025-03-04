// Select the button and results list
const fetchButton = document.getElementById('fetch-button');
const apiResults = document.getElementById('api-results');

// Function to fetch Citibike data and update the UI
function fetchCitibikeData() {
  const apiResults = document.getElementById('api-results');
  
  // Update UI while loading
  apiResults.innerHTML = '<li>Checking bike availability at Roosevelt Island Tramway...</li>';
  
  // First fetch station information to get the station ID for Roosevelt Island Tramway
  fetch('https://gbfs.citibikenyc.com/gbfs/en/station_information.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Find Roosevelt Island Tramway station
      const stations = data.data.stations;
      const rooseveltStation = stations.find(station => 
        station.name.includes("Roosevelt Island") && station.name.includes("Tramway")
      );
      
      if (!rooseveltStation) {
        throw new Error('Roosevelt Island Tramway station not found');
      }
      
      // Get the station ID
      const stationId = rooseveltStation.station_id;
      
      // Now fetch the station status data to get real-time availability
      return fetch('https://gbfs.citibikenyc.com/gbfs/en/station_status.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(statusData => {
          // Find the status for Roosevelt Island Tramway station
          const stationStatus = statusData.data.stations.find(
            station => station.station_id === stationId
          );
          
          if (!stationStatus) {
            throw new Error('Status for Roosevelt Island Tramway station not found');
          }
          
          // Clear previous results
          apiResults.innerHTML = '';
          
          // Create elements for station info
          const stationName = document.createElement('li');
          stationName.innerHTML = `<strong>${rooseveltStation.name}</strong>`;
          apiResults.appendChild(stationName);
          
          const bikesAvailable = document.createElement('li');
          bikesAvailable.textContent = `Bikes Available: ${stationStatus.num_bikes_available}`;
          apiResults.appendChild(bikesAvailable);
          
          const docksAvailable = document.createElement('li');
          docksAvailable.textContent = `Docks Available: ${stationStatus.num_docks_available}`;
          apiResults.appendChild(docksAvailable);
          
          const lastUpdated = document.createElement('li');
          const updateTime = new Date(stationStatus.last_reported * 1000).toLocaleTimeString();
          lastUpdated.textContent = `Last Updated: ${updateTime}`;
          apiResults.appendChild(lastUpdated);
          
          // Add Doudou's comment based on availability
          const comment = document.createElement('li');
          comment.style.fontStyle = 'italic';
          comment.style.marginTop = '10px';
          
          if (stationStatus.num_bikes_available === 0) {
            comment.textContent = "Doudou says: No bikes available? Just like my food bowl - always empty when I need it!";
          } else if (stationStatus.num_bikes_available < 3) {
            comment.textContent = "Doudou says: Only a few bikes left! Better hurry like I do when it's dinner time.";
          } else {
            comment.textContent = "Doudou says: Plenty of bikes available! Not that I care... I prefer my windowsill.";
          }
          
          apiResults.appendChild(comment);
        });
    })
    .catch(error => {
      console.error('Error fetching Citibike data:', error);
      apiResults.innerHTML = '<li>Failed to load bike availability. Please try again later.</li>';
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchCitibikeData();
  
  // Also run the progress bar animation
  const progressBars = document.querySelectorAll('progress');
  
  progressBars.forEach(bar => {
    const finalValue = bar.value;
    const duration = 1500; // Animation duration in milliseconds
    const steps = 30; // Number of steps for the animation
    const increment = finalValue / steps;
    let currentValue = 0;
    
    // Reset to zero initially
    bar.value = 0;
    
    // Create an interval to gradually increase the value
    const interval = setInterval(() => {
      currentValue += increment;
      
      // Make sure we don't exceed the final value
      if (currentValue >= finalValue) {
        bar.value = finalValue;
        clearInterval(interval);
      } else {
        bar.value = currentValue;
      }
    }, duration / steps);
  });
});

// Animate progress bars when page loads with a gradual effect
document.addEventListener('DOMContentLoaded', () => {
  const progressBars = document.querySelectorAll('progress');
  
  progressBars.forEach(bar => {
    const finalValue = bar.value;
    const duration = 1500; // Animation duration in milliseconds
    const steps = 30; // Number of steps for the animation
    const increment = finalValue / steps;
    let currentValue = 0;
    
    // Reset to zero initially
    bar.value = 0;
    
    // Create an interval to gradually increase the value
    const interval = setInterval(() => {
      currentValue += increment;
      
      // Make sure we don't exceed the final value
      if (currentValue >= finalValue) {
        bar.value = finalValue;
        clearInterval(interval);
      } else {
        bar.value = currentValue;
      }
    }, duration / steps);
  });
});

// Mouse tracking interactivity - Make an element follow mouse movement
document.addEventListener('DOMContentLoaded', () => {
  const interactiveSection = document.getElementById('interactive-section');
  
  // Create a tracking element that will follow the mouse
  const tracker = document.createElement('div');
  tracker.classList.add('cat-eye-tracker');
  tracker.innerHTML = '<div class="pupil"></div>';
  interactiveSection.appendChild(tracker);
  
  // Add another eye
  const tracker2 = document.createElement('div');
  tracker2.classList.add('cat-eye-tracker');
  tracker2.innerHTML = '<div class="pupil"></div>';
  interactiveSection.appendChild(tracker2);
  
  // Track mouse movement
  interactiveSection.addEventListener('mousemove', (e) => {
    // Get mouse position relative to the container
    const rect = interactiveSection.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate the position for the cat eyes (centered in the section)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Position the first eye
    tracker.style.left = (centerX - 40) + 'px';
    tracker.style.top = centerY + 'px';
    
    // Position the second eye
    tracker2.style.left = (centerX + 40) + 'px';
    tracker2.style.top = centerY + 'px';
    
    // Calculate the angle for the pupils to look at the mouse
    const pupils = document.querySelectorAll('.pupil');
    pupils.forEach(pupil => {
      const eyeRect = pupil.parentElement.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2 - rect.left;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2 - rect.top;
      
      // Calculate the angle
      const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
      
      // Limit the movement radius
      const distance = Math.min(5, Math.hypot(mouseX - eyeCenterX, mouseY - eyeCenterY) / 10);
      
      // Move the pupil
      const pupilX = Math.cos(angle) * distance;
      const pupilY = Math.sin(angle) * distance;
      
      pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    });
  });
  
  // Add text explaining the feature
  const instructions = document.createElement('p');
  instructions.textContent = "Move your mouse around and watch Doudou's eyes follow you!";
  interactiveSection.appendChild(instructions);
});