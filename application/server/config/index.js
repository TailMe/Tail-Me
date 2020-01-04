require('dotenv').config();
const bunyan = require('bunyan');

const loggers = {
    development: () => bunyan.createLogger({ name: 'development', level: 'debug' }),
    production: () => bunyan.createLogger({ name: 'production', level: 'info' }),
    test: () => bunyan.createLogger({ name: 'test', level: 'fatal' }),
};

module.exports = {
    development: {
        sitename: 'Tail Me [Development]',
        log: loggers.development,
        database: {
            dsn: process.env.DEVELOPMENT_DB_DSN,
        },
    },
    production: {
        sitename: 'Tail Me',
        log: loggers.production,
        database: {
            dsn: process.env.PRODUCTION_DB_DSN,
        },
    },
    test: {
        sitename: 'Tail Me [Test]',
        log: loggers.test,
        database: {
            dsn: process.env.TEST_DB_DSN,
        },
    },
};
