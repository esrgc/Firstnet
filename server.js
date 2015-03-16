/*
Author: Tu hoang

ESRGC 
April 2014

Firstnet
server.js

main node server configurations
*/

var app = require('./app');
var port = require('./appSettings').port;

app.listen(port);
console.log('Server listening on port ' + port);
