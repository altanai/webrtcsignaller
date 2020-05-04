module.exports = exports = function(config, BASH_COLORS_HELPER) {
    var argv_array = [];
    process.argv.forEach(function(val, index, array) {
        if (argv_array.length) return;
        argv_array = array;
    });

    argv_array.forEach(function(val) {
        // node signaller.js --ssl
        if (val === '--ssl') {
            config.isUseHTTPs = true;
        }

        // node signaller.js --isUseHTTPs=true
        if (val.indexOf('--isUseHTTPs') === 0) {
            var inner = val.split('--isUseHTTPs=')[1];
            if (inner) {
                inner = inner.split(' ')[0].trim();
                config.isUseHTTPs = inner === 'true';
            }
        }

        // node signaller.js --autoRebootServerOnFailure=true
        if (val.indexOf('--autoRebootServerOnFailure=true') === 0) {
            config.autoRebootServerOnFailure = true;
        }

        // node signaller.js --port=9002
        if (val.indexOf('--port') === 0) {
            var inner = val.split('--port=')[1];
            if (inner) {
                inner = inner.split(' ')[0].trim();
                config.port = inner;
            }
        }

        // node signaller.js --dirPath=/var/www/html/
        if (val.indexOf('--dirPath') === 0) {
            var inner = val.split('--dirPath=')[1];
            if (inner) {
                inner = inner.split(' ')[0].trim();
                config.dirPath = inner;
            }
        }

        // node signaller.js --homePage=/demos/Video-Conferencing.html
        if (val.indexOf('--homePage') === 0) {
            var inner = val.split('--homePage=')[1];
            if (inner) {
                inner = inner.split(' ')[0].trim();
                config.homePage = inner;
            }
        }

        // node signaller.js --enableAdmin=true
        if (val.indexOf('--enableAdmin=true') === 0) {
            config.enableAdmin = true;
        }

        // node signaller.js --adminUserName=username
        if (val.indexOf('--adminUserName') === 0) {
            var inner = val.split('--adminUserName=')[1];
            if (inner) {
                inner = inner.split(' ')[0].trim();
                config.adminUserName = inner;
            }
        }

        // node signaller.js --adminPassword=password
        if (val.indexOf('--adminPassword') === 0) {
            var inner = val.split('--adminPassword=')[1];
            if (inner) {
                inner = inner.split(' ')[0].trim();
                config.adminPassword = inner;
            }
        }

        // node signaller.js --sslKey=/home/ssl/ssl.key
        if (val.indexOf('--sslKey') === 0) {
            var inner = val.split('--sslKey=')[1];
            if (inner) {
                inner = inner.split(' ')[0].trim();
                config.sslKey = inner;
            }
        }

        // node signaller.js --sslCert=/home/ssl/ssl.crt
        if (val.indexOf('--sslCert') === 0) {
            var inner = val.split('--sslCert=')[1];
            if (inner) {
                inner = inner.split(' ')[0].trim();
                config.sslCert = inner;
            }
        }

        // node signaller.js --sslCabundle=/home/ssl/ssl.cab
        if (val.indexOf('--sslCabundle') === 0) {
            var inner = val.split('--sslCabundle=')[1];
            if (inner) {
                inner = inner.split(' ')[0].trim();
                config.sslCabundle = inner;
            }
        }

        // node signaller.js --version
        if (val === '--version') {
            var json = require(path.join(__dirname, resolveURL('package.json')));
            console.log('\n');
            console.log(BASH_COLORS_HELPER.getYellowFG(), '\t' + json.version);
            process.exit(1);
        }

        // node signaller.js --dependencies
        if (val === '--dependencies') {
            var json = require(path.join(__dirname, resolveURL('package.json')));
            console.log('\n');
            console.log(BASH_COLORS_HELPER.getYellowFG(), 'dependencies:');
            console.log(JSON.stringify(json.dependencies, null, '\t'));
            console.log('\n');
            console.log(BASH_COLORS_HELPER.getYellowFG(), 'devDependencies:');
            console.log(JSON.stringify(json.devDependencies, null, '\t'));
            process.exit(1);
        }

        // node signaller.js --help
        if (val === '--help') {
            console.log('\n');
            console.log('You can manage configuration in the "config.json" file.');

            console.log('\n');
            console.log(BASH_COLORS_HELPER.getYellowFG(), 'Or use following commands:');
            console.log('\tnode signaller.js');
            console.log('\tnode signaller.js', BASH_COLORS_HELPER.getYellowFG('--port=9002'));
            console.log('\tnode signaller.js', BASH_COLORS_HELPER.getYellowFG('--port=9002 --ssl'));
            console.log('\tnode signaller.js', BASH_COLORS_HELPER.getYellowFG('--port=9002 --ssl --sslKey=/home/ssl/ssl.key --sslCert=/home/ssl/ssl.crt'));

            console.log('\n');
            console.log('Here is list of all config parameters:');
            console.log(BASH_COLORS_HELPER.getYellowFG(), '--port=80');
            console.log('\tThis parameter allows you set any custom port.');
            console.log(BASH_COLORS_HELPER.getYellowFG(), '--ssl');
            console.log('\tThis parameter is shortcut for --isUseHTTPs=true');
            console.log(BASH_COLORS_HELPER.getYellowFG(), '--isUseHTTPs=true');
            console.log('\tThis parameter allows you force HTTPs. Remove/Skip/Ignore this parameter to use HTTP.');
            console.log(BASH_COLORS_HELPER.getYellowFG(), '--sslKey=path');
            console.log('\tThis parameter allows you set your domain\'s .key file.');
            console.log(BASH_COLORS_HELPER.getYellowFG(), '--sslCert=path');
            console.log('\tThis parameter allows you set your domain\'s .crt file.');
            console.log(BASH_COLORS_HELPER.getYellowFG(), '--sslCabundle=path');
            console.log('\tThis parameter allows you set your domain\'s .cab file.');
            console.log(BASH_COLORS_HELPER.getYellowFG(), '--version');
            console.log('\tCheck RTCMultiConnection version number.');
            console.log(BASH_COLORS_HELPER.getYellowFG(), '--dependencies');
            console.log('\tCheck all RTCMultiConnection dependencies.');
            console.log(BASH_COLORS_HELPER.getYellowFG(), '--autoRebootServerOnFailure=false');
            console.log('\tDisable auto-restart signaller.js on failure.');
            console.log(BASH_COLORS_HELPER.getYellowFG(), '--dirPath=/var/www/html/');
            console.log('\tDirectory path that is used for HTML/CSS/JS content delivery.');
            console.log(BASH_COLORS_HELPER.getYellowFG(), '--homePage=/demos/Video-Conferencing.html');
            console.log('\tOpen a specific demo instead of loading list of demos.');
            console.log(BASH_COLORS_HELPER.getYellowFG(), '--enableAdmin=true');
            console.log('\tEnable /admin/ page.');
            console.log(BASH_COLORS_HELPER.getYellowFG(), '--adminUserName=username');
            console.log('\t/admin/ page\'s username.');
            console.log(BASH_COLORS_HELPER.getYellowFG(), '--adminPassword=password');
            console.log('\t/admin/ page\'s password.');
            console.log('------------------------------');
            console.log('Need more help? bit.ly/2ff7QGk');
            process.exit(1);
        }
    });

    return config;
};
