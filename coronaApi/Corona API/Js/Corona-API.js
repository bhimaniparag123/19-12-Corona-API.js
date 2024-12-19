const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const cardContainer = document.getElementById('card-container');

function fetchCovidData(location) {
    const url = `https://disease.sh/v3/covid-19/countries/${location}?strict=true`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found or network issue');
            }
            return response.json();
        })
        .then(data => {
            displayCovidData(data);
        })
        .catch(error => {
            cardContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}
function displayCovidData(data) {
    cardContainer.innerHTML = '';

    const card = `
                <div class="card">
                    <h2>${data.country || data.state || "Unknown Location"}</h2>
                    <p><strong>Cases:</strong> ${data.cases.toLocaleString()}</p>
                    <p><strong>Today's Cases:</strong> ${data.todayCases.toLocaleString()}</p>
                    <p><strong>Deaths:</strong> ${data.deaths.toLocaleString()}</p>
                    <p><strong>Today's Deaths:</strong> ${data.todayDeaths.toLocaleString()}</p>
                    <p><strong>Recovered:</strong> ${data.recovered.toLocaleString()}</p>
                    <p><strong>Active Cases:</strong> ${data.active.toLocaleString()}</p>
                    <p><strong>Critical Cases:</strong> ${data.critical.toLocaleString()}</p>
                </div>
            `;
    cardContainer.innerHTML += card;
}

searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        cardContainer.innerHTML = '<p>Loading data...</p>';
        fetchCovidData(location);
    } else {
        cardContainer.innerHTML = '<p>Please enter a valid location.</p>';
    }
});