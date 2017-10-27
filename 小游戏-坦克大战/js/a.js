
        var can1=document.getElementById("can1");  //获取画图

        var cxt=can1.getContext("2d");
     
        //定义主坦克两个颜色数组
        var heroColor = new Array("red","#FFd972");
        
        //定义敌机坦克两个颜色数组
        var enemyColor = new Array("#FFd972","#00FEFE");
    
        //主坦克实例
      var hero = new Hero(240,300,0,heroColor);
        

       //    /定义主坦克子弹
          //定义子弹数组
        var heroBullets= new Array();
          
       //定义敌军坦克子弹数组
       var EnemyBullets=new Array();

      
         


        //敌人坦克实例
        var enemyTanks=new Array();


        //定义击中坦克数据量
        var tankcouut=0;    
         
        var couut=4;                     //敌军坦克数量
        var speed=2;                     //敌军数度
        
        
        for(var i=0;i<couut;i++){

             var enemyTank=new EnemyTank((i+1)*50,0,speed,enemyColor);
             enemyTanks[i]=enemyTank;
               
                
                 var timer=window.setInterval("enemyTanks["+i+"].run()",50);
                 enemyTanks[i].timer=timer;
              
         }
         
         function couu(){
          
          var enemyTank=new EnemyTank(50,0,speed,enemyColor);
            enemyTanks.push(enemyTank);
             //技术难点
           var timer=window.setInterval("enemyTanks["+(enemyTanks.length-1)+"].run()",50);
               
           
               
           enemyTanks[enemyTanks.length-1].timer=timer;
          enemytimer=setTimeout(function(){
            couu();
         },5000);
       }
        couu();
        //本坦克子弹类
         function Bullet(x,y,direct,speed){
              
            this.x=x;
            this.y=y;
            this.speed=speed;
            this.direct=direct;
            this.isLive=true;
            this.timer=null;
            this.run=function run(){
                 if(this.x<=0||this.x>=500||this.y<=0||this.y>=400||this.isLive==false){
                  window.clearInterval(this.timer);
                  this.isLive=false;
            }else{
                   switch(this.direct){
                        
                     case 0:
                          this.y-=this.speed;
                         break;
                       case 1:
                           this.x+=this.speed;
                         break;
                        case 2:
                          this.y+=this.speed;
                         break;
                        case 3:
                           this.x-=this.speed;
                         break;
                    }
                  }
                       
                     
                         
              }
                     
 
         }
      
       //敌坦克子弹类 , 
 function EBullet(x,y,direct,speed){
              
            this.x=x;
            this.y=y;
            this.speed=speed;
            this.direct=direct;
            this.isLive=true;
            this.timer=null;
            this.run=function run(){
                if(this.x<=0||this.x>=500||this.y<=0||this.y>=398||this.isLive==false){
                       window.clearInterval(this.timer);
                       this.isLive=false;
                 }else{
                    switch(this.direct){
                        
                     case 0:
                          this.y-=this.speed;
                         break;
                       case 1:
                           this.x+=this.speed;
                         break;
                        case 2:
                          this.y+=this.speed;
                         break;
                        case 3:
                           this.x-=this.speed;
                         break;
                    


                     }
                  
                  }
               
             
              }
 
         }
        

         
            


      //父类坦克
          function Tank(x,y,direct,color){
              this.x=x;
          this.y=y;
           this.direct=direct;
             this.speed=1;
            this.isLive=true;
            this.color=color;
           this.moveUp=function(){
              this.y-=this.speed;
                this.direct=0;
           }
           
           this.moveRight=function(){
              this.x+=this.speed;
                  this.direct=1;
           }
            this.moveDown=function(){
              this.y+=this.speed;
                this.direct=2;
           }
           this.moveLeft=function(){
              this.x-=this.speed;
               this.direct=3;
           }
          }
        
        //定义一个hero类 
        
        function Hero(x,y,direct,color){
           // 这两句话的意思，是达到 对象冒充，达到继承的效果
          this.tank=Tank;
          this.tank(x,y,direct,color);
          this.speed=3; 
          this.showEnemy=function(){
               switch(this.direct){

                 case 0:
 var heroBullet=new Bullet(this.x+9,this.y,this.direct,3);
                  break;
                 case 1: 
var heroBullet=new Bullet(this.x+30,this.y+9,this.direct,3);
                    break;
                   case 2: 
var heroBullet=new Bullet(this.x+9,this.y+30,this.direct,3);
                    break;
                 case 3: 
var heroBullet=new Bullet(this.x,this.y+9,this.direct,3);
                    break;
             }
               
            //把子弹 放再数组中
              heroBullets.push(heroBullet);
             //技术难点
           var timer=window.setInterval("heroBullets["+(heroBullets.length-1)+"].run()",50);
               
           
               
           heroBullets[heroBullets.length-1].timer=timer;
          }
         

        }           

           //定义敌人坦克的类 
        //定义一个EnemyTank类
	function EnemyTank (x,y,direct,color){
		
		//也通过对象冒充，来继承Tank
		this.tank=Tank;
		this.count=0;
		
		this.tank(x,y,direct,color);
           //敌人坦克发射子弹
    this.showBullet=function(){
                    switch(this.direct){

                 case 0:
if(this.isLive){
 var EnemyBullet=new EBullet(this.x+9,this.y,this.direct,speed);}
                  break;
                 case 1: 
if(this.isLive){
 var EnemyBullet=new EBullet(this.x+30,this.y+9,this.direct,speed);}
                    break;
                   case 2: 
if(this.isLive){
 var EnemyBullet=new EBullet(this.x+9,this.y+30,this.direct,speed);}
                    break;
                 case 3: 
if(this.isLive){
  var EnemyBullet=new EBullet(this.x,this.y+9,this.direct,speed);}
                    break;
             }
if(this.isLive){
          EnemyBullets.push(EnemyBullet);
            var timer=window.setInterval("EnemyBullets["+(EnemyBullets.length-1)+"].run()",50);
            
         EnemyBullets[EnemyBullets.length-1].timer=timer;}
 }
		this.run=function run(){
			
			//判断敌人的坦克当前方向
			switch(this.direct){
				
				case 0:
					if(this.y>0){
						this.y-=this.speed;
              if(this.count==0){this.showBullet(); }
					}

	                                
					break;
				case 1:
					if(this.x<400){
						this.x+=this.speed;
            if(this.count==0){this.showBullet(); }
                                                     
                                               
					}

                                       
					break;
				case 2:
					if(this.y<300){
						this.y+=this.speed;
           if(this.count==0){this.showBullet(); }
                                                
					}
                                   
                                        
					break;
				case 3:
					if(this.x>0){
						this.x-=this.speed;
                                            
            if(this.count==0){this.showBullet(); }//document.getElementById("a").innerText="Y:";
					}
                                       
					break;
			}
			//改变方向,走30次，再改变方向
                         this.count++;
			if(this.count>30){
				this.direct=Math.round(Math.random()*3);//随机生成 0,1,2,3
				this.count=0;
			}
			
                   
		}
	}
           //画 本子弹
        function drawHeroBullet(){
              for(var i=0;i<heroBullets.length;i++){
                var heroBullet=heroBullets[i];
               if(heroBullet!=null&&heroBullet.isLive){
                cxt.fillStyle="red";
                cxt.fillRect(heroBullet.x,heroBullet.y,3,3);
               }
            }
        }

     //画敌军坦克子弹
       function drawEnemyBullet(){

            for(var i=0;i<EnemyBullets.length;i++){
                var EnemyBullet=EnemyBullets[i];
                   for(var j=0;j<enemyTanks.length;j++){
                               var enemyTank=enemyTanks[j];
                if(EnemyBullet!=null&&EnemyBullet.isLive&&enemyTank.isLive){

                cxt.fillStyle="#00FEFE";
                cxt.fillRect(EnemyBullet.x,EnemyBullet.y,3,3);}
           
          }
         }
       }

         //绘制坦克函数
      function drawTank(tank){
        if(tank.isLive){
        switch(tank.direct){
           case 0: 
            case 2:
       cxt.fillStyle=tank.color[0];
        //左边的矩形
        cxt.fillRect(tank.x,tank.y,5,30);
        //画出右边的矩行
        cxt.fillRect(tank.x+15,tank.y,5,30);
        //画出中间矩形
       cxt.fillRect(tank.x+6,tank.y+5,8,20);
       //画出中间圆
       cxt.beginPath(); 
       cxt.fillStyle=tank.color[1];
       cxt.arc(tank.x+10,tank.y+15,4,0360,true);
       cxt.closePath();
        cxt.fill();
        //画出炮筒
       
       cxt.strokeStyle=tank.color[1];
        cxt.lineWidth="3";             
         cxt.beginPath();     
        cxt.moveTo(tank.x+10,tank.y+15);
       if(tank.direct==0){ cxt.lineTo(tank.x+10,tank.y);}
      else if(tank.direct==2){cxt.lineTo(tank.x+10,tank.y+30);}
       cxt.closePath();
       cxt.stroke();
        break; 
        case 1: 
        case 3: 
        cxt.fillStyle=tank.color[0];
        //左边的矩形
        cxt.fillRect(tank.x,tank.y,30,5);
        //画出右边的矩行
        cxt.fillRect(tank.x,tank.y+15,30,5);
        //画出中间矩形
       cxt.fillRect(tank.x+5,tank.y+6,20,8);
       //画出中间圆
       cxt.beginPath(); 
       cxt.fillStyle=tank.color[1];
       cxt.arc(tank.x+15,tank.y+10,4,0360,true);
       cxt.closePath();
       cxt.fill();
        //画出炮筒
       
       cxt.strokeStyle=tank.color[1];
        cxt.lineWidth="3";             
         cxt.beginPath();     
        cxt.moveTo(tank.x+15,tank.y+10);
       if(tank.direct==1){ cxt.lineTo(tank.x+30,tank.y+10);}
      else if(tank.direct==3){cxt.lineTo(tank.x,tank.y+10);}
       cxt.closePath();
       cxt.stroke();
            break; 
          }
         }
       }
       
      //  定时刷新地图 ，作战区域,,专门再作战区域画图
      function flashTankMap(){
             //清除画布
  
          cxt.clearRect(0,0,500,400);
        //  主坦克画图

               drawTank(hero);
          //  本子弹
          drawHeroBullet();
      //敌人子弹
         drawEnemyBullet();
             isHitEnemyTank();
	    
            isHero();

         //敌人坦克
              //for(var i=0;i<couut;i++){
              for(var i=0;i<enemyTanks.length;i++){
               
                drawTank(enemyTanks[i]);
                
               }
          
         document.getElementById("a").innerText="击中坦克个数：  "+tankcouut;
      }
    
    //编写一个函数，专门判断我的子弹，是否击中了某个敌人的坦克
    //编写一个函数，专门用于判断我的子弹，是否击中了某个敌人坦克
