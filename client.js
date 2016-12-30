/*
This program resembles the cmd line 'curl'. Allow user to make HTTP requests
to websites and pull data. Useful to test connections on your webpage.
*/


const net = require('net');
let port;
const EVENT_DATA = 'data';

/*
grabs what user enters in cmd line. hostId
is first part of url ex. www.devleague.com/
host_path = anything after the '/' ex. devleague.com/apply
*/
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
  let reqheader = `GET /${host_path} HTTP/1.1
Accept: text/html, charset=utf-8
Host: ${hostId}
Date: ${date}
User-Agent: Tyler\r\n\r\n`
  process.stdin.on(EVENT_DATA, () => {
  client.write(reqheader);
  console.log(reqheader);

  });
    console.log('connected to server');
});


// proccess data send back from server
client.on(EVENT_DATA, (data) => {
  process.stdout.write(data.toString());

});



