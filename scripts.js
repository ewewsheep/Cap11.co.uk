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
    if(GetInfo("clubs") != null){
    
    var tf = false

    clubslist.forEach((club) => {
        if(club == clubn){
            fun()
            tf = true
        }
    })}
    
    if(tf == false){alert("not in club some parts of the page will be blurred")}
}

