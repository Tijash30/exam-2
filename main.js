const express= require("express");
const app= express();
const axios = require('axios');
const router = express.Router();

const https= require("https");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

function ran(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
var aidi= 1;
var link1= "https://akabab.github.io/superhero-api/api/id/";
app.route('/')
    .get((req, res) => {
        var link= link1+aidi+".json";

        axios.get(link)
            .then((response) => {
                const doto = response.data;
                //console.log(doto['name'])
                res.render('presentacion', {personaje: doto});
            });
    }).post((req, res) => {
        search = req.body.searchid;    
        axios.get(link1+search+".json")
            .then((response) => {
                try{
                    aidi = parseInt(search);
                    res.redirect('/');
                }
                catch{
                    res.redirect('/');
                }
            });
    });

app.route('/pag')
    .get((req, res) => {
        var link=link1+aidi+".json";
        axios.get(link)
            .then((response) => {
                const doto = response.data;
                //console.log(doto['name'])
                res.render('index', {personaje: doto});
            });
    });
app.get('/next', (req, res) => {
    if(aidi == 700) aidi = 1;
    else aidi += 1;
    res.redirect('/pag');
});
app.get('/previous', (req, res) => {
    if(aidi == 1) aidi = 700;
    else aidi -= 1;
    res.redirect('/pag');
});


app.listen(3000, ()=>{
    console.log("Example app listening on port 1000");
});
