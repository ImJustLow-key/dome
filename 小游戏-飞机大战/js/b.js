  var can1=document.getElementById("can1");
              var cxt=can1.getContext("2d");
              
              var hit=0;                                          //���еĵ�����     
                   
              var nothit=0;                                       //û�л��еĵ�����
              var time=2000;                                       //�����ӵ���ʱ��
              var thisBullets=new Array();                        //ʵ�����ӵ�����
              var enemys=new Array();                               //ʵ���о�����
              var booms=new Array();                                  //ʵ�� ը����
              var enemyBullets=new Array();                             //��������ӵ�����
              var lifes=new Array();
              var bulletbosss=new Array();                              //  boss�ӵ�����
              var hitboss=0;                                            //����boss����
              var boss;                     //boss  duixiang
             //ʵ������
              for(var i=0;i<3;i++){
                  var life=new Life(i*37,517);
                  lifes[i]=life;

              } 
               //�������
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
                                 
              var thisPlane=new ThisPlane(126.5,400); //ʵ�����ɻ�
             
              var a=null;   //��500���뷢���ӵ�
             
              var b=null;                                               //���˳����߳�
                              //��������
               
              function instanceEnemy(){                                //�������˺���
                  
                
                  var direction=Math.round(Math.random()*2);
                  var type=Math.round(Math.random()*2);
                     switch(direction){
                         case 0:             //��
                     if(hit>=15&&hit<100){                                                                //hit���ڵ���ĳ������ʱ��ʵ����ͬ���ӵ�
                      var enemy=new Enemy(-50,0,type,1,2.5);}


                     else if(hit>=100){ var enemy=new Enemy(-50,0,type,1.5,3.5);}


                     else{
                       var enemy=new Enemy(-50,0,type,0.5,1.5);}
                             
                           break;   
                         case 1:            //��
                    if(hit>=15&&hit<100){
                      var enemy=new Enemy(300,0,type,-1,2.5);}
                    else if(hit>=100){ var enemy=new Enemy(300,0,type,-1.5,3.5);}

                    else{
                        var enemy=new Enemy(300,0,type,-0.5,1.5);}

                           break;
                         case 2:           //��
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
              //�������˷����ӵ�����
              function enemyshouw(){


                for(var i=0;i<enemys.length;i++){

                  var enemy=enemys[i];
                  enemy.showBullet();
                }

              }
              var bg1=new Bg(0,-90,1);//ʵ����һ����������
              var bg2=new Bg(0,-625,1);//ʵ���ڶ�����������
              
              
              
          //���屾�ɻ�����
          function ThisPlane(x,y){
               
              this.x=x;
              this.y=y;
             
              this.showBullet=function(){
                  
                  var thisBullet =new ThisBullet(this.x+15,this.y-17,-2);
                   thisBullets.push(thisBullet);
                   
                  //var timer= window.setInterval("thisBullets["+(thisBullets.length-1)+"].run()",40);
                  
                 //thisBullets[thisBullets.length-1].timer=timer;       //Ϊֹͣ�߳����̵�
                    
              }
           
          }
           //���屾�ӵ�
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
         
            
             //������˶���
          function Enemy(x,y,type,speedX,speedY){
               this.x=x;
               this.y=y;
               this.i=0;                                         //ͼƬ֡��
               this.speedX=speedX;                                     //�ƶ���x����
               this.speedY=speedY;                                     //�ƶ���y����
               this.isLive=true;
               this.type=type;                                        
               this.run=function(){
                    if(this.x>-120&&this.x<420&&this.y>-72&&this.y<620){              //�жϵ��˳���

                        this.x=this.x+speedX;
                        this.y=this.y+speedY;
                        //document.getElementById("a").innerText=this.x;
                           
                    }else{this.isLive=false;nothit++;}        
               }
               this.showBullet=function(){
                   if(this.isLive){
                       //alert("dfds");
                           switch(this.type){                                        //���ݲ�ͬ�ĵ��� ʵ����ͬλ�õ��ӵ�
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
           
           //���屬ը��
           function Boom(x,y){
               this.x=x;      
               this.y=y;
               this.i=0;                               //��ը�� ֡��
               
           }

           //��������ӵ�����
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
           //����boss����
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
           //����boss�ӵ����亯��
           
           function show(){
                if(boss!=null){
                boss.show();
                setTimeout("show()", 2000);
                }
           }
           //����boss�ӵ�����
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
           //������������
           function Life(x,y){
              this.x=x;

              this.y=y;



           }
          //���屳������
          function Bg(x,y,speed){
             this.x=x;
             this.y=y;
             this.speed=speed;
             this.down=function(){
                this.y=this.y+this.speed;

             }
            
          } 
            //��������ͼ��
          function darwbg(bg){
               
               var bgimg=new Image();
               bgimg.src="img/bg.png";
               bgimg.onload=function(){
	          cxt.drawImage(bgimg,bg.x,bg.y);
                   
	       }
              bg.down();
          }
           

           //�жϱ���ͼƬ�����뻭������ͼƬ
          function outbg(){
               darwbg(bg1);
               darwbg(bg2);
               //if(bg1.y==-88||bg1.y==-89||bg1.y==-90||bg1.y==-91){bg2.y=-625;}
               //if(bg2.y==-88||bg2.y==-89||bg2.y==-90||bg2.y==-91){bg1.y=-625;}
               if(bg1.y==-1||bg1.y==0||bg1.y==1){bg2.y=-535;}
               if(bg2.y==-1||bg2.y==0||bg2.y==1){bg1.y=-535;}
          }

            //�������ɻ�
          function darwthisPlane(){
                 var thisPlaneImg=new Image();
                 thisPlaneImg.src="img/thisPlane.png";
                 thisPlaneImg.onload=function(){
                      cxt.drawImage(thisPlaneImg,thisPlane.x,thisPlane.y);
                  }
                
          }
          //�������ӵ�
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


           
          //��������
          function darwenemy(enemy){
            if(enemy.isLive){
                switch(enemy.type){
                  case 0:                //Ѽ��
                 
                      var Img=new Image();
                      Img.src="img/enemy_duck.png";
                       
                      Img.onload=function(){
                       
                          cxt.drawImage(Img,54*enemy.i,0,54,41,enemy.x,enemy.y,54,41);
                          enemy.i++;
                          if(enemy.i==10){enemy.i=0;}
                       
                      }
                  
                      break;
                  
                  case 1:                //�ɻ�

                      var Img=new Image();
                      Img.src="img/enemy_fly.png";
                      Img.onload=function(){
                          cxt.drawImage(Img,45*enemy.i,0,45,31,enemy.x,enemy.y,45,31);
                          enemy.i++;
                          if(enemy.i==10){enemy.i=0;}
                  }
                  
                      break;
                   case 2:                //��


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
          
          //������ը
          function darwBoom(boom){
               
                 var img=new Image();
                 img.src="img/boom.png";
                 img.onload=function(){
                     cxt.drawImage(img,44*boom.i,0,44,49,boom.x,boom.y,44,49);
                     boom.i++;
                     
                 }
           }
          //���������ӵ�����
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
          //��������
          function darwLife(life){


             if(life!=null){
                var img=new Image();
                img.src="img/hp.png";
                img.onload=function(){
                    cxt.drawImage(img,life.x,life.y);
                }
               
            }

          }
          //����boss
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
           //����boss�ӵ�
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
          function isBullet(){                                   //�жϻ����ӵ�����
              
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

          //�жϵ���ײ�����ɻ�
          function isEnemyPlane(){
                for(var i=0;i<enemys.length;i++){
                 var enemy=enemys[i];
                  if(enemy.isLive){
                       switch(enemy.type){                                        //���ݲ�ͬ�ĵ��� ʵ����ͬλ�õ��ӵ�
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
             //�жϵ����ӵ����б��ɻ�
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
          //�ж�boss�ӵ��򵽱��ɻ�
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
          //�ж�boss�����ɻ�
          function isb(){
            
              
                 if(boss!=null){
                     if(thisPlane.x>=boss.x-10&&thisPlane.x<=boss.x+150&&thisPlane.y>=boss.y-20&&thisPlane.y<=boss.y+100){
                           
                             var boom=new Boom(thisPlane.x,thisPlane.y);                           
                             booms.push(boom);
                              lifes.splice(lifes.length-1,1);

                          

                           } 
                 
                  }

          }
          function isBulletboss(){                                   //�жϻ����ӵ�boss
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
          function plan(){         //��Ϸ����
                if(hitboss==100){
                    var over=document.getElementById("over");
                    over.style.display="block";
                     over.style.backgroundImage = "url(img/gamewin.png)";  
                    var can1=document.getElementById("can1");
                    can1.style.display="none"; 
                   
                    clearInterval(c);
                    document.getElementById("b").innerText="�÷֣�"+((hit*20)-(nothit*5));
                    document.getElementById("c").innerText="��ϲ����ͨ����";
                 }
                if(lifes.length==0){
                    var over=document.getElementById("over");
                    over.style.display="block"; 
                    var can1=document.getElementById("can1");
                    can1.style.display="none"; 
                      
                    clearInterval(c);
                    document.getElementById("b").innerText="�÷֣�"+((hit*20)-(nothit*5));
                  }
           }
          //��Ϸ�ѶȺ���                 //������Ϸ�Ѷ�
          function difficulty(){
              if(hit==15){                                   //hit=15��ʱ��   �������ȼӿ�
              time=700;                           //���ĵ��˳��ֵ�ʱ��
              bg1.speed=2;
              bg2.speed=2;
              }
              if(hit==100){                                    //hit=40��ʱ��   �������ȼӿ�
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
                 
                 isBullet();                                     //�ӵ����е���
                 isEnemyPlane();                                   //����ײ�����ɻ�
                 isEnemy();                                        //�ӵ��򵽱��ɻ�
                 isbbt();                                           //boss�ӵ��򵽱��ɻ�
                 isb();                                           //boss�����ɻ�
                 isBulletboss();                                 //�ӵ���boss
                 plan();
                
                 difficulty();
                  g();                          //�������
                   
          }      
             //ˢ�µ�ͼ����
          function RefreshMap(){
              cxt.clearRect(0,0,400,600);             
              outbg();              //������ͼƬ���ж�                  
              darwthisPlane();//�����ɻ�
              for(var i=0;i<thisBullets.length;i++){                                          //���ӵ�
              darwThisBullet(thisBullets[i]);
              }
              for(var i=0;i<enemys.length;i++){                                                    //������
              darwenemy(enemys[i]);

              }
              for(var i=0;i<booms.length;i++){                                              //��ը��
                      darwBoom(booms[i]);
              }
              for(var i=0;i<enemyBullets.length;i++){                                       //�������ӵ�                    

                     darwEnemyBullet(enemyBullets[i]);   
              }    
              for(var i=0;i<lifes.length;i++){                                             //������
                     darwLife(lifes[i]);    
              }

              for(var i=0;i<bulletbosss.length;i++){                                             //������
                     darwBulletboss(bulletbosss[i]);            //����bulletboss 
              }
              if(boss!=null){
              darwBoss(boss); }                                                             //����boss
              loic();                                                                      //�߼��жϺ���
              document.getElementById("a").innerText="���е�������"+hit+"   "+"���ܵ�������"+nothit+"   "+"����boss��"+hitboss+"   "+"�÷֣�"+((hit*20)-(nothit*5));
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