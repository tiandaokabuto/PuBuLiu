window.onload=function(){
	waterfall('main','box');
	var data = {
		"data":[{"src":"P_00.jpg"},{"src":"P_01.jpg"},{"src":"P_02.jpg"}]
	};
	//拖动滚动条触发事件
	window.onscroll = function(){
		if(checkScroll()){
			var parent = document.getElementById("main");
			//将数据渲染到页面尾部
			for (var i = 0;i<data.data.length ;i++ )
			{
				var box = document.createElement("div");
				box.className="box";
				parent.appendChild(box);
				var pic = document.createElement("div");
				pic.className="pic";
				box.appendChild(pic);
				var img = document.createElement("img");
				img.src=data.data[i].src;
				pic.appendChild(img);
			}
			waterfall('main','box');
		}
	}
}

function waterfall(parent,box){
	//获取main
	var parents = document.getElementById(parent);
	//使用方法获取父元素下的子元素集
	var boxes = getByClass(parents,box);
	//计算页面显示的列数
	//页面宽/box宽
	var boxWid = boxes[0].offsetWidth;
	console.log(boxWid);
	var cols = Math.floor(document.documentElement.clientWidth/boxWid);//页面宽除以box宽
	console.log(cols);
	//设置main的宽
	parents.style.cssText='width:'+cols*boxWid+'px;margin:0 auto';
	//存放第一列图片的高
	var hArr = [];
	for (var i=0;i<boxes.length ;i++ )
	{
		if(i<cols){
			hArr.push(boxes[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,hArr);
			var index = getMinHIndex(hArr,minH);//获得索引
			boxes[i].style.position = "absolute";
			boxes[i].style.top = minH+'px';
			boxes[i].style.left = boxWid * index +'px';
			//修改原来数组中的高度 使当前最小高度的单位改变
			//console.log(boxes[i].offsetHeight);
			//最小高度+新增box的高度
			hArr[index] += boxes[i].offsetHeight;
		}
	}
	//第七张图片要加载在第一行中height最小的图片后面
}

function getByClass(parents,clsname){
	var boxArr = parents.getElementsByClassName(clsname);
	//var elements = parents.getElementsByTagName('*');
//	for (var i = 0;i < elements.length ;i++ )
//	{
//		if(elements[i].className==clsname){
//			boxArr.push(elements[i]);
//	}	
//}
return boxArr;
}

function getMinHIndex(arr,height){
	for(var i in arr){
		if(arr[i]==height){
			return i;
		}
	}
}
//判断是否触发滚动加载
function checkScroll(){
	var parent = document.getElementById('main');
	var boxes = getByClass(parent,'box');
	var lastBoxH = boxes[boxes.length-1].offsetTop+Math.floor(boxes[boxes.length-1].offsetHeight/2);//最后一个box的距离顶端的高度
	var scrollH = document.body.scrollTop || document.documentElement.scrollTop;//滑块滚动的高度
	var height = document.body.clientHeight || document.documentElement.clientHeight;//浏览器高
	if(lastBoxH<scrollH+height)
		return true;
	else
		return false;
}