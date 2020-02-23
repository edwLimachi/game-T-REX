document.addEventListener('keydown', function(evento){
    if(evento.keyCode =32){
        console.log("salta");
        if (nivel.muerto==true) {
            saltar();
            nivel.velocidad=10;
            nube.velocidad=2;
            cactus.velocidad=0.5;
            cactus.x=ancho+100;
            nivel.muerto=false;
            nivel.marcador=0;
        }else{
            saltar();
        }
        
    }
});

var imgRex,imgNube,imgCactus,imgSuelo;

function cargarImagenes(){
    imgRex= new Image();
    imgNube= new Image();
    imgSuelo= new Image();
    imgCactus= new Image();

    imgRex.src='img/rex.png';
    imgNube.src='img/nube.png';
    imgSuelo.src='img/suelo.png';
    imgCactus.src='img/cactus.png';
}

var ancho=700;
var alto=300;
var canvas,ctx;

function inicializa(){
    canvas=document.getElementById('canvas');
    ctx= canvas.getContext('2d');
    cargarImagenes();
}

function borrarCanvas(){
    canvas.width=ancho;
    canvas.height=alto;
}
var suelo = 200;
var trex= {x: 100, y: suelo, vy:0, gravedad:2, salto:28, vymax:9, saltando: false};
var  nivel = {velocidad: 10, marcador: 0, muerto:false};
var cactus = {x: ancho + 100 , y: suelo, velocidad:0.5}
var nube = {x: ancho + 200 , y: suelo-150, velocidad:2}
var suelog = {x:0, y:100};
 

function dibujaRex(){
    ctx.drawImage(imgRex,0,0,512,512,trex.x,trex.y,50,50);
}

//----------------------------------------------------------------------------------------------
function dibujaSuelo(){
    ctx.drawImage(imgSuelo,suelog.x,0,194,150,0,suelog.y,1500,150);
}

function logicaSuelo(){
    if(suelog.x > 80){
        suelog.x= 0;
    }
    else{
        suelog.x += cactus.velocidad;
    }
}

function dibujaCactus(){
    ctx.drawImage(imgCactus,0,0,104,193,cactus.x,cactus.y,28,55);
}

function dibujaNube(){
    ctx.drawImage(imgNube,0,0,673,418,nube.x,nube.y,48,45);
}

function logicaCactus(){
    if (cactus.x< -100) {
        cactus.x = ancho + 100;    
        nivel.marcador++;
    }
    else{
        cactus.x -= nivel.velocidad;
    }
}

function logicaNube(){
    if (nube.x< -100) {
        nube.x = ancho + 200;    
    }
    else{
        nube.x -= nube.velocidad;
    }
}

function saltar(){
    trex.saltando=true;
    trex.vy = trex.salto;
}
function gravedad(){
    if(trex.saltando == true){

        if(trex.y - trex.vy - trex.gravedad > suelo){
            trex.saltando==false;
            trex.vy==0;
            trex.y=suelo;
        }
        else{
            trex.vy -= trex.gravedad;  
            trex.y -= trex.vy;
        }
        
    }
}

function colision(){
    //cactus.x

    if(trex.y==cactus.y && trex.x==cactus.x){
        nivel.muerto=true;
        nivel.velocidad=0;
        nube.velocidad=0;
        cactus.velocidad=0;
    }
}

function puntuacion(){
    ctx.font = "30px impact";
    ctx.fillStyle = '#555555';
    ctx.fillText(`${nivel.marcador}`,600,50);

    if (nivel.muerto==true) {
        ctx.font = "60px impact";
        ctx.fillText(`GAME OVER`, 240, 150);
    }
}


//-------------------------------------------------------
//Bucle principal
var FPS=50;
setInterval(function(){
    principal();
},1000/FPS);

function principal(){   
    borrarCanvas();
    gravedad();
    logicaSuelo();
    logicaCactus();
    logicaNube();
    puntuacion()
    dibujaSuelo();
    dibujaNube();
    dibujaCactus();
    dibujaRex(); 
    colision();
    
};

//finished

