
const restify = require('restify');

const routes = require('../http/routes');
const cors = require('./cors');
const jwtMiddleware = require('./jwtmiMiddleware');

const exclusions = ['/auth'];

const server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());
server.use(jwtMiddleware(exclusions));

routes(server);

module.exports = server;
