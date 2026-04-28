import { Tool } from "../tools/Tool.js";
export class ToolsController{
    /**
     * 
     * @param {Obj} ctx - contexto del canvas.
     * 
     * @description 
     * Inicializa el controlador asignando variables de clase y esperando los eventos de mouse.
     */
    constructor(ctx){
        this.ctx = ctx;
        this.tool = null;
        this.isInUse = false;
        this.size = 10;
        this.waitMouseEvents();
    }
    
    //-----------------------------------------------
    //              EVENTOS DE MOUSE
    //----------------------------------------------
    /**
     * @description
     * Espera eventos el mouse. Segun el evento que reciba, realiza una determinada accion.
     * 
     * @example
     * evento: mousedown, accion: inicializa el dibujo con la herramientan (siempre que exista una)
     * evento: mousemove, accion: dibuja
     * evento: mouseup, accion: finaliza el dibujo
     */
    waitMouseEvents(){
        document.addEventListener('mousedown', (e) =>{
            if(this.tool!= null){ //si ya tengo una herramienta seleccionada comienzo el dibujo
                this.startDraw(e.offsetX, e.offsetY);
            }
        });

        document.addEventListener('mousemove', (e) => {
            if(this.isInUse){
                this.continueDraw(e.offsetX, e.offsetY);
            }
        });

        document.addEventListener('mouseup', (e) => {
            this.isInUse = false;
        });
    }


    //-----------------------------------------------
    //              USO DE HERRAMIENTAS
    //-----------------------------------------------

    /**
     * 
     * @param {number} x - coordenada x del canvas.
     * @param {number} y - coordenada y del canvas.
     */

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