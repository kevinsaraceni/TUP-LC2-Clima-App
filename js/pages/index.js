const selector = document.getElementById("selectCity");

function addCitiesToSelector() {
    let cities = getCitiesFromLocalStorage();

    if (cities.length == 0) {
        selector.innerHTML += `<option value="noCities" disabled selected>No hay ciudades agregadas</option>`
    } else {
        selector.innerHTML += `<option value="" disabled selected>Seleccionar Ciudad</option>`
        for (let i = 0; i < cities.length; i++) {
            selector.innerHTML += `<option value="${cities[i]}">${cities[i]}</option>`
        }
    }
}


async function createCard() {
    const responseJson = await consultAPI(selector.value)
    const city = responseJson.name;
    const icon = responseJson.weather[0].icon;
    const temp = responseJson.main.temp;
    const feelsLike = responseJson.main.feels_like;
    const humidity = responseJson.main.humidity;
    const wind = responseJson.wind.speed;
    const pressure = responseJson.main.pressure;

    const cardSuccess = `<div class="card">
                    <h3>${city}</h3>
                    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Imagen">
                    <p>Temperatura: ${temp}°</p>
                    <p>Sensación Térmica: ${feelsLike}°</p>
                    <p>Humedad: ${humidity}%</p>
                    <p>Velocidad del Viento: ${wind}km/h</p>
                    <p>Presión: ${pressure} P</p>
                </div>`

    const sectionSuccess = document.getElementById("section-weather-result");
    if (sectionSuccess) {
        sectionSuccess.innerHTML = "";
        sectionSuccess.innerHTML += cardSuccess;
    }
}

const consultButton = document.getElementById("consultWeather");
consultButton.addEventListener("click", createCard)

addCitiesToSelector();