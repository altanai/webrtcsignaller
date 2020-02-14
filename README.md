# WebRTC socket.io signaller

websocket based signaller for handling webrtc offer answer handshake for a comm SaaS  platform


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
To install a specific node version 
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
Install forever with global and then start server with forever
```
npm install forever -g
forever start server.js --ssl
```
to see list of running processes in forever
```
forever list
```

## Generate CSR for ssl certs 

```
openssl req -nodes -newkey rsa:2048 -keyout brightchats.key -out brightchat.csr
```
Then upload the CSR in ssl providing websites like go addy and either generate or re-key the certs 

## Help and Debugging 

### nodejs help 

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

### SSH into remote server 

**Issue1** Permission denied (publickey).
```bash
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0644 for 'xx' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "xx": bad permissions
ubunut@exx: Permission denied (publickey).
```
**solution** create a instance for example ec2 instance on AWS and create a ssh key.
change the ownership permission for the key and the ssh using it
```bash
chmod 600 key.pem
ssh -v -i key.pem ubuntu@ec2-address
```