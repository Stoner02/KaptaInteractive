window.addEventListener("DOMContentLoaded", () => {
  
  const urlParams = new URLSearchParams(window.location.search);
  const roomIdInput = urlParams.get("idRoom");
  const nameInput = urlParams.get("pseudo");
  const roomIdField = document.querySelector(".room-identifier");
  const playersList = document.querySelector(".players-list");
  const leaveButton = document.querySelector(".leave-button");
  const readyButton = document.querySelector(".ready-button");


  roomIdField.innerHTML = `Room identifier : ${roomIdInput}`;

  leaveButton.addEventListener("click", leaveRoom);
  readyButton.addEventListener("click", ready);

  ioClient.emit("joinRoomRedirection", {roomId: roomIdInput, pseudo: nameInput});

  ioClient.on("users", (players) => {
    updatePlayersList(players)}
  )

  ioClient.emit("askUsers", {roomId: roomIdInput});

  function updatePlayersList(players) {
    console.log(players)
    playersList.innerHTML = "";
    players.forEach( player => {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(player.pseudo + " " + player.ready +" ("+ (player.hote ? "hote" : "invite") + ")" ));
      playersList.appendChild(li);
    });
  }

  function leaveRoom() {
    const roomId = roomIdInput;
    const name = nameInput;
    if (roomId && name) {
      ioClient.emit("leaveRoom", {roomId: roomId, pseudo: name});
      document.location.href="http://localhost:3000/"
    }
  }

  function ready() {
    const roomId = roomIdInput;
    const name = nameInput;
    ioClient.emit("ready", {roomId: roomId, pseudo: name});
  }
});
