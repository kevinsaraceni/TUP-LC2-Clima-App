function getCitiesFromLocalStorage() {
    let cities = localStorage.getItem("CITIES");

    if (cities) {
        cities = JSON.parse(cities);
    } else {
        cities = [];
    }
    return cities;
}

async function consultAPI(cityName) {

    const apiKey = "fe344ab21ce93d21e7680cf1e4a0dc41";

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=es`);
    console.log('status code: ', response.status);

    if (response.ok) {
        let responseJson = await response.json();
        return responseJson;
    }

    //Esto está puesto porque al desarmar el código, me permitía agregar cualquier ciudad y agregué esto para que
    //quede plasmado visualmente que la consulta a la API estaba dando error y que por más que la ciudad estuviera en la lista
    //no significaba que la consulta se estaba realizando correctamente.
    if (response.status != 200) {
        let card = `<div class="card">
                    <h3>Ha habido un error consultando a la API.</h3>
                </div>`

        let section = document.getElementById("section-weather-result");
        if (section) {
            section.innerHTML = "";
            section.innerHTML += card;
        }
        return "error"
    }
}