'use strict';

// const url = require('url');
const urlMod = require('url');

const path = require('path');
const fs = require('fs');

const mime = require('./mime.json');




// 为了语音化，可以改成music
const handler = require('./controllers/music');

// url 模块中有一个url模块，就是专门用来处理url 路径的
//原先用readfild 现在用利用模板引擎，去读文件  
const artTemplate = require('art-template');



module.exports = function(req,res){

 	let urlObj = urlMod.parse(req.url , true); 	
 	// console.log(urlObj);
 	// 为了方便处理 将查询段 挂到req属性上
 	// 得到url上的查询字段 对应的obj对象
 	req.query = urlObj.query;   

	// response.writeHead(200 ,{
	// 	'Content-Type':'text/css; charset=utf-8'
	// });
	// 获取客户端请求方法  get | post   
	let method = req.method;
	// 也可以用这个获得url 
	let pathname = urlObj.pathname;
	req.pathname = pathname;

if(method ==='GET'&&pathname ==='/' ){
		// 对首页的请求进行处理
		// res.render('index');
		handler.renderIndex(req ,res);

	}else if((method==='GET'&& pathname.startsWith('/node_modules')) 
		|| (method==='GET'&& pathname.startsWith('/css')) || (method==='GET'&& pathname.startsWith('/images'))  ){
		// 处理静态的一些资源
		// C:\Users\Turbo\Desktop\js\node_modules\jquery\dist\jquery.js
		let fullPath = path.join(__dirname ,pathname );
		// console.log(fullPath);
		fs.readFile(fullPath,(err ,data )=>{
			if(err){
				// 开发过程中要讲错误抛出到页面上，便于调试
				return res.end(err.message);
			}
			// 遇到多种文件，写响应头要引入库mime.json 文件。
			res.writeHead(200,{
				'Content-Type': `${mime[path.extname(fullPath)]}; charset=utf-8`
			});
			res.end(data);
		});
		// 约定请求的音乐数据已get形式 且路径是/music上来
	}else if(method==="GET"&& pathname === '/music'){
		handler.getMusicList(req ,res);
	}else if(method==='GET'&&pathname.startsWith('/files/'))  {
		handler.transferMusic(req,res);
	}else if(method==='GET'&&pathname==='/add'){
		handler.renderAdd(req ,res);
	}else if(method==='POST' && pathname==='/add'){
		handler.doAdd(req ,res);
		// 编辑音乐  get 获取页面
	}else if(method ==='GET'&& pathname==='/edit'){
		handler.renderEdit(req ,res);
		// 编辑  修改音乐信息  get 获取页面
	}else if(method==='POST'&&pathname==='/edit'){
		handler.doEdit(req ,res);
		// 删除请求   在前台处理删除，重新发起ajax请求已经变化内存数据
	}else if (method==='GET'&&pathname ==='/remove'){
		handler.doRemove(req ,res);
	}

};