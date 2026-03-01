const express = require("express")
const f= require("fs").promises;
const fs= require("fs");
const app = express()
const path = require("path");
const cors = require("cors");

app.use(cors()); // allow all origins (quick fix)


const DATA_PATH = path.join(__dirname, "Dataa.Json");
const WEB_PATH = "https://raw.githubusercontent.com/ewewsheep/Cap11.co.uk/refs/heads/main/Dataa.Json";

async function syncFile() {
  const response = await fetch(WEB_PATH);
  const text = await response.text();
  await f.writeFile(DATA_PATH, text, "utf8");
  console.log("syncfile")
}

syncFile()


app.get("/Dataa.json", async (req, res) => {
  const response = await fetch(WEB_PATH);
  const json = await response.json();  // ← THIS is the fix
  res.json(json);
});

app.get("/Data.json", async (req, res) => {
  const data =  await f.readFile(DATA_PATH, "utf8");
  const json = JSON.parse(data);                    // parse string into JS object
  res.json(json); 
});


app.use(express.static("public"));

app.get("/TEST",async(req,res) => {
  await overwrite("pickles","ghotti","username")
  res.send("Done")
})


  

app.get("/NAME", (req, res) => {
    overwrite(req.query.user,req.query.data.toString(),"username")
    overwriteB(req.query.user,req.query.data.toString(),"username")
    res.send("Done")
})

app.get("/PASS", (req, res) => {
  overwrite(req.query.user,req.query.data,"password")
  overwriteB(req.query.user,req.query.data,"password")
  res.send("Done")
})

app.get("/PFP", (req, res) => {
  overwrite(req.query.user,req.query.data,"pfp")
  overwriteB(req.query.user,req.query.data,"pfp")
  res.send("Done")
})


const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on", PORT);
});

const token = process.env.GIT_TOKEN;
const owner = "ewewsheep"
const repo = "Cap11.co.uk"
const pathtd = "Data.Json"

async function overwriteB(a,b,c){
  var file = await f.readFile(DATA_PATH, "utf8"); 
  var tfile = JSON.parse(file)

  tfile.forEach(z => {
    console.log(z.username);
    if (String(z.username).trim() == a) { ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        z[c] = b.trim();
        console.log("bothRequal");
    }
    f.writeFile(DATA_PATH, JSON.stringify(tfile));
    console.log(z.username);
  });
};

async function overwrite(a,b,c){
  var file = await fetch(WEB_PATH)
  var tfile = JSON.parse(await file.text())

  tfile.forEach(z => {
    console.log(z.username);
    if (String(z.username).trim() == a) { ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        z[c] = b.trim();
        console.log("bothRequal");
    }

    console.log(z.username);
  });

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
  
