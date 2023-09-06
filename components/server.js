const express = require('express');
const { log } = require('./logger');

const serverPort = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000;

const server = express();

server.all('/', (req, res) => {
  res.send('DND Bot is running!');
});

function keepAlive() {
  server.listen(serverPort, () => {
    log('Server is ready.');
  });
}

module.exports = {
  keepAlive,
};
