
function createRoom(server){
    server.route({
        method: 'POST',
        path: '/room',
        handler: function (request, h) {
    
            return 'La room est créée !';
        }
    });
}

module.exports.createRoom = createRoom;