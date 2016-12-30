const net = require('net');
const PORT = 8080; // only to connect to server.js
const EVENT_DATA = 'data';

const HOST= process.argv[2];

/*
Allows client to make data requests from any website using port 80.
Simulates curl
*/

const client = net.connect(80, HOST, () => {
  let date = new Date();
  process.stdin.on(EVENT_DATA, () => {
    client.write(`GET / HTTP/1.1
Accept: text/html, charset=utf-8
Host: localhost
Date: ${date}
User-Agent: Tyler\r\n\r\n`);

  });
});


// proccess data send back from server
client.on(EVENT_DATA, (data) => {
  process.stdout.write(data.toString());

});