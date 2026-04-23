import { Filter } from "../Filter.js";

export class BlurFilter extends Filter{
     /** 
     * @description
     * Inicializa el filtro con el valor del kernel y datos asociados que se utilizaran
     * para el filtro.
     */
    constructor(){
        super()
        this.kernel = [ 1, 1, 1, 1, 1,
                        1, 1, 1, 1, 1,
                        1, 1, 1, 1, 1,
                        1, 1, 1, 1, 1,
                        1, 1, 1, 1, 1];
        this.kernelWidth = 5;
        this.kernelHeight = 5;
        this.factor = 25; 
    }

     /** 
     * @param {Array} imageData - ImageData de la imagen
     * 
     * @description
     * Toma el data del ImageData, el alto y ancho y crea una copia. Recorre el arreglo original en alto y ancho y va 
     * calculando el índice de los píxeles. Luego, por cada píxel, recorre el kernel realizando la multiplicación
     * con los valores de los "vecinos" para obtener los nuevos RGB. Cuando termina de recorrer el kernel,
     * asigna los valores promediados a la copia del arreglo. Finalmente, retorna un nuevo ImageData con el resultado.
     */
    aplicar(imageData){
    
        let data = imageData.data;
        let ancho = imageData.width;
        let alto = imageData.height;
        let cambio = new Uint8ClampedArray(data.length);

        //Empiezo desde la pos 1 para evitar los bordes
        for(let x = 1; x < ancho - 1; x++){
            for(let y = 1; y < alto - 1; y++){

                let index = (x + y * ancho) * 4;
                
                let sumaR = 0;
                let sumaG = 0;
                let sumaB = 0;

                for(let kx = 0; kx < this.kernelWidth; kx++){
                    for(let ky = 0; ky < this.kernelHeight; ky++){

                        let valorKernel = this.kernel[ky * this.kernelWidth + kx];

                        let vecinoX = x + (kx - 1);
                        let vecinoY = y + (ky - 1);
                        
                        //Calculo el indice de los vecinos y los voy acumulando para despues promediar
                        let indiceVecino = (vecinoX + vecinoY * ancho) * 4;
                        
                        sumaR += data[indiceVecino] * valorKernel;
                        sumaG += data[indiceVecino+1] * valorKernel;
                        sumaB += data[indiceVecino+2] * valorKernel;

                    }
                }

                //asigno valores ya promedidados
                cambio[index] = sumaR/this.factor;
                cambio[index+1] = sumaG/this.factor;
                cambio[index+2] = sumaB/this.factor;
                cambio[index+3] = data[index+3];

            }
        }

        return new ImageData(cambio, ancho, alto);
    }
}