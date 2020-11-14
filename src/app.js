const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partailsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partailsPath);


app.use(express.static(publicPath));

app.get('', (req, res) => {//for views
    res.render('index', {
        title: 'Dynamic Index Page',
        name: 'Kapila Prabhashvara'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kapila Prabhashvara'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Dynamic Help Page',
        name: 'Kapila Prabhashvara',
        helpText: 'this a helpful text'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })

});

app.get('/help/*', (req, res) => {//all routes other than defined
    res.render('404', {
        title: "404",
        name: 'Kapila Prabhashvara',
        errorMessage: '404 Help article not found'
    });
});

app.get('*', (req, res) => {//all routes other than defined
    res.render('404', {
        title: "404",
        name: 'Kapila Prabhashvara',
        errorMessage: '404 Not found'
    });
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});
