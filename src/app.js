const express = require("express");
const path = require("path");
const hbs = require("hbs");
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// define paths to express config
const public = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../views/templates");
const partialsPath = path.join(__dirname,"../views/partials");

// setup handlebars engine
app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory
app.use(express.static(public));

app.get("/",(req,res) =>{
    res.render("index",{menssage :"Weather"})
})

app.get("/about", (req,res) =>{
    res.render("about",{menssage:"About the site"})
}); 

app.get("/help",(req,res)=>{
    res.render("help",{menssage:"Help"});
    
});

app.get("/weather", (req,res) =>{
    if(!req.query.address) return res.send({error:"You must provide the address term"});
    geocode(req.query.address,(error,{latitude,longitude,placename}= {})=>{
        if(error) return res.send({error:error});
        forecast(placename,latitude,longitude,(err,{temperature,rain}) =>{
            if(err) return res.send({error:err})
            res.send({
                placename,
                temperature,
                rain
            });
    
        });
    });
});

app.get("/products", (req,res) =>{
    if(!req.query.search) return res.send({error:"You must provide a search term"});
    console.log(req.query);
    res.send({
        products:[]
    })
    
    
});

app.get("/help/*",(req,res) =>{
    res.render("404",{
        menssage:"Help error",
        error:"Help article not found"
    })
});

app.get("*", (req,res) =>{
    res.render("404",{
        menssage:"404 Error",
        error:"Page not found"
    })
});

app.listen(3000,() =>{
    console.log("Server is up on port 3k")
});