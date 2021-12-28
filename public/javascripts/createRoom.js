window.addEventListener("DOMContentLoaded", () => {
  
  const btnCreate = document.querySelector(".create-button");
  const passwordInput = document.querySelector(".password-input");
  const nameInput = document.querySelector(".name-input");

  btnCreate.addEventListener("click", createRoom);

  ioClient.on("roomCreated", (data) => {
    const roomId = data;
    const name = nameInput.value;
    document.location.href=`http://localhost:3000/home?idRoom=${roomId}&pseudo=${name}`
  });

  function createRoom() {
    const value = passwordInput.value;
    const pseudo = nameInput.value;
    if (value) {
      ioClient.emit("createRoom", { password: value, pseudo: pseudo });
    }
  }
});
