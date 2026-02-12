const express = require("express")
const f= require("fs").promises;
const sql = require("sqlite3").verbose();
const database = new sql.Database("cap11click")
const fs= require("fs");
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
database.serialize(() => {
app.get("/NBUTT",(req, res) => {
  database.run(`CREATE TABLE IF NOT EXISTS clicks(
               clicknumber  INTEGER DEFAULT 0)`)

  database.run(`
INSERT INTO clicks (clicknumber)
SELECT 0
WHERE NOT EXISTS (SELECT 1 FROM clicks)
`);
  
  database.run(`UPDATE clicks SET clicknumber= clicknumber + 1`)
})

  res.send("Done")
});
  

app.get("/NAME", (req, res) => {
    async function play(){
        var B = await f.readFile(DATA_PATH, "utf8")
        var C = JSON.parse(B)
        var A = await f.readFile(DATA_PATH, "utf8")

        C.forEach(z => {
            if(z.username === req.query.name){
                A = A.replace(z.username,req.query.data)
                console.log("IF HAS WORKED SEE LOG BELOW")
            }
        });
        fs.writeFileSync(DATA_PATH,A)
        console.log(A)
    } 
    play()
    res.send("Finsihed")
})

app.get("/PASS", (req, res) => {
    async function play(){
        var B = await f.readFile(DATA_PATH, "utf8")
        var C = JSON.parse(B)
        var A = await f.readFile(DATA_PATH, "utf8")

        C.forEach(z => {
            if(z.password === req.query.password){
                A = A.replace(z.password,req.query.data)
                console.log("IF HAS WORKED SEE LOG BELOW")
            }
        });
        fs.writeFileSync(DATA_PATH,A)
        console.log(A)
    } 
    play()
    res.send("Finsihed")
})

app.get("/PFP", (req, res) => {
    async function play(){
        var B = await f.readFile(DATA_PATH, "utf8")
        var C = JSON.parse(B)
        var A = await f.readFile(DATA_PATH, "utf8")

        C.forEach(z => {
            if(z.pfp === req.query.pfp){
                A = A.replace(z.pfp,req.query.data)
                console.log("IF HAS WORKED SEE LOG BELOW")
            }
        });
        fs.writeFileSync(DATA_PATH,A)
        console.log(A)
    } 
    play()
    res.send("Finsihed")
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on", PORT);
});


































