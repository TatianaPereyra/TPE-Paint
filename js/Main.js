import {Pen} from "./tools/Pen.js";

"use strict";

//-----------------------------------------------------
//    DECLARACION DE CONSTANTES Y VARIABLES
//-----------------------------------------------------


//------------Canvas-----------------------------------
const CANVAS = document.querySelector("#canvas");
let ctx = CANVAS.getContext("2d");


//-----------Comportamiento del mouse------------------
let mouseDown = false;
let isPenClicked = false; 
let lastPosX, lastPosY;
let pen = null;



//----------------------------------------------------
//                 EVENTOS DE MOUSE
//----------------------------------------------------

//Verifico si el mouse es clickeado y reasigno las variables correspondientes
document.addEventListener('mousedown', (e) =>{
    mouseDown = true;
    lastPosX = e.offsetX;
    lastPosY = e.offsetY;

    if(isPenClicked){ //verifico si previamente se selecciono el pincel antes de inicializarlo
        pen = new Pen();
        pen.startDraw(ctx, lastPosX, lastPosY);
    } else if(isEraserClicked){
        eraser = new Eraser();
        eraser.startDraw();
    }
});

//mientras se mantiene el mouse, se dibuja
document.addEventListener('mousemove', (e) =>{
    lastPosX = e.offsetX;
    lastPosY = e.offsetY;

    if(mouseDown && pen!= null && isPenClicked){
        pen.continueDraw(ctx, lastPosX, lastPosY);
    }
});

//cuando se suelta, finaliza
document.addEventListener('mouseup', (e) =>{
    mouseDown = false;
    pen = null;
});


//-----------------------------------------------------
//                  CANVAS
//-----------------------------------------------------

function drawCanvas(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1000, 700);
}



function main(){
    drawCanvas();
    isPenClicked = true;
}

main();