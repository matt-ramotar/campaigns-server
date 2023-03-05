const app = require('./app');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
require('dotenv').config();

const mongoDbConnectionString = process.env.MONGODB;
const port = process.env.PORT || 5050;

mongoose.connect(mongoDbConnectionString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Connected');
});

io.on('connection', (socket) => {
  io.emit('connection', 'Connected!');

  socket.on('notifications', async (userId) => {
    try {
      // TODO(mramotar)
    } catch (error) {
      console.log(error);
    }
  });
});

server.listen({ port }, () => console.log(`Server ready and listening at ==> http://localhost:${port}`));
