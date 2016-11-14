// alert(2)
function getChild(father,type)
	{
		type = type || "a";//给type一个默认值
		var all = father.childNodes;//获取father的每一个孩子节点，是一个数组
		var newarr = [];//定义一个新的数组
		for(var i = 0;i<all.length;i++)//遍历每一个孩子节点
		{
			if(type == "a")//判断如果满足条件，为元素节点
			{
				if(all[i].nodeType == 1 )//元素节点的判断条件：元素节点的节点类型为1
				{
			        newarr.push(all[i]);//满足条件放在新的数组中
				}
			}
			else if(type =="b")//如果满足条件，为元素节点+文本节点
			{
				//如果是元素节点或者是没有空格的文本节点
				if(all[i].nodeType == 1 || all[i].nodeType == 3 && (all[i].nodeValue.replace(/^\s*|\s*$/g,""))!="")
					//文本节点的节点值用replace方法去除空字符串然后判断如果不是空串就放在新的数组中
					{
				       newarr.push(all[i]);

			        }
			}
				
			
		}
		return newarr;
	}


//2获取第一个子节点
function getFirst(father){
	return getChild(father)[0];
}
//3获取最后一个子节点
function getLast(father){
	return getChild(father)[getChild(father).length-1];
}
//4获取指定的子节点
function getNum(father,xiabiao){
	return getChild(father)[xiabiao];

}
//5获取下一个兄弟节点，要找的是元素节点
//obj是当前节点
function getNext(obj){
   var next = obj.nextSibling;//获取当前节点的下一个兄弟节点
   //下一个节点不存在的情况
   if(!next)//如果当前节点的下一个节点不存在，则为null，boolean(null)转换为false，！false为真，返回false
   {
   	return false;//表示下一个节点不存在
   }
   //判断当没有找到元素节点的时候，就继续找
   while(next.nodeType == 3 || next.nodeType == 8)
   	//下一个节点是文本节点或者是注释节点的时候
   {
   	next = next.nextSibling;
   	if(!next){
   		return false;
   	}
   }
   return next;

}

function getStyle(obj,shuxing){


		if(obj.currentStyle)
		{
			return parseInt(obj.currentStyle[shuxing]);
		}
		else{
			return parseInt(getComputedStyle(obj,null)[shuxing]);
		}

	}
function getClass(classname,father){

  
	father = father || document;//设置默认值

	//判断浏览器条件（document.getElememtsClassName）
	//满足条件为现代浏览器，不满足为IE
    //ff:现有方法
	//ie:先获取所有标签，然后遍历判断 （集合元素.className == classname）
	//条件满足，保存到新数组中，遍历完成后返回新数组
	if(father.getElementsByClassName){//判断浏览器
		// alert("我是现代");
		//如果是现代，就用该方法获取类名元素
		return  father.getElementsByClassName(classname);
		
        // alert(box);
	}else{
       // alert("我是IE");
       //获取所有的标签元素
       var all = father.getElementsByTagName("*");
       var newarr = [];
       //遍历所有的标签元素
       for(var i = 0;i<all.length;i++)
       {
       	//判断多个类名
       	//如果判断一个类名用if(all[i].className == classname)
       	if(checkRep(classname,all[i].className))//用all[i].className
       		//是取标签上的class的所有值
       	{
          newarr.push(all[i]);
       	}

       }
       return newarr;

	}
	
}
// <!-- 字符串转换为数组
// 遍历数组
// 判断
// 有相同的就返回true -->
function checkRep(val,string)
{
	var arr = string.split(" ");//把字符串转换为数组
	for(var i in arr)
	{
		if(arr[i] == val)
		{
			return true;
		}
	}
    return false;
}
//*******************
//2016-8-31
//获取元素的兼容函数（可以支持类名，标签，还有id）
function $(selector,father){
	//fun函数
	father = father || document;
 	//添加两个参数，1带点用来接收选择器2.用来缩小范围
	//判断是否是字符串（typeof）用typeof的结果都是字符串
	if(typeof selector == "string")
	{
		//去除字符串前后空格（替换的方法）把空格用空字符串覆盖
		selector = selector.replace(/^\s*|\s*$/g,"");
 //正则表达式的特殊符号^:表示字符串的开始  $；表示字符串的结束
	  //判断第一个字符charAt
	  if(selector.charAt(0) == ".")
	  {
	  	//以.开头，用getClass获取，注意字符串去掉第一个字母substring
	  	return getClass(selector.substring(1),father);
	  }
	  else if(selector.charAt(0) == "#")
	  {

	//以#开都，用document.getElementById()获取
	  	return document.getElementById(selector.substring(1));
	  }
	  //标签名 ，用正则表达式判断
	  //判断标签名，用
	// if(/^[a-z][1-6a-z]*/g.test(selector))
	// ^字符串的开头
	// [a-z]在a-z中的任意一个字母匹配
	// *可以有一个，也可以有多个，也可以没有
	// g表示全局匹配
	// test:用来检测
	  else if(/^[a-z][1-6a-z]*/g.test(selector))
	  {
         return father.getElementsByTagName(selector);
	  }

	}else if(typeof selector == "function"){
       window.onload = function(){
       	selector();
       }
	}
	
	
	
	




	
}
