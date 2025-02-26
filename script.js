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

// Interactive Mouse Tracker Implementation
const mouseTracker = document.getElementById('mouse-tracker');
const coordinatesElement = document.getElementById('coordinates');

if (mouseTracker && coordinatesElement) {
  // Calculate a color based on mouse position
  const getColorFromPosition = (x, y, width, height) => {
    // Convert x position to a hue value (0-360)
    const hue = Math.floor((x / width) * 360);
    
    // Convert y position to lightness (30-70%)
    const lightness = 30 + Math.floor((y / height) * 40);
    
    // Return an HSL color string
    return `hsl(${hue}, 80%, ${lightness}%)`;
  };

  // Add mousemove event listener
  mouseTracker.addEventListener('mousemove', (event) => {
    // Get mouse position relative to the mouseTracker element
    const rect = mouseTracker.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calculate color based on position
    const backgroundColor = getColorFromPosition(x, y, rect.width, rect.height);
    
    // Update the background color of the tracker
    mouseTracker.style.backgroundColor = backgroundColor;
    
    // Update the text with the coordinates
    coordinatesElement.textContent = `X: ${Math.round(x)}, Y: ${Math.round(y)}`;
    
    // Make text color contrast with background (simple version)
    const isDark = (event.clientY - rect.top) / rect.height > 0.5;
    coordinatesElement.style.color = isDark ? '#ffffff' : '#000000';
  });
  
  // Reset when mouse leaves
  mouseTracker.addEventListener('mouseleave', () => {
    mouseTracker.style.backgroundColor = '';
    coordinatesElement.textContent = 'Move your mouse here';
    coordinatesElement.style.color = '';
  });
}