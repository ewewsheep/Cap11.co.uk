const express = require("express")
const f= require("fs");
const app = express()
const path = require("path");
const cors = require("cors");


app.use(cors()); // allow all origins (quick fix)

app.get("/Data.json", (req, res) => {
  res.sendFile(path.join(__dirname, "Data.json"));
});


app.use(express.static("public"));

app.get("/NAME", (req, res) => {
    async function play(){
        var B = await fetch("https://cap11-co-uk.onrender.com/Data.json")
        var C = await B.json()
        var D = await fetch("https://cap11-co-uk.onrender.com/Data.json")
        var A = await D.text()

        C.forEach(z => {
            if(z.username === req.query.name){
                A = A.replace(z.username,req.query.data)
                console.log("IF HAS WORKED SEE LOG BELOW")
            }
        });
        f.writeFileSync("Data.json",A)
        console.log(A)
    } 
    play()
    res.send("Finsihed")
})

app.get("/PASS", (req, res) => {
    async function play(){
        var B = await fetch("https://cap11-co-uk.onrender.com/Data.json")
        var C = await B.json()
        var D = await fetch("https://cap11-co-uk.onrender.com/Data.json")
        var A = await D.text()

        C.forEach(z => {
            if(z.username === req.query.name){
                A = A.replace(z.password,req.query.data)
                console.log("IF HAS WORKED SEE LOG BELOW")
            }
        });
        f.writeFileSync("Data.json",A)
        console.log(A)
    } 
    play()
    res.send("Finsihed")
})

app.get("/PFP", (req, res) => {
    async function play(){
        var B = await fetch("https://cap11-co-uk.onrender.com/Data.json")
        var C = await B.json()
        var D = await fetch("https://cap11-co-uk.onrender.com/Data.json")
        var A = await D.text()

        C.forEach(z => {
            if(z.username === req.query.name){
                A = A.replace(z.pfp,req.query.data)
                console.log("IF HAS WORKED SEE LOG BELOW")
            }
        });
        f.writeFileSync("Data.json",A)
        console.log(A)
    } 
    play()
    res.send("Finsihed")
})


app.listen(3000,() => {
    console.log("EXPRESS STARTED ON 3000");
})





