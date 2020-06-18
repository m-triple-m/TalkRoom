const express = require('express');
const app = express();
const parser = require('body-parser');
const http = require('http').createServer(app);
const port = 3000;
const cors = require('cors')
app.use(cors());

const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('user connected!!');

    socket.on('joinroom', data => {
        console.log('user connected to '+data.name+' room');
        socket.join(data.name)
    })

    socket.on('send-room-msg', data => {
        console.log('a message from room '+data.roomname);
        socket.to(data.roomname).emit('rec-room-msg', data);
    })
})

const userRouter = require('./routes/userManager');
const roomRouter = require('./routes/roomManager');

app.use(parser.json());
app.use('/user', userRouter);
app.use('/room', roomRouter);

http.listen(port, () => {
    console.log('server started ... ')
})