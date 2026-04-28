//Clase "abstracta" de herramientas para definir comportamiento similar.
export class Tool{
    //constructor vacio

    startDraw(ctx, x, y){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    continueDraw(ctx, x, y){
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}