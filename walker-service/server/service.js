const express = require('express');

const service = express();

module.exports = (config) => {
    const log = config.log();
    // Add request logging middleware in development mode
    if (service.get('env') === 'development') {
        service.use((req, res, next) => {
            log.debug(`${req.method}: ${req.url}`);
            return next();
        });
    }

    service.post('/walker/create', (req, res, next) => {
        return next('Not implemented');
    });

    service.put('/walker/update-profile/:id', (req, res, next) => {
        return next('Not implemented');
    });

    service.get('/walker/walks/:id', (req, res, next) => {
        return next('Not implemented');
    });

    service.get('/walker/schedule/:id', (req, res, next) => {
        return next('Not implemented');
    });

    service.get('/walker/invite/:name/:phone/:specialcode/:walkerid/:walkername', (req, res, next) => {
        return next('Not implemented');
    });

    // eslint-disable-next-line no-unused-vars
    service.use((error, req, res, next) => {
        res.status(error.status || 500);
        // Log out the error to the console
        log.error(error);
        return res.json({
            error: {
                message: error.message,
            },
        });
    });
    return service;
};