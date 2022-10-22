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



router.route("/")
    .get((req, res)=>{
        var id=1;
        const link= "https://superheroapi.com/api/3036134866714953/";
        //"https://akabab.github.io/superhero-api/api/id/"+id+".json";
        axios.get(link+ id.toString())
        .then((apiResponse) =>{
            const character = apiResponse.data;
            //res.render('presentacion', {character: character});

        });
    })
    .post((req, res) => {
        searchName = req.body.searchName;
        axios.get(link + "search/" + searchName)
            .then((apiResponse) => {
                try{
                    const character = apiResponse.data.results[0];
                    currentId = parseInt(character.id);
                    res.redirect('/' + currentId.toString());
                }
                catch{
                    res.redirect('/' + currentId.toString());
                }
            });
    });
        /*response
            /*.on("data", (jdata) =>{
                data += jdata;
            })
            .on("end", ()=>{
                var jsondata= JSON.parse(data);
                console.log(jsondata["intelligence"]);
                //res.send("Trones");
            })
            .on("error", (e) =>{
                console.log("errror");
                res.send("error");
            });*/

app.get("/prueba", (req, res) =>{
    res.send("Hola");
});
app.listen(3000, ()=>{
    console.log("Example app listening on port 1000");
});