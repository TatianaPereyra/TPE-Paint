import {Pen} from "./tools/Pen.js";
import {Eraser} from "./tools/Eraser.js";
import {ToolsController} from "./controllers/ToolsController.js";

"use strict";

//-----------------------------------------------------
//    DECLARACION DE CONSTANTES Y VARIABLES
//-----------------------------------------------------

//-------------------Canvas----------------------------
const CANVAS = document.querySelector("#canvas");
let ctx = CANVAS.getContext("2d");


//------------------Controladores----------------------
let toolController = new ToolsController(ctx);



//-----------------------------------------------------
//                  CANVAS
//-----------------------------------------------------

function drawCanvas(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1000, 700);
}

function cleanCanvas(){
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
    drawCanvas();
}

function main(){
    drawCanvas();
}

main();

//-----------------------------------------------------
//               EVENTOS DE BOTONES
//-----------------------------------------------------

document.querySelector("#pen").addEventListener('click', (e) =>{
    toolController.setTool(new Pen());
});

document.querySelector("#eraser").addEventListener('click', (e) => {
    toolController.setTool(new Eraser());
});

document.querySelector("#cleanAll").addEventListener('click', cleanCanvas);