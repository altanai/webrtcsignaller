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

Recommended node version v6.2.1
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
To install a speific node version 
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

## Start server with forever 

```
npm install forever -g
forever start server.js --ssl
```

## Help 

node server.js --help
You can manage configuration in the "config.json" file.
Or use following commands:
	node server.js
	node server.js --port=9002
	node server.js --port=9002 --ssl
	node server.js --port=9002 --ssl --sslKey=/home/ssl/ssl.key --sslCert=/home/ssl/ssl.crt


Here is list of all config parameters:
--port=80
	This parameter allows you set any custom port.
--ssl
	This parameter is shortcut for --isUseHTTPs=true
--isUseHTTPs=true
	This parameter allows you force HTTPs. Remove/Skip/Ignore this parameter to use HTTP.
--sslKey=path
	This parameter allows you set your domain's .key file.
--sslCert=path
	This parameter allows you set your domain's .crt file.
--sslCabundle=path
	This parameter allows you set your domain's .cab file.
--version
	Check RTCMultiConnection version number.
--dependencies
	Check all RTCMultiConnection dependencies.
--autoRebootServerOnFailure=false
	Disable auto-restart server.js on failure.
--dirPath=/var/www/html/
	Directory path that is used for HTML/CSS/JS content delivery.
--homePage=/demos/Video-Conferencing.html
	Open a specific demo instead of loading list of demos.
--enableAdmin=true
	Enable /admin/ page.
--adminUserName=username
	/admin/ page's username.
--adminPassword=password
	/admin/ page's password.

