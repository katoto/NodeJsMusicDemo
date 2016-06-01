'use strict';

// 也将这个方法挂到res上
function responseJson(res){
	return function(jsonObj){
		let jsonStr = JSON.stringify(jsonObj);
		res.writeHead(200,{
			'Content-Type':'text/plain; charset=utf-8'
		});
		res.end(jsonStr);
	}
}

module.exports = responseJson;