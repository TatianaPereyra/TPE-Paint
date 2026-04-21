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
    ctx.fillRect(0, 0, 1000, 700);
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

document.querySelector("#cleanAll").addEventListener('click', cleanCanvas);

document.querySelector("#cargar").addEventListener('click', (e) =>{
    const input = document.querySelector("#image"); //obtengo el input y lo paso al controlador

    if(!input.files || input.files.length === 0){  //compruebo que no dejen vacio el input
        let mensaje = document.querySelector("#adicional");
        mensaje.innerHTML = '<h2>No hay ninuguna imagen seleccionada</h2>'
        setTimeout(() => {
            mensaje.innerHTML = '';
        }, 2000);
    }else{
        imageController.loadImage(input.files[0]);
        input.value = '';
    }

});