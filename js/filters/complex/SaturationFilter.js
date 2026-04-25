import { Filter } from "../Filter.js";

export class SaturationFilter extends Filter{
    /**
     * @description 
     * Inicializa el filtro asignado el valor del factor por defecto.
     */
    constructor(){
        super();
        this.factor = 1.8;
    }
    
    /**
     * @param {Array} imageData - ImageData de la imagen a transformar.
     * 
     * @description
     * Recorre el arreglo data. Pasa sus pixeles al sistema HSL para aumentar la saturacion y luego volver 
     * a pasarlos al sistema RGB.
     * 
     * @returns {Array} - arreglo data modificado.
     */
    aplicar(imageData){
        let data = imageData.data;

        for(let i = 0; i < data.length; i += 4) {

            let r = data[i] / 255;
            let g = data[i+1] / 255;
            let b = data[i+2] / 255;

            //hsl = [h, s, l] (arreglo con el orden que corresponde)
            let hsl = this.toHSL(r, g, b);
            hsl[1] = hsl[1] * this.factor;                    // modificar saturación   
           
            //nuevoRGB = [r, g, b] 
            let nuevoRGB = this.toRGB(hsl[0], hsl[1], hsl[2]);
            
            //normalizo los valores al asignarlos
            data[i] = nuevoRGB[0] * 255;
            data[i+1] = nuevoRGB[1] * 255;
            data[i+2] = nuevoRGB[2] * 255;
        }

        return imageData;
    }


    /**
     * @param {number} r - valor r del color (normalizado 0 -1).
     * @param {number} g - valor g del color (normalizado 0 -1).
     * @param {number} b - valor b del color (normalizado 0 -1).
     * 
     * @description
     * Recibe valores rgb normalizados a valores entre 0 y 1. Mediante una serie de formulas, calcula el hue(tono),
     * saturation y lightness de esos colores. 
     * Dichas formulas fueron obtenidas y adaptadas del siguiente enlace: https://en.wikipedia.org/wiki/HSL_and_HSV
     * 
     * @returns {Array} - arreglo con el color pasado al sistema HSL.
     */
    toHSL(r, g, b){
        let max = Math.max(r,g,b);
        let min = Math.min(r,g,b);
        let chroma = max - min;
        let hue = 0; //si c es 0, queda 0;

        if(chroma !== 0){
            if(max === r){
                hue = ((g - b) / chroma) % 6;
            } else if(max === g){
                hue = ((b - r) / chroma) + 2;
            } else {
                hue = ((r - g) / chroma) + 4;
            }
        }

        let hueFinal = 60 * hue;
        let lum = (max + min) / 2;
        let saturation = 0;
        
        if(lum !== 0 && lum !== 1){
            saturation = chroma / (1 - Math.abs(2 * lum - 1));
        }

        return [hueFinal, saturation, lum];
    }

        /**
     * @param {number} h - valor h del color (0-360 grados).
     * @param {number} s - valor s del color (normalizado 0 - 1).
     * @param {number} l - valor l del color (normalizado 0 - 1).
     * 
     * @description
     * Recibe valores HSL normalizados a valores entre 0 y 255. Mediante una serie de formulas, calcula el valor
     * equivalente del color para el sistema RGB.
     * Dichas formulas fueron obtenidas y adaptadas del siguiente enlace: https://en.wikipedia.org/wiki/HSL_and_HSV
     * 
     * @returns {Array} - arreglo con el color pasado al sistema RGB.
     */
    toRGB(h, s, l){
        let chroma = (1 - Math.abs(2 * l - 1)) * s;
        let hue = h/60; 
        let x = chroma * (1 - Math.abs((hue % 2) - 1));

        let rgb = this.calcularRGBIntermedio(hue, chroma, x);

        let m = l - (chroma/2);

        let finalRGB = [rgb[0] + m, rgb[1] + m, rgb[2] + m];

        return finalRGB;
    }

    /**
    * @param {number} hue - valor hue normalizado a 0-6.
     * @param {number} chroma - chroma del color (0-1).
     * @param {number} x - variable intermedia (0-1).
     * 
     * @description
     * Recibe valores HSL. Compara los posibles valores de hue para
     * obtener el orden del color RGB.
     * Dichas formulas fueron obtenidas y adaptadas del siguiente enlace: https://en.wikipedia.org/wiki/HSL_and_HSV
     * 
     * @returns {Array} - arreglo con el color pasado al sistema RGB.
     */
    calcularRGBIntermedio(hue, chroma, x){
        if (hue < 1) {
            return [chroma, x, 0];

        } else if (hue < 2) {
            return [x, chroma, 0];

        } else if (hue < 3) {
            return [0, chroma, x];

        } else if (hue < 4) {
            return [0, x, chroma];

        } else if (hue < 5) {
            return [x, 0, chroma];

        } else {
            return [chroma, 0, x];
        }
    }

}