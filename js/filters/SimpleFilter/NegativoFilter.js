import { Filter } from "../Filter.js";

export class NegativoFilter extends Filter{

    aplicar(imageData){
        let data = imageData.data;

        for(let i = 0; i < data.length; i+=4){
            let r = data[i];
            let g = data[i+1];
            let b = data[i+2];

            data[i] = 255 - r;
            data[i+1] = 255 - g;
            data[i+2] = 255 - b;
        }
        return imageData;



        
    }



}

