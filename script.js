
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("cityButton").addEventListener("click", function() {
        const location = document.getElementById("city").value;

        fetch("weather.php?location=" + location)
        .then(response => response.json())
        .then(data => {
            const citySearched = document.getElementById('citySearched');
            citySearched.innerHTML = data.city;

            const description = document.getElementById('desc');
            description.innerHTML = `<i class="fa-solid fa-cloud"></i>&nbsp;${data.desc.charAt(0).toUpperCase() + data.desc.slice(1)}`;

            for (let i = 0; i < 6; i++) {
                const currentDate = document.getElementById('date' + i);
                const date = new Date(data.weatherData[i].date);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
                const dateString = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                currentDate.innerHTML = `${dayName} <br> ${dateString}`;

                const temperature = document.getElementById('temp' + i);
                temperature.innerHTML = `<i class="fas fa-thermometer-half"></i>Temperature: ${data.weatherData[i].weather}°C`;

                const min_temp = document.getElementById('temp_min' + i);
                min_temp.innerHTML = `<i class="fas fa-temperature-low"></i>Minimum: ${data.weatherData[i].temp_min}°C`;

                const max_temp = document.getElementById('temp_max' + i);
                max_temp.innerHTML = `<i class="fas fa-temperature-high"></i>Maximum: ${data.weatherData[i].temp_max}°C`;
            }
        })
    });
    
});
