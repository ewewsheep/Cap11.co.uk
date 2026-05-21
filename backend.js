const express = require("express")
const f= require("fs").promises;
const fs= require("fs");
const app = express()
const path = require("path");
const cors = require("cors");

app.use(cors()); // allow all origins (quick fix)


const WEB_PATH = "https://cap11-data-default-rtdb.europe-west1.firebasedatabase.app/d.json";
const SYSTEM_PATH = path.join(__dirname, "System.Json");
const system = "https://cap11-data-default-rtdb.europe-west1.firebasedatabase.app/v.json"

app.get("/Data.json", async (req, res) => {
  const data =  await fetch(WEB_PATH);
  const text = await data.text();     // get raw data
  const json = JSON.parse(text);
  const json2 = Object.values(json)
  console.log(json2)
  res.json(json2)
});

app.get("/scripts.js", (req, res) => {
  res.sendFile(path.join(__dirname, "scripts.js"));
});

app.get("/System.Json", async (req, res) => {
  const data =  await fetch(system);
  res.json(data); 
});

app.use(express.static("public"));
app.use(express.static("public/games"));
app.use(express.static("public/clubs"));

app.get("/TEST",async(req,res) => {
  await overwrite("pickles","ghotti","username")
  res.send("Done")
})

app.get("/YES", async (req, res) => {
     var file = await fetch("https://cap11-data-default-rtdb.europe-west1.firebasedatabase.app/v/vote.json")
      var tfile = await file.json()
      tfile.yes = tfile.yes + 1
      await fetch("https://cap11-data-default-rtdb.europe-west1.firebasedatabase.app/v/vote.json",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(tfile)})
      res.send("yes voted")
    });

app.get("/NO", async (req, res) => {
    var file = await fetch("https://cap11-data-default-rtdb.europe-west1.firebasedatabase.app/v/vote.json")
      var tfile = await file.json()
      tfile.no = tfile.no + 1
      await fetch("https://cap11-data-default-rtdb.europe-west1.firebasedatabase.app/v/vote.json",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(tfile)})
      res.send("no voted")
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

