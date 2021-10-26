const socket=io("http://localhost:8000");

const form=document.getElementById("send-msg");
const msginput=document.getElementById("roundrec1");
const msgdisplay=document.querySelector(".div4");
const nameingroup=document.querySelector(".div5");
var audio=new Audio('ring.mp3');


const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);




form.addEventListener("submit", (e)=>
{
  e.preventDefault();//prevent the page from reloading(default task)
  const message=msginput.value;//get msg from textbox
  append(`You: ${message}`, 'right');//show msg on your screen
  socket.emit('send', message);//emit send event
  msginput.value=''//empty the textbox

})
const append = (message,position)=>
{
    //prompt("hello");
    const messageElement=document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    msgdisplay.append(messageElement);
    if(position=='left')
    {
      audio.play();
    }
}
const nameofpeople = (names)=>
{
    //prompt("hello");
    const name=document.createElement('div');
    
    name.innerText = names;
    
    name.classList.add('naming');
    //messageElement.classList.add(position);
    nameingroup.append(name);
}

socket.on('current-user-joined',name=>
  {
    append('Welcome, you joined the chat','left');
    nameofpeople(`${name}`);
  })
socket.on('user-joined',name=>
  {
    //prompt("hi");
    append(`${name} joined the chat`,'left');
    nameofpeople(`${name}`);
  })


  socket.on('receive',data=>
  {
    append(`${data.name}: ${data.message}`,'left');//show msg on their screen
  })

  socket.on('go',data=>
  {
    append(`${data.name} left the chat`,'left');//show msg on their screen
  })
