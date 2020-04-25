# WebRTC socket.io signaller

Signaller to mange the SDP offer/answer for webrtc app on socket.io. 
To be used while deploying - webrtcdevelopment 
https://github.com/altanai/webrtc/

![alt webrtc development ](https://altanaitelecom.files.wordpress.com/2015/05/webrtc_development_logo.png?w=100&h=100)

[![Gitter][GS image]][Gitter]
[![Build Status][BS img]][Build Status]
[![Dependency Status][DS img]][Dependency Status]
[![NPM Status][NS img]][NPM Status]

[Gitter]: https://gitter.im/altanai/webrtc?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge 
[Build Status]: https://travis-ci.org/altanai/webrtc
[Dependency Status]: https://david-dm.org/altanai/webrtc
[NPM Status]: https://www.npmjs.com/package/webrtcdevelopment

[GS img]: https://badges.gitter.im/altanai/webrtc.svg
[BS img]: https://api.travis-ci.org/altanai/webrtc.png
[DS img]: https://david-dm.org/altanai/webrtc.svg
[NS img]: https://nodei.co/npm/webrtcdevelopment.png

## Get the code 
Download the npm module  
```shell script
npm i webrtcdevelopment_signaller
```
or Clone from the git repo 
```shell script
git clone  git@github.com:altanai/webrtcsignaller.git
```

## Integrate inside nodejs applications

One the source is download import the server lib and start the server 

Recommended node version >=v612
Can manage node versions using nvm / node version manager 
```shell script
curl https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash
source ~/.profile
```
check nvm version 
```shell script
nvm --version
nvm list
```
To install a specific node version 
```shell script
vm install v6.2.1
Downloading https://nodejs.org/dist/v6.2.1/node-v6.2.1-linux-x64.tar.xz...
######################################################################## 100.0%
WARNING: checksums are currently disabled for node.js v4.0 and later
manpath: can't set the locale; make sure $LC_* and $LANG are correct
Now using node v6.2.1 (npm v3.9.3)
```
check updated node verson
```shell script
node -v
v6.2.1
```

##Starting manually 

To start signaller socket.io server 

```shell script
node server --ssl --port=8085
```

## Start server with forever 

First download forever
```shell script
npm install forever -g
```
start forever with options secure server and port 
```shell script
forever start server.js --ssl --port=8085
```


## start with pm2 process manager 

start using the ecosystem config file 
```shell script
~/webrtcsignaller$ pm2 start ecosystem.config.js 
[PM2][WARN] Applications signaller not running, starting...
[PM2] App [signaller] launched (1 instances)
┌─────┬──────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name         │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼──────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ signaller    │ default     │ 2.0.0   │ cluster │ 30115    │ 0s     │ 0    │ online    │ 0%       │ 14.3mb   │ ubuntu   │ enabled  │
└─────┴──────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

see status of running  apps 
```shell script
pm2 list
┌─────┬──────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name         │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼──────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ signaller    │ default     │ 2.0.0   │ cluster │ 30115    │ 3s     │ 0    │ online    │ 0%       │ 31.8mb   │ ubuntu   │ enabled  │
└─────┴──────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```
to see the process reports 
```shell script
pm2 reprt 
```
Further more check if ports are listening 
```shell script
lsof -i | grep 8085
> PM2     21865 ubuntu   31u  IPv4 18120035      0t0  TCP *:8085 (LISTEN)
```

## Help 

To see system usage 
```shell script
df -h
> Filesystem      Size  Used Avail Use% Mounted on
udev            492M   12K  492M   1% /dev
tmpfs           100M  376K   99M   1% /run
/dev/xvda1      7.8G  5.9G  1.6G  80% /
none            4.0K     0  4.0K   0% /sys/fs/cgroup
none            5.0M     0  5.0M   0% /run/lock
none            497M     0  497M   0% /run/shm
none            100M     0  100M   0% /run/user
```

to see free memory
```shell script
free -m
             total       used       free     shared    buffers     cached
Mem:           992        841        151         17         64        325
-/+ buffers/cache:        450        541
Swap:            0          0          0
```

checking avaible CPU cores 
```shell script
grep -c ^processor /proc/cpuinfo
> 1 
```

To see help related to server 
```shell script
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
```

## Reporting a Vulnerability

Create an issues 
https://github.com/altanai/webrtc/issues <https://github.com/altanai/webrtc/issues>
     
### License
----

MIT
