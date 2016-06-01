'use strict';

const artTemplate = require('art-template');
const templateFilePath = require('../config').templateFilePath;
// 函数内部返回一个新的函数

// 配置后台模板语法解析的标记
artTemplate.config('openTag','<<');
artTemplate.config('closeTag','>>');

// artTemplate默认会缓存读取到的模板字符串
// 所以在开发过程中，我们要关闭缓存这一项
artTemplate.config('cache',false);


function render(res){
	return function(fileName , data){
		// 路径不一样的
		let htmlStr = artTemplate(`${templateFilePath}/${fileName}`,data||{});
		res.writeHead(200,{
			'Content-Type':'text/html; charset=utf-8'
		});
		res.end(htmlStr);
	}
}

module.exports = render;