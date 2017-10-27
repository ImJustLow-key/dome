 //alert("dfsd");


var btn=document.querySelector("button");

var z=30.00;  //时间
var sec=document.getElementById("sec");
//等级
var level=1;   
var n=0;             //分数
var uls=document.querySelector("ul");
var li_1=document.getElementsByClassName("list1")[0];
 //分数
var score=document.getElementById("score");  
var result =document.getElementById("result");
var back=document.getElementById("back");
//开启护眼
var turnoff=document.getElementById("turnoff");

turnoff.onclick=function(){

	document.body.style.background="rgb(199,237,204)";
	turnoff.innerHTML="普通模式";
	turn();
}

function turn(){
    turnoff.onclick=function(){

	document.body.style.background="";
	turnoff.innerHTML="护眼模式";
	turnoff.onclick=function(){
        
	document.body.style.background="rgb(199,237,204)";
	turnoff.innerHTML="普通模式";
        turn();
	}
    }
}


//开始游戏

btn.onclick=function(){
     //计时器要动
   
     var timer=setInterval(function(){
         score.innerHTML=n;
     	 z -= 0.01;
         z = z.toFixed(2);  //保留两位小数
         sec.innerHTML=z;
         if(z<=0){
           clearInterval(timer);
           if(n<8) {
           	   result.innerHTML="等级：渣渣";
           }else if(n>=20){
                result.innerHTML="等级：超神";

           }else if(n>=12){
                 result.innerHTML="等级：辣鸡";

           }else{
               result.innerHTML="等级：大渣渣";
           }
           back.style.display="block";
        }},10);
     
     //点击开始游戏这些去掉
     btn.remove();
     li_1.remove();
     turnoff.remove();
     app();
     //游戏逻辑函数
     function app(){
           level+=1;
           //console.log(level);
            //重新画游戏
           for (var i = 0; i < level*level; i++) {
           	    var newli=document.createElement("li"); //创建一个li标签
           	    uls.appendChild(newli);   //把li标签添加到ul标签
           	    var newImg=document.createElement("img");  //创建一个img标签
                newli.appendChild(newImg);   //img标签添加到li标签
                newli.style.width=100/level+"%";
                newli.style.float="left";
                newImg.style.width=100+"%";
                newImg.src="images/1.png";
                newli.style.backgroundColor="rgb("+rand(0,255)+","+rand(0,255)+","+rand(0,255)+")";
           }
            
            var x=rand(0,level*level-1);//随机取值
            var imgs=document.querySelectorAll("img");
            var nmg=["images/2.png","images/3.png","images/4.png","images/5.png","images/6.png","images/7.png"];//保存图片数组
            var l=rand(0,5);
            imgs[x].src=nmg[l];
            var li =document.querySelectorAll("li");
            //点不同的在清楚掉
            li[x].onclick=function(){
                 for (var i = 0; i < level*level; i++) {
           	        li[i].remove(this);
                 }
                 n+=1;
                 
                 if (level>10) {
                 	level=10;
                 }
                 app();
            }
            //重新开始
           var btn1=document.querySelector("a");

           btn1.onclick=function(){
           back.style.display="none";
           n=0;
           z=30.00;
           for (var i = 0; i < level*level; i++) {
           	        li[i].remove(this);
           }
           level=1;
           //计时器要动
           var timer=setInterval(function(){
           score.innerHTML=n;
           z -= 0.01;
           z = z.toFixed(2);  //保留两位小数
           sec.innerHTML=z;
           if(z<=0){
           clearInterval(timer);
           if(n<8) {
           	   result.innerHTML="等级：渣渣";
           }else if(n>=20){
                result.innerHTML="等级：超神";

           }else if(n>=12){
                 result.innerHTML="等级：辣鸡";

           }else{
               result.innerHTML="等级：大渣渣";
           }
           back.style.display="block";
           }

           },10);
           app();

           }
     }
}



//随机函数
function rand(min,max){

    return Math.round(Math.random()*(max-min)+min);
}