var fs = require('fs');
var config = fs.readFileSync("./config.json");

function getValues(param) {
    var result = {
        socketURL: '/',
        dirPath: null,
        // homePage: '/demos/index.html',
        socketMessageEvent: 'RTCMultiConnection-Message',
        socketCustomEvent: 'RTCMultiConnection-Custom-Message',
        httpsport: 0,
        http2port: 0,
        enableLogs: false,
        autoRebootServerOnFailure: false,
        isUseHTTPs: null,
        sslKey: null,
        sslCert: null,
        sslCabundle: null,
        enableAdmin: false,
        adminUserName: null,
        adminPassword: null
    };

    if (!fs.existsSync(param.config)) {
        console.warn('File does not exist', param.config, " read default config " , result);
        return result;
    } else {
        var json = fs.readFileSync(param.config);
        config = JSON.parse(json);
        console.log("read from external config ", param.config, config);
    }

    ['sslKey', 'sslCert', 'sslCabundle'].forEach(function (key) {
        if (!config[key] || config[key].toString().length == 0) {
            return;
        }

        if (config[key].indexOf('/path/to/') === -1) {
            if (key === 'sslKey') result.sslKey = config.sslKey;
            if (key === 'sslCert') result.sslCert = config.sslCert;
            if (key === 'sslCabundle') result.sslCabundle = config.sslCabundle;
        }
    });

    if (config.httpsport > 0) {
        result.httpsport = config.httpsport;
    }

    if (config.http2port > 0) {
        result.http2port = config.http2port
    }

    if ((config.autoRebootServerOnFailure || '').toString() === 'true') {
        result.autoRebootServerOnFailure = true;
    }

    if ((config.isUseHTTPs || '').toString() === 'true') {
        result.isUseHTTPs = true;
    }

    if ((config.enableLogs || '').toString() === 'true') {
        result.enableLogs = true;
    }

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

// function getValues(param) {
//     var path = require('path');
//     var fs = require('fs');
//     var getJsonFile = require('./getJsonFile.js');
//     var result = {
//         socketURL: '/',
//         dirPath: null,
//         homePage: '/demos/index.html',
//         socketMessageEvent: 'RTCMultiConnection-Message',
//         socketCustomEvent: 'RTCMultiConnection-Custom-Message',
//         port: process.env.PORT || 9001,
//         enableLogs: false,
//         autoRebootServerOnFailure: false,
//         isUseHTTPs: null,
//         sslKey: null,
//         sslCert: null,
//         sslCabundle: null,
//         enableAdmin: false,
//         adminUserName: null,
//         adminPassword: null
//     };
//
//
//     if (!fs.existsSync(param.config)) {
//         console.log('File does not exist', param.config);
//         return result;
//     }
//
//     var config = getJsonFile(param.config);
//
//     ['sslKey', 'sslCert', 'sslCabundle'].forEach(function (key) {
//         if (!config[key] || config[key].toString().length == 0) {
//             return;
//         }
//
//         if (config[key].indexOf('/path/to/') === -1) {
//             if (key === 'sslKey') {
//                 result.sslKey = config['sslKey'];
//             }
//
//             if (key === 'sslCert') {
//                 result.sslCert = config['sslCert'];
//             }
//
//             if (key === 'sslCabundle') {
//                 result.sslCabundle = config['sslCabundle'];
//             }
//         }
//     });
//
//     if ((config.port || '').toString() !== '9001') {
//         result.port = (config.port || '').toString();
//     }
//
//     if ((config.autoRebootServerOnFailure || '').toString() === 'true') {
//         result.autoRebootServerOnFailure = true;
//     }
//
//     if ((config.isUseHTTPs || '').toString() === 'true') {
//         result.isUseHTTPs = true;
//     }
//
//     if ((config.enableLogs || '').toString() === 'true') {
//         result.enableLogs = true;
//     }
//
//     if ((config.socketURL || '').toString().length) {
//         result.socketURL = (config.socketURL || '').toString();
//     }
//
//     if ((config.dirPath || '').toString().length) {
//         result.dirPath = (config.dirPath || '').toString();
//     }
//
//     if ((config.homePage || '').toString().length) {
//         result.homePage = (config.homePage || '').toString();
//     }
//
//     if ((config.socketMessageEvent || '').toString().length) {
//         result.socketMessageEvent = (config.socketMessageEvent || '').toString();
//     }
//
//     if ((config.socketCustomEvent || '').toString().length) {
//         result.socketCustomEvent = (config.socketCustomEvent || '').toString();
//     }
//
//     if ((config.enableAdmin || '').toString() === 'true') {
//         result.enableAdmin = true;
//     }
//
//     if ((config.adminUserName || '').toString().length) {
//         result.adminUserName = (config.adminUserName || '').toString();
//     }
//
//     if ((config.adminPassword || '').toString().length) {
//         result.adminPassword = (config.adminPassword || '').toString();
//     }
//
//     return result;
// }

module.exports = exports = getValues;

