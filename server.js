const PORT = 8080;
const EVENT_DATA =  'data';
const SERVER = 'tyler/8415'
const net = require('net');
const fs = require('fs');
const four_O_Four = require('./html_files/404.js');
const helium = require('./html_files/helium.js');
const hydrogen = require('./html_files/hydrogen.js');
const index = require('./html_files/index.js');


let server = net.createServer((socket) => {
  socket.on('error', (err) => {
    throw err;
  });

  socket.on(EVENT_DATA, (data) => {
    let reqHeaderArr = data.toString().split(' ');
    let date = new Date();
    for(var i = 0; i < reqHeaderArr.length; i++) {
      if(reqHeaderArr[i] === 'GET' && reqHeaderArr[i + 1] === '/' || reqHeaderArr[i + 1] === '/index.html') {


          process.stdout.write(data);
          socket.write(`HTTP/1.1 200 OK
                        Server: ${SERVER}
                        Date: ${date}
                        Content-Type: text/html; charset=utf-8
                        Content-Length: ${index.length}
                        Connection: keep-alive\n\n`);
          socket.write(index);
          return socket.end();

      } else if(reqHeaderArr[i] === 'GET' && reqHeaderArr[i + 1] === '/' || reqHeaderArr[i + 1] === '/helium.html') {
        process.stdout.write(data);
          socket.write(`HTTP/1.1 200 OK
                        Server: ${SERVER}
                        Date: ${date}
                        Content-Type: text/html; charset=utf-8
                        Content-Length: ${helium.length}
                        Connection: keep-alive\n\n`);
          socket.write(helium);
          return socket.end();
      } else if(reqHeaderArr[i] === 'GET' && reqHeaderArr[i + 1] === '/' || reqHeaderArr[i + 1] === '/hydrogen.html') {
        process.stdout.write(data);
          socket.write(`HTTP/1.1 200 OK
                        Server: ${SERVER}
                        Date: ${date}
                        Content-Type: text/html; charset=utf-8
                        Content-Length: ${hydrogen.length}
                        Connection: keep-alive\n\n`);
          socket.write(hydrogen);
          return socket.end();
      } else {
         socket.write(`HTTP/1.1 404 OK
                        Server: ${SERVER}
                        Date: ${date}
                        Content-Type: text/html; charset=utf-8
                        Content-Length: ${four_O_Four.length}
                        Connection: keep-alive\n\n`);
        socket.write(four_O_Four);
        return socket.end();
      }
    }

  });

});


   







server.listen(PORT, () => {
  console.log('opened server on', server.address());
});




// socket.write(`HTTP/1.1 404
//                       Server: ${SERVER}
//                       Date: ${date}
//                       Content-Type: text/html; charset=utf-8
//                       Content-Length: ${four_O_Four.length}
//                       Connection: keep-alive\n\n`)
//         socket.write(four_O_Four);
//         socket.end();