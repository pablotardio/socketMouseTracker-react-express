
exports = module.exports = function(io){
    let interval;
    let i=0;
    io.on("connection", (socket) => {
        i++;
        console.log("New client connected:"+i);
        console.log(socket.id);
        if (interval) {
          clearInterval(interval);
        }
        interval = setInterval(() => getApiAndEmit(socket), 1000);
        socket.on("disconnect", () => {
            i--;
          console.log("Client disconnected");
          clearInterval(interval);
        });
        socket.on('mouse_activity',(data)=>{
           // console.log(data);
            
           // console.log(socket.id);
            socket.broadcast.emit('all_mouse_activity',{session_id: socket.id, coords:data});
          //  console.log('mouse Moved');
        })
      });
      
      const getApiAndEmit = socket => {
        const response = new Date();
        // Emitting a new message. Will be consumed by the client
        socket.emit("FromAPI", response);
      };
  }