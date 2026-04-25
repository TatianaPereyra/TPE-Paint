import { Filter } from "../Filter.js";

export class GrisFilter extends Filter{

    aplicar(imageData){
        let data = imageData.data;
        //Aumento en 4 para cambiar de indice
        for(let i = 0; i < data.length; i+=4){
            let r = data[i];
            let g = data[i+1];
            let b = data[i+2];

            let gris = (r+g+b)/3;

            data[i] = gris;
            data[i+1] = gris;
            data[i+2] = gris;

        }

        return imageData;
    }
}