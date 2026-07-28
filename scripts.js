function GetProfile() {
    const raw = document.cookie
        if(!raw) {return null}

    const cookie = raw
        .split("; ")
        .find(row => row.startsWith("User="))
        ?.split("=")[1]  

    if(!cookie) {return null}

    return cookie

}

function GetInfo(PL) {
    const raw = GetProfile();

    if(!raw) return null;

    const profile = JSON.parse(raw);
    return profile[PL] || null;
}

function IfClub(clubn,fun) {
    var tf = false
    if(GetInfo("clubs") != null){
    
    const clubslist = GetInfo("clubs")

    clubslist.forEach((club) => {
        if(club == clubn){
            fun()
            tf = true
        }
    })}
    
    if(tf == false){alert("not in club some parts of the page will be blurred")}
}


async function headerscr(){
    setTimeout(async () => {
    var a = document.getElementById("InterDiv")
    var b = await fetch("/header.html")
    var c = await b.text()
    a.innerHTML = c},50)
    
    setTimeout(() => {
        document.getElementById("namebox").innerText = GetInfo("username") ||  "Visitor" ;
        document.getElementById("pfpbox").src = GetInfo("pfp") || "https://th.bing.com/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa"
        document.getElementById("rank").innerText = "rank:"+ GetInfo("rank") + "("+ GetInfo("rankn") + ")"
        if(GetInfo("rank") == null){
            document.getElementById("rank").innerText = "rank:guest(0)";
        }else{
            document.getElementById("rank").innerText = "rank:"+ GetInfo("rank") + "("+ GetInfo("rankn") + ")"
        }
    }, 1000);
    
    setTimeout(() => {

            const username = GetInfo("username");

            if (!username) {
                console.warn("Username is null user not logged in yet");
                return;
            }

            
        }, 1100)

        setTimeout(() => {
            const banstatus = GetInfo("banned")

            if(banstatus === true) {
                window.location.href = "bannedpage.html"
            }
        }, 1000);

        if(GetInfo("id") != null){
            function Login() {   
            fetch('/Data.json')
                .then(response => response.json())
                .then(data => {
                data.forEach(item => {
                    if (item.id == GetInfo("id") && item.password == GetInfo("password")){
                        document.cookie = "User=" + (JSON.stringify(item)) + ";max-age=864000;path=/"
                    };
                });
                });
            };
            Login()
         }
            }

async function create(){
        var count = 0
        var file = await fetch("https://cap11-data-default-rtdb.europe-west1.firebasedatabase.app/d.json")
        var convert1 = await file.json()
        var convert2 = Object.values(convert1)
        convert2.forEach((u) => {
          if (u.id >= count) count = Number(u.id) + 1
        })
        var username = document.getElementById("username").value
        var password = document.getElementById("password").value
        fetch("/NEW?array=" + JSON.stringify({ "banned": false, "clubs": [ "member" ], "id": `${count}`, "password": `${password}`, "pfp": "https://static.vecteezy.com/system/resources/previews/000/437/945/original/vector-settings-icon.jpg", "rank": "Bronze", "rankn": 1, "username": `${username}`,"banreason":"x" }))
        window.location = "Create.html"
      }

async function cTrade(){
        var count = 0
        var file = await fetch("https://cap11-data-default-rtdb.europe-west1.firebasedatabase.app/d.json")
        var convert1 = await file.json()
        var convert2 = Object.values(convert1)
        convert2.forEach((u) => {
          if (u.id >= count) count = Number(u.id) + 1
        })
        var name = document.getElementById("name").value
        var platform = document.getElementById("game").value
        var giving = document.getElementById("giving").value
        var forq = document.getElementById("for").value
        var cinfo = document.getElementById("cinfo").value
        var id = GetInfo("id")
        fetch("/LISTTRADE?array=" + encodeURIComponent(JSON.stringify({"name":`${name}`,"platform": `${platform}`,"giving":`${giving}`,"for":`${forq}`,"cinfo":`${cinfo}`,"id":`${id}` })))
        window.location = "CreateTrade.html"
      }

async function cChat(){
        var count = 0
        var file = await fetch("https://cap11-data-default-rtdb.europe-west1.firebasedatabase.app/c.json")
        var convert1 = await file.json()
        var convert2 = Object.values(convert1)
        convert2.forEach((u) => {
          if (u.id >= count) count = Number(u.id) + 1
        })
        var message = document.getElementById("msbox").value
        var rank = GetInfo("rankn")
        var name = GetInfo("name")
        fetch("/ADDMESS?array=" + encodeURIComponent(JSON.stringify({"name":`${name}`,"rank":`${rank}`,"message":`${message}` })))
        window.location = "Chat.html"
      }

async function addclub(club){
    var a = GetInfo("id")
    var b = club
    var c = GetInfo("clubs")
    var d = Object.values(c)
    var e = false
    d.forEach(i => {if(i == club){e = true}})
    if(e == false){
        await fetch(`/CLUBCHANGE?id=${a}&club=${b}`)
    }
    window.location.reload()
}

