const joinRoom = ({ roomId, socket }) => {
      socket.join(`/${roomId}`);
      console.log("Room :" +roomId+" joined.");
  };

const leaveRoom = ({ roomId, socket }) => {
  socket.leave(`/${roomId}`);
  console.log("Room : "+roomId+" leaved");
};

module.exports = {
    joinRoom,
    leaveRoom
  };