let rooms = [];
let activeRoom;
let messages = [];
let typingUsers = [];
let typingUserTimeouts = {};
let activeUsers = [];
let ioClient;

ioClient = io({
  reconnection: false,
});

ioClient.on("connect", () => {
  console.log("connexion ok !");
});

ioClient.on("message", (data) => {
  messages.push(data);
  displayNewMessage(data);
});

ioClient.on("rooms", (data) => {
  rooms = [];
  rooms.push(...data);
  if (rooms.length) {
    activateRoom(rooms[0]);
  }
});

ioClient.on("typingUser", (username) => {
  if (!typingUsers.includes(username)) {
    typingUsers.push(username);
    displayTypingUsers(typingUsers);
  } else {
    clearTimeout(typingUserTimeouts[username]);
  }

  typingUserTimeouts[username] = setTimeout(() => {
    typingUsers = typingUsers.filter((user) => user !== username);
    displayTypingUsers(typingUsers);
  }, 3000);
});

function activateRoom(room) {
  ioClient.emit("joinRoom", room._id);
  activeRoom = room;
  displayRooms();
}

ioClient.on("activeUsers", (users) => {
  if (activeUsers.toString() !== users.toString()) {
    activeUsers = users;
    displayActiveUsers(activeUsers);
  }
});
