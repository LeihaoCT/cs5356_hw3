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

// Animate progress bars when page loads
document.addEventListener('DOMContentLoaded', () => {
  const progressBars = document.querySelectorAll('progress');
  progressBars.forEach(bar => {
    const finalValue = bar.value;
    bar.value = 0;
    setTimeout(() => {
      bar.value = finalValue;
    }, 300);
  });
});