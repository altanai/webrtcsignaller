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

recommended node version v6.2.1
Can manage node versions using nvm / node version manager 
```
curl https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash
source ~/.profile
```
check nvm version 
```
nvm --version
nvm list
```
to install a speific node version 
```
vm install v6.2.1
Downloading https://nodejs.org/dist/v6.2.1/node-v6.2.1-linux-x64.tar.xz...
######################################################################## 100.0%
WARNING: checksums are currently disabled for node.js v4.0 and later
manpath: can't set the locale; make sure $LC_* and $LANG are correct
Now using node v6.2.1 (npm v3.9.3)
```
check updated node verson
```
node -v
v6.2.1
```

