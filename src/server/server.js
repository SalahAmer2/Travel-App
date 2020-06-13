const fetch = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();
const { timeDiff } = require("../client/js/timeDiff");

const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

// Setup empty JS object to act as an endpoint
let projectData = {};

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('dist'));

const create_UUID = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

app.post('/postAndGetFunc', (req, res)=> {

    const username = process.env.API_USERNAME;
    const weatherbitAPIKey = process.env.weatherbit_API_KEY;
    const pixabayAPIKey = process.env.pixabay_API_KEY;


    const baseURLGeo = req.body.baseURLGeo;
    const baseURLWeatherCurrent = req.body.baseURLWeatherCurrent;
    const baseURLWeatherForecast = req.body.baseURLWeatherForecast;
    const baseURLPixabay = req.body.baseURLPixabay;
    const newDate = req.body.newDate;

    const city = req.body.city;
    const depDateFromUser = req.body.depDateFromUser;
    const returnDateFromUser = req.body.returnDateFromUser;

    const getFunc = async () => {
        const resGeo = await fetch(baseURLGeo + encodeURI(city) + "&username=" + username);

        try {
            const data = await resGeo.json();
            const countryName = data.geonames[0].countryName;
            const latitude = data.geonames[0].lat;
            const longitude = data.geonames[0].lng;
            const daysLeft = timeDiff(newDate, depDateFromUser, returnDateFromUser);

            const resWeather = await fetch(
                ((daysLeft > 7) ? baseURLWeatherForecast : baseURLWeatherCurrent) + "key=" + weatherbitAPIKey + "&lat=" + latitude + "&lon=" + longitude
            );

            const data2 = await resWeather.json();
            const weather = data2.data[0].weather.description;

            const resPixabayPhoto = await fetch(baseURLPixabay + "key=" + pixabayAPIKey + "&q=" + encodeURI(city) + "+tourism&image_type=photo");

            const data3 = await resPixabayPhoto.json();
            const cityPhoto = data3.hits[0].webformatURL;

            // id generated by create_UUID function
            const currentId = create_UUID();

            const tripData = {
                cityPhoto: cityPhoto,
                country: countryName,
                date: newDate,
                depDate: depDateFromUser,
                retDate: returnDateFromUser,
                daysLeft: daysLeft,
                weather: weather,
                temp: (daysLeft > 7) ? {
                    low_temp: data2.data[0].low_temp,
                    max_temp: data2.data[0].max_temp,
                    trueOrFalse: true //For the if statement in updateUI in the client side
                } : {
                        temp: data2.data[0].temp,
                        trueOrFalse: false //For the if statement in updateUI in the client side
                    },
                lat: latitude,
                lng: longitude,
                tripId: currentId
            };

            projectData[currentId] = tripData;

            return projectData;
            
        } catch (error) {
            console.log("error", error);
            //appropriately handle the error
        }
    };

    getFunc().then((projectData) => {
        res.send(projectData);
    });

});

app.post('/deleteTrip', (req, res) => {
    const id = req.body.tripId;
    delete projectData[id]; 
    res.send(projectData);
});

// Setup Server
// const port = '3000';

// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3001;
}
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
