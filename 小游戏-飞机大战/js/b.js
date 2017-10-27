  var can1=document.getElementById("can1");
              var cxt=can1.getContext("2d");
              
              var hit=0;                                          //击中的敌人数     
                   
              var nothit=0;                                       //没有击中的敌人数
              var time=2000;                                       //发射子弹的时间
              var thisBullets=new Array();                        //实例本子弹数组
              var enemys=new Array();                               //实例敌军数组
              var booms=new Array();                                  //实例 炸弹组
              var enemyBullets=new Array();                             //定义敌人子弹数组
              var lifes=new Array();
              var bulletbosss=new Array();                              //  boss子弹数组
              var hitboss=0;                                            //击中boss数量
              var boss;                     //boss  duixiang
             //实例生命
              for(var i=0;i<3;i++){
                  var life=new Life(i*37,517);
                  lifes[i]=life;

              } 
               //清除数组
              function g(){
                   for(var i=0;i<thisBullets.length;i++){
                    var thisBullet=thisBullets[i];
                    if(thisBullet.isLive==false){
                      
                      thisBullets.splice(i,1);
                    }
                   }
                   for(var i=0;i<enemys.length;i++){
                    var enemy=enemys[i];
                    if(enemy.isLive==false){
                      enemys.splice(i,1);
                    }
                   }
                   for(var i=0;i<booms.length;i++){
                    var boom=booms[i];
                    if(boom.isLive==false){
                      booms.splice(i,1);
                    }
                   }
                   for(var i=0;i<enemyBullets.length;i++){
                    var enemyBullet=enemyBullets[i];
                    if(enemyBullet.isLive==false){
                      enemyBullets.splice(i,1);
                    }
                   }
                   for(var i=0;i<bulletbosss.length;i++){
                    var bulletboss=bulletbosss[i];
                    if(bulletboss.isLive==false){
                      bulletbosss.splice(i,1);
                    }
                   }
             }
                                 
              var thisPlane=new ThisPlane(126.5,400); //实例本飞机
             
              var a=null;   //隔500毫秒发射子弹
             
              var b=null;                                               //敌人出现线程
                              //生出敌人
               
              function instanceEnemy(){                                //生出敌人函数
                  
                
                  var direction=Math.round(Math.random()*2);
                  var type=Math.round(Math.random()*2);
                     switch(direction){
                         case 0:             //左
                     if(hit>=15&&hit<100){                                                                //hit大于等于某个数的时候实例不同的子弹
                      var enemy=new Enemy(-50,0,type,1,2.5);}


                     else if(hit>=100){ var enemy=new Enemy(-50,0,type,1.5,3.5);}


                     else{
                       var enemy=new Enemy(-50,0,type,0.5,1.5);}
                             
                           break;   
                         case 1:            //右
                    if(hit>=15&&hit<100){
                      var enemy=new Enemy(300,0,type,-1,2.5);}
                    else if(hit>=100){ var enemy=new Enemy(300,0,type,-1.5,3.5);}

                    else{
                        var enemy=new Enemy(300,0,type,-0.5,1.5);}

                           break;
                         case 2:           //上
                         var x=Math.round(Math.random()*150+50);
                      if(hit>=15&&hit<100){
                       var enemy=new Enemy(x,-50,type,0,2.5);}

                      else if(hit>=100){var enemy=new Enemy(x,-50,type,0,3.5);}
                      else{
                         var enemy=new Enemy(x,-50,type,0,1.5);}
                           break;

                      }
                 
                  enemys.push(enemy);
                  b=setTimeout("instanceEnemy()", time);


              }

               window.setInterval("enemyshouw()",7000); 
              //生出敌人发射子弹函数
              function enemyshouw(){


                for(var i=0;i<enemys.length;i++){

                  var enemy=enemys[i];
                  enemy.showBullet();
                }

              }
              var bg1=new Bg(0,-90,1);//实例第一个背景对象
              var bg2=new Bg(0,-625,1);//实例第二个背景对象
              
              
              
          //定义本飞机对象
          function ThisPlane(x,y){
               
              this.x=x;
              this.y=y;
             
              this.showBullet=function(){
                  
                  var thisBullet =new ThisBullet(this.x+15,this.y-17,-2);
                   thisBullets.push(thisBullet);
                   
                  //var timer= window.setInterval("thisBullets["+(thisBullets.length-1)+"].run()",40);
                  
                 //thisBullets[thisBullets.length-1].timer=timer;       //为停止线程做铺垫
                    
              }
           
          }
           //定义本子弹
          function ThisBullet(x,y,speed){
                 this.x=x;
                 this.y=y;
                 this.isLive=true;
                 this.speed=speed;
                 this.timer=null;
                 this.run=function(){
                     if(this.y>=0){
                        this.y=this.y+this.speed;
                     }else{this.isLive=false;//window.clearInterval(this.timer);
                    }
                 }
          }
         
            
             //定义敌人对象
          function Enemy(x,y,type,speedX,speedY){
               this.x=x;
               this.y=y;
               this.i=0;                                         //图片帧数
               this.speedX=speedX;                                     //移动的x坐标
               this.speedY=speedY;                                     //移动的y坐标
               this.isLive=true;
               this.type=type;                                        
               this.run=function(){
                    if(this.x>-120&&this.x<420&&this.y>-72&&this.y<620){              //判断敌人出界

                        this.x=this.x+speedX;
                        this.y=this.y+speedY;
                        //document.getElementById("a").innerText=this.x;
                           
                    }else{this.isLive=false;nothit++;}        
               }
               this.showBullet=function(){
                   if(this.isLive){
                       //alert("dfds");
                           switch(this.type){                                        //根据不同的敌人 实例不同位置的子弹
                         case 0: 
                       if(hit>=40){var enemyBullet =new EnemyBullet(this.x+17,this.y+21,4);}else{            
                        var enemyBullet =new EnemyBullet(this.x+17,this.y+21,2);}
                           break;   
                         case 1: 
                        if(hit>=40){var enemyBullet =new EnemyBullet(this.x+12.5,this.y+11,4);}else{           
                          var enemyBullet =new EnemyBullet(this.x+12.5,this.y+11,2);}
                        
                           break;
                         case 2:   
                        if(hit>=40){var enemyBullet =new EnemyBullet(this.x+50,this.y+52,4);}else{      
                         var enemyBullet =new EnemyBullet(this.x+50,this.y+52,2);}
                           break;

                      }
                      
                       enemyBullets.push(enemyBullet);
                   }
               }
           }
           
           //定义爆炸类
           function Boom(x,y){
               this.x=x;      
               this.y=y;
               this.i=0;                               //爆炸类 帧数
               
           }

           //定义敌人子弹对象
           function EnemyBullet(x,y,speed){

               this.x=x;
               this.y=y;
               this.speed=speed;
               this.isLive=true;
               this.run=function(){
                  if(this.isLive&&this.y<=530){
                    this.y=this.y+this.speed;
              
                  }else{this.isLive=false;}
               }
           }
           //定义boss对象
           function Boss(x,y){
              this.x=x;
              this.y=y;
              var i=0;
              this.run=function(){
                     
                      if(this.y==150){i=1;}
                      if(this.y==0){i=0;}
                      if(i==0){
                         this.y=this.y+2;

                     }else{

                         this.y=this.y-2;
                    }
                 
              }
             this.show=function(){
                  var bulletboss =new Bulletboss(boss.x,boss.y+80,4);
                  bulletbosss.push(bulletboss);

             }
           }
           //控制boss子弹发射函数
           
           function show(){
                if(boss!=null){
                boss.show();
                setTimeout("show()", 2000);
                }
           }
           //定义boss子弹对像
           function Bulletboss(x,y,speed){
               this.x=x;
               this.y=y;
               this.speed=speed;
               this.isLive=true;
               this.run=function(){
                     if(this.isLive&&this.y<=530){
                   

                     this.y=this.y+speed;


                 }else{this.isLive=false;}
               }

           }
           //定义生命对象
           function Life(x,y){
              this.x=x;

              this.y=y;



           }
          //定义背景对象
          function Bg(x,y,speed){
             this.x=x;
             this.y=y;
             this.speed=speed;
             this.down=function(){
                this.y=this.y+this.speed;

             }
            
          } 
            //画出背景图像
          function darwbg(bg){
               
               var bgimg=new Image();
               bgimg.src="img/bg.png";
               bgimg.onload=function(){
	          cxt.drawImage(bgimg,bg.x,bg.y);
                   
	       }
              bg.down();
          }
           

           //判断背景图片出界与画出背景图片
          function outbg(){
               darwbg(bg1);
               darwbg(bg2);
               //if(bg1.y==-88||bg1.y==-89||bg1.y==-90||bg1.y==-91){bg2.y=-625;}
               //if(bg2.y==-88||bg2.y==-89||bg2.y==-90||bg2.y==-91){bg1.y=-625;}
               if(bg1.y==-1||bg1.y==0||bg1.y==1){bg2.y=-535;}
               if(bg2.y==-1||bg2.y==0||bg2.y==1){bg1.y=-535;}
          }

            //画出本飞机
          function darwthisPlane(){
                 var thisPlaneImg=new Image();
                 thisPlaneImg.src="img/thisPlane.png";
                 thisPlaneImg.onload=function(){
                      cxt.drawImage(thisPlaneImg,thisPlane.x,thisPlane.y);
                  }
                
          }
          //画出本子弹
          function darwThisBullet(thisBullet){
              if(thisBullet.isLive){
                  
                   var thisBulletImg=new Image();
                   thisBulletImg.src="img/thisBullet.png";
                   thisBulletImg.onload=function(){
                      cxt.drawImage(thisBulletImg,thisBullet.x,thisBullet.y);
                   }
                  thisBullet.run();
               }
           }


           
          //画出敌人
          function darwenemy(enemy){
            if(enemy.isLive){
                switch(enemy.type){
                  case 0:                //鸭子
                 
                      var Img=new Image();
                      Img.src="img/enemy_duck.png";
                       
                      Img.onload=function(){
                       
                          cxt.drawImage(Img,54*enemy.i,0,54,41,enemy.x,enemy.y,54,41);
                          enemy.i++;
                          if(enemy.i==10){enemy.i=0;}
                       
                      }
                  
                      break;
                  
                  case 1:                //飞机

                      var Img=new Image();
                      Img.src="img/enemy_fly.png";
                      Img.onload=function(){
                          cxt.drawImage(Img,45*enemy.i,0,45,31,enemy.x,enemy.y,45,31);
                          enemy.i++;
                          if(enemy.i==10){enemy.i=0;}
                  }
                  
                      break;
                   case 2:                //猪


                      var Img=new Image();
                      Img.src="img/enemy_pig.png";
                      Img.onload=function(){
                           cxt.drawImage(Img,120*enemy.i,0,120,72,enemy.x,enemy.y,120,72);
                           enemy.i++;
                           if(enemy.i==10){enemy.i=0;}
                  }
                      break;
                 }
                    enemy.run();
             }
           }
          
          //画出爆炸
          function darwBoom(boom){
               
                 var img=new Image();
                 img.src="img/boom.png";
                 img.onload=function(){
                     cxt.drawImage(img,44*boom.i,0,44,49,boom.x,boom.y,44,49);
                     boom.i++;
                     
                 }
           }
          //画出敌人子弹对象
          function darwEnemyBullet(enemyBullet){
                
             if(enemyBullet.isLive){
                var img=new Image();
                img.src="img/bullet_enemy.png";
                img.onload=function(){
                    cxt.drawImage(img,enemyBullet.x,enemyBullet.y);
                }
                enemyBullet.run();
             }
          }
          //画出生命
          function darwLife(life){


             if(life!=null){
                var img=new Image();
                img.src="img/hp.png";
                img.onload=function(){
                    cxt.drawImage(img,life.x,life.y);
                }
               
            }

          }
          //画出boss
          function darwBoss(boss){
                if(boss!=null){
                var img=new Image();
                img.src="img/boss.png";
                img.onload=function(){
                    cxt.drawImage(img,boss.x,boss.y);
                }
                boss.run();
               
            }
         

          }
           //画出boss子弹
          function darwBulletboss(bulletboss){
                if(bulletboss.isLive!=false){
                var img=new Image();
                img.src="img/bullet_boss.png";
                img.onload=function(){
                    cxt.drawImage(img,bulletboss.x,bulletboss.y);
                }
               bulletboss.run();
            }
         

          }
          function isBullet(){                                   //判断击中子弹敌人
              
              for(var i=0;i<thisBullets.length;i++){
               var thisBullet=thisBullets[i];
                if(thisBullet.isLive){
                  for(var j=0;j<enemys.length;j++){
                      var enemy=enemys[j];
                     if(enemy.isLive){ 
                      switch(enemy.type){
                            
                              
                            case 0:
                                  
			          if(thisBullet.x>enemy.x&&thisBullet.x<enemy.x+54-17&&thisBullet.y<enemy.y+41&&thisBullet.y>enemy.y-29){
           

                                       enemy.isLive=false;
                                        var boom=new Boom(enemy.x,enemy.y);                           
                                        booms.push(boom);
                                        hit++;
                                        //thisBullet.isLive=false;
                                         
                                        //alert("dsfds");
                                  }
	                                
				break;

                             case 1:
                              
                                  if(thisBullet.x>enemy.x&&thisBullet.x<enemy.x+45-17&&thisBullet.y<enemy.y+31&&thisBullet.y>enemy.y-29){
           

                                       enemy.isLive=false;


                                       var boom=new Boom(enemy.x,enemy.y);                           
                                       booms.push(boom);
                                       hit++;
                                       //thisBullet.isLive=false;
                                        
                                  }
	                                
				break;



                              case 2:
                              
                                  if(thisBullet.x>enemy.x&&thisBullet.x<enemy.x+120-17&&thisBullet.y<enemy.y+72-29&&thisBullet.y>enemy.y){
           

                                       enemy.isLive=false;

                                       var boom=new Boom(enemy.x+40,enemy.y+25);                           
                                       booms.push(boom);
                                       hit++;
                                       //thisBullet.isLive=false;
                                        
                                  }
	                                
				break;
                        }
                      
                    }
                  }


               }
              }
          } 

          //判断敌人撞到本飞机
          function isEnemyPlane(){
                for(var i=0;i<enemys.length;i++){
                 var enemy=enemys[i];
                  if(enemy.isLive){
                       switch(enemy.type){                                        //根据不同的敌人 实例不同位置的子弹
                        case 0:             
                           if(enemy.x>=thisPlane.x-27&&enemy.x<=thisPlane.x+20&&enemy.y>=thisPlane.y-20.5&&enemy.y<=thisPlane.y+40){

                                enemy.isLive=false;
                                        var boom=new Boom(enemy.x,enemy.y);                           
                                        booms.push(boom);
                                       
                                        lifes.splice(lifes.length-1,1);
                                        hit++;
                           }
                           break;   
                        case 1:            
                           if(enemy.x>=thisPlane.x-22.5&&enemy.x<=thisPlane.x+22.5&&enemy.y>=thisPlane.y-15.5&&enemy.y<=thisPlane.y+40){

                                enemy.isLive=false;


                                       var boom=new Boom(enemy.x,enemy.y);                           
                                       booms.push(boom);
                                       
                                       lifes.splice(lifes.length-1,1);
                                       hit++;

                           } 
                           break;
                        case 2:         
                            if(enemy.x>=thisPlane.x-100&&enemy.x<=thisPlane.x+35&&enemy.y>=thisPlane.y-10&&enemy.y<=thisPlane.y+40){
                            
                              enemy.isLive=false;

                                       var boom=new Boom(enemy.x+40,enemy.y+25);                           
                                       booms.push(boom);
                                     
                                       lifes.splice(lifes.length-1,1);
                                       hit++;

                           } 
                           break;

                      }



                 }
               }
          }
             //判断敌人子弹击中本飞机
          function isEnemy(){
            for(var i=0;i<enemyBullets.length;i++){
              var enemyBullet=enemyBullets[i];
                 if(enemyBullet.isLive){
                     if(enemyBullet.x>=thisPlane.x-10&&enemyBullet.x<=thisPlane.x+40&&enemyBullet.y>=thisPlane.y-10&&enemyBullet.y<=thisPlane.y+40){
                            
                                     enemyBullet.isLive=false;
                                     lifes.splice(lifes.length-1,1);

                           } 
                   
                 }
            }

          }
          //判断boss子弹打到笨飞机
          function isbbt(){
            for(var i=0;i<bulletbosss.length;i++){
              var bulletboss=bulletbosss[i];
                 if(bulletboss.isLive){
                     if(thisPlane.x>=bulletboss.x-10&&thisPlane.x<=bulletboss.x+150&&thisPlane.y>=bulletboss.y-10&&thisPlane.y<=bulletboss.y+10){
                            bulletboss.isLive=false;
                             var boom=new Boom(thisPlane.x,thisPlane.y);                           
                             booms.push(boom);
                              lifes.splice(lifes.length-1,1);

                           // alert("sdf");

                           } 
                   
                 }
            }

          }
          //判断boss到笨飞机
          function isb(){
            
              
                 if(boss!=null){
                     if(thisPlane.x>=boss.x-10&&thisPlane.x<=boss.x+150&&thisPlane.y>=boss.y-20&&thisPlane.y<=boss.y+100){
                           
                             var boom=new Boom(thisPlane.x,thisPlane.y);                           
                             booms.push(boom);
                              lifes.splice(lifes.length-1,1);

                          

                           } 
                 
                  }

          }
          function isBulletboss(){                                   //判断击中子弹boss
              if(boss!=null){
              for(var i=0;i<thisBullets.length;i++){
               var thisBullet=thisBullets[i];
                if(thisBullet.isLive){
                     if(thisBullet.x>=boss.x-10&&thisBullet.x<=boss.x+180&&thisBullet.y>=boss.y-20&&thisBullet.y<=boss.y+100){
                          
                             
                               thisBullet.isLive=false;
                               hitboss++;
                            
                          

                           } 

               }
              }
             }
           }
          function plan(){         //游戏进度
                if(hitboss==100){
                    var over=document.getElementById("over");
                    over.style.display="block";
                     over.style.backgroundImage = "url(img/gamewin.png)";  
                    var can1=document.getElementById("can1");
                    can1.style.display="none"; 
                   
                    clearInterval(c);
                    document.getElementById("b").innerText="得分："+((hit*20)-(nothit*5));
                    document.getElementById("c").innerText="恭喜，打通关啦";
                 }
                if(lifes.length==0){
                    var over=document.getElementById("over");
                    over.style.display="block"; 
                    var can1=document.getElementById("can1");
                    can1.style.display="none"; 
                      
                    clearInterval(c);
                    document.getElementById("b").innerText="得分："+((hit*20)-(nothit*5));
                  }
           }
          //游戏难度函数                 //三个游戏难度
          function difficulty(){
              if(hit==15){                                   //hit=15的时候   背景数度加快
              time=700;                           //更改敌人出现的时间
              bg1.speed=2;
              bg2.speed=2;
              }
              if(hit==100){                                    //hit=40的时候   背景数度加快
              time=400;
              bg1.speed=3;
              bg2.speed=3;
              }

              if(hit==400){
                 time=2200;
                
                 boss=new Boss(60,-100);
                  show();
              }
           }
          function loic(){
                 
                 isBullet();                                     //子弹击中敌人
                 isEnemyPlane();                                   //敌人撞到笨飞机
                 isEnemy();                                        //子弹打到本飞机
                 isbbt();                                           //boss子弹打到笨飞机
                 isb();                                           //boss到笨飞机
                 isBulletboss();                                 //子弹打到boss
                 plan();
                
                 difficulty();
                  g();                          //清除数组
                   
          }      
             //刷新地图界面
          function RefreshMap(){
              cxt.clearRect(0,0,400,600);             
              outbg();              //画背景图片和判断                  
              darwthisPlane();//画本飞机
              for(var i=0;i<thisBullets.length;i++){                                          //化子弹
              darwThisBullet(thisBullets[i]);
              }
              for(var i=0;i<enemys.length;i++){                                                    //画敌人
              darwenemy(enemys[i]);

              }
              for(var i=0;i<booms.length;i++){                                              //画炸弹
                      darwBoom(booms[i]);
              }
              for(var i=0;i<enemyBullets.length;i++){                                       //画敌人子弹                    

                     darwEnemyBullet(enemyBullets[i]);   
              }    
              for(var i=0;i<lifes.length;i++){                                             //画生命
                     darwLife(lifes[i]);    
              }

              for(var i=0;i<bulletbosss.length;i++){                                             //画生命
                     darwBulletboss(bulletbosss[i]);            //画出bulletboss 
              }
              if(boss!=null){
              darwBoss(boss); }                                                             //画出boss
              loic();                                                                      //逻辑判断函数
              document.getElementById("a").innerText="击中敌人数："+hit+"   "+"逃跑敌人数："+nothit+"   "+"击中boss："+hitboss+"   "+"得分："+((hit*20)-(nothit*5));
           }
           function getonmousemove(){
                 var bbox = can1.getBoundingClientRect();
                
                var x=(event.screenX-bbox.left)* (can1.width/bbox.width);
                var y=(event.screenY- bbox.top)* (can1.height/bbox.height);
                thisPlane.x=x;
                thisPlane.y=y;
             
                         //alert(x);

           }
           
          
          var c=null;