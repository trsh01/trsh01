let distort;
let sonidob=true;
let titulo="Presiona una tecla para iniciar";
let titulo2="";
let titulo3="";
let titulo4="Acercar, achicar con la ruedita\n \ngirar con el click";
let estado=false;
let duration1,duration2;
let minutos="00",segundos="00"; 

function preload() {
	soundFormats('mp3', 'ogg');
	mySound = loadSound('Ikebana 1');
	mySound2 = loadSound('Ikebana 5');
	fuente = loadFont('ABSTRACT.TTF'); 
  }

function setup() {
	createCanvas(1200, 850, WEBGL);	
	superMan = new createWord3D("活け花", depth = 6, size = 4, resolution = 50, bevelled = true, font = "Times New Roman", style = "bold");
	//saveCanvas('myCanvas', 'png');
    c1 = color(0,255,0);
  	c2 = color(255);	
    // distort = createWarp(({ glsl, millis, position }) => {
    //  const t = millis.div(1000)
    //  return glsl.vec3(
    //    t.mult(2).add(position.y().mult(4)).sin().mult(0.15),
    //    t.mult(0.5).add(position.z().mult(2)).sin().mult(0.15),
    //     t.mult(1.5).add(position.x().mult(3)).sin().mult(0.15)
    //   )
    // })
	 angleMode(DEGREES);
	 mySound.onended(finishedPlaying1);
	 mySound2.onended(finishedPlaying2);
	 duration1 = mySound.duration();
	 duration2 = mySound2.duration();
}

function draw() {
	
	lights();
    orbitControl();
	//directionalLight(10, 10, 250, 1, 0, -1);
	//directionalLight(255, 5, 100, 0, 1, -1);
	//ambientLight(255,0,155);
	background(0,0,0);
	if (estado==true){
		if(sonidob==false){
			push();
			textFont(fuente);
			textSize(8);
			fill(255,255,0);
			segundosminutos(mySound.currentTime());
            if(segundos<10){text("0"+minutos+":"+"0"+segundos, width/2-200,-height/2+20);}
            else{text("0"+minutos+":"+segundos, width/2-200,-height/2+20);}
            segundosminutos(duration1);
			text("/"+minutos+":"+segundos, width/2-100,-height/2+20);
			pop();
		}else{
			push();
			textFont(fuente);
			textSize(8);
			fill(255,255,0);
			segundosminutos(mySound2.currentTime());
            if(segundos<10){text("0"+minutos+":"+"0"+segundos, width/2-200,-height/2+20);}
            else{text("0"+minutos+":"+segundos, width/2-200,-height/2+20);}
            segundosminutos(duration2);
			text("/"+minutos+":"+segundos, width/2-100,-height/2+20);
			pop();
		}
	}
	push();
	textFont(fuente);
	textSize(6);
	fill(255,255,0);
	translate(0,0,500);
	text(titulo,-220,0);
	pop();

	push();
	textFont(fuente);
	textSize(9);
	fill(255,0,0);
	translate(0,0,200);
	text(titulo4,-350,200);
	pop();

	push();
	textFont(fuente);
	textSize(9);
	if(sonidob==true){
		fill(150);}
	else{
		fill(0,255,0);
	}
    text(titulo2,-width/2+20,-height/2+20);
	pop();

	push();
	textFont(fuente);
	textSize(9);
	if(sonidob==true){
		fill(0,255,0);}
	else{
		fill(150);
	}
    text(titulo3,-width/2+20,-height/2+50);
	pop();

	push();
	angleMode(RADIANS);
	rotateY(frameCount * 0.02);
	rotateZ(frameCount * 0.02);
	for (let zAngle = 0; zAngle < 180; zAngle += 30) {
		// Rotate cubes in a full circle to create a ring of cubes
		for (let xAngle = 0; xAngle < 360; xAngle += 30) {
			
		  push();
		  angleMode(DEGREES);
		  // Rotate from center of sphere
		  rotateZ(zAngle);
		  rotateX(xAngle);
	
		  // Then translate down 400 units
		  translate(0, 400, 0);
		  //rotateY(frameCount * 0.02);
		  strokeWeight(5);
  			noFill();
  		  stroke(32, zAngle, 64);
		  box();		  
		  pop();
		}
	  }
	 pop(); 
	//image(fuente,-width/2,-height/2,900);
	//distort();
	//noStroke()
    //sphere(50);
	push();
    translate(0,0,200);
	angleMode(RADIANS);
    rotateY(frameCount * 0.02);
	normalMaterial();
	shininess(50);
	
	superMan.show()
	pop();
}

function mouseClicked() {
	if(estado==false){keyPressed();}
	estado=true;
  }

function keyPressed() {
	titulo="";
	titulo2="Ikebana-01";
	titulo3="Ikebana-02";
	if (sonidob==true){
		mySound2.stop();
		mySound.play();
		estado=true;
	}
	if (sonidob==false){
		mySound.stop();
		mySound2.play();
	}
	if (sonidob==true)
		{sonidob=false;console.log("pepe1")}
    else {sonidob=true;console.log("pepe1")}
}
function finishedPlaying1(){
	if(mySound.currentTime()==0){
		mySound2.play();
		sonidob=true;
	}	
	console.log("finish"+sonidob);

}
function finishedPlaying2(){
	if(mySound2.currentTime()==0){
		mySound.play();
		sonidob=false;
	}
	//mySound.play();
	console.log("finish2"+sonidob);
}
function segundosminutos(tiempo){
    minutos=int(tiempo/60);
    segundos=int(tiempo%60);
}