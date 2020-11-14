const request = require('request');

const geocode = (address, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?types=place&access_token=pk.eyJ1IjoicHJhYmhhc2h2YXJhIiwiYSI6ImNrMHF1aXp6aTBjanczbm80Y2lhZDZsbG0ifQ.T7rIqhpsSvr0WKRFGkdAZw';

    request({ url: geocodeUrl, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        }
        else if (body.features.length === 0) {
            callback('Unable to find locaion, try another search', undefined);
        }
        else {
            const latitude = body.features[0].center[1];
            const longtitude = body.features[0].center[0];
            const location = body.features[0].place_name;
            // console.log('Lat :' + latitude + '  long:' + longtitude);
            callback(undefined, { latitude, longtitude, location });
        }

    });
};


module.exports = geocode;