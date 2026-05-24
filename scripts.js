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
    a.innerHTML = c},1000)
    
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
}

