const express = require("express")
const f= require("fs").promises;
const fs= require("fs");
const app = express()
const path = require("path");
const cors = require("cors");

app.use(cors()); // allow all origins (quick fix)


const WEB_PATH = "https://cap11-data-default-rtdb.europe-west1.firebasedatabase.app/d.json";
const SYSTEM_PATH = path.join(__dirname, "System.Json");

app.get("/Data.json", async (req, res) => {
  const data =  await fetch(WEB_PATH);
  const text = await data.text();     // get raw data
  const json = JSON.parse(text);
  const json2 = Object.values(json)
  console.log(json2)
  res.json(json2)
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
    res.send("Done")
  })
})

app.get("/PASS", (req, res) => {
  Queue = Queue.then(async() => {
    await overwrite(req.query.user,req.query.data,"password")
    res.send("Done")
  })
})

app.get("/PFP", (req, res) => {
  Queue = Queue.then( async () => {
    await overwrite(req.query.user,req.query.data,"pfp")
    res.send("Done")
  })
})


const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on", PORT);
});

async function overwrite(a,b,c){
  var file = await fetch(WEB_PATH)
  var tfile = await file.json()
  var final = await Object.values(tfile)

  final.forEach(z => {
    console.log(z.username);
    if (String(z.id) == a) { ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        z[c] = b;
    }});
  await fetch(WEB_PATH,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(final)})
};
  
