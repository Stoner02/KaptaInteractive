const socketio = require("socket.io");
const {joinRoom, leaveRoom} = require("../controllers/room.controller");

let ios;

const initSocketServer = (server) => {

    ios = socketio(server);

    ios.on("connect", async (socket) => {
        console.log("Connextion ok!")
        socket.on("joinRoom", (roomId) => joinRoom({ roomId, socket }));
        socket.on("leaveRoom", (roomId) => leaveRoom({ roomId, socket }));
        socket.on("test",() => {
            ios.to("/roomTest").emit("titi","Je suis un test");
        });
    });
};

module.exports = { initSocketServer };