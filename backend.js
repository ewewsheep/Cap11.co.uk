const express = require("express")
const f= require("fs");
const app = express()
const path = require("path");
const cors = require("cors");

app.use(cors()); // allow all origins (quick fix)

const DATA_PATH = path.join(__dirname, "Data.Json");

app.get("/Data.json", async (req, res) => {
  const data = await f.readFile(DATA_PATH, "utf8"); // parses JSON automatically res.json(data)#
  var dat = JSON.parse(data)
  res.json(dat)
});


app.use(express.static("public"));

app.get("/NAME", (req, res) => {
    async function play(){
        var B = await fetch("DATA_PATH")
        var C = await B.json()
        var D = await fetch("DATA_PATH")
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
        var B = await fetch("DATA_PATH")
        var C = await B.json()
        var D = await fetch("DATA_PATH")
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
        var B = await fetch("DATA_PATH")
        var C = await B.json()
        var D = await fetch("DATA_PATH")
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


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on", PORT);
});




















