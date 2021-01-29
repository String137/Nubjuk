let myNub;
let nsize;
let width = 1920;
let half = screen.width/2;

function setup(){
  createCanvas(screen.width,screen.height);
  myNub = new nubjuk(half, 100);
  nsize = new Nsize();
  print(half);
}
function mousePressed() {
  if (mouseX > 0 && mouseX < 1920 && mouseY > 0 && mouseY < 1080) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
function draw(){
  background(0,0,0);
  
  //myNub.display();
  stroke(0,0,0);
  strokeWeight(1);
  nsize.displayLine();
  // var k = random(0,1);
  // var s = 1;
  // // System.out.printf("%d,%f\n",s,k);
  // if(k<0.4){
  //   s = -1;
  // }
  // myNub.velot = myNub.velot + pow(10,random(-0.1,0.5));
  myNub.velot = myNub.velot + random(-0.09,0.1)
  myNub.velo = myNub.velot * myNub.velos;
  // print(myNub.velot);
  myNub.update();
  if(myNub.pos.y>=700+100){
    myNub.score=0;
    myNub.reset();
  }
  stroke(247,146,128);
  textSize(30);
  text("Score: ",250,300);
  text(Math.ceil(myNub.score),350,300);
}
function keyPressed() {
  myNub.setScore();
}

class Nsize{
  
  constructor(){
    this.initwidth = 100;
    this.ratio = 0.25;
    this.inity = 100;
  }
  
  getposWidth(path,isRight){
    let st;
    if(isRight){
      st = createVector(half+this.initwidth,this.inity);
     }
    else{
      st = createVector(half-this.initwidth,this.inity);
    }
    let rat = isRight?this.ratio:-this.ratio;
    let d = createVector(rat*path,path);
    let f = st.add(d);
    return f;
  }
   getwidth(path){
    return this.initwidth + this.ratio * path;
  }
  displayLine(){
  fill(255,255,255);
  stroke(255,255,255);
  let sr = this.getposWidth(0,true);
  let sl = this.getposWidth(0,false);
  let fr = this.getposWidth(700,true);
  let fl = this.getposWidth(700,false);
  line(sr.x,sr.y,fr.x,fr.y);
  line(sl.x,sl.y,fl.x,fl.y);
  line(0.3*half,fl.y,1.7*half,fl.y);
}
}


class nubjuk {
  // this.c = color(0,0,255);
  
  constructor(initx,inity){
    this.pos = createVector(initx,inity);
    this.initx = initx;
    this.inity = inity;
    this.up = createVector(0,1);
    this.path = 0;
    this.ishit = false;
    this.fin = false;
    this.score = 0;
    this.sinratio = 0.2;
    this.sinratio2 = 0.1;
    this.velot = 1;
    this.velos = 2.5;
    this.velo = this.velot * this.velos;
    this.slip = 0.23;
  }
  setScore(){
    this.score = (max(0,this.path-500))/2;
    this.fin = true;
    //delay(1000);
    this.reset();
  }
  update(){
    if(this.path==0){
      this.fin = false;
    }
    if(this.path<750){
      this.path = this.path + this.velo;
    }
    this.pos.y = this.inity + this.path;
    //System.out.println(pos.y);
    let newrad = parseInt(nsize.getwidth(parseInt(this.path))/cos(PI*this.slip));
    this.display(newrad);
  }
  display(rad){
    noStroke();
    let blue = color(76,161,254);
    let white = color(255,255,255);
    let black = color(0,0,0);
    let pink;
    if(this.score>99){
      pink = color(255,106,88);
      pink = color(0,255,0);
    }
    else{
      pink = color(247,146,128);
    }
    let wratio = 0.1;
    let wwidthratio = 0.25;
    let bratio = 0.06;
    let mpratio = 0.15;
    let mratio = 0.04;
    let mslip = 0.23;
    let blushratio = 0.2;
    let blushpyratio = 0.12;
    let blushpxratio = 0.45;
    let swift = rad*this.sinratio*sin(rad*this.sinratio2);
    fill(blue);
    let pos = createVector(this.pos.x,this.pos.y);
    pos.x = this.pos.x + swift;
    stroke(blue);
    strokeWeight(2);
    line(pos.x - rad*sin(PI*this.slip),pos.y,pos.x+rad*sin(PI*this.slip),pos.y);
    strokeWeight(1);
    noStroke();
    arc(pos.x,pos.y-rad*sin(PI*this.slip),2*rad,2*rad,PI*this.slip,PI*(1-this.slip),OPEN);
    arc(pos.x,pos.y+rad*sin(PI*this.slip),2*rad,2*rad,PI*this.slip + PI,PI*(1-this.slip) + PI,OPEN);
    fill(white);
    circle(pos.x-rad*wwidthratio,pos.y,2*wratio*rad);
    circle(pos.x+rad*wwidthratio,pos.y,2*wratio*rad);
    fill(black);
    circle(pos.x-rad*wwidthratio,pos.y,2*bratio*rad);
    circle(pos.x+rad*wwidthratio,pos.y,2*bratio*rad);
    noFill();
    stroke(black);
    arc(pos.x,pos.y+rad*mpratio,2*rad*mratio,2*rad*mratio,PI*mslip,PI*(1-mslip));
    fill(pink);
    noStroke();
    circle(pos.x-rad*blushpxratio,pos.y+rad*blushpyratio,rad*blushratio);
    circle(pos.x+rad*blushpxratio,pos.y+rad*blushpyratio,rad*blushratio);
    pos.x = pos.x - swift;
    
    //circle(pos.x,pos.y,10);
      
  }
  reset(){
    this.pos = createVector(this.initx,this.inity);
    this.path = 0;
    //this.score = 0;
    this.fin = false;
    this.sinratio = pow(10,random(-1,0.5));
    this.sinratio2 = pow(10, random(-1,-0.2));
    this.velos = pow(10, random(0.4,0.7));
    this.velot = 1;
    this.velo = this.velos * this.velot;
  }
}
