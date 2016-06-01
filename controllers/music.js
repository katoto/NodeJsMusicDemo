'use strict';

const path = require('path');
const fs = require('fs');
const musicPath = require('../config').musicPath;

// node 原生提供 querystring 模块中有一个方法，parse
// 可以将查询字符串转成json对象
const querystring = require('querystring');

const musicList = require('../modules/musicList');


exports.renderIndex = (req,res)=>{
	res.render('index');
}
exports.getMusicList = (req ,res)=>{
		// 构造json对象
		let send = {
			musicList:musicList
		};
		// 网络中传输的都是二进制  正常底层会帮我们做好
		let sendBuf = new Buffer(JSON.stringify(send));
	// response.statusCode = 200 ;
	// response.statusMessage = 'success';
	// response.setHeader('Content-Type','text/css charset:utf-8');
	// 也可集成写
		res.writeHead(200,{
			'Content-Type':'text/plain; charset=utf-8'
		});
		res.end(sendBuf);
		// 播放音乐事件  把音乐文件以流的形式下输出
}

exports.transferMusic = (req ,res)=>{
		
		// 音乐文件比较大，使用流的方式解决，来提高性能
		let fullPath = decodeURI(path.join(musicPath,req.pathname));
		let readSteam = fs.createReadStream(fullPath);
		readSteam.pipe(res);
		// 约定以get上来的是请求add页面，post 上来的是提交修改音乐信息

}

exports.renderAdd = (req ,res) =>{
	res.render('add');
}

exports.doAdd = (req ,res) =>{
		let data ='';
		// 音乐信息也可以
		// 接收post 方式提交的数据
		req.on('data',(chunk)=>{
			data +=chunk;
		});
		// 接收结束会触发end事件
		req.on('end',()=>{
			// 将查询字符串转为json对象
			let obj = querystring.parse(data);
			// console.log(obj);  
			let mid = obj.id;
			// 找不到 返回undefined 有的返回元素
			let music = musicList.find((m)=>{
				return m.id === mid;
			});

			// 约定字段 ，五千段用于音乐add
			if(music){
				return res.jsonSend({
					code:'5001',
					msg:'music already exists'
				})
			}
			// 否则成功添加  这个时候数据时存入内存中的
			musicList.push(obj);
			// 也可以发json 5000 字段数据给前端处理
		    // res.json({
	        //   code: '5000',
	        //   msg: 'success'
	        // });
			// 添加完成之后就可以重定向
			res.writeHead(302,{
				'Location':'http://127.0.0.1:3000/'
			});
			res.end();
		});
}

exports.renderEdit = (req ,res )=>{
	
		// 从查询字符串中获取用户要编辑的歌曲信息id
		// mid 已经预定好
		let mid = req.query.mid;
		let music = musicList.find( m=> m.id ===mid );

		if(!music){
			return res.jsonSend({
				code:'5003',
				msg:'music not found'
			});
		}
		// 将准备好的edit 进行template
		res.render('edit',{
			music:music
		});
}

exports.doEdit = (req ,res)=>{
		let mid = req.query.mid;
		// 找有没有这个id 的音乐可以编辑
   // findIndex 是es6 的根据音乐信息 id，查询该音乐信息在数组中的索引下标，如果找不到，那么返回 -1		
		let index = musicList.findIndex(m => m.id ===mid);
		if(index === -1){
			return res.jsonSend({
				code:'5002',
				msg:'music info not found'
			});
		}
		// 有者接受请求
		let data ='';

		req.on('data',(chunk)=>{
			// 会自动转存字符串的形式
			data +=chunk;
		});
		// 利用end 来监听上传结束事件
		req.on('end',()=>{
			// 将 post 接收到的数据，解析成一个方便我们操作的对象
			data = querystring.parse(data);
			data.id= mid;

			musicList[index] = data;
			res.writeHead(302,{
				'Location':'http://127.0.0.1:3000/'
			});
			res.end();
		})
}
exports.doRemove = (req ,res )=>{
		let mid = req.query.mid;
		let index = musicList.findIndex(m=> m.id ===mid);

		// 六千字段用于设置删除信息
		if(index ===-1 ){
			return res.jsonSend({
				code:'6002',
				msg:'music info not found'
			});
		}
		// 否则可以删除
		musicList.splice(index,1);
		res.jsonSend({
			code:'6000',
			msg:'remove success'
		});
}