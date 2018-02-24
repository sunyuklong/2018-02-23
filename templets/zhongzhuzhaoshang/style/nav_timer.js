// JavaScript Document

//判断屏幕是否滚动到临界点
function screenScroll(obj){
	var distance=obj.offset().top,
		h=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
		height=$(window).height();
		return(distance-h<height)
			
}


//关于我们页面效果--发展历程
var control=true,timer=null;
var num=-1;
function Mover(index){
	$(".age li").eq(index).addClass("curr").siblings().removeClass("curr");
	$(".age_con").find("li").each(function() {
		var eq=$(this).index();
		if(eq==index){
			$(this).fadeIn("fast").siblings().fadeOut();
		}
	});
}
function autoMover(){
	if(num>=7){
		num=0;
	}else{
		num++
	}
	Mover(num);
}	

$(document).ready(function(e) {
	//导航效果
	$(".header").find("li").click(function(){
		$(this).addClass("cur").siblings().removeClass("cur")
	})
	$(".age li").mouseover(function(){
		clearInterval(timer);
		var sy=$(this).index();
		setTimeout(Mover(sy),300)
		num=sy;
	}).mouseleave(function(){
		clearTimeout();
		timer=setInterval(autoMover,2000)
	})
	//为列表里的前几个增加动画并延迟显示
	function addAnimate(selector,delayer,csser,count){
		selector.each(function(){
			var d=$(this).index();
			if(d<count){
				$(this).addClass(csser).attr("data-wow-delay",delayer*d+"s")
			}
		})
	}
	addAnimate($(".picList li"),0.5,"wow fadeInRight",3);
	addAnimate($(".shzr_list li"),0.5,"wow fadeInRight",4);
	addAnimate($(".staff_list li"),0.5,"wow fadeInRight",4);
	addAnimate($(".data_list li"),0.5,"wow fadeInRight",6);
	
	//回到顶部
	var scrCtrol=true;
	if(scrCtrol){
		$(window).scroll(function(){
			$(".goback").fadeIn();
		})
		scrCtrol=false;
	}
	$(".back_tel").hover(function(){$(this).find("div").fadeIn();},function(){$(this).find("div").fadeOut();})
	$(".back_ewm").hover(function(){$(this).find("div").fadeIn();},function(){$(this).find("div").fadeOut();})
    $(".back_scroll").click(function(){
		$("html,body").animate({scrollTop:0},1000);
	})

});	


 /*wow特效*/
if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
	new WOW().init();
};