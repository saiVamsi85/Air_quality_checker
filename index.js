const form = document.getElementById("form");
const latitudeInput = document.getElementById("latitude");
const longitudeInput = document.getElementById("longitude");

const resultContainer = document.getElementById("result");
const aqiResult = document.getElementById("aqi");
const coResult = document.getElementById("co");
const no2Result = document.getElementById("no2");
const o3Result = document.getElementById("o3");
const pm2Result = document.getElementById("pm2");
const pm10Result = document.getElementById("pm10");
const so2Result = document.getElementById("so2");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const latitude = latitudeInput.value;
    const longitude = longitudeInput.value;
    const url = `https://air-quality.p.rapidapi.com/current/airquality?lon=${longitude}&lat=${latitude}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c485b95e57mshd1cd9343cb9a603p1e76d5jsn0da4ba990148',
            'X-RapidAPI-Host': 'air-quality.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const result = await response.json();
        if (result.data && result.data.length > 0) {
            let reading = result.data[0];
            console.log(reading);
            aqiResult.textContent = reading.aqi || 'N/A';
            coResult.textContent = reading.co || 'N/A';
            no2Result.textContent = reading.no2 || 'N/A';
            o3Result.textContent = reading.o3 || 'N/A';
            pm2Result.textContent = reading.pm2 || 'N/A';
            pm10Result.textContent = reading.pm10 || 'N/A';
            so2Result.textContent = reading.so2 || 'N/A';
            resultContainer.style.display = 'flex';
        } else {
            throw new Error('API response does not contain valid data');
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        // Handle error, e.g., display an error message to the user
    }
});
