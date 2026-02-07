const express = require("express")
const f= require("fs");
const app = express()

app.use(express.static("/public"));

app.get("/NAME", (req, res) => {
    async function play(){
        var B = await fetch("http://localhost:3000/Data.json")
        var C = await B.json()
        var D = await fetch("http://localhost:3000/Data.json")
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
        var B = await fetch("http://localhost:3000/Data.json")
        var C = await B.json()
        var D = await fetch("http://localhost:3000/Data.json")
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
        var B = await fetch("http://localhost:3000/Data.json")
        var C = await B.json()
        var D = await fetch("http://localhost:3000/Data.json")
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