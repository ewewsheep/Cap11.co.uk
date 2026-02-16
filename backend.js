const key = process.env.key;
console.log("ENV TOKEN EXISTS:", !!process.env.key);
console.log("ENV TOKEN LENGTH:", process.env.key?.length);

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
  const json = await data.json();   // ← THIS is the fix
  res.json(json);
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

app.get("/TEST",async(req,res) => {
  await overwrite("ewewsheep","pickles","username")
  res.send("Done")
})


  

app.get("/NAME", (req, res) => {
    overwrite(req.query.user,req.query.data,"username")
    res.send("Done")
})

app.get("/PASS", (req, res) => {
  overwrite(req.query.user,req.query.data,"password")
  res.send("Done")
})

app.get("/PFP", (req, res) => {
  overwrite(req.query.user,req.query.data,"pfp")
  res.send("Done")
})


const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on", PORT);
});

const token = "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"
const owner = "ewewsheep"
const repo = "Cap11.co.uk"
const pathtd = "Data.Json"

async function overwrite(a,b,c){
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
});
  const ghJson = await res.json(); 
  console.log("GitHub response:", ghJson);
};
  
