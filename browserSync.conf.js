var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var plugin = new BrowserSyncPlugin(
    {
        host: 'localhost',
        port: 4000,
        server: {
            baseDir: ['./build']
        }
    },
    {
        callback: function () {
            console.log('BrowserSync started...');
        },
        reload: true
    }
);

module.exports = plugin;
