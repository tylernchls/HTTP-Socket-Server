const net = require('net');
let port;
const EVENT_DATA = 'data';

const hostId = process.argv[2].split('/')[0];


const host_path = process.argv[2].split('/')[1];


/*
port 8080 used to connect to server.js
port 80 used to connect to outside sites
*/
if(hostId === 'localhost') {
  port = 8080;
} else {
  port = 80;
}

const client = net.connect(port, hostId, () => {
  let date = new Date();
  process.stdin.on(EVENT_DATA, () => {
  client.write(`GET /host_path HTTP/1.1
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