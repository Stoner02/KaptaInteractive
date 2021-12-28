const socketio = require("socket.io");
const uuid = require("uuid");

const {joinRoom, leaveRoom} = require("../controllers/room.controller");

let ios;
let rooms = [];

function geRoomFromRoomId(roomId) {
    return rooms.find(r => 
        r.roomId === roomId
    );
}

const initSocketServer = (server) => {

    ios = socketio(server);

    ios.on("connect", async (socket) => {

        socket.on("createRoom", (data) => {
            const roomId = createRoom(data);
            const room = roomExist(roomId);
            if(!room) {
                socket.emit("reject","Room doesn't exist");
            } else {
                const user = addUserToRoom(room, data.pseudo, data.password, true);
                socket.emit("roomCreated", roomId);
                console.log("Room created");
            }
        });

        socket.on("joinRoom", (data) => {
            const room = roomExist(data.roomId);
            if(!room) {
                socket.emit("reject","Room doesn't exist");
            } else {
                console.log("Room exist.")
                const user = addUserToRoom(room, data.pseudo, data.password, false);
                if (user.result) {
                    joinRoom({data, socket});
                    ios.to(`/${data.roomId}`).emit("users", geRoomFromRoomId(data.roomId).users);
                } else {
                    socket.emit("reject", user.message);
                }
            }
        });

        socket.on("joinRoomRedirection", (data) => {
            const room = roomExist(data.roomId);
            if(!room) {
                console.log("Room doesn't exit")
                socket.emit("reject","Room doesn't exist");
            } else {
                const user = checkPseudo(room.users, data.pseudo);
                if (user) {
                    joinRoom({data, socket});
                    ios.to(`/${data.roomId}`).emit("users", geRoomFromRoomId(data.roomId).users);
                    console.log("Room rejoined")
                } else {
                    socket.emit("reject", user.message);
                }
            }
           
        });

        socket.on("leaveRoom", (data) => {
            const room = roomExist(data.roomId);
            if(!room) {
                 socket.emit("reject","Room doesn't exist");
            } else {
                console.log("Room exist.")
                const user = removeUserFromRoom(room, data.pseudo);
                if (user.result) {
                    leaveRoom({data, socket});
                    ios.to(`/${data.roomId}`).emit("users", geRoomFromRoomId(data.roomId).users);
                } else {
                    socket.emit("reject", user.message);
                }
            }
        })

        socket.on("askUser", (data) => {
            console.log(geRoomFromRoomId(data.roomId).users);
            ios.to(`/${data.roomId}`).emit("users", geRoomFromRoomId(data.roomId).users);
        })

        socket.on("ready", (data) => {
            const room = roomExist(data.roomId);
            if(!room) {
                 socket.emit("reject","Room doesn't exist");
            } else {
                const user = getUserByPseudo(room.users, data.pseudo);
                console.log(user);
                if (user) {
                    user.ready = !user.ready
                    ios.to(`/${data.roomId}`).emit("users", geRoomFromRoomId(data.roomId).users);
                } else {
                    socket.emit("reject", user.message);
                }
            }
        })
    });
};

function getUserByPseudo(users, pseudo) {
    return users.find(u => 
        u.pseudo === pseudo
    );
}

function roomExist(roomId) {
    return rooms.find(r => r.roomId === roomId);
}

function createRoom(data) {
    const roomId = generateRoomId()
    rooms.push({
        roomId: roomId,
        users: [],
        password: data.password
    })
    return roomId;
}

function addUserToRoom(room, username, password, hote){
    if(!checkPseudo(room.users, username)) {
        if(checkPassword(room, password)) {
            room.users.push({pseudo: username, ready: false, hote: hote});
            return  { 
                result: true,
                message: "User added"
            };
        } else {
            console.log("Password not valid.");
            return  { 
                result: false,
                message: "Password not valid"
            };
        }
    } else {
        console.log("Pseudo already used.");
        return { 
            result: false,
            message: "Pseudo already used"
        };
    }   
}

function removeUserFromRoom(room, username){
    if(checkPseudo(room.users, username)) {
        const index = room.users.findIndex(u => u.pseudo === username);
        console.log(room.users);
        console.log(index);
        room.users.splice(index,1);
        console.log(room.users);
        return  { 
            result: true,
            message: "User leaved the room"
        };
    } else {
        console.log("Pseudo never join the room");
        return { 
            result: false,
            message: "Pseudo never join the room"
        };
    }   
}

function checkPassword(room, password) {
    return room.password === password;
}

function generateRoomId() {
    return uuid.v4();
}

function checkPseudo(users, username) {
    return users.some( u => 
        u.pseudo === username
    );
}

module.exports = { initSocketServer };