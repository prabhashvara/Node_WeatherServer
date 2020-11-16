


const weatherForm = document.querySelector('#weather-form');
const locationInput = document.querySelector('input');
const pError = document.querySelector('#perror');
const pForecast = document.querySelector('#pforecast');
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    pError.textContent = 'Loading ...';
    pForecast.textContent = '';
    fetch('/weather?address=' + locationInput.value).then(response => {
        response.json().then(data => {
            if (data.error) {
                console.log(data.error);
                pError.textContent = data.error;
            }
            else {
                console.log(data.location);
                console.log(data.forecast);
                pError.textContent = data.location;
                pForecast.textContent = data.forecast;
            }
        });
    });
})