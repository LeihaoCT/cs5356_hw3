// Select the button and results list
const fetchButton = document.getElementById('fetch-button');
const apiResults = document.getElementById('api-results');

// Listen for a click on the "Fetch Data" button
fetchButton.addEventListener('click', () => {
  fetch('https://api.publicapis.org/entries')
    .then(response => response.json())
    .then(data => {
      // Clear previous results, if any
      apiResults.innerHTML = '';

      // Grab the first 5 entries as a simple example
      data.entries.slice(0, 5).forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.API} - ${entry.Description}`;
        apiResults.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      apiResults.innerHTML = '<li>Failed to load data. Please try again later.</li>';
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