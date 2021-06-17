const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const chalk = require('chalk')
const app = express()
// wwhhhh
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => { 
    res.render('index', {
        title: 'Weather App',
        name: 'Juwerio'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Juwerio'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Juwerio',
        message: 'This is help message'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'Address must be provided!!'
        })
    }
   
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address){
        return res.send({
            error: 'You must provide an Address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

         forecast(latitude,longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })   
                }
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })
            })
    })
   
})

app.get('/help/*', (req, res) => {
    res.send('Help article not found')
})

app.get('*', (req, res) => {
    res.send('My 404 Page')
})  

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})