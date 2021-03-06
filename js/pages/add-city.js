async function validateCity(newCity) {
    let cities = getCitiesFromLocalStorage();

    for (let i = 0; i < cities.length; i++) {
        if (newCity == cities[i]) {
            return "warning";
        };
    };

    if (await consultAPI(newCity) == "error") {
        return "error";
    } else {
        return "success";
    };
}

function removeMessage() {
    setTimeout(function() {
        document.getElementsByClassName("alert")[0].remove();
    }, 4000);
}

async function addCityToLocalStorage() {
    let cities = getCitiesFromLocalStorage();
    let newCity = document.getElementById("cityAdded").value;
    newCity = newCity.toUpperCase()

    switch (await validateCity(newCity)) {
        case "success":
            cities.push(newCity);
            localStorage.setItem("CITIES", JSON.stringify(cities));
            document.getElementById("messageBox").innerHTML += successMessage;
            removeMessage();
            break;
        case "warning":
            document.getElementById("messageBox").innerHTML += warningMessage;
            removeMessage();
            break;
        case "error":
            document.getElementById("messageBox").innerHTML += errorMessage;
            removeMessage();
            break;
    };
};

const successMessage = '<p class="alert success">Ciudad agregada con éxito</p>';
const errorMessage = '<p class="alert error">Error: La ciudad ingresada no se encuenta en la API o se produjo un error al consultar</p>';
const warningMessage = '<p class="alert warning">La ciudad ingresada ya se encuentra almacenada</p>';

const buttonAddCity = document.getElementById("addCity");
buttonAddCity.addEventListener("click", addCityToLocalStorage);