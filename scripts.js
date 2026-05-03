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
    const clubslist = GetInfo("clubs")

    clubslist.forEach((club) => {
        console.log(club)
        console.log(clubn)
        if(club == clubn){
            fun()
        }else{alert("not in club some parts of the page will be blurred")}
    })
}

