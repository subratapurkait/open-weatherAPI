const weather = require('openweather-apis');
const { unixToIndiaTZ } = require('../utility');
weather.setAPPID(process.env.API_KEY);
// console.log(weather);
module.exports = {
    async getLocation(req, res) {
        if (Object.keys(req.query).length === 0) return res.status(411).json({ message: "please input location" });
        const { lat, long } = req.query;
        if (!lat || !long) return res.status(404).json({ message: "please input Co-Ordinates" });
        if (lat && long) {
            weather.setCoordinate(lat, long)
        } else {
            return res.status(403).json({ message: "Co-Ordinate error" });
        }

        weather.setLang("en");
        weather.setUnits('metric');

        try {
            const aPromise =  new Promise(function(resolve, reject) {
                weather.getWeatherForecast(function(err, response, body){
                    if (err) {
                        reject(err);
                    } else {
                        if (!response) reject("No Data Found");
                        if (!response.list) reject("No Forecast Data Found");

                        const { list }  = response;
                        const forecastList = list.map((time, index) =>{
                            return {
                                dateTime: unixToIndiaTZ(time.dt).format("DD-MM-YYYY HH:mm:ss"),
                                main: time.main,
                                weather: time.weather,
                                clouds: time.clouds,
                                wind: time.wind
                            }
                        });
                        
                        if(req.query.current == 1){
                            let currentWeatherArr = {};
                            new Promise(function(resolve, reject) {
                                weather.getSmartJSON(function(errs, responseTemp){
                                    if (errs) reject(errs);
                                    if (!responseTemp) reject("No Data Found");

                                    const currentWeather = {
                                        ...responseTemp,
                                        sunrise: unixToIndiaTZ(response.city.sunrise).format("DD-MM-YYYY HH:mm:ss"),
                                        sunset: unixToIndiaTZ(response.city.sunset).format("DD-MM-YYYY HH:mm:ss"),
                                    }
                                    
                                    // console.log("getSmartJSON", currentWeather);
                                    const data = {
                                        status: response.cod,
                                        message: response.message,
                                        count: response.cnt,
                                        city :{
                                            id: response.city.id,
                                            name: response.city.name,
                                            coord: response.city.coord,
                                            country: response.city.country,
                                            population: response.city.population,
                                            timezone: response.city.timezone,
                                        },
                                        currentWeather,
                                        forecastList
                                    }
                                    resolve(res.status(200).json(data));
                                })
                            })
                        } else {
                            const data = {
                                status: response.cod,
                                message: response.message,
                                count: response.cnt,
                                city :{
                                    id: response.city.id,
                                    name: response.city.name,
                                    coord: response.city.coord,
                                    country: response.city.country,
                                    population: response.city.population,
                                    timezone: response.city.timezone,
                                },
                                forecastList
                            }
                            resolve(res.status(200).json(data));
                        }
                        
                    }
                })
            });
        } catch(err) {
            return res.status(500).json({ message: err.message });
        }
    }
}