function isHitEnemyTank(){
	
		//取出每颗子弹
		for(var i=0;i<heroBullets.length;i++){
			
				//取出一颗子弹
				var heroBullet=heroBullets[i];
				if(heroBullet.isLive){ //子弹是活的，才去判断
				//让这颗子弹去和遍历每个敌人坦克判断
				for(var j=0;j<enemyTanks.length;j++){
					
							var enemyTank=enemyTanks[j];
						
							if(enemyTank.isLive){
							//子弹击中敌人坦克的条件是什么? 很多思路 , 韩老师的思想是
							//(看看这颗子弹，是否进入坦克所在矩形)
							//根据当时敌人坦克的方向来决定
							switch(enemyTank.direct){
								case 0: //敌人坦克向上
								case 2://敌人坦克向下
									if(heroBullet.x>=enemyTank.x&&heroBullet.x<=enemyTank.x+20
										&&heroBullet.y>=enemyTank.y&&heroBullet.y<=enemyTank.y+30){
										//把坦克isLive 设为false ,表示死亡
                                                                                
										enemyTank.isLive=false;
										//该子弹也死亡
										heroBullet.isLive=false;
										//创建一颗炸弹
                            //增加击中坦克数量；
                        tankcouut++;
									
                                                                               
									}
								break;
								case 1: //敌人坦克向右
								case 3://敌人坦克向左
									if(heroBullet.x>=enemyTank.x&&heroBullet.x<=enemyTank.x+30
										&&heroBullet.y>=enemyTank.y&&heroBullet.y<=enemyTank.y+20){
										//把坦克isLive 设为false ,表示死亡
                                                                                
										enemyTank.isLive=false;
										heroBullet.isLive=false;
                            //增加击中坦克数量；
                   tankcouut++;
										
                                                                               
									}
								break;

							}

						}


				}
			}
		}
}


               //谢一个函数判断敌人子弹击中我的坦克
               function isHero(){
                            for(var i=0;i<EnemyBullets.length;i++){
                            var EnemyBullet=EnemyBullets[i];
                                if(EnemyBullet.isLive){
                                  switch(hero.direct){
								case 0: //敌人坦克向上
								case 2://敌人坦克向下
									if(EnemyBullet.x>=hero.x&&EnemyBullet.x<=hero.x+20
										&&EnemyBullet.y>=hero.y&&EnemyBullet.y<=hero.y+30){
										 
                      hero.isLive=false;
                       EnemyBullet.isLive=false;
                       clearTimeout(enemytimer);
                      for (var i = 0; i<enemyTanks.length; i++) {
                        window.clearInterval(enemyTanks[i].timer);
                      }
                      for (var i = 0; i<EnemyBullets.length; i++) {
                        window.clearInterval(EnemyBullets[i].timer);
                      }
										 
									      alert("游戏结束");
                                                                       }
								break;
								case 1: //敌人坦克向右
								case 3://敌人坦克向左
									if(EnemyBullet.x>=hero.x&&EnemyBullet.x<=hero.x+30
										&&EnemyBullet.y>=hero.y&&EnemyBullet.y<=hero.y+20){
										//alert("游戏结束");
                     hero.isLive=false;
                  EnemyBullet.isLive=false;
                  clearTimeout(enemytimer);
                    for (var i = 0; i<enemyTanks.length; i++) {
                        window.clearInterval(enemyTanks[i].timer);
                      }
                       for (var i = 0; i<EnemyBullets.length; i++) {
                        window.clearInterval(EnemyBullets[i].timer);
                      }
                        alert("游戏结束");
                  
									}
								break;

							}
                        }      
                    }
                   
                  }




      function getCommand(){
         
          var code=event.keyCode;
             switch(code){
           
          case 87:
              hero.moveUp();
              
              break;
          case 68:
             hero.moveRight();
             
               break;
          case 83:
             hero.moveDown();
            
               break;
           case 65:
             hero.moveLeft();
              
               break;
           case 74: 
              hero.showEnemy(); 
               break;
         }
      
      flashTankMap();
      }
         flashTankMap();
        //隔时间刷新
       	window.setInterval("flashTankMap()",50);
            //alert("fsdf");