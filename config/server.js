require('dotenv').config();
const pkg = require('../package.json');

module.exports = {
    hostUrl: process.env.HOST_URL || 'localhost',
    port: process.env.PORT || pkg.port,
    host: process.env.HOST || 'localhost',
};
