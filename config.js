'use strict';
const path = require('path');

// 把进程变化的东西放到config里

module.exports = {
	port:3000,
	host:'127.0.0.1',
	templateFilePath:path.join(__dirname,'views'),
	musicPath:__dirname
};