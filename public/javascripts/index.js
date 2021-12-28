window.addEventListener("DOMContentLoaded", () => {
  
  const createButton = document.querySelector(".create-button");
  const joinButton = document.querySelector(".join-button");

  createButton.addEventListener("click", createRoom);
  joinButton.addEventListener("click", joinRoom);

  function createRoom() {
    document.location.href=`http://localhost:3000/create`
  }

  function joinRoom() {
      document.location.href=`http://localhost:3000/join`
  }

});
