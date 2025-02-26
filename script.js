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

// Select the button and results list
const fetchButton = document.getElementById('fetch-button');
const apiResults = document.getElementById('api-results');

// Listen for a click on the "Fetch Cat Facts" button
fetchButton.addEventListener('click', () => {
  // Update UI while loading
  apiResults.innerHTML = '<li>Finding interesting cat facts...</li>';
  
  // Fetch multiple cat facts
  fetch('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=5')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Clear previous results
      apiResults.innerHTML = '';
      
      // Handle both single fact or array of facts
      const facts = Array.isArray(data) ? data : [data];
      
      // Display each cat fact
      facts.forEach(fact => {
        const listItem = document.createElement('li');
        listItem.textContent = fact.text;
        apiResults.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error fetching cat facts:', error);
      apiResults.innerHTML = '<li>Failed to load cat facts. Please try again later.</li>';
    });
});