window.addEventListener("DOMContentLoaded", () => {
  
  const joinButton = document.querySelector(".join-button");
  const passwordInput = document.querySelector(".password-input");
  const roomIdInput = document.querySelector(".idRoom-input");
  const nameInput = document.querySelector(".name-input");
  const errorMessage = document.querySelector(".error-span");

  ioClient.on("reject", (data) => {
    errorMessage.removeAttribute("hidden");
    errorMessage.innerHTML = data;
  });

  joinButton.addEventListener("click", joinRoom);

  function joinRoom() {
    const password = passwordInput.value;
    const roomId = roomIdInput.value;
    const name = nameInput.value;

    console.log(password, roomId, name);
    if (password && roomId && name) {
      ioClient.emit("joinRoom", { password: password,  roomId: roomId, pseudo: name});
      document.location.href=`http://localhost:3000/home?idRoom=${roomId}&pseudo=${name}`
    }
  }

});
