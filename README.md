# WebRTC socket.io signaller

## To start signaller socket.io server 

```sh
node server --ssl
```
## Integrate inside nodejs applications

```javascript
const ioServer = require('socket.io');
const RTCMultiConnectionServer = require('rtcmulticonnection-server');

ioServer(httpApp).on('connection', function(socket) {
    RTCMultiConnectionServer.addSocket(socket);
});
```