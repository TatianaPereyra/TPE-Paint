import { Filter } from "../Filter.js";


export class BinarioFilter extends Filter{

    aplicar(imageData){
        const UMBRAL = 128;
        let data = imageData.data;

        for(let i = 0; i < data.length; i += 4) {
            const brillo = (data[i] + data[i+1] + data[i+2]) / 3;
            
            if(brillo > UMBRAL) {//si es mas brillo lo paso a blanco
                data[i] = 255;
                data[i+1] = 255;
                data[i+2] = 255;
            } else {            //sino a negro
                data[i] = 0;
                data[i+1] = 0;
                data[i+2] = 0;
            }
        }

        return imageData;
    }

}