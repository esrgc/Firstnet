/*
Author: Tu hoang

ESRGC 
April 2014

Firstnet
server.js

main node server configurations
*/

var app = require('./app');

app.listen(process.env.PORT);
console.log('Server listening on port ' + process.env.PORT);
