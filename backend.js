const express = require("express")
const f= require("fs").promises;
const fs= require("fs");
const app = express()
const path = require("path");
const cors = require("cors");

app.use(cors()); // allow all origins (quick fix)


const DATA_PATH = path.join(__dirname, "Data.Json");
const WEB_PATH = "https://raw.githubusercontent.com/ewewsheep/Cap11.co.uk/refs/heads/main/Data.Json";
const SYSTEM_PATH = path.join(__dirname, "System.Json");

async function syncFile() {
  try{
  const response = await fetch(WEB_PATH);
  const text = await response.text();
  await f.writeFile(DATA_PATH,text,"utf8");
  console.log("syncfile")}catch{
    console.error("SyncFailed")
  }
}

syncFile()

app.get("/Data.json", async (req, res) => {
  const data =  await f.readFile(DATA_PATH, "utf8");
  const json = JSON.parse(data);                    // parse string into JS object
  res.json(json); 
});

app.get("/System.Json", async (req, res) => {
  const data =  await f.readFile(SYSTEM_PATH, "utf8");
  const json = JSON.parse(data);                    // parse string into JS object
  res.json(json); 
});

app.use(express.static("public"));

app.get("/TEST",async(req,res) => {
  await overwrite("pickles","ghotti","username")
  res.send("Done")
})

app.get("/YES", async (req, res) => {
    console.log("begun")
    const to = process.env.GIT_TOKEN
    const og = await f.readFile(path.join(__dirname,"System.Json"),"utf8");
    const jso = await JSON.parse(og);
    console.log("Part1")
    jso.forEach(item => {
      if(item.name == "vote") item.yes = item.yes + 1;
    });
    f.writeFile(path.join(__dirname,"System.Json"),JSON.stringify(jso))
    console.log("Part2")
    const fileRes = await fetch("https://api.github.com/repos/ewewsheep/Cap11.co.uk/contents/System.Json",{headers:{"Authorization": `Bearer ${to}`}})
    
    const fileData = await fileRes.json();
    const sha = fileData.sha;
  
    const encoded = Buffer.from(JSON.stringify(jso)).toString("base64");
    const githubRes = await fetch(
      "https://api.github.com/repos/ewewsheep/Cap11.co.uk/contents/System.Json"
    ,{
      method:"PUT",
      headers:{"Authorization": `Bearer ${to}`,
        "Content-Type": "application/json"},
      body:JSON.stringify({
        message: ":3",
        content: encoded,
        sha: sha
      })})
      console.log("Part3")
      const ghJson = await githubRes.json();
      console.log("GitHub response:", ghJson);
      res.send("YES VOTED")
    });

app.get("/NO", async (req, res) => {
    console.log("begun")
    const to = process.env.GIT_TOKEN
    const og = await f.readFile(path.join(__dirname,"System.Json"),"utf8");
    const jso = await JSON.parse(og);
    console.log("Part1")
    jso.forEach(item => {
      if(item.name == "vote") item.no = item.no + 1;
    });
    f.writeFile(path.join(__dirname,"System.Json"),JSON.stringify(jso))
    console.log("Part2")
    const fileRes = await fetch("https://api.github.com/repos/ewewsheep/Cap11.co.uk/contents/System.Json",{headers:{"Authorization": `Bearer ${to}`}})
    
    const fileData = await fileRes.json();
    const sha = fileData.sha;
  
    const encoded = Buffer.from(JSON.stringify(jso)).toString("base64");
    const githubRes = await fetch(
      "https://api.github.com/repos/ewewsheep/Cap11.co.uk/contents/System.Json"
    ,{
      method:"PUT",
      headers:{"Authorization": `Bearer ${to}`,
        "Content-Type": "application/json"},
      body:JSON.stringify({
        message: ":3",
        content: encoded,
        sha: sha
      })})
      console.log("Part3")
      const ghJson = await githubRes.json();
      console.log("GitHub response:", ghJson);
      res.send("YES VOTED")
    });

let Queue = Promise.resolve()

app.get("/NAME", (req, res) => {
  Queue = Queue.then(async() => {
    await overwrite(req.query.user,req.query.data.toString(),"username")
    await overwriteB(req.query.user,req.query.data.toString(),"username")
    res.send("Done")
  })
})

app.get("/PASS", (req, res) => {
  Queue = Queue.then(async() => {
    await overwrite(req.query.user,req.query.data,"password")
    await overwriteB(req.query.user,req.query.data,"password")
    res.send("Done")
  })
})

app.get("/PFP", (req, res) => {
  Queue = Queue.then( async () => {
    await overwrite(req.query.user,req.query.data,"pfp")
    await overwriteB(req.query.user,req.query.data,"pfp")
    res.send("Done")
  })
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
    if (String(z.id) == a) { ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        z[c] = b;
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
    if (String(z.id) == a) { ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        z[c] = b;
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
  
