const express = require("express")
const f= require("fs").promises;
/*const sql = require("sqlite3").verbose();
const database = new sql.Database("cap11click")*/
const fs= require("fs");
const app = express()
const path = require("path");
const cors = require("cors");

app.use(cors()); // allow all origins (quick fix)


const DATA_PATH = "https://raw.githubusercontent.com/ewewsheep/Cap11.co.uk/refs/heads/main/Data.Json"


app.get("/Data.json", async (req, res) => {
  const data = await fetch(DATA_PATH);
  res.json(JSON.parse(data)); 
});


app.use(express.static("public"));




/*app.get("/NBUTT",(req, res) => {
  console.log("NBUTT activated1")
  database.serialize(() => {
    
  database.run(`CREATE TABLE IF NOT EXISTS backtest(
               clicknumber  INTEGER DEFAULT 0)`,()=>{
                  database.run(`INSERT INTO backtest (clicknumber) VALUES (56889)`);
                  console.log("NBUTT activated2")
               })
  database.run(`UPDATE backtest SET clicknumber= clicknumber + 1`, ()=>{
      console.log("NBUTT activated3")
      res.send("Done")
  })
})
});*/

app.get("/TEST",(req,res) => {
  overwrite("ewewsheep","pickles")
  res.send("Done")
})


  

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


const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on", PORT);
});

const token = "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"
const owner = "ewewsheep"
const repo = "Cap11.co.uk"
const pathtd = "Data.Json"

async function overwrite(a,b){
  var file = await fetch(DATA_PATH)
  var tfile = JSON.parse(await file.text())

  tfile.forEach(z => {
    if (z.username == a) { z.username = b; }
})

  const fileRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${pathtd}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const fileData = await fileRes.json();
  const shas = fileData.sha;
  
  var res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${pathtd}`,{
    method:"PUT",
    headers:{ Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"},
    body:JSON.stringify({message:"confirmedreplace",
      sha: shas,
      content: Buffer.from(JSON.stringify(tfile)).toString("base64")})
}); };
  
