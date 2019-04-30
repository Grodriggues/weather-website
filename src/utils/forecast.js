const request = require("request");

const forecast = (placename,latitude,longitude,callback) =>{
    const url = `https://api.darksky.net/forecast/300f75e1cf5f82f6c96c524ebeeb27d6/${latitude},${longitude}?units=si`;
    request({url,json:true}, (error,{ body }) =>{
        if(error) callback("Unable to connect on forecast service",undefined);
        else if(body.error) callback(body.error,undefined);
        else{
            callback(undefined,{
                temperature:body.currently.temperature,
                rain :body.currently.precipProbability,
            })
        }
    });
}

module.exports = forecast;