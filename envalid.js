const envalid = require('envalid');

const { host, bool, port, str } = envalid;

const validationOptions = {
    DB_HOST: host({ default: 'localhost' }),
    DB_LOG_SQL: bool({ default: false }),
    DB_NAME: str(),
    DB_PASS: str(),
    DB_PORT: port({ default: 5432 }),
    DB_SSL: bool({ default: false }),
    DB_USER: str(),
    JWT_TOKEN_SECRET: str(),
    PORT: port({ default: 8088 }),
    HOST: host({ default: 'localhost' }),
};

if (process.env.SENDGRID_API_KEY) {
    validationOptions.SENDGRID_API_KEY = str();
}

module.exports = envalid.cleanEnv(process.env, validationOptions);
