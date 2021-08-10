// http://127.0.0.1:9001
// http://localhost:9001

const fs = require('fs');
const path = require('path');
const url = require('url');
// var httpServer = require('http');
var httpServer = require('https');
const ioServer = require('socket.io');
const rtcserver = require('./node_scripts/index.js');


require('dotenv').config({path: `.env.${process.env.NODE_ENV}`});
console.log('ENV file .env.' + process.env.NODE_ENV);


const jsonPath = {
    config: 'config.json',
    logs: 'logs.json'
};

const BASH_COLORS_HELPER = rtcserver.BASH_COLORS_HELPER;
// const getValuesFromConfigJson = server.getValuesFromConfigJson;
const getBashParameters = rtcserver.getBashParameters;

function getValuesFromConfigJson(param) {

    var config = {};

    var result = {
        socketURL: '/',
        dirPath: null,
        // homePage: '/demos/index.html',
        socketMessageEvent: 'RTCMultiConnection-Message',
        socketCustomEvent: 'RTCMultiConnection-Custom-Message',
        port: process.env.PORT || 9001,
        enableLogs: true,
        autoRebootServerOnFailure: false,
        enableAdmin: false,
        adminUserName: null,
        adminPassword: null
    };

    if (!fs.existsSync(param.config)) {
        console.log('File does not exist', param.config);
        console.log("read from external config ", config);
        return result;
    } else {
        var json = fs.readFileSync(param.config);
        config = JSON.parse(json);
        console.log("read from external config ", param.config, config);
    }

    // ['sslKey', 'sslCert', 'sslCabundle'].forEach(function (key) {
    //     if (!config[key] || config[key].toString().length == 0) {
    //         return;
    //     }
    //
    //     if (config[key].indexOf('/path/to/') === -1) {
    //         if (key === 'sslKey') result.sslKey = config.sslKey;
    //
    //         if (key === 'sslCert') result.sslCert = config.sslCert;
    //
    //         if (key === 'sslCabundle') result.sslCabundle = config.sslCabundle;
    //     }
    // });
    //
    // if ((config.port || '').toString() !== '9001') {
    //     result.port = (config.port || '').toString();
    // }

    if ((config.autoRebootServerOnFailure || '').toString() === 'true') {
        result.autoRebootServerOnFailure = true;
    }

    // if ((config.isUseHTTPs || '').toString() === 'true') {
    //     result.isUseHTTPs = true;
    // }
    //
    // if ((config.enableLogs || '').toString() === 'true') {
    //     result.enableLogs = true;
    // }

    if ((config.socketURL || '').toString().length) {
        result.socketURL = (config.socketURL || '').toString();
    }

    if ((config.dirPath || '').toString().length) {
        result.dirPath = (config.dirPath || '').toString();
    }

    if ((config.homePage || '').toString().length) {
        result.homePage = (config.homePage || '').toString();
    }

    if ((config.socketMessageEvent || '').toString().length) {
        result.socketMessageEvent = (config.socketMessageEvent || '').toString();
    }

    if ((config.socketCustomEvent || '').toString().length) {
        result.socketCustomEvent = (config.socketCustomEvent || '').toString();
    }

    if ((config.enableAdmin || '').toString() === 'true') {
        result.enableAdmin = true;
    }

    if ((config.adminUserName || '').toString().length) {
        result.adminUserName = (config.adminUserName || '').toString();
    }

    if ((config.adminPassword || '').toString().length) {
        result.adminPassword = (config.adminPassword || '').toString();
    }

    return result;
}

var config;
function serverHandler(request, response) {
    // to make sure we always get valid info from json file
    // even if external codes are overriding it
    config = getValuesFromConfigJson(jsonPath);
    // config = getBashParameters(config, BASH_COLORS_HELPER);

    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.write('WebRTC Socket.io Signaller Server.\n\n');
    response.end();
}

var httpApp;



var sslOptions = {
    key: fs.readFileSync(process.env.key),
    cert: fs.readFileSync(process.env.cert),
    ca: fs.readFileSync(process.env.ca),
    requestCert: true,
    rejectUnauthorized: false
};

httpApp = httpServer.createServer(sslOptions, serverHandler);
rtcserver.beforeHttpListen(httpApp, config);
httpApp = httpApp.listen(process.env.signallerPort || PORT, process.env.IP || "0.0.0.0", function () {
    rtcserver.afterHttpListen(httpApp, config);
});

ioServer(httpApp, {
    // transports: ['websocket'],
    pingInterval: 25000, // default - 25000
    pingTimeout: 60000, // default - 60000
})
    .on('connection', function (socket) {
        rtcserver.addSocket(socket, config);

        const params = socket.handshake.query;

        if (!params.socketCustomEvent) {
            params.socketCustomEvent = 'custom-message';
        }

        socket.on(params.socketCustomEvent, function (message) {
            socket.broadcast.emit(params.socketCustomEvent, message);
        });
    });
