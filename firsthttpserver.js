'use strict';

// 开发基于http 的服务器

const http = require('http');
// const path = require('path');
// 配置响应头content-type的信息
const config = require('./config.js');

const render = require('./common/render');

const json = require('./common/json');
	
const router = require('./router');

const server = http.createServer();

server.on('request',(req , res) =>{

	// 在response 对象上挂载render渲染函数（artTemplate）;
 	res.render= render(res);
 	// 写一个方法用于发送json对象的数据 如各种字段的数据 将其挂在res上
 	res.jsonSend = json(res);

 	router(req,res);

});





// 开启监听
server.listen(config.port,config.host,()=>{
	console.log('服务器开启 running');
});
