//parameters
let f=0; //Hz
let N=1000; //amount of samples in one round = sample rate
let time=0;
let trace=[];
let centerOfMass={
	x:0,
	y:0
}
let fourier=[]
function woundUp(){
  
  let radius = 100;

  stroke(255);
  noFill();
  ellipse(0,0, radius*2);

  let signal=cos(4*time);

  let tracePoint={
    x : signal*radius*cos(f*time),
    y : signal*radius*sin(f*time),
  }
  
  trace.unshift(tracePoint);
  
  let x = radius*cos(f*time);
  let y = radius*sin(f*time);
  stroke(300);
  fill(255);
  ellipse(x,y,8);
  noFill();
  line(x,y,tracePoint.x, tracePoint.y);
  if(time>6.28){
    time=0;
    f+=0.01;
  }

  if(trace.length>628/f){
    trace.pop();
  }
  
  for (let i = 0;i<trace.length;i++){
    point(trace[i].x,trace[i].y);
    centerOfMass.x+=trace[i].x/trace.length; centerOfMass.y+=trace[i].y/trace.length;

  }
  fill(255);
  ellipse(centerOfMass.x,centerOfMass.y,8);
  
  document.getElementById("demo").innerHTML = centerOfMass.y;
  centerOfMass.x=0;centerOfMass.y=0;
  time+=0.01;
}


function setup() {
  createCanvas(1200,400);
}

function draw() {
  background(0);
  translate(200,200);
  for(let n=0;n<N;n++){
    let radius = 100;
    stroke(255);
    noFill();
    ellipse(0,0, radius*2);
    let signal=cos(4*2*PI*n/N);
    let tracePoint={
      x : signal*radius*cos(2*PI*f*n/N),
      y : signal*radius*sin(2*PI*f*n/N),
    }
    trace.unshift(tracePoint); 
  }
  for (let i = 0;i<trace.length;i++){
    point(trace[i].x,trace[i].y);
    centerOfMass.x+=trace[i].x/trace.length; centerOfMass.y+=trace[i].y/trace.length;
  }
  fill(255);
  ellipse(centerOfMass.x,centerOfMass.y,8);
  fourier.push(sqrt(pow(centerOfMass.x,2)+pow(centerOfMass.y,2)));
  translate(200,0);
  for (let i = 0;i<fourier.length;i++){
    point(0.1*i, -fourier[i]);
  }

  

  document.getElementById("demo").innerHTML = centerOfMass.x; //write here what you want to debug
  centerOfMass.x=0;centerOfMass.y=0;
  trace=[];
  f+=0.01;
}

