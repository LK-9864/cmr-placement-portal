const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');

// Same as server.js above, but wrapped for Lambda
const app = express();
// ... (add routes and MongoDB connection as above)

module.exports.handler = serverless(app);