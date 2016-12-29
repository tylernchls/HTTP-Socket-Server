const net = require('net');
const PORT = 8080;
const EVENT_DATA = 'data';

const client = net.connect({port: PORT}, () => {
  process.stdin.on(EVENT_DATA, (data) => {
    client.write(data.toString());
  });
});



client.on(EVENT_DATA, (data) => {
  process.stdout.write(data.toString());

});