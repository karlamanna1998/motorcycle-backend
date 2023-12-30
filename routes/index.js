// index.js
const express = require('express');
const router = express.Router();
const adminRoute = require('./admin');
const userRoute = require('./user');
require('express-router-group');

router.group('/api/v1', (router) => {
    // Admin routes
    router.use('/admin', adminRoute);

    // User routes
    router.use('/user', userRoute);
});

module.exports = router;
