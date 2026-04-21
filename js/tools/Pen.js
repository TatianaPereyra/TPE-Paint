import {Tool} from './Tool.js';
export class Pen extends Tool{
    constructor(){
        super();
        this.color = "black";
    }

    setColor(color){
        this.color = color;
    }

    //Cada que comienzo un trazo, establezco el estilo de la linea
    startDraw(ctx, x, y){
        ctx.globalCompositeOperation = "source-over"; 
        ctx.strokeStyle = this.color;
        super.startDraw(ctx, x, y);
    }


}