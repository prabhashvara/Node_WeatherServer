const request = require('request');


const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/bf431732750b6484de8c9f5f5f9803e2/' + lat + ',' + lon + '?units=si';

    request({ uri: url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service', undefined);
        }
        else if (body.error) {
            callback('Unable to find the location', undefined);
        }
        else {

            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.');
        }
    });
};

module.exports = forecast;
