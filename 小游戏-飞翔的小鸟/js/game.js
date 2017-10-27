//alert(123);

//开始按钮
var startBen=document.querySelector("#start");

//头部
var head=document.querySelector("#head");
//小鸟
var bird=document.querySelector("#bird");
//音乐
var audio=document.querySelector("audio");
//管道
var ductWrap=document.querySelector("#ductWrap");

//分数

var score=document.querySelector("#scoring");
//定义碰到到管道
var isTouch=true;

//产生管道定时器开关
var isDelTimer=false;
//管道定时器
var createDuctTimer=null;

startBen.onclick=function(){
        //隐藏掉 面板组件
        //
        this.parentNode.style.display="none";
        head.style.display="none";
        //显示小鸟
        bird.style.display="block";
        bird.speed=0;

        //小鸟移动
        bird.moveTimer=setInterval(function(){
        	  if(isTouch){bird.speed+=0.5;}else{bird.speed+=5;}
              

                   // 距离上方或上层控件的位置
              if (bird.offsetTop<=0) {
                      bird.style.top="0px";


              }else if(bird.offsetTop>=394){
                    bird.style.top="394px";
                    clearInterval(bird.moveTimer);
                    document.onmousedown=function(e){
                    	//阻止默认事件
                    	var ev=e||window.event;
                    	ev.preventDefault();
                    	//alert(123);
                    }
                  //当小鸟死亡时
                  //管道定时器停止
                  clearInterval(createDuctTimer);
                  //管道移动定时器
                  isDelTimer=true;
              }
              if(bird.speed<=0){
              	//第一个子节点
              	bird.children[0].src="img/up_bird0.png";
              }else{
              	bird.children[0].src="img/down_bird0.png";
              }
              bird.style.top=bird.offsetTop+bird.speed+"px";
            

        },30);

        //小鸟向上移动
        document.onmousedown=function(e){
        	var ev = e||window.event;
            ev.preventDefault();
            if (isTouch) {
            	bird.speed=-5;
        	    audio.src="bullet.mp3";
            }
        	

        }
        //创建管道
       createDuctTimer=setInterval(function(){
        	var duct=document.createElement("li");
        	//上官道的随机高度
        	var upHeight=randFn(62,261);
        	//下管道的高度
        	var downHeight=423-upHeight-100;
            
            duct.innerHTML='<div class="duct_up" style="height:'+upHeight+'px"><img src="img/up_pipe.png" /></div><div class="duct_down" style="height:'+downHeight+'px"><img src="img/down_pipe.png"/></div>';

            
            //管道第一次出现的位置
            duct.l = 350;
            duct.scoreBol=true;

            //管道移动
            duct.moveTimer=setInterval(function(){
            	  duct.l -= 3;
            	 // alert(duct.l);
            	  duct.style.left=duct.l+"px";
            	  if (duct.l<=-62) {
            	  	//清楚管道
            	  	ductWrap.removeChild(duct);
            	  	clearInterval(duct.moveTimer);
            	  }else if(duct.l<=-31){
                      if (duct.scoreBol==true) {
                      	score.innerHTML=parseInt(score.innerHTML)+1;

                      }
                      duct.scoreBol=false;

            	  }
            	  if (isDelTimer==true) {
            	  	clearInterval(duct.moveTimer);
            	  }
                  //碰撞判断
                   //碰撞上管道
                   if(bird.offsetTop<upHeight){
                   	   
                   	   if (duct.l<88&&duct.l+60>70) {
                             isTouch=false;
                   	   }
                         //duct.l<88
                   }
                    //碰撞下管道
                   if(bird.offsetTop>upHeight+100-30){
                   	   
                   	   if (duct.l<88&&duct.l+60>70) {
                             isTouch=false;
                   	   }
                         
                   }


            },30);
            ductWrap.appendChild(duct);

        },3000);
};


//随机数
function randFn(min,max){
    return parseInt(Math.random()*(max-min+1)+min);
}