// http://127.0.0.1:9001
// http://localhost:9001

const fs = require('fs');
const path = require('path');
const url = require('url');
var httpServer = require('http');
const ioServer = require('socket.io');
const server = require('./node_scripts/index.js');

var PORT;
var isUseHTTPs = false;

const jsonPath = {
    config: 'config.json',
    logs: 'logs.json'
};

const BASH_COLORS_HELPER = server.BASH_COLORS_HELPER;
const getValuesFromConfigJson = server.getValuesFromConfigJson;
const getBashParameters = server.getBashParameters;

var config = getValuesFromConfigJson(jsonPath);
config = getBashParameters(config, BASH_COLORS_HELPER);

if (!PORT) {
    PORT = config.port;
} else {
    PORT = 8085;
}

if (isUseHTTPs === false) {
    isUseHTTPs = config.isUseHTTPs;
}

function serverHandler(request, response) {
    // to make sure we always get valid info from json file
    // even if external codes are overriding it
    config = getValuesFromConfigJson(jsonPath);
    config = getBashParameters(config, BASH_COLORS_HELPER);

    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.write('WebRTC Socket.io Signaller Server.\n\n');
    response.end();
}

var httpApp;

if (isUseHTTPs) {
    httpServer = require('https');

    var options = {
        key: null,
        cert: null,
        ca: null
    };

    var pfx = false;

    console.log(" ------------------- config --------------------- ", config);

    config.sslKey = "./ssl_certs/server.key";
    config.sslCert = "./ssl_certs/server.crt";

    if (!fs.existsSync(config.sslKey)) {
        console.log(BASH_COLORS_HELPER.getRedFG(), 'sslKey:\t ' + config.sslKey + ' does not exist.');
    } else {
        pfx = config.sslKey.indexOf('.pfx') !== -1;
        options.key = fs.readFileSync(config.sslKey);
    }

    if (!fs.existsSync(config.sslCert)) {
        console.log(BASH_COLORS_HELPER.getRedFG(), 'sslCert:\t ' + config.sslCert + ' does not exist.');
    } else {
        options.cert = fs.readFileSync(config.sslCert);
    }

    if (config.sslCabundle) {
        if (!fs.existsSync(config.sslCabundle)) {
            console.log(BASH_COLORS_HELPER.getRedFG(), 'sslCabundle:\t ' + config.sslCabundle + ' does not exist.');
        }

        options.ca = fs.readFileSync(config.sslCabundle);
    }

    if (pfx === true) {
        options = {
            pfx: sslKey
        };
    }

    httpApp = httpServer.createServer(options, serverHandler);
} else {
    httpApp = httpServer.createServer(serverHandler);
}

server.beforeHttpListen(httpApp, config);
httpApp = httpApp.listen(process.env.PORT || PORT, process.env.IP || "0.0.0.0", function () {
    server.afterHttpListen(httpApp, config);
});

ioServer(httpApp).on('connection', function (socket) {
    server.addSocket(socket, config);

    const params = socket.handshake.query;

    if (!params.socketCustomEvent) {
        params.socketCustomEvent = 'custom-message';
    }

    socket.on(params.socketCustomEvent, function (message) {
        socket.broadcast.emit(params.socketCustomEvent, message);
    });
});
