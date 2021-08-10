// console.log is used to write error logs into logs.json
const BASH_COLORS_HELPER = require('./BASH_COLORS_HELPER.js');

module.exports = exports = function(httpServer, config) {
    httpServer.on('error', function(e) {
        console.log(config, 'app.onerror', e);

        if (e.code != 'EADDRINUSE') return;

        try {
            function cmd_exec(cmd, args, cb_stdout, cb_end) {
                try {
                    var spawn = require('child_process').spawn;
                    var child = spawn(cmd, args);
                    var me = this;
                    me.exit = 0;
                    me.stdout = "";
                    child.stdout.on('data', function(data) {
                        try {
                            cb_stdout(me, data);
                        } catch (e) {
                            console.log(config, 'stdout.data', e);
                        }
                    });
                    child.stdout.on('end', function() {
                        try {
                            cb_end(me);
                        } catch (e) {
                            console.log(config, 'stdout.end', e);
                        }
                    });
                } catch (e) {
                    console.log(config, 'cmd_exec', e);
                }
            }

            function log_console() {
                try {
                    console.log(foo.stdout);

                    var pidToBeKilled = foo.stdout.split('\nnode    ')[1].split(' ')[0];
                    console.log('------------------------------');
                    console.log('Please execute below command:');
                    console.log('\x1b[31m%s\x1b[0m ', 'kill ' + pidToBeKilled);
                    console.log('Then try to run "signaller.js" again.');
                    console.log('------------------------------');

                } catch (e) {
                    console.log(config, 'log_console', e);
                }
            }

            if (e.address === '0.0.0.0') {
                e.address = 'localhost';
            }

            var socketURL = (config.isUseHTTPs ? 'https' : 'http') + '://' + e.address + ':' + e.port + '/';

            console.log('------------------------------');
            console.log('\x1b[31m%s\x1b[0m ', 'Unable to listen on port: ' + e.port);
            console.log('\x1b[31m%s\x1b[0m ', socketURL + ' is already in use. Please kill below processes using "kill PID".');
            console.log('------------------------------');

            foo = new cmd_exec('lsof', ['-n', '-i4TCP:9001'],
                function(me, data) {
                    try {
                        me.stdout += data.toString();
                    } catch (e) {
                        console.log(config, 'lsof', e);
                    }
                },
                function(me) {
                    try {
                        me.exit = 1;
                    } catch (e) {
                        console.log(config, 'lsof.exit', e);
                    }
                }
            );

            setTimeout(log_console, 250);
        } catch (e) {
            console.log(config, 'app.onerror.EADDRINUSE', e);
        }
    });
};
