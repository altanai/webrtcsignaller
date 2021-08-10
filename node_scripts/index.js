module.exports = {
    resolveURL: require('./resolveURL.js'),
    BASH_COLORS_HELPER: require('./BASH_COLORS_HELPER.js'),
    getValuesFromConfigJson: require('./get-values-from-config-json.js'),
    getBashParameters: require('./get-bash-parameters.js'),
    beforeHttpListen: require('./before-http-listen.js'),
    afterHttpListen: require('./after-http-listen.js'),
    addSocket: require('./Signaling-Server.js')
};
