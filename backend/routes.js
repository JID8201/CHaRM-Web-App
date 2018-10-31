'use strict';

const express = require('express');
const router = express.Router();
const recycling = require('./controllers/recycling');

router.post('/recycling', recycling.create);

router.use((req, res, next) => {
    if (res.locals.data) {
        let response = Object.assign({}, res.locals.data, {
            'status': 'ok'
        })
        return res.status(200).json(response)
    } else if (res.locals.error) { // Any errors thrown are be handled below, but because we're bad not all errors are thrown >:(
        let statusCode = res.locals.error.code || 500
        let response = Object.assign({}, res.locals.error, {
            'status': 'error'
        })
        return res.status(statusCode).json(response)
    } else {
        return res.status(500).json({
            'status': 'error',
            'code': 500,
            'msg': 'Internal Server Error: ' + err
        })
    }
});

module.exports = router;