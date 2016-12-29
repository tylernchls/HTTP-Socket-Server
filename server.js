const net = require('net');
const fs = require('fs');
const PORT = 8080;
const EVENT_DATA =  'data';
const SERVER = 'tyler/8415'
const index = require('./index.js');






let server = net.createServer((socket) => {
  socket.on('error', (err) => {
    throw err;
  });

  socket.on(EVENT_DATA, (data) => {
    let reqHeaderArr = data.toString().split(' ');
    for(var i = 0; i < reqHeaderArr.length; i++) {
      if(reqHeaderArr[i] === 'GET' && reqHeaderArr[i + 1] === '/' || reqHeaderArr[i + 1] === '/index.html') {


          let date = new Date();
          process.stdout.write(data);
          socket.write(`HTTP/1.1 200 OK
                        Server: ${SERVER}
                        Date: ${date}
                        Content-Type: text/html; charset=utf-8
                        Content-Length: ${index.length}
                        Connection: keep-alive\n\n`);
          socket.write(index);
          socket.end();



      }
    }

  });
   
});







server.listen(PORT, () => {
  console.log('opened server on', server.address());
});


// need to build http response message in string template(header, and body)