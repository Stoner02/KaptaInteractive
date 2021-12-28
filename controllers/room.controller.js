const joinRoom = ({ data, socket }) => {
      socket.join(`/${data.roomId}`);
      console.log(`${data.pseudo} joined the room ${data.roomId}`);
  };

const leaveRoom = ({ data, socket }) => {
  socket.leave(`/${data.roomId}`);
  console.log(`${data.pseudo} leaved the room ${data.roomId}`);
};

module.exports = {
    joinRoom,
    leaveRoom
  };