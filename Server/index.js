// node server handle socket io connections
const io = require("socket.io")(8000,{
cors: {
  origin: '*',
}
});

const users={};//create list for users

io.on('connection', socket =>        //listen all connections from all users //when connection comes run arrrow function
{
  socket.on('new-user-joined', name =>{     //listen incoming connections from particular user
      //console.log('New User', name);//show user joined with name on terminal

      users[socket.id]=name;             //when user joined event come, it will set name under the user 
      // for(let x in users)
      // {
      //   console.log(users[x]);
      // }
      socket.send(users);
      socket.emit('current-user-joined', name);
      socket.broadcast.emit('user-joined', name);  //broadcast event to everyone user-joined except new user that user is joined
    } );
  socket.on('send', message =>{
    //console.log("hi");
    socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    //when send event is triggered, it will broadcast receive event where msg=msg and name= name on socket id
  });

  socket.on('disconnect', message =>{
    //console.log(message);
    socket.broadcast.emit('go', {name: users[socket.id]})
    //console.log(name);
    delete users[socket.id];
  });
});