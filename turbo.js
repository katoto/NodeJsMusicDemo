.clearfix:after{
	content:'';
	height:0;
	visibility:hidden;
	overflow:hidden;
	display:block
	clear:both
}

.clearfix{
	*zoom:1;
}
	function siblings(elm ){
		var a = [];
		var p = elm.parentNode.children;
		for(var i=0,pl= p ;p.length;i++){
			if(p[i] !==elm) a.push(p[i])
		}
		return a;
	}
	

// 面向过程 一步一步慢慢来
// 面向对象，是把过程封装

var arr= [],
	push = arr.puhs,
	slice = arr.slice,
	concat = arr.concat;

var jquery = function jquery(selector){
	return new jquery.prototype,init(selector);
};

jquery.fn = jquery.prototype = {
	constructor:jquery,
	sleector:null,
	length:0,
	init: function (selector){
		if(jquery.isString(selector)){
			if(selector.charAt(0)==='<'){
				itcast.push.apply(this,parseHTML)()
			}


		}


	}
}

jquery.fn.init.prototype = jquery.prototype;

jquery.extend = jquery.fn.extend = function(obj){
	var k ;
	for( k in obj){
		this[k] = obj[k];
	}
};

var parseHTML = function(html){
	var div = document.createELement('div'),
	arr = [],i;
	div.innerHTML = html;
	for(i =0 ;i<div.childNodes.length;i++){
		arr.push(div.childNodes[i]);
	}
	return arr;
}

jquery.extend({

	each: function(arr , fn ){
		var i,l = arr.length,
		isArray = jquery.isLikeArray(arr);
		if(isArray){
			for(i=0 ; i<l ;i++){
				if( fn.call(arr[i],i ,arr[i])===false){
					break;
				}

			}
		}
	},
	push:push
});

jquery.extend({
	isFunction:function(obj){
		return typeof obj === 'function';
	},
	isString: function(obj){
		return typeof obj ==='string';
	}
})