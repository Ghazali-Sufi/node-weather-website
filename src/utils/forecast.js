const request = require('request')
const chalk = require('chalk')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/onecall?lat='+ latitude +'&lon=' + longitude +'&units=metric&appid=e3b80aa4bd2108074866ea58a382e669'
    //const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZ2hhemFsaTRtZSIsImEiOiJja2xmNmo2MTQxZ2JqMndzNDRjZHFycjVhIn0.AmtqKl0X9RgneclZgcMFtA'

    request({url, json: true}, (error, response) => {
        if(error){
            callback(chalk.red('Unable to connect to weather service!',undefined))
        } else if(response.body.message){
            callback(chalk.red('Unable to find location.', undefined))
        } else {
        const tempreature = response.body.current.temp
        const rain = response.body.daily[0].pop
        const data =  response.body.daily[0].weather[0].description +' it\'s currently '+ tempreature + ' degrees out. There is a '+ rain + '% chance of rain'
        callback(undefined,data)
        console.log('\n'); 
        }
    })
}

module.exports = forecast