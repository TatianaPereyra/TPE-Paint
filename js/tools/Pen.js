export class Pen{
    constructor(){
        this.color = "black";
    }

    setColor(color){
        this.color = color;
    }

    //----------------------------------------
    //          DIBUJO SOBRE EL CANVAS
    //---------------------------------------

    //Cada que comienzo un trazo, establezco el estilo de la linea
    startDraw(ctx, x, y){
        ctx.beginPath();
        ctx.moveTo(x, y);
    
        ctx.strokeStyle = this.color;
    }

    continueDraw(ctx, x, y){
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}