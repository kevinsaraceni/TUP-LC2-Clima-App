let selector = document.getElementById("selectCity");

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
    let responseJson = await consultAPI(selector.value)
    let city = responseJson.name;
    let icon = responseJson.weather[0].icon;
    let temp = responseJson.main.temp;
    let feelsLike = responseJson.main.feels_like;
    let humidity = responseJson.main.humidity;
    let wind = responseJson.wind.speed;
    let pressure = responseJson.main.pressure;

    let card = `<div class="card">
                    <h3>${city}</h3>
                    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Imagen">
                    <p>Temperatura: ${temp}°</p>
                    <p>Sensación Térmica: ${feelsLike}°</p>
                    <p>Humedad: ${humidity}%</p>
                    <p>Velocidad del Viento: ${wind}km/h</p>
                    <p>Presión: ${pressure} P</p>
                </div>`

    let section = document.getElementById("section-weather-result");
    if (section) {
        section.innerHTML = "";
        section.innerHTML += card;
    }
}

let consultButton = document.getElementById("consultWeather");
consultButton.addEventListener("click", createCard)

addCitiesToSelector();