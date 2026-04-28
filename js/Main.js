import { Pen } from "./tools/Pen.js";
import { Eraser } from "./tools/Eraser.js";
import { ToolsController } from "./controllers/ToolsController.js";
import { ImageController } from "./controllers/ImageController.js";

"use strict";

//-----------------------------------------------------
//    DECLARACION DE CONSTANTES Y VARIABLES
//-----------------------------------------------------

const CANVAS = document.querySelector("#canvas");
let ctx = CANVAS.getContext("2d");


let toolController = new ToolsController(ctx);
let imageController = new ImageController(ctx);


//-----------------------------------------------------
//                  CANVAS
//-----------------------------------------------------

function drawCanvas(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 800, 600);
}

export function cleanCanvas(){
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

document.querySelector("#clean").addEventListener('click', cleanCanvas);


function cargar(){
    const input = document.querySelector("#fileInput");
    imageController.loadImage(input.files[0]);
    input.value = "";

}

let input = document.getElementById("fileInput");

document.querySelector("#load").addEventListener("click", (e) => {
    input.click();
});

input.addEventListener("change", (e) =>{
    cargar();
});