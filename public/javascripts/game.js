const room = sessionStorage.getItem("roomId");

window.onload = async function() {
    let userInfo = await getUserInfo();
    let opponentInfo = await getOpponentInfo();
    document.getElementById("username").innerHTML = userInfo.ply_name;
    if (!room) {
        alert("No room choosen!");
        window.location="rooms.html";
    }
}

