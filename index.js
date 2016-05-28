// starting point of the application

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./router');

// DB Setup
mongoose.connect('mongodb://localhost:reduxAuth/auth');

// App Setup
const app = express();
       /********  Middleware  **********/
       // any incoming request will be passed into these two middleware
       // all possible by using app.use('which registers them as middleware')
app.use(morgan('combined'));
// allow cross origin resource sharing, 
app.use(cors());
app.use(bodyParser.json({ type: '*/*'}));
router(app);

// Server Setup

// If there is an environment variable of PORT already defined, or use localhost: 3147
const port = process.env.PORT || 3147;
// http: is a native node library that works at a low level for incoming http requests
// create an http server that receives requests, anything that come in forward it to the express server app'
const server = http.createServer(app);
server.listen(port);
console.log('Express server is listening on port:', port);