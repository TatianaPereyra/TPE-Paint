import { Tool } from "../tools/Tool.js";

//Guardo la logica de comparaciones 
export class ToolsController{
    constructor(ctx){
        this.ctx = ctx;
        this.tool = null;
        this.isInUse = false;
        this.waitMouseEvents();

    }
    
    //-----------------------------------------------
    //              EVENTOS DE MOUSE
    //----------------------------------------------
    waitMouseEvents(){

        //verifico si el mouse es clickeado
        document.addEventListener('mousedown', (e) =>{
            if(this.tool!= null){ //si ya tengo una herramienta seleccionada comienzo el dibujo
                this.startDraw(e.offsetX, e.offsetY);
            }
        });

        //si se sostiene, puede dibujar
        document.addEventListener('mousemove', (e) => {
            if(this.isInUse){
                this.continueDraw(e.offsetX, e.offsetY);
            }
        });

        //si se suelta, no dibujo
        document.addEventListener('mouseup', (e) => {
            this.isInUse = false;
        });
    }


    //-----------------------------------------------
    //              USO DE HERRAMIENTAS
    //-----------------------------------------------

    startDraw( x, y){
        this.tool.startDraw(this.ctx, x, y);
        this.isInUse = true;
    }

    continueDraw(x, y){
        if(this.isInUse){
            this.tool.continueDraw(this.ctx, x, y);
        }
    }

    setTool(tool){
        this.tool = tool;
    }

}