$(function(){
	var nav_list = $(".nav_list");
	var list = $("li",nav_list);
	list.hover(function(){
		var lw = $(this).width();
		$(this).css("border-bottom","2px solid #04435F");
	},function(){
		$(this).css("border-bottom","none");
	})
	// 楼层跳转
	// alert($(".first").height())

	document.documentElement.scrollTop=1;
	var obj=document.documentElement.scrollTop?document.documentElement:document.body;
	var now = 0;
	window.onscroll = function(){
		if(obj.scrollTop>=($(".first").height()-250))
		{

			$(".sector").css("display","block");
		}
		else{
			$(".sector").css("display","none");
		}

		for(var i = 0;i<$(".floor").length;i++)
		{
			if(obj.scrollTop+120>=$(".floor")[i].offsetTop)
			{
				now=i;
				for(var j=0;j<$(".list").length;j++)
				{
					$(".list").eq(j).css("background","#fff");
				}
				$(".list").eq(i).css("background","#FF7C49");
			}
		}
	}
	var floor = $(".floor");
	for(var i=0;i<$(".list").length;i++)
	{
		// alert($(".list")[i]);
		$(".list")[i].aa=i;
		$(".list")[i].onclick = function(){
			animate(obj,{scrollTop:(floor[this.aa].offsetTop)});
		}
		
		
	}
	// 标题移入效果
	var title = $(".title");
	title.hover(function(){
		$(".translate").css("display","block");
	},function(){
		$(".translate").css("display","none");
	})

})