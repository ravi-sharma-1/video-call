const express = require('express');
const http = require('http');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.static("public"));

app.get('/', (req, res, next) => res.sendfile(__dirname + '/index.html'));

const server = app.listen(9000);

const peerServer = ExpressPeerServer(server, {
  debug: true
});

app.use('/video-call', peerServer);

peerServer.on('connection', (client) => { console.log('client connected');});
peerServer.on('disconnect', (client) => { console.log('client disconnected');});