const  request = require("request");

const geocode = (adress,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoiYmllbDFzdCIsImEiOiJjanV3eDNjZmowaGF5NDRwdnN3d2Rhamp6In0.prqntpqo1RDPcXMsxajnkw`

    request({url:url,json:true}, (error,{body}) =>{
        if(error) callback("Unable to connect locale service",undefined)
        else if(body.features.length===0) callback("The location that you passed is invalid",undefined);
        else callback(undefined,{latitude:body.features[0].center[1],longitude:body.features[0].center[0],placename:body.features[0].place_name});
    });
}

module.exports = geocode;